<template>
  <div class="chart-item-container">
    <div ref="weekSalesChart" class="chart-item"></div>
  </div>
</template>
<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose, graphic } from 'echarts/core'
  import { random } from 'lodash-es'
  function getData() {
    const data: number[] = []
    while (data.length < 12) {
      data.push(random(80, 250))
    }
    return data
  }
  const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default defineComponent({
    name: 'WeekSalesChart',
    setup() {
      const loading = ref(true)
      const weekSalesChart = ref<HTMLDivElement | null>(null)
      let interval: any = null
      const init = () => {
        const option = {
          color: ['rgba(64, 58, 255)'],
          grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: weeks,
            axisLabel: {
              textStyle: {
                fontSize: 10,
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#98A3B2',
                width: 0,
                type: 'solid',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            max: 300,
            splitLine: { show: false },
            axisLabel: {
              textStyle: {
                fontSize: 10,
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#98A3B2',
                width: 0,
                type: 'solid',
              },
            },
          },
          series: [
            {
              type: 'bar',
              name: '周销售图',
              stack: '总量',
              data: getData(),
              smooth: true,
              barMaxWidth: 10, // 每一个都要设置
              barMinWidth: 5, // 每一个都要设置
              itemStyle: {
                borderWidth: 15,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#5880F8' },
                  { offset: 0.5, color: '#3ca6ff' },
                  { offset: 1, color: '#58B9F8' },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          setTimeout(() => {
            nextTick(() => useEcharts(weekSalesChart.value as HTMLDivElement).setOption(option))
          }, 100)
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(weekSalesChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(weekSalesChart.value as HTMLDivElement)
        clearInterval(interval)
      })
      return {
        loading,
        weekSalesChart,
        updateChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;

    .chart-item {
      height: 100%;
    }
  }
</style>
