<template>
  <div>
    <div class="text-center">
      <n-icon size="50" color="#0e7a0d">
        <CheckmarkCircle />
      </n-icon>
    </div>
    <div class="result"> 操作成功 </div>
    <div class="tip"> 预计两个小时到账 </div>
    <n-card :content-style="{ padding: '10px' }" class="mt-4">
      <n-space vertical>
        <div>
          <span>付款账户：</span>
          <n-gradient-text type="primary">{{ accountInfo.account }}</n-gradient-text>
        </div>
        <div>
          <span>收款账户：</span>
          <n-gradient-text type="primary">{{ accountInfo.otherAccount }}</n-gradient-text>
        </div>
        <div>
          <span>收款人姓名：</span>
          <n-gradient-text type="primary">
            {{ accountInfo.receiveName }}
          </n-gradient-text>
        </div>
        <div>
          <span>转账金额：</span>
          <n-gradient-text type="primary">
            {{ '￥' + Number(accountInfo.money).toFixed(2) }}
          </n-gradient-text>
        </div>
      </n-space>
    </n-card>
    <div class="flex justify-end mt-2 mb-2">
      <n-space>
        <n-button size="small" type="warning" @click="preStep">再转一笔</n-button>
        <n-button type="primary" size="small">查看订单</n-button>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { CheckmarkCircle } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'ResultInfo',
    components: { CheckmarkCircle },
    props: {
      accountInfo: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    emits: ['pre-step'],
    methods: {
      preStep() {
        this.$emit('pre-step')
      },
    },
  })
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 768px) {
    .result-wrapper {
      width: 90%;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 768px) {
    .result-wrapper {
      width: 50%;
      margin: 0 auto;
    }
  }
  .form-wrapper {
    margin-top: 20px;
    padding: 10px;
  }
  .icon {
    color: #67c23a;
    font-size: 100px;
    margin: 30px 0;
  }
  .result {
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .tip {
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }
  .action {
    margin-top: 30px;
  }
</style>
