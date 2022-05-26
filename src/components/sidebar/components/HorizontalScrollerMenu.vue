<template>
  <n-scrollbar :x-scrollable="true">
    <n-menu
      mode="horizontal"
      :value="defaultPath"
      :options="menuOptions"
      :default-value="defaultPath"
      @update:value="onMenuClick"
    />
  </n-scrollbar>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { DeviceType } from '@/store/types'
  import type { MenuOption } from 'naive-ui'
  import { defineComponent, PropType, ref, shallowReactive, watch, watchEffect } from 'vue'
  import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
  import { isExternal } from '@/utils'
  import { transfromMenu } from '@/store/help'

  export default defineComponent({
    name: 'HorizontalScrollerMenu',
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordRaw>>,
        require: true,
      },
    },
    setup(props) {
      const appConfig = useAppConfigStore()
      const menuOptions = shallowReactive<Array<MenuOption>>([])
      const defaultPath = ref('')
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value = currentRoute.fullPath
      function handleMenu(routes?: Array<RouteRecordRaw>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function onMenuClick(key: string) {
        if (isExternal(key)) return
        router.push(key)
        if (appConfig.deviceType === DeviceType.MOBILE) {
          appConfig.toggleCollapse(true)
        }
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value = newVal
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      return {
        defaultPath,
        menuOptions,
        onMenuClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.n-menu-item-content__icon) {
    font-size: 16px !important;
  }
  :deep(.n-menu .n-menu-item) {
    margin-top: 0;
    // margin-bottom: 5px;
  }
  :deep(.n-menu .n-menu-item::before) {
    left: 0;
    right: 0;
    border-radius: 3px;
    margin: 0 5px;
  }
  :deep(.n-menu-item-content-header) {
    overflow: inherit !important;
  }
</style>
