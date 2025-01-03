<template>
  <div
    class="vaw-side-bar-wrapper"
    :style="{ borderRadius: '0px', marginTop: appStore.layoutMode === 'ttb' ? '48px' : 0 }"
    :class="[!appStore.isCollapse ? 'open-status' : 'close-status', bgColor]"
  >
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <ScrollerMenu :routes="permissionStore.getPermissionSideBar" />
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import usePermissionStore from '@/store/modules/permission'
  import { SideTheme } from '@/store/types'
  import { computed, defineComponent } from 'vue'
  export default defineComponent({
    name: 'SideBar',
    props: {
      showLogo: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const permissionStore = usePermissionStore()
      const appStore = useAppConfigStore()
      const bgColor = computed(() => {
        if (appStore.sideTheme === SideTheme.IMAGE) {
          return 'sidebar-bg-img'
        } else if (appStore.sideTheme === SideTheme.DARK) {
          return 'sidebar-bg-dark'
        } else {
          return 'sidebar-bg-light'
        }
      })
      return {
        appStore,
        permissionStore,
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
    :deep(
        .arco-menu-dark .arco-menu-item:hover,
        .arco-menu-dark .arco-menu-group-title:hover,
        .arco-menu-dark .arco-menu-pop-header:hover,
        .arco-menu-dark .arco-menu-inline-header:hover
      ) {
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
      background-color: rgba(var(--primary-6), 0.3);
      & .arco-menu-icon {
        color: var(--color-white) !important;
        & .arco-icon {
          color: currentColor !important;
        }
      }
    }
    :deep(
        .arco-menu-dark .arco-menu-item:hover,
        .arco-menu-dark .arco-menu-group-title:hover,
        .arco-menu-dark .arco-menu-pop-header:hover,
        .arco-menu-dark .arco-menu-inline-header:hover
      ) {
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
  .vaw-side-bar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    z-index: 999;
    .vaw-menu-wrapper {
      overflow-x: hidden;
      color: white;
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
