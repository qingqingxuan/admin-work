<template>
  <a-card class="footer-container" :bordered="false"> Copyright © {{ projectName }} {{new Date().getFullYear()}} </a-card>
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

<style lang="less" scoped>
  .footer-container {
    height: @footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
</style>
