<template>
  <n-card :content-style="{ padding: '10px' }">
    <n-form
      ref="stepTwoForm"
      :model="passwordModel"
      :rules="passwordRule"
      label-width="120px"
      label-placement="left"
    >
      <n-form-item label="付款账户：">
        <span>{{ accountInfo.account }}</span>
      </n-form-item>
      <n-form-item label="收款账户：">
        <span>{{ accountInfo.otherAccount }}</span>
      </n-form-item>
      <n-form-item label="收款人姓名：">
        <span>
          {{ accountInfo.receiveName }}
        </span>
      </n-form-item>
      <n-form-item label="转账金额：">
        <span>
          {{ '￥' + Number(accountInfo.money).toFixed(2) }}
        </span>
      </n-form-item>
      <n-form-item label="支付密码" path="payPassword">
        <n-input v-model:value="passwordModel.payPassword" placeholder="请输入支付密码" />
      </n-form-item>
      <div class="flex justify-end mt-2 mb-2">
        <n-space>
          <n-button size="small" type="warning" @click="preStep">上一步</n-button>
          <n-button @click="nextStep" size="small" type="primary" :loading="loadingStatus">
            下一步
          </n-button>
        </n-space>
      </div>
    </n-form>
  </n-card>
</template>

<script lang="ts">
  import { NForm } from 'naive-ui'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PasswordInfo',
    props: {
      accountInfo: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    emits: ['pre-step', 'next-step'],
    data() {
      return {
        passwordModel: {
          payPassword: '',
        },
        passwordRule: {
          payPassword: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
        },
        loadingStatus: false,
      }
    },
    methods: {
      preStep() {
        this.loadingStatus = false
        this.passwordModel.payPassword = ''
        this.$emit('pre-step')
      },
      nextStep() {
        ;(this.$refs.stepTwoForm as InstanceType<typeof NForm>).validate((error) => {
          if (!error) {
            this.loadingStatus = true
            setTimeout(() => {
              this.$emit('next-step')
              this.loadingStatus = false
            }, 3000)
          }
        })
      },
    },
  })
</script>

<style lang="scss" scoped>
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
