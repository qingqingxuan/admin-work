<template>
  <div class="chart-item-container">
    <div ref="hotProdChart" class="chart-item"></div>
  </div>
</template>
<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose } from 'echarts/core'
  function getData() {
    return [99, 90, 80, 70, 60]
  }
  const weeks = ['女装', '男装', '童装', '皮鞋', '帽子']
  export default defineComponent({
    name: 'HotProdChart',
    setup() {
      const loading = ref(true)
      const hotProdChart = ref<HTMLDivElement | null>(null)
      let interval: any = null
      const init = () => {
        const option = {
          grid: {
            top: '2%',
            left: '5%',
            right: '8%',
            bottom: '2%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          yAxis: {
            type: 'category',
            data: weeks.reverse(),
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 10,
                color: '#98A3B2',
              },
            },
          },
          xAxis: {
            show: false,
          },
          series: [
            {
              type: 'pictorialBar',
              name: '热卖指数',
              stack: '指数',
              data: getData().reverse(),
              smooth: true,
              symbol: 'rect',
              symbolRepeat: true,
              symbolSize: [2, 10],
              symbolMargin: 1,
              label: {
                show: true, //开启数值显示
                position: 'right', //在上方显示
                textStyle: {
                  //数值样式
                  color: 'rgb(var(--primary-1))',
                  fontSize: 12,
                },
              },
              itemStyle: {
                color: 'rgb(var(--primary-1))',
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          setTimeout(() => {
            nextTick(() => useEcharts(hotProdChart.value as HTMLDivElement).setOption(option))
          }, 100)
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(hotProdChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(hotProdChart.value as HTMLDivElement)
        clearInterval(interval)
      })
      return {
        loading,
        hotProdChart,
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
