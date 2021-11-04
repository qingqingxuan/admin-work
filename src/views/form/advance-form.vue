<template>
  <div class="main-container">
    <div>
      <n-card title="表单验证" :header-style="{ padding: '10px' }" :segmented="true">
        <template #header-extra>
          <n-button size="small" type="primary" @click="onVerifyForm">验证</n-button>
        </template>
        <n-form
          ref="verifyForm"
          :model="baseInfoModel"
          :rules="rules"
          label-width="80px"
          class="form-wrapper"
          label-align="left"
        >
          <n-form-item label="学校名称" path="name">
            <n-input v-model:value="baseInfoModel.name" placeholder="请输入学校名称" />
          </n-form-item>
          <n-form-item label="在线状态" path="isOnLine">
            <n-radio-group v-model:value="baseInfoModel.isOnLine" name="isOnLine">
              <n-radio value="onLine">线下</n-radio>
              <n-radio value="offLine">线上</n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="加盟方式" path="joinType">
            <n-radio-group v-model:value="baseInfoModel.joinType" name="joinType">
              <n-radio-button value="normal">普通</n-radio-button>
              <n-radio-button value="single">独家</n-radio-button>
              <n-radio-button value="proxy">代理</n-radio-button>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="学校地址" path="address">
            <n-input v-model:value="baseInfoModel.address" placeholder="请输入学校地址" />
          </n-form-item>
          <n-form-item label="学校备注" path="remark">
            <n-input
              v-model:value="baseInfoModel.remark"
              placeholder="请输入学校备注"
              type="textarea"
              :rows="3"
            />
          </n-form-item>
        </n-form>
      </n-card>
    </div>
    <n-card
      :title="'栅格化表单' + cols + '列'"
      :header-style="{ padding: '10px' }"
      class="mt-2"
      :segmented="true"
    >
      <template #header-extra>
        <n-input-number v-model:value="cols" :max="4" :min="2" />
      </template>
      <n-form label-width="80" size="small" label-placement="left">
        <n-grid :cols="cols" x-gap="20" y-gap="10">
          <n-form-item-gi label="下拉选择">
            <n-select
              placeholder="请选择一个吧"
              :options="[
                {
                  label: '选项一',
                  value: 1,
                },
                {
                  label: '选项二',
                  value: 2,
                },
                {
                  label: '选项三',
                  value: 3,
                },
                {
                  label: '选项四',
                  value: 4,
                },
              ]"
            />
          </n-form-item-gi>
          <n-form-item-gi label="加减数量">
            <n-input-number style="width: 100%" />
          </n-form-item-gi>
          <n-form-item-gi label="输入框">
            <n-input />
          </n-form-item-gi>
          <n-form-item-gi label="复选框">
            <n-checkbox-group>
              <n-space>
                <n-checkbox value="1">普通</n-checkbox>
                <n-checkbox value="2">独家</n-checkbox>
                <n-checkbox value="3">代理</n-checkbox>
              </n-space>
            </n-checkbox-group>
          </n-form-item-gi>
          <n-form-item-gi label="选择日期">
            <n-date-picker style="width: 100%" />
          </n-form-item-gi>
          <n-form-item-gi label="日期范围">
            <n-date-picker type="daterange" style="width: 100%" />
          </n-form-item-gi>
          <n-form-item-gi label="选择时间">
            <n-time-picker style="width: 100%" />
          </n-form-item-gi>
          <n-form-item-gi label="开关按钮">
            <n-switch />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <div class="mt-2">
      <n-card title="行内表单" :header-style="{ padding: '10px' }" :segmented="true">
        <n-form inline label-width="80" size="small" label-align="left">
          <n-form-item label="输入框" style="width: 20%">
            <n-input v-model:value="baseInfoModel.name" placeholder="请输入一定内容" />
          </n-form-item>
          <n-form-item label="单选组" style="width: 20%">
            <n-radio-group>
              <n-radio :label="0">线下</n-radio>
              <n-radio :label="1">线上</n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="下拉选择" style="width: 20%">
            <n-select
              :options="[
                {
                  label: '选项一',
                  value: 1,
                },
                {
                  label: '选项二',
                  value: 2,
                },
                {
                  label: '选项三',
                  value: 3,
                },
              ]"
            />
          </n-form-item>
          <n-form-item label="多选组" style="width: 20%">
            <n-checkbox-group v-model="baseInfoModel.joinType">
              <n-space>
                <n-checkbox value="1">普通</n-checkbox>
                <n-checkbox value="2">独家</n-checkbox>
                <n-checkbox value="3">代理</n-checkbox>
              </n-space>
            </n-checkbox-group>
          </n-form-item>
          <n-form-item label="多行输入" style="width: 20%">
            <n-input placeholder="请输入多行输入" type="textarea" :rows="3" />
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { FormRules, NForm, useMessage } from 'naive-ui'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'AdvanceForm',
    setup() {
      const verifyForm = ref<typeof NForm | null>(null)
      const baseInfoModel = ref({
        name: null,
        isOnLine: null,
        joinType: null,
        address: null,
        remark: null,
      })
      const rules = {
        name: {
          required: true,
          message: '请输入学校名称',
          trigger: 'blur',
        },
        isOnLine: {
          required: true,
          message: '请选择线上线下',
          trigger: 'change',
        },
        joinType: {
          required: true,
          message: '请选择加盟方式',
          trigger: 'change',
        },
        address: {
          required: true,
          message: '请输入学校地址',
          trigger: 'blur',
        },
      } as FormRules
      const message = useMessage()
      function onVerifyForm() {
        verifyForm.value?.validate((errors: any) => {
          if (!errors) {
            message.success('验证成功')
          } else {
            message.error('验证失败')
          }
        })
      }
      const cols = ref(2)
      return {
        verifyForm,
        baseInfoModel,
        rules,
        onVerifyForm,
        cols,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .content-wrapper {
    overflow-y: auto;
    @media screen and (max-width: 768px) {
      .form-wrapper {
        margin-top: 2%;
        width: 98%;
        padding-left: 4%;
      }
    }
    @media screen and (min-width: 768px) {
      .form-wrapper {
        margin-top: 2%;
        width: 50%;
        padding-left: 4%;
      }
    }
  }
</style>
