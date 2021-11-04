<template>
  <div>
    <n-card title="折线图" :content-style="{ padding: '10px' }" :header-style="{ padding: '10px' }">
      <n-grid x-gap="10" y-gap="10" cols="xs:1 s:2 m:3 l:3 xl:3" responsive="screen">
        <n-grid-item style="height: 180px">
          <Chart :options="options1" />
        </n-grid-item>
        <n-grid-item style="height: 180px">
          <Chart :options="options2" />
        </n-grid-item>
        <n-grid-item style="height: 180px">
          <Chart :options="options3" />
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-card
      title="柱状图"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '10px' }"
      class="mt-2 mb-2"
    >
      <n-grid x-gap="10" y-gap="10" cols="xs:1 s:2 m:3 l:3 xl:3" responsive="screen">
        <n-grid-item style="height: 180px">
          <Chart :options="options4" />
        </n-grid-item>
        <n-grid-item style="height: 180px">
          <Chart :options="options5" />
        </n-grid-item>
        <n-grid-item style="height: 180px">
          <Chart :options="options6" />
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-card title="饼状图" :content-style="{ padding: '10px' }" :header-style="{ padding: '10px' }">
      <n-grid x-gap="10" y-gap="10" cols="xs:1 s:2 m:3 l:3 xl:3" responsive="screen">
        <n-grid-item :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="height: 180px">
          <Chart :options="options7" />
        </n-grid-item>
        <n-grid-item :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="height: 180px">
          <Chart :options="options8" />
        </n-grid-item>
        <n-grid-item :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="height: 180px">
          <Chart :options="options9" />
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Chart from './components/Chart.vue'

  export default defineComponent({
    name: 'Echarts',
    components: {
      Chart,
    },
    setup() {
      const options1 = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        grid: {
          x: '10%',
          y: '5%',
          x2: '5%',
          y2: '15%',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      }
      const options2 = {
        grid: {
          x: '10%',
          y: '5%',
          x2: '5%',
          y2: '15%',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
          },
        ],
      }
      const options3 = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options4 = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options5 = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000',
                },
              },
              150,
              80,
              70,
              110,
              130,
            ],
            type: 'bar',
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options6 = {
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国'],
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744],
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141],
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options7 = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options8 = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
            ],
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      const options9 = {
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 60],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' },
            ],
          },
        ],
        grid: {
          x: '15%',
          y: '5%',
          x2: '1%',
          y2: '15%',
        },
      }
      return {
        options1,
        options2,
        options3,
        options4,
        options5,
        options6,
        options7,
        options8,
        options9,
      }
    },
  })
</script>
