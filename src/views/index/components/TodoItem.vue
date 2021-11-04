<template>
  <div class="wating-item-action">
    <div class="flex items-center item-header-wrapper">
      <div class="flex items-center justify-center item-header" :style="headerStyle">
        {{ firstChar }}
      </div>
      <div class="flex-1 item-time">{{ item?.time }}</div>
    </div>
    <div class="mt-4 item-content">{{ item?.content }}</div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from '@vue/runtime-core'

  export default defineComponent({
    name: 'TodoItem',
    props: {
      item: {
        type: Object,
      },
    },
    setup(props) {
      const firstChar = computed(() => {
        return (props.item as any).content.substring(0, 1)
      })
      return {
        firstChar,
        headerStyle: {
          backgroundColor: (props.item as any).bgColor,
        },
      }
    },
  })
</script>

<style lang="scss" scoped>
  .wating-item-action {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .item-header-wrapper {
      .item-header {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
      }
      .item-time {
        color: #888;
        margin-left: 10px;
      }
    }
    .item-content {
      color: #4e4e4e;
      line-height: 18px;
    }
  }
  div.wating-item-action:last-child {
    border-bottom: 0;
  }
</style>
