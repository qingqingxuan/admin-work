<template>
  <a-card title="请填写会议基本信息">
    <template #extra>
      <a-space>
        <a-button status="danger" @click="resetForm"> 重置 </a-button>
        <a-button @click="valideForm"> 校验 </a-button>
        <a-button :loading="submitLoading" type="primary" @click="submit"> 提交 </a-button>
      </a-space>
    </template>
    <div class="form-wrapper">
      <a-form :model="{}" :label-col-props="{ span: 3 }">
        <a-form-item
          :row-class="[item.required ? 'form-item__require' : 'form-item__no_require']"
          v-for="item of formItems"
          :key="item.key"
          :label="item.label"
        >
          <template v-if="item.type === 'input'">
            <a-input :placeholder="item.placeholder" v-model="item.value.value"></a-input>
          </template>
          <template v-if="item.type === 'textarea'">
            <a-textarea
              :placeholder="item.placeholder"
              v-model:value="item.value.value"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </template>
          <template v-if="item.type === 'switch'">
            <a-switch v-model="item.value.value" checked-children="开" un-checked-children="关" />
          </template>
          <template v-if="item.type === 'select'">
            <a-select v-model="item.value.value" :placeholder="item.placeholder">
              <a-option v-for="opt of item.optionItems" :value="opt.value" :key="opt.value">
                {{ opt.label }}
              </a-option>
            </a-select>
          </template>
          <template v-if="item.type === 'time'">
            <a-time-picker v-model="item.value.value" value-format="HH:mm:ss" />
          </template>
          <template v-if="item.type === 'date-range'">
            <a-range-picker v-model="item.value.value" />
          </template>
          <template v-if="item.type === 'checkbox-group'">
            <a-checkbox-group v-model="item.value.value" :options="item.optionItems">
              <a-checkbox v-for="it of item.optionItems" :key="it.value" :value="it.value">
                {{ it.label }}
              </a-checkbox>
            </a-checkbox-group>
          </template>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { FormItem } from '@/types/components.arco'
  import { Message } from '@arco-design/web-vue'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'BaseFormView',
    setup() {
      const dataForm = ref()
      const formItems = [
        {
          label: '会议名称',
          key: 'name',
          required: true,
          type: 'input',
          value: ref(null),
          placeholder: '请输入会议名称',
          validator: function () {
            if (!this.value.value) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
        },
        {
          label: '与会领导',
          key: 'leader',
          type: 'select',
          placeholder: '请选择与会领导',
          value: ref(undefined),
          optionItems: [
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
          ],
          reset: function () {
            this.value.value = undefined
          },
        },
        {
          label: '会议类型',
          key: 'meetType',
          required: true,
          type: 'select',
          placeholder: '请选择会议类型',
          value: ref(undefined),
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
          validator: function () {
            if (!this.value.value) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
          reset: function () {
            this.value.value = undefined
          },
        },
        {
          label: '是否远程',
          key: 'remote',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
        {
          label: '所需设备',
          key: 'equipment',
          type: 'checkbox-group',
          value: ref(['tv']),
          optionItems: [
            {
              label: '电视',
              value: 'tv',
            },
            {
              label: '投影仪',
              value: 'tyy',
            },
            {
              label: '笔记本',
              value: 'note',
            },
          ],
          reset: function () {
            this.value.value = ['tv']
          },
        },
        {
          label: '会议内容',
          key: 'content',
          type: 'textarea',
          placeholder: '请输入会议内容',
          value: ref(null),
        },
        {
          label: '起止日期',
          key: 'startEndDate',
          type: 'date-range',
          value: ref([]),
          reset: function () {
            this.value.value = []
          },
        },
        {
          label: '开始时间',
          key: 'startTime',
          type: 'time',
          value: ref(null),
        },
        {
          label: '会议地点',
          key: 'address',
          type: 'select',
          placeholder: '请选择会议地点',
          value: ref(undefined),
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
          reset: function () {
            this.value.value = undefined
          },
        },
        {
          label: '与会人员',
          key: 'joinMemeber',
          value: ref(undefined),
          placeholder: '请选择与会人员',
          type: 'select',
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
          reset: function () {
            this.value.value = undefined
          },
        },
        {
          label: '会议备注',
          key: 'remark',
          placeholder: '请输入会议备注',
          type: 'textarea',
          value: ref(null),
        },
      ] as FormItem[]
      const submitLoading = ref(false)
      function submit() {
        if (formItems.every((it) => (it.validator ? it.validator() : true))) {
          submitLoading.value = true
          setTimeout(() => {
            submitLoading.value = false
            Message.success(
              '提交成功，参数为：' +
                JSON.stringify(
                  formItems.reduce((pre, cur) => {
                    ;(pre as any)[cur.key] = (cur as any).value.value
                    return pre
                  }, {})
                )
            )
          }, 3000)
        }
      }
      function resetForm() {
        formItems.forEach((it) => {
          it.reset ? it.reset() : (it.value.value = '')
        })
      }
      function valideForm() {
        if (formItems.every((it) => (it.validator ? it.validator() : true))) {
          Message.success('所有表单都合法')
        }
      }
      return {
        dataForm,
        formItems,
        submitLoading,
        submit,
        resetForm,
        valideForm,
      }
    },
  })
</script>
