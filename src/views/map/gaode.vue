<template>
  <div ref="container" :style="{ height: height + 'px', width: '100%' }"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import useCreateScript from '@/hooks/useCreateScript'

  const SCRIPT_URL = 'https://webapi.amap.com/maps?v=1.4.15&key=9f2d3fcc4b12a7c915fded4b55902e21'
  export default defineComponent({
    setup() {
      const container = ref<HTMLDivElement | null>(null)
      const height = ref(0)
      const { createScriptPromise } = useCreateScript(SCRIPT_URL)
      const initMap = () => {
        height.value = container.value?.parentElement?.getBoundingClientRect().height || 0
        createScriptPromise.then(() => {
          const aMap = (window as any).AMap
          new aMap.Map(container.value, {
            zoom: 22,
            center: [116.397428, 39.90923],
            viewMode: '3D',
            pitch: 75,
          })
        })
      }
      onMounted(initMap)
      return { container, height }
    },
  })
</script>
