<template>
  <n-card
    :content-style="{ padding: '10px' }"
    :header-style="{ padding: '10px' }"
    :segmented="true"
  >
    <template #header>
      <n-skeleton text style="width: 50%" v-if="loading" />
      <template v-else>
        <div class="text-sm"> 半年招生对比图（单位：人） </div>
      </template>
    </template>
    <div class="chart-item-container">
      <n-skeleton text v-if="loading" :repeat="4" />
      <template v-else>
        <div ref="studentChart" class="chart-item"> </div>
      </template>
    </div>
  </n-card>
</template>

<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose, graphic } from 'echarts'

  export default defineComponent({
    name: 'StudentChart',
    setup() {
      const loading = ref(true)
      const studentChart = ref<HTMLDivElement | null>(null)
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
          yAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            boundaryGap: 0,
            axisTick: {
              show: false,
            },
          },
          xAxis: {
            type: 'value',
            boundaryGap: 0,
          },
          series: [
            {
              data: [480, 289, 711, 618, 393, 571, 470],
              type: 'bar',
              smooth: true,
              showSymbol: false,
              barWidth: 'auto',
              itemStyle: {
                borderRadius: [0, 15, 15, 0],
                opacity: 0.8,
                color: new graphic.LinearGradient(1, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(12, 124, 182)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(244, 187, 236)',
                  },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(studentChart.value as HTMLDivElement).setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(studentChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(studentChart.value as HTMLDivElement)
      })
      return {
        loading,
        updateChart,
        studentChart,
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
