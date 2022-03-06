<template>
  <n-card class="table-body-container" :content-style="{ padding: '10px' }">
    <slot name="header"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'TableBody',
  })
</script>
