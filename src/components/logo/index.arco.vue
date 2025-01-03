<template>
  <div class="logo-wrapper" :style="{ 'background-color': bgColor }">
    <img v-if="showLogo" class="logo-img" src="../../assets/logo.png" />
    <div
      v-if="showTitle"
      :class="[!appStore.isCollapse || alwaysShow ? 'show-title' : 'close-title']"
    >
      <span class="logo-title">{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { projectName } from '../../setting'
  import useAppConfigStore from '@/store/modules/app-config'
  import { SideTheme, ThemeMode } from '@/store/types'
  export default defineComponent({
    name: 'Logo',
    props: {
      showTitle: {
        type: Boolean,
        default: true,
      },
      showLogo: {
        type: Boolean,
        default: true,
      },
      alwaysShow: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const appStore = useAppConfigStore()
      const bgColor = computed(() => {
        if (appStore.layoutMode !== 'ttb') {
          if (appStore.sideTheme === SideTheme.DARK) {
            return 'var(--color-menu-dark-bg)'
          }
          if (appStore.sideTheme === SideTheme.WHITE) {
            return appStore.sideTheme === SideTheme.WHITE
              ? 'var(--color-white)'
              : appStore.sideTheme === SideTheme.DARK
              ? 'var(--color-menu-dark-bg)'
              : 'transparent'
          }
          return 'transparent'
        } else {
          return appStore.theme === ThemeMode.DARK
            ? 'var(--color-menu-dark-bg)'
            : 'var(--color-white)'
        }
      })
      return {
        appStore,
        projectName,
        bgColor,
      }
    },
  })
</script>
<style lang="less" scoped>
  .logo-wrapper {
    height: @logoHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-1);
    border-bottom: 1px dashed var(--color-border);
    .logo-img {
      width: 30px;
    }
    .logo-title {
      font-weight: bold;
    }
    .show-title {
      transform: scale(1);
      width: auto;
      transition: transform 0.2s ease-in;
    }
    .close-title {
      transform: scale(0);
      width: 0;
    }
  }
</style>
