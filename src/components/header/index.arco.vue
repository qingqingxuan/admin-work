<template>
  <div class="vaw-header-layout">
    <div class="logo-wrapper">
      <Logo :always-show="true" />
    </div>
    <div class="menu-wrapper">
      <ScrollerMenu
        :routes="permissionStore.getTopLevelTabs"
        mode="horizontal"
        @top-item-click="onTopItemClick"
      />
    </div>
    <a-card
      class="right-wrapper"
      :body-style="{ padding: 0, height: '100%' }"
      :header-style="{ padding: 0 }"
      :bordered="false"
    >
      <div class="flex justify-end items-center h-full">
        <template v-if="appStore.deviceType !== 'mobile'">
          <Actions />
        </template>
        <div class="avatar-wrapper">
          <Avatar />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import usePermissionStore from '@/store/modules/permission'
  import { defineComponent } from 'vue'
  import { RouteRecordRaw, useRouter } from 'vue-router'
  export default defineComponent({
    name: 'VAWHeader',
    setup() {
      const router = useRouter()
      const appStore = useAppConfigStore()
      const permissionStore = usePermissionStore()
      function handlePath(routes: RouteRecordRaw[]) {
        for (let index = 0; index < routes.length; index++) {
          const it = routes[index]
          if (it.children && it.children.length > 0) {
            handlePath(it.children)
          } else {
            router.push(it.path)
          }
          break
        }
      }
      function onTopItemClick(key: string) {
        handlePath(permissionStore.getTopLevelTabs.find((it) => it.path === key)?.items || [])
      }
      return {
        permissionStore,
        appStore,
        onTopItemClick,
      }
    },
  })
</script>

<style scoped lang="less">
  .vaw-header-layout {
    height: @logoHeight;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    .logo-wrapper {
      width: @menuWidth;
    }
    .menu-wrapper {
      flex: 1;
      overflow: hidden;
      :deep(.arco-menu-horizontal) {
        height: 47px;
        width: 100%;
      }
      :deep(.arco-menu-horizontal .arco-menu-inner) {
        overflow: hidden;
        padding: 9px 10px 8px 10px;
      }
      :deep(.arco-menu-selected-label) {
        bottom: -8px;
        height: 2px;
      }
    }
    .right-wrapper {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .avatar-wrapper {
        padding-right: 15px;
        margin-left: 10px;
      }
    }
  }
</style>
