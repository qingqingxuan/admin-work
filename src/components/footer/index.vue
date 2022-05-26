<template>
  <n-card class="footer-container"> Copyright © {{ projectName }} 2022 </n-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { projectName } from '../../setting'

  export default defineComponent({
    name: 'Footer',
    setup() {
      return {
        projectName,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .footer-container {
    height: $footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px dashed var(--border-color);
  }
</style>
