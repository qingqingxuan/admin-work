<template>
  <div class="vaw-nav-bar-wrapper">
    <Humburger />
    <Breadcrumb v-if="appConfig.deviceType !== 'mobile'" />
    <div style="flex: 1"></div>
    <div class="right-wrapper" v-if="appConfig.deviceType !== 'mobile'">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'NavBar',
    setup() {
      const appConfig = useAppConfigStore()
      return {
        appConfig,
      }
    },
  })
</script>

<style scoped lang="scss">
  .vaw-nav-bar-wrapper {
    height: $logoHeight;
    max-height: $logoHeight;
    min-height: $logoHeight;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    .avatar-wrapper {
      padding-right: 15px;
    }
    .right-wrapper {
      height: 100%;
    }
  }
</style>
