<template>
  <router-view v-slot="{ Component }">
    <transition :name="pageAnim + '-transform'" mode="out-in" appear>
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { defineComponent } from 'vue'
  import store from '../store'
  export default defineComponent({
    name: 'Main',
    setup() {
      const appConfig = useAppConfigStore()
      return {
        pageAnim: appConfig.pageAnim,
      }
    },
    data() {
      return {
        state: store.state,
      }
    },
    computed: {
      cachedViews() {
        return (this as any).state.cachedView.map((it: string) => it)
      },
    },
  })
</script>
