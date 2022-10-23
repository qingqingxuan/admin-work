<template>
  <div ref="eChartContainer" style="height: 180px; width: 100%"> </div>
</template>

<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, onMounted, ref, toRef } from 'vue'
  import { EChartsCoreOption } from 'echarts'

  export default defineComponent({
    name: 'LineChart',
    props: {
      id: {
        type: Number,
        default: 0,
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(prop) {
      const eChartContainer = ref<HTMLDivElement | null>(null)
      onMounted(() => {
        const options = toRef(prop, 'options')
        const instance = useEcharts(eChartContainer.value as HTMLDivElement)
        instance.setOption(options.value as EChartsCoreOption)
        instance.resize()
      })
      return {
        eChartContainer,
      }
    },
  })
</script>

<style></style>
