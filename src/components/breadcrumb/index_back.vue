<template>
  <n-breadcrumb>
    <transition-group name="breadcrumb">
      <n-breadcrumb-item v-for="item of breadcrumbs" :key="item.path">
        {{ item.meta.title }}
      </n-breadcrumb-item>
    </transition-group>
  </n-breadcrumb>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, watch } from 'vue'
  import { RouteLocationMatched, RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
  export default defineComponent({
    name: 'Breadcrumb11',
    setup() {
      const breadcrumbs = reactive([] as Array<RouteLocationMatched>)
      const route = useRoute()
      function generatorBreadcrumb(route: RouteLocationNormalizedLoaded) {
        breadcrumbs.length = 0
        breadcrumbs.push(
          ...route.matched.filter((it) => {
            return it.meta && it.meta.title
          })
        )
      }
      onMounted(() => {
        generatorBreadcrumb(route)
      })
      watch(
        () => route.path,
        () => {
          generatorBreadcrumb(route)
        }
      )
      return {
        breadcrumbs,
      }
    },
  })
</script>
