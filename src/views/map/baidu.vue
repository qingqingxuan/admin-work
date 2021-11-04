<template>
  <div ref="container" :style="{ height: height + 'px', width: '100%' }"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import useCreateScript from '@/hooks/useCreateScript'

  const SCRIPT_URL =
    'http://api.map.baidu.com/getscript?v=3.0&ak=WxbQmaOc3bvSGSaKWcyeFSf8fnYCWpKd&services=&t=' +
    new Date().getTime()
  export default defineComponent({
    setup() {
      const container = ref<HTMLDivElement | null>(null)
      const height = ref(0)
      const { createScriptPromise } = useCreateScript(SCRIPT_URL)
      const initMap = () => {
        height.value = container.value?.parentElement?.getBoundingClientRect().height || 0
        createScriptPromise.then(() => {
          const bMap = (window as any).BMap
          const map = new bMap.Map(container.value)
          const point = new bMap.Point(116.404, 39.915)
          map.centerAndZoom(point, 7)
          map.enableScrollWheelZoom()
          map.setMapStyleV2({ styleId: 'ea4652613f3629247d47666706ce7e89' })
        })
      }
      onMounted(initMap)
      return { container, height }
    },
  })
</script>
