<template>
  <n-form
    ref="stepOneForm"
    :model="accountInfo"
    :rules="accountInfoRule"
    label-width="120"
    label-placement="left"
  >
    <n-form-item label="付款账户" path="account">
      <n-select
        v-model:value="accountInfo.account"
        placeholder="请输入付款账户"
        :options="[{ label: accountInfo.account, value: accountInfo.account }]"
      />
    </n-form-item>
    <n-form-item label="收款账户：" path="otherAccount">
      <n-input v-model:value="accountInfo.otherAccount" placeholder="请输入收款账户">
        <template #prefix>
          <n-select
            v-model:value="accountInfo.type"
            placeholder="请选择"
            style="width: 100%"
            :bordered="false"
            :options="accountInfo.types"
          />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="收款人姓名：" path="receiveName">
      <n-input v-model:value="accountInfo.receiveName" placeholder="请输入收款人姓名" />
    </n-form-item>
    <n-form-item label="转账金额：" path="money">
      <n-input v-model:value="accountInfo.money" placeholder="请输入转账金额">
        <template #prefix>
          <span>￥</span>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item class="flex justify-end mt-2 mb-2">
      <n-space>
        <n-button size="small" @click="clearStepOneInfo">重置</n-button>
        <n-button type="primary" size="small" @click="nextStep">下一步</n-button>
      </n-space>
    </n-form-item>
  </n-form>
  <n-divider />
  <n-card class="ml-2 mr-2 tip-wrapper" :content-style="{ padding: 0 }">
    <div class="text-lg text-bold">说明</div>
    <div class="margin-tb">转账到微信</div>
    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    <div class="margin-tb"> 转账到支付宝 </div>
    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
  </n-card>
</template>

<script lang="ts">
  import { NForm } from 'naive-ui'
  import { defineComponent, reactive, ref } from 'vue'

  export default defineComponent({
    name: 'AccountInfo',
    emits: ['next-step'],
    setup(props, { emit }) {
      const stepOneForm = ref<typeof NForm | null>(null)
      const accountInfo = reactive({
        account: 'vue-admin-work@work.com',
        otherAccount: 'qingqingxuanzhaowen',
        receiveName: 'qingqingxuan',
        money: '100',
        type: 0,
        types: [
          {
            label: '微信',
            value: 0,
          },
          {
            label: '支付宝',
            value: 1,
          },
        ],
      })
      const accountInfoRule = {
        otherAccount: [{ required: true, message: '请输入收款账户', trigger: 'blur' }],
        receiveName: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
        money: [{ required: true, message: '请输入金额', trigger: 'blur' }],
      }
      function clearStepOneInfo() {
        accountInfo.otherAccount = ''
        accountInfo.type = 0
        accountInfo.receiveName = ''
        accountInfo.money = ''
      }
      function nextStep() {
        stepOneForm.value?.validate((error: any) => {
          if (!error) {
            emit('next-step', accountInfo)
          }
        })
      }
      return {
        stepOneForm,
        accountInfo,
        accountInfoRule,
        clearStepOneInfo,
        nextStep,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .tip-wrapper {
    padding: 10px;
  }
  @media screen and (max-width: 768px) {
    .form-wrapper {
      width: 90%;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 768px) {
    .form-wrapper {
      width: 50%;
      margin: 0 auto;
    }
  }
</style>
