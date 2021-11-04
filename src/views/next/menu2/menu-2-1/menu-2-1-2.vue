<template>
  <n-card title="此页面没有进行缓存，输入内容后，再重新进入页面后输入的内容会消失">
    <n-input v-model:value="content" placeholder="请输入信息" />
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Menu212',
    setup() {
      const content = ref('')
      return {
        content,
      }
    },
  })
</script>
