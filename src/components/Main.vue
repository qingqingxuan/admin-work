<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="pageAnim + '-transform'" mode="out-in" appear>
      <keep-alive :include="cachedRouteStore.getCachedRouteName">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import useCachedRouteStore from '@/store/modules/cached-routes'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Main',
    setup() {
      const appConfig = useAppConfigStore()
      const cachedRouteStore = useCachedRouteStore()
      return {
        pageAnim: appConfig.pageAnim,
        cachedRouteStore,
      }
    },
  })
</script>
