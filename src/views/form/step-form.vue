<template>
  <div class="main-container">
    <n-card :content-style="{ padding: '25px' }">
      <n-steps :current="activeStep" status="process" class="steps-wrapper">
        <n-step title="填写转账信息" />
        <n-step title="确认转账信息" />
        <n-step title="恭喜，完成转账操作" />
      </n-steps>
    </n-card>
    <n-card :body-style="{ padding: '5px' }" shadow="hover" class="margin-top-xs">
      <div class="p-4 text-center title">
        <n-text type="primary">
          {{ activeStep === 1 || activeStep === 2 ? '请填写转账信息' : '转账结果' }}
        </n-text>
      </div>
      <AccountInfo v-if="activeStep === 1" @next-step="next" />
      <PasswordInfo
        v-if="activeStep === 2"
        :account-info="accountInfo"
        @next-step="activeStep++"
        @pre-step="activeStep--"
      />
      <ResultInfo v-if="activeStep === 3" :account-info="accountInfo" @pre-step="activeStep = 1" />
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AccountInfo from './components/AccountInfo.vue'
  import PasswordInfo from './components/PasswordInfo.vue'
  import ResultInfo from './components/ResultInfo.vue'
  export default defineComponent({
    name: 'StepForm',
    components: { AccountInfo, PasswordInfo, ResultInfo },
    data() {
      return {
        activeStep: 1,
        accountInfo: {},
      }
    },
    methods: {
      next(accountInfo: any) {
        if (this.activeStep === 1) {
          this.accountInfo = accountInfo
          this.activeStep += 1
        }
      },
    },
  })
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 768px) {
    .steps-wrapper {
      width: 100%;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 768px) {
    .steps-wrapper {
      width: 60%;
      margin: 0 auto;
    }
  }
</style>
