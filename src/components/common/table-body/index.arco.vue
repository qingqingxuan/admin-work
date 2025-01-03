<template>
  <a-card :bodyStyle="{ padding: '0 10px' }" :bordered="false">
    <slot name="header"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'TableBody',
  })
</script>
