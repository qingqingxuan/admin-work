<template>
  <div>
    <n-card title="随便定写写，如不需要可以忽略" :content-style="{ padding: '5px' }">
      <div class="text-center">
        <div class="text-center test">
          <div class="iconfont icon-left left"></div>
          <img class="avatar" src="/static/images/img_avatar_01.jpeg" alt="" />
          <div class="iconfont icon-right right"></div>
          <div class="text-wrapper">哇哦~</div>
        </div>
      </div>
    </n-card>
    <n-card title="点击图片试试" class="mt-2" :content-style="{ padding: '15px' }">
      <div class="text-center test-2" @click="onHandlerClick" ref="wrapper">
        <img src="/static/images/1.jpeg" />
        <canvas
          id="canvas-test"
          class="canvas-test"
          :width="canvasWidth"
          :height="canvasHeight"
        ></canvas>
      </div>
    </n-card>
    <n-card class="mt-2" :content-style="{ padding: '15px' }">
      <n-grid cols="3" x-gap="10" y-gap="10">
        <n-grid-item v-for="i of 5" :key="i">
          <div class="text-center test-3">
            <div v-if="i === 1">fill</div>
            <div v-if="i === 2">contain</div>
            <div v-if="i === 3">cover</div>
            <div v-if="i === 4">none</div>
            <div v-if="i === 5">scale-down</div>
            <img :class="['img-' + i]" src="/static/images/1.jpeg" />
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'Descriptions',
    setup() {
      const ctx = ref<CanvasRenderingContext2D | null>()
      const canvasWidth = ref(0)
      const canvasHeight = ref(0)
      const wrapper = ref<HTMLDivElement | null>()
      onMounted(() => {
        const { width, height } = wrapper.value?.getBoundingClientRect() as DOMRect
        canvasWidth.value = width
        canvasHeight.value = height
        const canvas = document.getElementById('canvas-test') as HTMLCanvasElement
        ctx.value = canvas.getContext('2d')
      })
      function onHandlerClick(e: MouseEvent) {
        const { offsetX, offsetY } = e
        if (ctx.value) {
          ctx.value.beginPath()
          ctx.value.strokeStyle = 'red'
          ctx.value.lineWidth = 2
          ctx.value.arc(offsetX, offsetY, 10, 0, 2 * Math.PI)
          ctx.value.stroke()
        }
      }
      return {
        wrapper,
        canvasWidth,
        canvasHeight,
        onHandlerClick,
      }
    },
  })
</script>
<style>
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss" scoped>
  .test {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    .left {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateX(0);
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .right {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(0);
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #f5f5f5;
    }
    .text-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
    &:hover {
      .avatar {
        animation: rotate 3s infinite linear;
      }
      .text-wrapper {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
      }
      .left {
        transform: translateX(-100px);
        opacity: 1;
        transition: all 0.5s ease;
      }
      .right {
        transform: translateX(100px);
        opacity: 1;
        transition: all 0.5s ease;
      }
    }
  }
  .test-2 {
    position: relative;
    width: 50%;
    height: 200px;
    overflow: hidden;
    margin: 0 auto;
    .canvas-test {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .test-3 {
    height: 300px;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
    }
    .img-1 {
      object-fit: fill;
    }
    .img-2 {
      object-fit: contain;
    }
    .img-3 {
      object-fit: cover;
    }
    .img-4 {
      object-fit: none;
    }
    .img-5 {
      object-fit: scale-down;
    }
  }
</style>
