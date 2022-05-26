<template>
  <div class="scrollbar">
    <n-scrollbar>
      <n-menu
        mode="vertical"
        :value="defaultPath"
        :collapsed="appConfig.isCollapse"
        :options="menuOptions"
        :default-value="defaultPath"
        :expanded-keys="defaultExpandKeys"
        :collapsed-icon-size="22"
        :collapsed-width="63"
        :indent="15"
        @update:value="onMenuClick"
        @update:expanded-keys="onMenuExpandedKeysClick"
      />
    </n-scrollbar>
  </div>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { DeviceType } from '@/store/types'
  import type { MenuOption } from 'naive-ui'
  import { defineComponent, PropType, ref, shallowReactive, watch, watchEffect } from 'vue'
  import { RouteRecordNormalized, useRoute, useRouter } from 'vue-router'
  import { isExternal } from '@/utils'
  import { transfromMenu } from '@/store/help'

  export default defineComponent({
    name: 'ScrollerMenu',
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordNormalized>>,
        require: true,
      },
    },
    setup(props) {
      const appConfig = useAppConfigStore()
      const menuOptions = shallowReactive([] as Array<MenuOption>)
      const defaultPath = ref('')
      const defaultExpandKeys = ref<Array<string>>([])
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value = currentRoute.fullPath
      handleExpandPath()
      function handleMenu(routes?: Array<RouteRecordNormalized>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function handleExpandPath() {
        const keys = defaultPath.value.split('/')
        const results = keys
          .filter((it) => !!it)
          .reduce((pre, cur) => {
            const lastItem = pre[pre.length - 1]
            if (!lastItem) {
              pre.push('/' + cur)
            } else {
              pre.push(lastItem + '/' + cur)
            }
            return pre
          }, [] as string[])
        defaultExpandKeys.value = Array.from(new Set([...defaultExpandKeys.value, ...results]))
      }
      function onMenuClick(key: string) {
        if (isExternal(key)) return
        router.push(key)
        if (appConfig.deviceType === DeviceType.MOBILE) {
          appConfig.toggleCollapse(true)
        }
      }
      function onMenuExpandedKeysClick(keys: string[]) {
        defaultExpandKeys.value = keys
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value = newVal
          handleExpandPath()
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      return {
        defaultPath,
        defaultExpandKeys,
        appConfig,
        menuOptions,
        onMenuClick,
        onMenuExpandedKeysClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.n-menu .n-submenu .n-menu-item-content__icon) {
    font-size: 16px !important;
  }
  :deep(.n-menu .n-menu-item-content .n-menu-item-content__icon) {
    font-size: 16px !important;
  }
  :deep(.n-menu .n-menu-item) {
    margin-top: 0;
    margin-bottom: 5px;
  }
  :deep(.n-menu .n-menu-item::before) {
    left: 5px;
    right: 5px;
    border-radius: 5px;
  }
  :deep(.n-menu .n-menu-item:hover) {
    background-color: var(--item-color-active);
  }
  .scrollbar {
    height: calc(100vh - #{$logoHeight}) !important;
  }
</style>
