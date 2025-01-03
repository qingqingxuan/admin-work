<template>
  <component :is="tag" :class="{ scrollbar_arco: menuMode !== 'horizontal' }">
    <a-menu
      :mode="menuMode"
      :theme="theme"
      :collapsed="menuMode === 'horizontal' ? false : appStore.isCollapse"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      @menu-item-click="onMenuClick"
      v-bind="menuProps"
    >
      <template v-for="item of menuOptions" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon || 'icon-menu'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </component>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    PropType,
    ref,
    shallowReactive,
    watch,
    watchEffect,
  } from 'vue'
  import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
  import { isExternal } from '@/utils'
  import useAppConfigStore from '@/store/modules/app-config'
  import { LayoutMode, SideTheme, ThemeMode } from '@/store/types'
  import { transfromMenu } from '@/store/help'
  import { Scrollbar } from '@arco-design/web-vue'

  export default defineComponent({
    name: 'ScrollerMenu',
    components: {
      AScrollbar: Scrollbar,
    },
    props: {
      routes: {
        type: Array as PropType<Array<RouteRecordRaw>>,
        require: true,
        default: () => [],
      },
      mode: {
        type: String as PropType<'vertical' | 'pop' | 'horizontal' | 'popButton' | undefined>,
        default: 'vertical',
      },
      menuProps: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['top-item-click'],
    setup(props, { emit }) {
      const appStore = useAppConfigStore()
      const menuOptions = shallowReactive<any[]>([])
      const defaultPath = ref<string[]>([])
      const defaultExpandKeys = ref<string[]>([])
      const menuMode = computed(() => props.mode)
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value.push(
        menuMode.value === 'vertical' ? currentRoute.fullPath : currentRoute.matched[0].path
      )
      const tag = ref(menuMode.value === 'vertical' ? 'AScrollbar' : 'div')
      const theme = computed(() => {
        if (appStore.theme === ThemeMode.DARK) {
          return 'dark'
        }
        if (appStore.layoutMode === LayoutMode.TTB) {
          return 'light'
        }
        return appStore.sideTheme === SideTheme.IMAGE
          ? 'dark'
          : appStore.sideTheme === SideTheme.WHITE
          ? 'light'
          : 'dark'
      })
      handleExpandPath()
      function handleMenu(routes?: Array<RouteRecordRaw>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function handleExpandPath() {
        const paths = currentRoute.fullPath.split('/')
        const resultPaths = paths
          .filter((it) => !!it)
          .reduce(
            (pre, cur) => {
              pre.push(pre.slice(pre.length - 1, pre.length) + '/' + cur)
              return pre
            },
            ['']
          )
        resultPaths.forEach((it) => {
          if (it && !defaultExpandKeys.value.includes(it)) {
            defaultExpandKeys.value.push(it)
          }
        })
      }
      function onMenuClick(key: string) {
        if (menuMode.value === 'horizontal') {
          emit('top-item-click', key)
          return
        }
        if (isExternal(key)) {
          window.open(key)
        } else {
          router.push(key)
          if (appStore.deviceType === 'mobile') {
            appStore.toggleCollapse(true)
          }
        }
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value.length = 0
          defaultPath.value.push(
            menuMode.value === 'vertical' ? newVal : currentRoute.matched[0].path
          )
          handleExpandPath()
        }
      )
      watch(
        () => props.mode,
        (newVal) => {
          newVal === 'vertical' ? 'AScrollbar' : 'div'
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      onMounted(() => {
        nextTick(() => {
          const items = document.querySelectorAll(
            '.arco-trigger-popup.arco-trigger-position-bl.arco-menu-pop-trigger'
          )
          items.forEach((it) => {
            it.setAttribute('style', 'width: 150px')
          })
        })
      })
      return {
        appStore,
        tag,
        theme,
        menuMode,
        defaultPath,
        defaultExpandKeys,
        menuOptions,
        onMenuClick,
      }
    },
  })
</script>

<style lang="less">
  :deep(.arco-menu-collapsed) {
    margin: 0 auto;
  }
  :deep(.arco-menu-vertical .arco-menu-item) {
    max-height: 40px;
  }
  .scrollbar_arco {
    height: calc(100vh - @logoHeight) !important;
    overflow-y: auto;
  }
</style>
