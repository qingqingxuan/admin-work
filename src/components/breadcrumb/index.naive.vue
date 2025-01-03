<template>
  <n-breadcrumb>
    <transition-group name="breadcrumb">
      <n-breadcrumb-item v-for="item of breadcrumbs" :key="item.key">
        <n-dropdown
          v-if="item.children && item.children.length > 0"
          :options="item.children"
          @select="handleSelect"
        >
          <span>
            {{ item.label }}
            <n-icon>
              <ChevronDown />
            </n-icon>
          </span>
        </n-dropdown>
        <span v-else>{{ item.label }}</span>
      </n-breadcrumb-item>
    </transition-group>
  </n-breadcrumb>
</template>

<script lang="ts">
  import { isExternal } from '@/utils'
  import { defineComponent, onMounted, reactive, watch } from 'vue'
  import { RouteRecordNormalized, useRoute, useRouter } from 'vue-router'
  import { ChevronDown } from '@vicons/ionicons5'
  interface DropItem {
    label: string
    key: string
    children?: DropItem[]
  }
  export default defineComponent({
    name: 'Breadcrumb',
    components: { ChevronDown },
    setup() {
      const breadcrumbs = reactive([] as Array<DropItem>)
      const route = useRoute()
      const router = useRouter()
      function handlePath(path: string) {
        return path.split('/').reduce((pre: string[], cur: string) => {
          if (cur) {
            const lastItem = pre[pre.length - 1]
            if (lastItem) {
              pre.push(lastItem + '/' + cur)
            } else {
              pre.push('/' + cur)
            }
          }
          return pre
        }, [])
      }
      function generatorDropdown(
        routes: Array<RouteRecordNormalized> | undefined,
        parentPath = '/'
      ) {
        if (!routes) return
        const tempArray: DropItem[] = []
        routes.forEach((it) => {
          const tempItem: DropItem = {
            label: it.meta?.title as string,
            key: isExternal(it.path)
              ? it.path
              : it.path.startsWith('/')
              ? it.path
              : parentPath + '/' + it.path,
            children: [],
          }
          if (it.children && it.children.length > 0) {
            tempItem.children = generatorDropdown(
              it.children as RouteRecordNormalized[],
              tempItem.key
            )
          } else {
            delete tempItem.children
          }
          tempArray.push(tempItem)
        })
        return tempArray
      }
      function findRoute(paths: string[]) {
        const selectRoutes: Array<RouteRecordNormalized> = []
        let tempOrigin = router.getRoutes()
        paths.forEach((it) => {
          const selectRoute = tempOrigin.find((pIt) => pIt.path === it)
          if (selectRoute) {
            tempOrigin = selectRoute.children as unknown as RouteRecordNormalized[]
            selectRoutes.push(selectRoute)
          }
        })
        return selectRoutes
      }
      function generatorBreadcrumb() {
        breadcrumbs.length = 0
        const findedRoutes = findRoute(handlePath(route.path))
        const aa = generatorDropdown(findedRoutes)
        if (aa) {
          breadcrumbs.push(...aa)
        }
      }
      function handleSelect(key: string) {
        router.push(key)
      }
      onMounted(() => {
        generatorBreadcrumb()
      })
      watch(
        () => route.path,
        () => {
          if (
            route.path.startsWith('/redirect') ||
            ['/login', '/404', '/405', '/403', '/500'].includes(route.path)
          )
            return
          generatorBreadcrumb()
        }
      )
      return {
        breadcrumbs,
        handleSelect,
      }
    },
  })
</script>
