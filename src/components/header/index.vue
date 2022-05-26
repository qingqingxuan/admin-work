<template>
  <div class="vaw-header-layout">
    <div class="logo-wrapper">
      <Logo :always-show="true" />
    </div>
    <div style="flex: 1; overflow: hidden; padding: 0 10px">
      <HorizontalScrollerMenu :routes="permissionStore.getPermissionSideBar" />
    </div>
    <div v-if="appConfig.deviceType !== 'mobile'" class="right-wrapper">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import usePermissionStore from '@/store/modules/permission'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'VAWHeader',
    setup() {
      const appConfig = useAppConfigStore()
      const permissionStore = usePermissionStore()
      return {
        permissionStore,
        appConfig,
      }
    },
  })
</script>

<style scoped lang="scss">
  .vaw-header-layout {
    height: $logoHeight;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);
    .logo-wrapper {
      width: calc(#{$menuWidth} / 3 * 2);
    }
    .menu-wrapper {
      flex: 1;
      overflow: hidden;
    }
    .right-wrapper {
      height: 100%;
    }
    .avatar-wrapper {
      padding-right: 15px;
    }
  }
</style>
