<template>
  <div class="flex mt-4 ml-4 item-container">
    <n-avatar circle :src="item.avatar" />
    <div class="flex flex-col justify-between ml-4">
      <div class="text-sm">
        <slot name="title" :title="item.title"></slot>
      </div>
      <div class="mt-1 text-xs text-gray-500">一小时前</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TrendsItem',
    props: {
      item: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
  })
</script>
