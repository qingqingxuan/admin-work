<template>
  <span
    class="fold-wrapper iconfont"
    :class="[appConfig.isCollapse ? 'fold-close-status' : 'fold-open-status']"
    @click="toggleFold"
  >
    <SvgIcon name="expand" />
  </span>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Humburger',
    setup() {
      const appConfig = useAppConfigStore()
      function toggleFold() {
        appConfig.toggleCollapse(!appConfig.isCollapse)
      }
      return {
        appConfig,
        toggleFold,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .fold-open-status {
    transform: rotate(180deg);
  }
  .fold-close-status {
    transform: rotate(0);
  }
  .fold-wrapper {
    box-sizing: border-box;
    display: inline-block;
    line-height: $logoHeight;
    text-align: center;
    padding: 0 10px;
    font-size: 22px;
    transition: transform $transitionTime;
  }
  .fold-wrapper:hover {
    color: #999999;
    cursor: pointer;
  }
</style>
