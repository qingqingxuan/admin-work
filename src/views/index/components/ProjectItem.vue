<template>
  <n-card class="item-container" :bordered="false" hoverable>
    <div class="info-wrapper">
      <span class="title">
        {{ item.title }}
      </span>
      <div class="ui-com">{{ item.ui }}</div>
      <div class="mt-1">
        <n-button class="mr-1" secondary round type="error" size="tiny" @click="preView"
          >预览地址</n-button
        >
        <n-button secondary round type="success" size="tiny" @click="gitee">项目地址</n-button>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRef } from 'vue'
  interface ItemData {
    title: string
    gitee: string
    target?: string
    ui?: string
  }

  export default defineComponent({
    name: 'ProjectItem',
    props: {
      item: {
        type: Object as PropType<ItemData>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const item = toRef(props, 'item')
      return {
        gitee: function () {
          window.open(item.value.gitee)
        },
        preView: function () {
          window.open(item.value.target)
        },
      }
    },
  })
</script>

<style lang="scss" scoped>
  .item-container {
    position: relative;
    width: 100%;
    height: 7rem;
    z-index: 0;
    border-radius: 10px;
    cursor: pointer;
    .info-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 2;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-shadow: 0px 0px 5px var(--primary-color), 0px 0px 15px var(--primary-color),
        0px 0px 25px var(--primary-color);
      .ui-com {
        margin: 10px 0;
        font-size: 12px;
        text-shadow: none;
        color: var(--n-text-color);
      }
    }
  }
</style>
