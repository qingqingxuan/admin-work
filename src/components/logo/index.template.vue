<template>
  <!--该文件是系统生成的只读文件，请不要修改该文件-->
  <component ref="asyncComponentRef" :is="asyncComponentName" v-bind="$attrs">
    <template #[item]="props" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="props" />
    </template>
  </component>
</template>

<script setup lang="tsx">
import { computed, defineAsyncComponent, inject, ref, unref } from "vue"
import type { DefineComponent } from "vue"
const IndexArco = defineAsyncComponent(() => import("./index.arco"))
const IndexNaive = defineAsyncComponent(() => import("./index.naive.vue"))
const componentGraph = {
  IndexArco,
	IndexNaive
}
const asyncComponentRef = ref()
const expose = {}
const componentUIName = inject("componentUIName", ref('naive'))
function capitalizeFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function convertFileName(filename: string) {
  const [namePart, extension] = filename.split(".")
  const convertedName = namePart.replace(
    /([a-z])([A-Z])/g,
    (_: any, p1: any, p2: string) => `${p1}.${p2.toLowerCase()}`
  )
  return `${convertedName}.${extension}`
}
const asyncComponentName = computed<DefineComponent>(() => {
  const n = `${capitalizeFirstLetter('index')}${capitalizeFirstLetter(unref(componentUIName))}`
  const c = componentGraph[n]
  if (!c) {
    return () => (<div>没有在目录下找到 {convertFileName(n + ".vue")} 文件</div>)
  }
  return c
})
const exposeProxy = new Proxy(expose, {
  has: function () {
    return true
  },
  get: function (_, prop) {
    if (typeof prop === "string" && !prop.toString().startsWith("__v")) {
      return asyncComponentRef.value && asyncComponentRef.value[prop.toString()]
    }
  },
})
defineExpose(exposeProxy)
</script>