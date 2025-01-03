<template>
  <div style="height: 100%; overflow: hidden">
    <a-table
      :columns="columns"
      :data="weekData"
      :pagination="false"
      scrollbar
      stripe
      :scroll="{ y: '100%' }"
      :bordered="false"
    >
      <template #order="{ record }">
        <div class="tag-wrapper">
          <img :src="getTagImg(record)" />
          <span>{{ record.order }}</span>
        </div>
      </template>
      <template #rate="{ record }">
        <a-progress status="warning" :percent="record.rate" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import TagBg1 from '@/assets/arco/bg_tag_1.png'
  import TagBg2 from '@/assets/arco/bg_tag_2.png'
  import TagBg3 from '@/assets/arco/bg_tag_3.png'
  import TagBg4 from '@/assets/arco/bg_tag_4.png'
  import type { TableColumnData } from '@arco-design/web-vue'

  type Item = { key: string; order: string; name: string; sale: string; rate: number }
  const columns: TableColumnData[] = [
    {
      title: '排名',
      dataIndex: 'order',
      slotName: 'order',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'sale',
      align: 'center',
    },
    {
      title: '完成率',
      dataIndex: 'rate',
      width: 100,
      slotName: 'rate',
      align: 'center',
    },
  ]

  export default defineComponent({
    name: 'StudentChart',
    setup() {
      const weekData = reactive<Item[]>([])
      for (let index = 1; index <= 12; index++) {
        weekData.push({
          key: index + '',
          order: index + '',
          name: '王木棍',
          sale: (13 - index) * 50 + '万',
          rate: parseFloat(Number((13 - index) / 12).toFixed(2)),
        })
      }
      return {
        columns,
        weekData,
        getTagImg: (item: Item) => {
          if (parseInt(item.order) === 1) {
            return TagBg1
          }
          if (parseInt(item.order) === 2) {
            return TagBg2
          }
          if (parseInt(item.order) === 3) {
            return TagBg3
          }
          return TagBg4
        },
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-table-th) {
    color: rgb(var(--gray-7));
    font-size: 12px;
  }
  :deep(.arco-table-td) {
    color: rgb(var(--gray-7));
    font-size: 12px;
  }
  :deep(.arco-table .arco-table-cell) {
    padding: 15px 5px !important;
  }
  :deep(.arco-table .arco-table-th .arco-table-cell) {
    padding: 10px 5px !important;
  }
  :deep(.arco-progress-line-text) {
    margin-left: 5px;
  }
  .tag-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 24px;
    justify-content: center;
    margin: 0 auto;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    & > span {
      position: relative;
      z-index: 9;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
  }
</style>
