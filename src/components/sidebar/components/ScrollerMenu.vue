<template>
  <div class="scrollbar">
    <n-scrollbar>
      <n-menu
        mode="vertical"
        :value="defaultPath"
        :collapsed="state.isCollapse"
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
  import type { MenuOption } from 'naive-ui'
  import {
    defineComponent,
    onMounted,
    PropType,
    reactive,
    ref,
    shallowReactive,
    watch,
    watchEffect,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from '../../../components/index'
  import { RouteRecordRawWithHidden } from '../../../types/store'
  import { isExternal, transfromMenu } from '../../../utils'

  export default defineComponent({
    name: 'ScrollerMenu',
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordRawWithHidden>>,
        require: true,
      },
    },
    setup(props) {
      const store = useLayoutStore()
      const menuOptions = shallowReactive([] as Array<MenuOption>)
      const defaultPath = ref('')
      const defaultExpandKeys = reactive([] as Array<string>)
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value = currentRoute.fullPath
      handleExpandPath()
      onMounted(() => {
        handleMenu(props.routes)
      })
      function handleMenu(routes?: Array<RouteRecordRawWithHidden>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function handleExpandPath() {
        const keys = defaultPath.value.split('/')
        // defaultExpandKeys.length = 0
        keys.forEach((it) => {
          if (!defaultExpandKeys.includes('/' + it)) {
            defaultExpandKeys.push('/' + it)
          }
        })
      }
      function onMenuClick(key: string) {
        if (isExternal(key)) return
        router.push(key)
        if (store.state.device === 'mobile') {
          store.toggleCollapse(true)
        }
      }
      function onMenuExpandedKeysClick(keys: string[]) {
        defaultExpandKeys.length = 0
        keys.forEach((it) => {
          defaultExpandKeys.push(it)
        })
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
        state: store?.state,
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
    left: 0;
    right: 0;
    border-radius: 0;
  }
  :deep(.n-menu .n-menu-item:hover) {
    background-color: var(--item-color-active);
  }
  @import '../../../assets/styles/variables.scss';
  .scrollbar {
    height: calc(100vh - #{$logoHeight}) !important;
  }
</style>
