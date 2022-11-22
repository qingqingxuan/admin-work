<template>
  <n-card
    :content-style="{ padding: '10px' }"
    :header-style="{ padding: '10px' }"
    :segmented="true"
  >
    <template #header>
      <n-skeleton text style="width: 50%" v-if="loading" />
      <template v-else>
        <div class="text-sm"> 半年销售额分析图（数据为模拟，只为演示效果） </div>
      </template>
    </template>
    <div class="chart-item-container">
      <n-skeleton text v-if="loading" :repeat="8" />
      <template v-else>
        <div ref="fullYearSalesChart" class="chart-item"></div>
      </template>
    </div>
  </n-card>
</template>
<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose, graphic } from 'echarts'
  import { random } from 'lodash-es'
  function getData() {
    const data: number[] = []
    while (data.length < 6) {
      data.push(random(80, 150))
    }
    return data
  }
  const months = ['一月', '二月', '三月', '四月', '五月', '六月']
  export default defineComponent({
    name: 'FullYearSalesChart',
    setup() {
      const loading = ref(true)
      const fullYearSalesChart = ref<HTMLDivElement | null>(null)
      let interval: any = null
      const init = () => {
        const option = {
          color: ['rgba(64, 58, 255)', 'rgba(136, 188, 241)'],
          grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true,
          },
          legend: {
            data: ['2019半年销售额', '2020半年销售额'],
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: months,
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'line',
              name: '2019半年销售额',
              stack: '总量',
              data: getData(),
              smooth: true,
              lineStyle: {
                color: 'rgba(24, 160, 88, 0.5)',
              },
              label: {
                show: true,
                formatter(val: any) {
                  if (val.dataIndex === 0) {
                    return ''
                  } else {
                    return val.data
                  }
                },
              },
              areaStyle: {
                opacity: 0.8,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(85, 193, 250, 0.1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(156, 21, 214, 0.2)',
                  },
                ]),
              },
            },
            {
              type: 'line',
              name: '2020半年销售额',
              stack: '总量',
              data: getData(),
              smooth: true,
              lineStyle: {
                color: 'rgba(24, 160, 88, 0.5)',
              },
              label: {
                show: true,
                formatter(val: any) {
                  if (val.dataIndex === 0) {
                    return ''
                  } else {
                    return val.data
                  }
                },
              },
              areaStyle: {
                opacity: 0.8,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(132, 248, 187, 0.1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(51, 209, 125, 0.2)',
                  },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          setTimeout(() => {
            nextTick(() => useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(option))
            interval = setInterval(() => {
              const option = {
                series: [
                  {
                    data: getData(),
                  },
                  {
                    data: getData(),
                  },
                ],
              }
              useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(option)
            }, 5000)
          }, 100)
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(fullYearSalesChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(fullYearSalesChart.value as HTMLDivElement)
        clearInterval(interval)
      })
      return {
        loading,
        fullYearSalesChart,
        updateChart,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .chart-item-container {
    width: 100%;
    .chart-item {
      height: 345px;
    }
  }
</style>
