<template>
  <div class="main-container">
    <n-grid responsive="screen" cols="1 s:2 m:4 l:4 xl:4 2xl:4" x-gap="5" y-gap="5">
      <n-grid-item v-for="(item, index) of dataList" :key="index" class="item-wrapper">
        <DataItem :data-model="item">
          <template v-if="index === 0" #extra="{ extra }">
            <div class="margin-top-lg">
              <div> 较昨日新增：{{ extra.data }} </div>
              <div class="margin-top-sm"> 较上周新增：{{ extra.data1 }} </div>
            </div>
          </template>
          <template v-else-if="index === 1" #extra="{ extra }">
            <div class="margin-top" style="position: relative">
              <div> 较昨日新增：{{ extra.data }} </div>
              <div class="margin-top-sm"> 较上周新增：{{ extra.data1 }} </div>
              <div class="stack-avatar-wrapper">
                <!-- <StackAvatar /> -->
              </div>
            </div>
          </template>
          <template v-else-if="index === 2" #extra="{ extra }">
            <n-progress type="line" :percentage="extra.data" />
          </template>
          <template v-else-if="index === 3" #extra>
            <OrderChart ref="mOrderChart" />
          </template>
        </DataItem>
      </n-grid-item>
    </n-grid>
    <n-grid class="mt-2">
      <n-grid-item :span="24">
        <FullYearSalesChart ref="fullYearSalesChart" />
      </n-grid-item>
    </n-grid>
    <n-grid
      responsive="screen"
      cols="1 s:2 m:4 l:4 xl:4 2xl:4"
      x-gap="5"
      y-gap="5"
      class="mt-2 mb-2"
    >
      <n-grid-item>
        <SalesChart ref="salesChart" />
      </n-grid-item>
      <n-grid-item>
        <StudentChart ref="studentChart" class="margin-top-xs" />
      </n-grid-item>
      <n-grid-item>
        <EnrollmentChannelsChart ref="enrollmentChannelsChart" />
      </n-grid-item>
      <n-grid-item>
        <DepartmentChart ref="departmentChart" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import DataItem from './components/DataItem.vue'
  import OrderChart from './components/chart/OrderChart.vue'
  import SalesChart from './components/chart/SalesChart.vue'
  import StudentChart from './components/chart/StudentChart.vue'
  import EnrollmentChannelsChart from './components/chart/EnrollmentChannelsChart.vue'
  import FullYearSalesChart from './components/chart/FullYearSalesChart.vue'
  import DepartmentChart from './components/chart/DepartmentChart.vue'
  import { computed, defineComponent, ref, watch } from 'vue'
  import useAppConfigStore from '@/store/modules/app-config'
  export default defineComponent({
    name: 'Home',
    components: {
      DataItem,
      OrderChart,
      SalesChart,
      StudentChart,
      EnrollmentChannelsChart,
      FullYearSalesChart,
      DepartmentChart,
    },
    setup() {
      const appConfigStore = useAppConfigStore()
      const mOrderChart = ref<InstanceType<typeof OrderChart>>()
      const salesChart = ref<InstanceType<typeof SalesChart>>()
      const enrollmentChannelsChart = ref<InstanceType<typeof EnrollmentChannelsChart>>()
      const studentChart = ref<InstanceType<typeof StudentChart>>()
      const fullYearSalesChart = ref<InstanceType<typeof FullYearSalesChart>>()
      const departmentChart = ref<InstanceType<typeof DepartmentChart>>()
      const onResize = () => {
        setTimeout(() => {
          mOrderChart.value?.updateChart()
          salesChart.value?.updateChart()
          enrollmentChannelsChart.value?.updateChart()
          studentChart.value?.updateChart()
          fullYearSalesChart.value?.updateChart()
          departmentChart.value?.updateChart()
        }, 500)
      }
      const collapse = computed(() => {
        return appConfigStore.isCollapse
      })
      watch(collapse, () => {
        onResize()
      })
      return {
        collapse,
        mOrderChart,
        salesChart,
        enrollmentChannelsChart,
        studentChart,
        departmentChart,
        fullYearSalesChart,
        dataList: [
          {
            title: '今日访问量',
            data: '+1000',
            bottomTitle: '总访问量',
            totalSum: '100万+',
            iconClass: 'data-chart',
            extra: {
              data: 1000,
              data1: 2350,
            },
          },
          {
            title: '新增用户',
            data: '+500',
            bottomTitle: '总用户量',
            totalSum: '200万+',
            iconClass: 'data-people',
            extra: {
              data: 700,
              data1: 968,
            },
          },
          {
            title: '当月销售额',
            data: '￥50000',
            bottomTitle: '累计销售额',
            totalSum: '2000万+',
            iconClass: 'data-money',
            extra: {
              data: 80,
            },
          },
          {
            title: '当月订单量',
            data: '189笔',
            bottomTitle: '累计订单量',
            totalSum: '1万+',
            iconClass: 'data-order',
            extra: {
              data: 80,
            },
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 992px) {
    .item-wrapper {
      margin-bottom: 5px;
    }
    .map-margin-tb {
      margin: 5px 0;
    }
  }
  .light {
    .chart-item {
      background-color: #fff;
    }
  }
  .stack-avatar-wrapper {
    position: absolute;
    right: -2%;
    top: 10%;
  }
</style>
