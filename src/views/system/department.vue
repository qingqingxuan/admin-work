<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #top-right>
        <AddButton @add="onAddItem" />
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <n-data-table
          :loading="tableLoading"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
        />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" @confirm="onDataFormConfirm">
      <template #content>
        <DataForm ref="itemDataFormRef" :options="itemFormOptions" />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { getDepartmentList } from '@/api/url'
  import { TableActionModel, useTable, useRenderAction, useTableColumn } from '@/hooks/table'
  import { defineComponent, h, nextTick, onMounted, ref, shallowReactive } from 'vue'
  import _ from 'lodash'
  import {
    DataTableColumn,
    NInput,
    NRadio,
    NRadioGroup,
    NSelect,
    NSwitch,
    SelectOption,
    useDialog,
    useMessage,
  } from 'naive-ui'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import usePost from '@/hooks/usePost'
  interface Department {
    parentId: number
    id: number
    name: string
    depCode: string
    order: number
    status: number
    children: Array<Department>
  }
  const DP_CODE_FLAG = 'dp_code_'
  const searchOptions = [
    {
      key: 'name',
      label: '姓名',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
        })
      },
    },
    {
      key: 'gender',
      label: '性别',
      value: ref(1),
      selectOptions: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
      render: (formItem) => {
        return h(
          NRadioGroup,
          {
            onUpdateValue: (val) => {
              formItem.value.value = val
            },
            value: formItem.value.value,
            name: formItem.key as string,
          },
          {
            default: () =>
              formItem.optionItems?.map((it) => {
                return h(
                  NRadio,
                  {
                    value: it.value,
                  },
                  { default: () => it.label }
                )
              }),
          }
        )
      },
    },
    {
      key: 'address',
      label: '地区',
      value: ref('0'),
      render: (formItem) => {
        return h(NSelect, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          options: formItem.optionItems as Array<SelectOption>,
        })
      },
      optionItems: [
        {
          value: '0',
          label: '第一个',
        },
        {
          value: '1',
          label: '第二个',
        },
        {
          value: '2',
          label: '第三个',
        },
      ],
    },
  ] as Array<FormItem>
  const itemFormOptions = [
    {
      key: 'parentId',
      label: '父级部门',
      value: ref(null),
      optionItems: shallowReactive([] as Array<SelectOption>),
      render: (formItem) => {
        return h(NSelect, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: '请选择父级部门',
          options: formItem.optionItems as Array<SelectOption>,
        })
      },
    },
    {
      key: 'name',
      label: '部门名称',
      type: 'input',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (newVal) => {
            formItem.value.value = newVal
          },
          maxlength: 50,
          placeholder: '请输入部门名称',
        })
      },
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('请输入部门名称')
          return false
        }
        return true
      },
    },
    {
      label: '部门编号',
      key: 'depCode',
      value: ref(null),
      render: (formItem) => {
        return h(
          NInput,
          {
            value: formItem.value.value,
            onUpdateValue: (val) => {
              formItem.value.value = val
            },
            placeholder: '请输入部门编号',
          },
          {
            prefix: () => DP_CODE_FLAG,
          }
        )
      },
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('请输入部门编号')
          return false
        }
        return true
      },
    },
  ] as Array<FormItem>
  export default defineComponent({
    name: 'Department',
    setup() {
      const table = useTable()
      const message = useMessage()
      const naiveDailog = useDialog()
      const tableColumns = useTableColumn(
        [
          {
            title: '部门名称',
            key: 'name',
          },
          {
            title: '部门编号',
            key: 'depCode',
          },
          {
            title: '排序',
            key: 'order',
          },
          {
            title: '状态',
            key: 'status',
            render: (rowData) => {
              return h(NSwitch, {
                value: !!rowData.status,
              })
            },
          },
          {
            title: '操作',
            key: 'actions',
            render: (rowData) => {
              return useRenderAction([
                {
                  label: '编辑',
                  onClick: onUpdateItem.bind(null, rowData),
                },
                {
                  label: '删除',
                  type: 'error',
                  onClick() {
                    onDeleteItem(rowData)
                  },
                },
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      const itemDataFormRef = ref<DataFormType | null>(null)
      const searchDataFormRef = ref<DataFormType | null>(null)
      const modalDialog = ref<ModalDialogType | null>(null)
      const post = usePost()
      function doRefresh() {
        post({
          url: getDepartmentList,
        })
          .then(table.handleSuccess)
          .then((res) => {
            const parentFormItem = itemFormOptions.find((it) => it.key === 'parentId') as FormItem
            ;(parentFormItem.optionItems as Array<SelectOption>).length = 0
            parentFormItem?.optionItems?.push(
              ...(res as unknown as Array<any>).map((it) => {
                return {
                  label: it.name,
                  value: it.id,
                }
              })
            )
          })
      }
      function filterItems(srcArray: Array<Department>, filterItem: Department) {
        for (let index = 0; index < srcArray.length; index++) {
          const element = srcArray[index]
          if (element.id === filterItem.id) {
            if (!_.isEmpty(element.children)) {
              message.error('当前部门下有子部门，不能删除')
              return
            }
            srcArray.splice(index, 1)
            return
          } else {
            if (!_.isEmpty(element.children)) {
              filterItems(element.children, filterItem)
            }
          }
        }
      }
      const onDeleteItem = (item: any) => {
        naiveDailog.warning({
          title: '提示',
          content: '确定要删除此信息，删除后不可恢复？',
          positiveText: '删除',
          negativeText: '再想想',
          onPositiveClick: () => {
            filterItems(table.dataList, item)
          },
        })
      }
      function onAddItem() {
        modalDialog.value?.toggle()
        nextTick(() => {
          itemDataFormRef.value?.reset()
        })
      }
      function onDataFormConfirm() {
        if (itemDataFormRef.value?.validator()) {
          modalDialog.value?.toggle()
          naiveDailog.success({
            title: '提示',
            positiveText: '确定',
            content:
              '模拟部门添加/编辑成功，数据为：' +
              JSON.stringify(itemDataFormRef.value.generatorParams()),
          })
        }
      }
      function onUpdateItem(item: any) {
        modalDialog.value?.toggle()
        nextTick(() => {
          itemFormOptions.forEach((it) => {
            const key = it.key
            const propName = item[key]
            if (propName) {
              if (it.key === 'depCode') {
                it.value.value = propName.replace(DP_CODE_FLAG, '')
              } else {
                it.value.value = propName
              }
            }
          })
        })
      }
      function rowKey(rowData: any) {
        return rowData.id
      }
      onMounted(doRefresh)
      return {
        itemDataFormRef,
        searchDataFormRef,
        onDataFormConfirm,
        tableColumns,
        onUpdateItem,
        ...table,
        onDeleteItem,
        onAddItem,
        searchOptions,
        itemFormOptions,
        rowKey,
        modalDialog,
      }
    },
  })
</script>
