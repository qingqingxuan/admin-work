<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #table-config>
            <AddButton @add="onAddItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <a-table
          :bordered="false"
          :loading="tableLoading"
          :data="dataList"
          :row-key="rowKey"
          :pagination="false"
        >
          <template #columns>
            <a-table-column
              v-for="item of tableColumns"
              :key="item.key"
              :align="item.align"
              :title="(item.title as string)"
              :width="item.width"
              :data-index="(item.key as string)"
              :fixed="item.fixed"
            >
              <template v-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button status="success" size="mini" @click="onUpdateItem(record)">
                    编辑
                  </a-button>
                  <a-button status="danger" size="mini" @click="onDeleteItem(record)">
                    删除
                  </a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" :title="dialogTitle" @confirm="onDataFormConfirm">
      <a-form ref="formRef" :model="departmentModel" :labelCol="{ span: 4 }">
        <a-form-item label="上级部门" name="parentId">
          <a-select v-model="departmentModel.parentId" placeholder="请选择上级部门">
            <a-option v-for="item of dataList" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="部门名称"
          field="name"
          :rules="[
            { required: true, message: '请输入部门名称' },
            { min: 3, max: 10, message: '长度在 3 - 10个字符' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input placeholder="请输入部门名称" v-model="departmentModel.name"> </a-input>
        </a-form-item>
        <a-form-item
          label="部门编号"
          field="depCode"
          :rules="[
            { required: true, message: '请输入部门编号' },
            { min: 3, max: 10, message: '长度在 3 - 30个字符' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input placeholder="请输入部门编号" v-model="departmentModel.depCode">
            <template #prepend>
              {{ DP_CODE_FLAG }}
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="排序" name="order">
          <a-input-number v-model="departmentModel.order" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-radio-group v-model="departmentModel.status">
            <a-radio :value="1">正常</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { getDepartmentList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table.arco'
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import _ from 'lodash-es'
  import usePost from '@/hooks/usePost'
  import { Form, Message, Modal } from '@arco-design/web-vue'
  import type { ModalDialogType } from '@/types/components'
  interface Department {
    parentId: number | undefined
    id: number
    name: string
    depCode: string
    order: number
    status: number
    children?: Array<Department>
  }
  const DP_CODE_FLAG = 'dp_code_'
  export default defineComponent({
    name: 'Department',
    setup() {
      const table = useTable()
      const tableColumns = useTableColumn([
        {
          title: '部门名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '部门编号',
          key: 'depCode',
          dataIndex: 'depCode',
        },
        {
          title: '排序',
          key: 'order',
          dataIndex: 'order',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
        },
      ])
      const departmentModel = reactive<Department>({
        parentId: undefined,
        id: 0,
        name: '',
        depCode: '',
        order: 1,
        status: 1,
      })
      const formRef = ref<typeof Form>()
      const dialogTitle = ref()
      const rowKey = useRowKey('id')
      const modalDialog = ref<ModalDialogType | null>(null)
      const post = usePost()
      function doRefresh() {
        post({
          url: getDepartmentList,
        }).then(({ data = [] }) => {
          table.tableLoading.value = false
          table.dataList.length = 0
          table.dataList.push(...data)
          return data
        })
      }
      function filterItems(srcArray: Array<Department>, filterItem: Department) {
        for (let index = 0; index < srcArray.length; index++) {
          const element = srcArray[index]
          if (element.id === filterItem.id) {
            if (!_.isEmpty(element.children)) {
              Message.error('当前部门下有子部门，不能删除')
              return
            }
            srcArray.splice(index, 1)
            return
          } else {
            if (!_.isEmpty(element.children)) {
              filterItems(element.children as Array<Department>, filterItem)
            }
          }
        }
      }
      const onDeleteItem = (item: any) => {
        Modal.confirm({
          title: '提示',
          content: '确定要删除此信息，删除后不可恢复？',
          onOk() {
            filterItems(table.dataList, item)
          },
        })
      }
      function onAddItem() {
        dialogTitle.value = '添加部门'
        departmentModel.parentId = undefined
        departmentModel.id = 0
        departmentModel.status = 1
        departmentModel.depCode = ''
        departmentModel.name = ''
        departmentModel.order = 1
        modalDialog.value?.toggle()
      }
      function onDataFormConfirm() {
        formRef.value
          ?.validate()
          .then((error: any) => {
            if (error) {
              return
            }
            modalDialog.value?.close()
            Message.success('模拟部门添加/编辑成功，数据为：' + JSON.stringify(departmentModel))
          })
          .catch((error: any) => {
            console.log('error', error)
          })
      }
      function onUpdateItem(item: Department) {
        dialogTitle.value = '编辑部门'
        Object.keys(item).forEach((it) => {
          ;(departmentModel as any)[it] = (item as any)[it]
        })
        departmentModel.parentId = item.parentId
        modalDialog.value?.toggle()
      }
      onMounted(doRefresh)
      return {
        DP_CODE_FLAG,
        formRef,
        dialogTitle,
        departmentModel,
        ...table,
        rowKey,
        tableColumns,
        onUpdateItem,
        onDataFormConfirm,
        onDeleteItem,
        onAddItem,
        modalDialog,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-table-cell-expand-icon) {
    justify-content: center;
  }
</style>
