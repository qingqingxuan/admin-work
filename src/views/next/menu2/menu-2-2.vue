<template>
  <n-card title="缓存信息">
    <n-input v-model:value="content" placeholder="请输入信息" />
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Menu22',
    setup() {
      const content = ref('')
      return {
        content,
      }
    },
  })
</script>
