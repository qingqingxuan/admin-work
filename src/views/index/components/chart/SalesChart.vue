<template>
  <n-card
    :content-style="{ padding: '10px' }"
    :header-style="{ padding: '10px' }"
    :segmented="true"
  >
    <template #header>
      <n-skeleton text style="width: 50%" v-if="loading" />
      <template v-else>
        <div class="text-sm">一周销售额（单位：万）</div>
      </template>
    </template>
    <div class="chart-item-container">
      <n-skeleton text v-if="loading" :repeat="4" />
      <template v-else>
        <div ref="salesChart" class="chart-item"> </div>
      </template>
    </div>
  </n-card>
</template>

<script lang="ts">
  import { dispose, graphic } from 'echarts'
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  export default defineComponent({
    name: 'SalesChart',
    setup() {
      const loading = ref(true)
      const salesChart = ref<HTMLDivElement | null>(null)
      const init = () => {
        const option = {
          grid: {
            left: '2%',
            right: '5%',
            top: '5%',
            bottom: '3%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
            boundaryGap: false,
            splitLine: { show: false },
          },
          yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: { show: false },
          },
          series: [
            {
              data: [150, 180, 224, 218, 200, 180, 150],
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                opacity: 0.8,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(55, 162, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(116, 21, 219)',
                  },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(salesChart.value as HTMLDivElement).setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(salesChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(salesChart.value as HTMLDivElement)
      })
      return {
        loading,
        salesChart,
        updateChart,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .chart-item-container {
    width: 100%;
    .chart-item {
      height: 180px;
    }
  }
</style>
