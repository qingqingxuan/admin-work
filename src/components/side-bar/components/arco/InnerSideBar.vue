<template>
  <div
    class="vaw-inner-side-bar-wrapper"
    :style="{ borderRadius: '0px' }"
    :class="[!appStore.isCollapse ? 'open-status' : 'close-status', bgColor]"
  >
    <ScrollerMenu :routes="routes" />
    <div class="humburger-wrapper">
      <Humburger />
    </div>
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import usePermissionStore from '@/store/modules/permission'
  import { SideTheme, ThemeMode } from '@/store/types'
  import { computed, defineComponent, ref, watch } from 'vue'
  import { RouteRecordRaw, useRoute } from 'vue-router'
  export default defineComponent({
    name: 'InnerSideBar',
    setup() {
      const permissionStore = usePermissionStore()
      const appStore = useAppConfigStore()
      const route = useRoute()
      const routes = ref<RouteRecordRaw[]>([])
      const bgColor = computed(() => {
        if (appStore.layoutMode !== 'ttb') {
          if (appStore.sideTheme === SideTheme.IMAGE) {
            return 'sidebar-bg-img'
          } else if (appStore.sideTheme === SideTheme.DARK) {
            return 'sidebar-bg-dark'
          } else {
            return 'sidebar-bg-light'
          }
        } else {
          return appStore.theme === ThemeMode.DARK ? 'sidebar-bg-dark' : 'sidebar-bg-light'
        }
      })
      watch(
        () => route.fullPath,
        () => {
          const firstMatchPath = route.matched[0].path
          const item = permissionStore.getPermissionSideBar.find((it) => it.path === firstMatchPath)
          routes.value = item?.children || []
        },
        {
          immediate: true,
        }
      )
      return {
        appStore,
        permissionStore,
        routes,
        bgColor,
      }
    },
  })
</script>

<style scoped lang="less">
  .sidebar-bg-img {
    background-image: url('../../assets/bg_img.webp') !important;
    background-size: cover;
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
    :deep(.arco-menu) {
      background-color: transparent !important;
    }
    :deep(.arco-menu-inline-header) {
      background-color: transparent !important;
    }
    :deep(.arco-menu-dark .arco-menu-pop-header) {
      background-color: transparent !important;
    }
    :deep(.arco-menu-item) {
      background-color: transparent !important;
    }
    :deep(.arco-menu-dark .arco-menu-item.arco-menu-selected) {
      color: rgb(var(--primary-6));
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-item:hover, .arco-menu-dark
        .arco-menu-group-title:hover, .arco-menu-dark .arco-menu-pop-header:hover, .arco-menu-dark
        .arco-menu-inline-header:hover) {
      color: rgb(var(--primary-6)) !important;
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-inline-header:hover) {
      color: rgb(var(--primary-6)) !important;
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-pop-header:hover) {
      color: rgb(var(--primary-6)) !important;
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
  }
  .sidebar-bg-dark {
    background-color: var(--color-menu-dark-bg);
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
    :deep(.arco-menu-dark .arco-menu-item.arco-menu-selected) {
      color: var(--color-white);
      background-color: rgb(var(--primary-6));
      & .arco-menu-icon {
        color: var(--color-white) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-item:hover, .arco-menu-dark
        .arco-menu-group-title:hover, .arco-menu-dark .arco-menu-pop-header:hover, .arco-menu-dark
        .arco-menu-inline-header:hover) {
      color: var(--color-white) !important;
      & .arco-menu-icon {
        color: var(--color-white) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-inline-header:hover) {
      color: rgb(var(--primary-6)) !important;
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(.arco-menu-dark .arco-menu-pop-header:hover) {
      color: rgb(var(--primary-6)) !important;
      & .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
  }
  .sidebar-bg-light {
    background-color: #fff;
    :deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
      position: relative;
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        display: block;
        border-radius: 3px;
        width: 3px;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }
    }
  }
  .open-status {
    width: @menuWidth;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
    transition: all @transitionTime;
  }
  .close-status {
    width: @minMenuWidth;
    box-shadow: none;
    transition: all @transitionTime;
  }
  .vaw-inner-side-bar-wrapper {
    position: absolute;
    top: @logoHeight;
    left: 0;
    overflow-x: hidden;
    bottom: 0;
    box-sizing: border-box;
    z-index: 999;
    .vaw-menu-wrapper {
      overflow-x: hidden;
      color: white;
    }
    .humburger-wrapper {
      position: absolute;
      bottom: 5%;
      right: 2%;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: var(--color-neutral-2);
      color: var(--color-text-1);
    }
  }
  .is-mobile {
    .open-status {
      width: @menuWidth;
      transform: translateX(0);
      transition: transform @transitionTime;
    }
    .close-status {
      width: @menuWidth;
      @negativeMenuWidth: calc(@menuWidth * -1);
      transform: translateX(@negativeMenuWidth);
      transition: transform @transitionTime;
      box-shadow: none;
    }
  }
</style>
