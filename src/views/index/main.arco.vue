<template>
  <div class="main-container">
    <div class="left">
      <div class="item">
        <Title title="销售渠道" />
        <EnrollmentChannelsChart ref="enrollmentChannelsChart" />
      </div>
      <div class="item">
        <Title title="周销售额分析图" />
        <WeekSalesChart ref="weekSalesChart" />
      </div>
      <div class="item">
        <Title title="热卖产品指数" />
        <HotProductChart ref="hotProductChart" />
      </div>
    </div>
    <div class="center">
      <div style="display: flex; flex-direction: column; height: 100%">
        <a-card>
          <CenterTitle />
        </a-card>
        <div class="center-data-item-wrapper">
          <DataItem
            class="item"
            title="周销售金额"
            :data-model="{ num: 1000, prefix: '￥', suffix: '', bg: Bg1 }"
          />
          <DataItem
            class="item"
            title="周增长人数"
            :data-model="{ num: 56100, prefix: '', suffix: '人', bg: Bg2 }"
          />
          <DataItem
            class="item"
            title="周成交单数"
            :data-model="{ num: 3216, prefix: '', suffix: '单', bg: Bg3 }"
          />
        </div>
        <a-card style="flex: 1; overflow: hidden">
          <div style="display: flex; flex-direction: column; height: 100%">
            <Title title="年销售成交额走势图" />
            <FullYearSalesChart ref="fullYearSalesChart" />
            <div style="flex: 1; overflow: auto">
              <ProjectList />
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <Title title="周订单分析图" />
        <OrderChart ref="orderChart" />
      </div>
      <div class="item">
        <Title title="销售业绩排行榜" />
        <SaleOrderList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue'
  import Title from './components/Title'
  import EnrollmentChannelsChart from './components/chart/EnrollmentChannelsChart.vue'
  import SaleOrderList from './components/SaleOrderList.vue'
  import useAppConfigStore from '@/store/modules/app-config'
  import CenterTitle from './components/CenterTitle.vue'
  import DataItem from './components/DataItem.adapter'
  import FullYearSalesChart from './components/chart/FullYearSalesChart.vue'
  import ProjectList from './components/ProjectList.vue'
  import Bg1 from '@/assets/arco/bg_item_1.png'
  import Bg2 from '@/assets/arco/bg_item_2.png'
  import Bg3 from '@/assets/arco/bg_item_3.png'
  import WeekSalesChart from './components/chart/WeekSalesChart.vue'
  import HotProductChart from './components/chart/HotProductChart.vue'
  import OrderChart from './components/chart/OrderChart.vue'
  export default defineComponent({
    name: 'Home',
    components: {
      Title,
      EnrollmentChannelsChart,
      SaleOrderList,
      CenterTitle,
      DataItem,
      FullYearSalesChart,
      ProjectList,
      WeekSalesChart,
      HotProductChart,
      OrderChart,
    },
    setup() {
      const appStore = useAppConfigStore()
      const mainHeight = computed(() => {
        return appStore.mainHeight + 'px'
      })

      const enrollmentChannelsChart = ref()
      const weekSalesChart = ref()
      const hotProductChart = ref()
      const fullYearSalesChart = ref()
      const orderChart = ref()
      const onResize = () => {
        setTimeout(() => {
          unref(enrollmentChannelsChart).updateChart()
          unref(weekSalesChart).updateChart()
          unref(hotProductChart).updateChart()
          unref(fullYearSalesChart).updateChart()
          unref(orderChart).updateChart()
        }, 500)
      }
      const collapse = computed(() => {
        return appStore.isCollapse
      })
      watch(collapse, () => {
        onResize()
      })
      return {
        enrollmentChannelsChart,
        weekSalesChart,
        hotProductChart,
        fullYearSalesChart,
        orderChart,
        Bg1,
        Bg2,
        Bg3,
        mainHeight,
        collapse,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-card) {
    border-radius: 5px;
    border: none;
    box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
  }
  :deep(.arco-card-body) {
    padding: 0;
    height: 100%;
  }
  .main-container {
    display: flex;
    height: v-bind(mainHeight);
    overflow: hidden;
    .left {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .item {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        background: var(--color-bg-2);
        transition: box-shadow 0.2s cubic-bezier(0, 0, 1, 1);
        box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
        div:nth-last-child(1) {
          flex: 1;
        }
      }
      .item + .item {
        margin-top: 10px;
      }
    }
    .center {
      margin: 0 10px;
      flex: 1;
      overflow: hidden;
      .center-data-item-wrapper {
        display: flex;
        margin: 10px 0;
        .item {
          flex: 1;
        }
        .item + .item {
          margin-left: 10px;
        }
      }
    }
    .right {
      width: 25%;
      display: flex;
      height: 100%;
      overflow: hidden;
      flex-direction: column;
      & > div:nth-child(1) {
        flex: 1;
      }
      & > div:nth-child(2) {
        flex: 2;
        overflow: hidden;
      }
      .item {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        background: var(--color-bg-2);
        border-radius: 5px;
        transition: box-shadow 0.2s cubic-bezier(0, 0, 1, 1);
        box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
        & > div:nth-child(2) {
          flex: 1;
        }
      }
      .item + .item {
        margin-top: 10px;
      }
    }
  }
</style>
