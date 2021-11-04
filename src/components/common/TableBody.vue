<template>
  <n-card :content-style="{ padding: 0 }">
    <slot name="default"></slot>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'TableBody',
  })
</script>
