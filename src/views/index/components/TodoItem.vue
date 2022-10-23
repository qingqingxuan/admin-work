<template>
  <div class="wating-item-action">
    <div class="flex items-center item-header-wrapper">
      <n-avatar round>{{ firstChar }}</n-avatar>
      <div class="ml-2 title">{{ item?.name }}</div>
      <div class="flex-1"></div>
      <div class="item-time">{{ item?.time }}</div>
    </div>
    <div class="ml-10 item-content">{{ item?.content }}</div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TodoItem',
    props: {
      item: {
        type: Object,
      },
    },
    setup(props) {
      const firstChar = computed(() => {
        return (props.item as any).name.substring(0, 1)
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
    padding: 5px;
    margin-bottom: 5px;
    .item-header-wrapper {
      .title {
        color: var(--text-color);
        font-weight: bold;
        font-size: 14px;
      }
      .item-header {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
      }
      .item-time {
        color: #666;
        margin-left: 10px;
      }
    }
    .item-content {
      color: #707070;
      line-height: 18px;
    }
  }
  div.wating-item-action:last-child {
    border-bottom: 0;
  }
</style>
