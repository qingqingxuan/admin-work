<template>
  <div
    class="vaw-main-layout-container scrollbar"
    :class="[
      !state.isCollapse ? 'main-layout-open-status' : 'main-layout-close-status',
      state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
    ]"
  >
    <section
      :class="[
        !state.isCollapse ? 'nav-bar-open-status' : 'nav-bar-close-status',
        state.isFixedNavBar ? 'fixed-nav-bar' : '',
        !showNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="showNavBar" />
      <TabBar :show-humburger="isShowHeader" />
    </section>
    <div
      class="main-base-style scrollbar"
      :class="[state.theme === 'light' ? 'main-base-light-theme' : 'main-base-dark-theme']"
    >
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
  import { useLoadingBar } from 'naive-ui'
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useLayoutStore, useTitle } from './index'
  export default defineComponent({
    name: 'MainLayout',
    props: {
      showNavBar: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const store = useLayoutStore()
      const listenTo1 = ref<HTMLElement | null>(null)
      const listenTo2 = ref<HTMLElement | null>(null)
      const isShowHeader = computed(() => store?.isShowHeader())
      const router = useRouter()
      const route = useRoute()
      useTitle(route.meta.title as string)
      const loadingBar = useLoadingBar()
      router.beforeEach(() => {
        useTitle(route.meta.title as string)
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
        state: store?.state,
        listenTo1,
        listenTo2,
        isShowHeader,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  .scrollbar::-webkit-scrollbar {
    width: 0;
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
      min-height: calc(100% - #{$footerHeight} - 5px);
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
