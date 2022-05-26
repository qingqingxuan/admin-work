<template>
  <div
    class="vaw-main-layout-container scrollbar"
    :class="[
      layoutMode === 'ttb'
        ? 'main-layout-ttb-status'
        : !appConfig.isCollapse
        ? 'main-layout-open-status'
        : 'main-layout-close-status',
      appConfig.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
    ]"
  >
    <section
      :class="[
        layoutMode === 'ttb'
          ? 'nav-bar-ttb-status'
          : !appConfig.isCollapse
          ? 'nav-bar-open-status'
          : 'nav-bar-close-status',
        appConfig.isFixedNavBar ? 'fixed-nav-bar' : '',
        !showNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="showNavBar" />
      <TabBar />
    </section>
    <div class="main-base-style scrollbar" :class="[mainClass]">
      <section class="main-section">
        <Main />
      </section>
      <section class="footer-wrapper">
        <Footer />
      </section>
      <n-back-top :listen-to="listenTo1" />
    </div>
    <n-back-top :listen-to="listenTo2" />
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { ThemeMode } from '@/store/types'
  import { useLoadingBar } from 'naive-ui'
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'MainLayout',
    props: {
      showNavBar: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const appConfig = useAppConfigStore()
      const listenTo1 = ref<HTMLElement | null>(null)
      const listenTo2 = ref<HTMLElement | null>(null)
      const mainClass = computed(() => {
        return appConfig.theme === ThemeMode.DARK ? 'main-base-dark-theme' : 'main-base-light-theme'
      })
      const layoutMode = computed(() => {
        return appConfig.getLayoutMode
      })
      const router = useRouter()
      const loadingBar = useLoadingBar()
      router.beforeEach(() => {
        loadingBar?.start()
      })
      router.afterEach(() => {
        loadingBar?.finish()
      })
      onMounted(() => {
        listenTo1.value = document.querySelector('.main-base-style')
        listenTo2.value = document.querySelector('.vaw-main-layout-container')
      })
      return {
        appConfig,
        mainClass,
        layoutMode,
        listenTo1,
        listenTo2,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .scrollbar::-webkit-scrollbar {
    width: 0;
  }
  .main-layout-ttb-status {
    margin-left: 0;
  }
  .main-layout-open-status {
    margin-left: $menuWidth;
  }
  .main-layout-close-status {
    margin-left: $minMenuWidth;
  }
  .nav-bar-open-status.fixed-nav-bar {
    width: calc(100% - #{$menuWidth});
  }
  .nav-bar-close-status.fixed-nav-bar {
    width: calc(100% - #{$minMenuWidth});
  }

  .nav-bar-ttb-status {
    width: 100%;
  }

  .main-layout {
    padding-top: 0;
    overflow-y: auto;
  }
  .main-layout_fixed-nav-bar {
    padding-top: $logoHeight + $tabHeight;
    overflow-y: hidden;
    .main-base-style {
      overflow-y: auto;
    }
  }

  .vaw-main-layout-container {
    height: 100%;
    box-sizing: border-box;
    transition: margin-left $transitionTime;
    .main-base-style {
      height: 100%;
      box-sizing: border-box;
      padding: 5px;
    }
    .main-base-light-theme {
      background-color: #f0f2f5;
    }
    .main-base-dark-theme {
      background-color: #333333;
    }
    .main-section {
      min-height: calc(100% - #{$footerHeight} - 10px);
      overflow-x: hidden;
    }
    .fixed-nav-bar {
      position: fixed;
      top: 0;
      transition: width $transitionTime;
      z-index: 99;
    }
    .tab-bar-top {
      padding-top: $logoHeight;
    }
  }
  .footer-wrapper {
    margin-top: 6px;
  }
  .is-mobile {
    .main-layout-open-status,
    .main-layout-close-status {
      margin-left: 0;
      transition: none;
    }
    .nav-bar-open-status,
    .nav-bar-close-status {
      width: 100%;
    }
  }
</style>
