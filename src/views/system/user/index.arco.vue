<template>
  <TableBody>
    <template #header>
      <TableHeader ref="tableHeaderRef" :show-filter="false">
        <template #table-config>
          <DeleteButton @delete="onDeleteItems" />
        </template>
      </TableHeader>
    </template>
    <a-table
      :bordered="false"
      :row-selection="{ selectedRowKeys }"
      :loading="tableLoading"
      :data="dataList"
      :pagination="false"
      :rowKey="rowKey"
      table-layout-fixed
      :scroll="{ y: tableHeight }"
      @selection-change="onSelectionChange"
    >
      <template #columns>
        <a-table-column
          v-for="item of tableColumns"
          :key="item.key"
          :align="item.align"
          :title="(item.title as string)"
          :data-index="(item.key as string)"
          :fixed="item.fixed"
        >
          <template v-if="item.key === 'index'" #cell="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template v-else-if="item.key === 'gender'" #cell="{ record }">
            <a-tag :color="record.gender === 1 ? 'green' : 'red'">
              {{ record.gender === 1 ? '男' : '女' }}
            </a-tag>
          </template>
          <template v-else-if="item.key === 'avatar'" #cell="{}">
            <a-avatar :size="30" :style="{ backgroundColor: 'var(--color-primary-light-1)' }">
              <IconUser />
            </a-avatar>
          </template>
          <template v-else-if="item.key === 'actions'" #cell="{ record }">
            <a-button status="danger" @click="onDeleteItem(record)" size="mini">删除</a-button>
          </template>
          <template v-else-if="item.key === 'status'" #cell="{ record }">
            <a-tag color="blue" size="small" v-if="record.status === 1">正常</a-tag>
            <a-tag color="red" size="small" v-else>禁用</a-tag>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <template #footer>
      <TableFooter ref="tableFooterRef" :pagination="pagination" />
    </template>
  </TableBody>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import {
    usePagination,
    useRowKey,
    useRowSelection,
    useTable,
    useTableColumn,
    useTableHeight,
  } from '@/hooks/table.arco'
  import { Message, Modal } from '@arco-design/web-vue'
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
  export default defineComponent({
    name: 'UserList',
    setup() {
      const table = useTable()
      const rowKey = useRowKey('id')
      const pagination = usePagination(doRefresh)
      const { selectedRowKeys, onSelectionChange } = useRowSelection()
      const tableColumns = useTableColumn([
        table.indexColumn,
        {
          title: '名称',
          key: 'nickName',
          dataIndex: 'nickName',
        },
        {
          title: '性别',
          key: 'gender',
          dataIndex: 'gender',
        },
        {
          title: '头像',
          key: 'avatar',
          dataIndex: 'avatar',
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address',
        },
        {
          title: '登录时间',
          key: 'lastLoginTime',
          dataIndex: 'lastLoginTime',
        },
        {
          title: '登录IP',
          key: 'lastLoginIp',
          dataIndex: 'lastLoginIp',
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
      const expandAllFlag = ref(true)
      function doRefresh() {
        post({
          url: getTableList,
          data: () => {
            return {
              page: pagination.page,
              pageSize: pagination.pageSize,
            }
          },
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize((res as any).totalSize)
          })
          .catch(console.log)
      }
      function onDeleteItems() {
        if (selectedRowKeys.value.length === 0) {
          Message.error('请选择要删除的数据')
          return
        }
        Modal.confirm({
          title: '提示',
          content: '确定要删除此数据吗？',
          cancelText: '取消',
          okText: '删除',
          onOk: () => {
            Message.success(
              '数据模拟删除成功，所选择的Keys为：' + JSON.stringify(selectedRowKeys.value)
            )
          },
        })
      }
      function onDeleteItem(item: any) {
        Modal.confirm({
          title: '提示',
          content: '确定要删除此数据吗？',
          cancelText: '取消',
          okText: '删除',
          onOk: () => {
            Message.success('数据删除成功')
            table.dataList.splice(table.dataList.indexOf(item), 1)
          },
        })
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        doRefresh()
      })
      return {
        ...table,
        rowKey,
        selectedRowKeys,
        onSelectionChange,
        expandAllFlag,
        tableColumns,
        pagination,
        onDeleteItem,
        onDeleteItems,
      }
    },
  })
</script>
