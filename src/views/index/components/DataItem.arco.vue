<template>
  <a-card
    :body-style="{ padding: '0px' }"
    :head-style="{ padding: '0px' }"
    :title="dataModel.title"
    size="small"
    :bordered="false"
    style="background-color: transparent"
  >
    <img :src="dataModel.bg" class="item-img" />
    <div class="title-wrapper">
      {{ title }}
    </div>
    <div
      style="height: 70px; position: relative; z-index: 9"
      class="flex flex-col justify-end items-center overflow-hidden item-value"
    >
      <span class="text-bold">
        <a-statistic
          :value="num"
          :value-from="0"
          :start="true"
          animation
          :value-style="{ color: '#fff', fontSize: '46px', fontWeight: 'bold' }"
        >
          <template v-if="prefix" #prefix>
            <span>{{ prefix }}</span>
          </template>
          <template #suffix>
            <span v-if="suffix">{{ suffix }}</span>
          </template>
        </a-statistic>
      </span>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DataItem',
    props: {
      dataModel: {
        type: Object,
        default: () => {
          return {}
        },
      },
      title: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return {
        ...props.dataModel,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-card-body) {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }
  :deep(.arco-statistic-content .arco-statistic-value-integer) {
    font-size: 36px;
  }
  .title-wrapper {
    position: relative;
    z-index: 9;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border-bottom: #fff dashed 1px;
  }
  .item-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .item-value {
    font-size: 46px;
    font-weight: bold;
  }
</style>
