<template>
  <div>
    <n-grid cols="xs:2 s:3 m:4 l:6 xl:8" class="icon-parent" responsive="screen">
      <n-grid-item v-for="item of tempIcon" :key="item">
        <div class="flex flex-col items-center justify-center icon-wrapper">
          <n-icon size="30">
            <component :is="item" />
          </n-icon>
          <div class="mt-2 text-xs text-center">{{ item }}</div>
          <div class="text-center copy" @click="onCopy(item)"> 复制 </div>
        </div>
      </n-grid-item>
    </n-grid>
    <div class="text-center">
      <n-button type="text" @click="onLoadMore">加载更多</n-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import * as AllIcons from '@vicons/ionicons5'
  import { useMessage } from 'naive-ui'

  export default defineComponent({
    name: 'XIcons',
    components: AllIcons,
    setup() {
      const loading = ref(false)
      const message = useMessage()
      const iconArray = Object.keys(AllIcons)
      const onCopy = (item: string) => {
        message.success('复制成功:' + item)
      }
      let index = 0
      const size = 50
      const tempIcon = reactive([] as string[])
      tempIcon.push(...iconArray.slice(index, size))
      function onLoadMore() {
        if (tempIcon.length >= iconArray.length) {
          message.success('没有更多了')
          return
        }
        index++
        tempIcon.push(...iconArray.slice(index * size, index * size + size))
      }
      return {
        loading,
        iconArray,
        tempIcon,
        onCopy,
        onLoadMore,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .icon-parent {
    border-top: 1px solid #f7f7f7;
    border-left: 1px solid #f7f7f7;
    .icon-wrapper {
      position: relative;
      height: 100px;
      border-right: 1px solid #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
      overflow: hidden;
      padding-bottom: 0;
      transition: padding-bottom 0.2s ease-in-out;
      &:hover {
        color: #409eff;
        box-shadow: 0 0 10px #f0f0f0;
        padding-bottom: 22px;
        transition: padding-bottom 0.2s ease-in-out;
        .copy {
          cursor: pointer;
          transform: translateY(0);
          transition: transform 0.2s ease-in-out;
        }
      }
      .copy {
        position: absolute;
        background-color: #409eff;
        padding: 5px 0;
        color: #fff;
        font-size: 12px;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
</style>
