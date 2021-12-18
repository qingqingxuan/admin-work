<template>
  <n-space vertical>
    <n-card
      title="请填写会议基本信息（预设：grid-item），（以下表单信息是动态生成）"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '10px' }"
      :segmented="true"
    >
      <div class="form-wrapper" style="width: 95%">
        <DataForm
          ref="dataForm"
          preset="grid-item"
          :options="formItems"
          :form-config="formConfig"
        />
        <div class="flex justify-end">
          <n-button :loading="submitLoading" type="primary" size="small" @click="submit">
            提交
          </n-button>
        </div>
      </div>
    </n-card>
    <n-card
      title="请填写会议基本信息（预设：form-item），（以下表单信息是动态生成）"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '10px' }"
      :segmented="true"
    >
      <template #header-extra>
        <n-button type="primary" size="small" @click="show = !show"> 隐藏 </n-button>
      </template>
      <div class="form-wrapper" v-show="show">
        <DataForm ref="dataForm" :options="formItems" :form-config="formConfig" />
        <div class="flex justify-end">
          <n-button :loading="submitLoading" type="primary" size="small" @click="submit">
            提交
          </n-button>
        </div>
      </div>
    </n-card>
  </n-space>
</template>

<script lang="ts">
  import { DataFormType, FormItem } from '@/types/components'
  import { FormProps, SelectOption, useMessage } from 'naive-ui'
  import { defineComponent, ref } from 'vue'
  import {
    renderCheckbox,
    renderCheckboxGroup,
    renderDatePicker,
    renderInput,
    renderPopSelect,
    renderSelect,
    renderTimePicker,
  } from '@/hooks/form'
  export default defineComponent({
    name: 'BaseFormView',
    setup() {
      const message = useMessage()
      const dataForm = ref<DataFormType | null>(null)
      function submit() {
        if (dataForm.value?.validator()) {
          submitLoading.value = true
          setTimeout(() => {
            submitLoading.value = false
            message.success(
              '提交成功，参数为：' + JSON.stringify(dataForm.value?.generatorParams())
            )
          }, 3000)
        }
      }
      const formItems = [
        {
          label: '会议名称',
          key: 'name',
          required: true,
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, { placeholder: '请输入会议名称', clearable: true }),
          validator: (formItem, message) => {
            if (!formItem.value.value) {
              message.error('请输入会议名称')
              return false
            }
            return true
          },
        },
        {
          label: '与会领导',
          key: 'leader',
          value: ref(null),
          render: (formItem) =>
            renderPopSelect(formItem.value, [
              {
                label: '张总',
                value: '张总',
              },
              {
                label: '王总',
                value: '王总',
              },
              {
                label: '各种总',
                value: '各种总',
              },
            ]),
        },
        {
          label: '会议类型',
          key: 'meetType',
          required: true,
          value: ref(null),
          optionItems: [
            {
              label: '普通',
              value: '0',
            },
            {
              label: '紧急',
              value: '1',
            },
          ],
          render: (formItem) =>
            renderSelect(formItem.value, formItem.optionItems as SelectOption[], {
              placeholder: '请选择会议类型',
              clearable: true,
            }),
        },
        {
          label: '是否远程',
          key: 'remote',
          value: ref(null),
          render: (formItem) => renderCheckbox(formItem.value, '不需要'),
        },
        {
          label: '所需设备',
          key: 'equipment',
          value: ref(['tv']),
          render: (formItem) =>
            renderCheckboxGroup(formItem.value, [
              {
                label: '电视',
                value: 'tv',
              },
              {
                label: '投影仪',
                value: 'touying',
              },
              {
                label: '电脑',
                value: 'compute',
              },
            ]),
        },
        {
          label: '会议内容',
          key: 'content',
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, { placeholder: '请输入会议内容', maxlength: 10 }),
        },
        {
          label: '起止日期',
          key: 'startEndDate',
          value: ref([Date.now(), Date.now()]),
          render: (formItem) =>
            renderDatePicker(formItem.value, {
              type: 'daterange',
              style: 'width: 100%',
            }),
        },
        {
          label: '开始时间',
          key: 'startTime',
          value: ref(null),
          render: (formItem) => renderTimePicker(formItem.value),
        },
        {
          label: '起止地点',
          key: 'address',
          value: ref(null),
          optionItems: [
            {
              label: '会议一室',
              value: 1,
            },
            {
              label: '会议二室',
              value: 2,
            },
            {
              label: '会议三室',
              value: 3,
            },
            {
              label: '会议四室',
              value: 4,
            },
          ],
          render: (formItem) =>
            renderSelect(formItem.value, formItem.optionItems as SelectOption[], {
              placeholder: '请选择会议地点',
              clearable: true,
            }),
        },
        {
          label: '与会人员',
          key: 'joinMemeber',
          value: ref(null),
          optionItems: [
            {
              label: '张三',
              value: 1,
            },
            {
              label: '李四',
              value: 2,
            },
            {
              label: '王五',
              value: 3,
            },
            {
              label: '赵六',
              value: 4,
            },
          ],
          render: (formItem) =>
            renderSelect(formItem.value, formItem.optionItems as SelectOption[], {
              placeholder: '请选择与会人员',
              clearable: true,
            }),
        },
        {
          label: '会议备注',
          key: 'remark',
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: '请输入会议备注',
              type: 'textarea',
              rows: 3,
            }),
        },
      ] as FormItem[]
      const formConfig = {
        labelWidth: 100,
        size: 'medium',
        labelAlign: 'right',
      } as FormProps
      const submitLoading = ref(false)
      const show = ref(true)
      return {
        dataForm,
        formConfig,
        formItems,
        submitLoading,
        submit,
        show,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 768px) {
    .form-wrapper {
      width: 100%;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 768px) {
    .form-wrapper {
      width: 60%;
      margin: 0 auto;
    }
  }
</style>
