<template>
  <div
    class="vaw-layout-container"
    :class="[appStore.deviceType === 'mobile' && 'is-mobile', appStore.theme]"
  >
    <template v-if="appStore.layoutMode === 'ttb'">
      <Header />
      <InnerSideBar />
      <MainLayout :show-nav-bar="false" />
    </template>
    <template v-else-if="appStore.layoutMode === 'lcr'">
      <TabSplitSideBar />
      <MainLayout />
    </template>
    <template v-else>
      <SideBar />
      <MainLayout />
    </template>
    <div
      v-if="appStore.deviceType === 'mobile'"
      class="mobile-shadow"
      :class="[appStore.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
  </div>
  <Setting ref="settingRef" />
  <SearchContent ref="searchContentRef" />
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
  import useEmit from '@/hooks/useEmit'
  import { AxiosResponse } from 'axios'
  import UserTokenExpiredInterceptor from '@/api/interceptors/UserTokenExpiredInterceptor'
  import useAxios from '@/hooks/useAxios'
  import useAppConfigStore from '@/store/modules/app-config'
  import { useChangeMenuWidth } from '@/hooks/useMenuWidth'
  import usePrimaryColor from '@/hooks/usePrimaryColor'
  import useTheme from '@/hooks/useTheme'
  import { DeviceType } from '@/store/types'
  import CustomRequestInterceptor from '@/api/interceptors/CustomRequestInterceptor'
  export default defineComponent({
    name: 'Layout',
    setup() {
      const settingRef = ref()
      const searchContentRef = ref()
      const appStore = useAppConfigStore()
      useTheme(appStore.theme as 'light' | 'dark')
      useChangeMenuWidth(appStore.sideWidth)
      usePrimaryColor(appStore.themeColor)
      const emitter = useEmit()
      const axios = useAxios()
      axios.interceptors.request.use((config) => {
        return CustomRequestInterceptor(config)
      })
      axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
        return UserTokenExpiredInterceptor(response)
      })
      emitter?.on('show-setting', () => {
        settingRef.value?.openDrawer()
      })
      emitter?.on('show-search', () => {
        searchContentRef.value?.show()
      })
      onMounted(() => {
        handleScreenResize()
        window.addEventListener('resize', handleScreenResize)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleScreenResize)
      })
      function handleScreenResize() {
        const width = document.body.clientWidth
        if (width <= 768) {
          appStore.changeDevice(DeviceType.MOBILE)
          appStore.toggleCollapse(true)
        } else if (width < 992 && width > 768) {
          appStore.changeDevice(DeviceType.PAD)
          appStore.toggleCollapse(true)
        } else if (width < 1200 && width >= 992) {
          appStore.changeDevice(DeviceType.PC)
          appStore.toggleCollapse(false)
        } else {
          appStore.changeDevice(DeviceType.PC)
          appStore.toggleCollapse(false)
        }
      }
      function closeMenu() {
        appStore.toggleCollapse(true)
      }
      return {
        settingRef,
        searchContentRef,
        appStore,
        closeMenu,
      }
    },
  })
</script>

<style lang="less">
  .vaw-layout-container {
    height: 100%;
    max-width: 100%;
    position: relative;
    overflow-x: hidden;
    .mobile-shadow {
      display: none;
    }
    .layout-mode-ttb {
      margin-top: @logoHeight;
      transition: all @transitionTime;
    }
  }
  .is-mobile {
    .mobile-shadow {
      background-color: #000000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 997;
    }
    .close-shadow {
      display: none;
    }
    .show-shadow {
      display: block;
      opacity: 0.5;
      transition: all @transitionTime;
    }
  }
</style>
