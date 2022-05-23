<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #table-config>
            <TableConfig @update-border="onUpdateBorder" @refresh="doRefresh" />
            <SortableTable class="ml-4" :columns="tableColumns" @update="onUpdateTable" />
          </template>
          <template #top-right>
            <DeleteButton @delete="onDeleteItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          :loading="tableLoading"
          :single-line="!bordered"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
          @update:checked-row-keys="handleSelectionChange"
        />
      </template>
      <template #footer>
        <TableFooter :pagination="pagination" />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { renderTag } from '@/hooks/form'
  import { usePagination, useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import { TablePropsType } from '@/types/components'
  import { sortColumns } from '@/utils'
  import { DataTableColumn, NAvatar, useDialog, useMessage } from 'naive-ui'
  import { defineComponent, h, onMounted, reactive } from 'vue'
  export default defineComponent({
    name: 'TableCustom',
    setup() {
      const table = useTable()
      const pagination = usePagination(doRefresh)
      const navieDialog = useDialog()
      const message = useMessage()
      const rowKey = useRowKey('id')
      const tableColumns = reactive(
        useTableColumn(
          [
            table.selectionColumn,
            table.indexColumn,
            {
              title: '名称',
              key: 'nickName',
            },
            {
              title: '性别',
              key: 'gender',
              width: 80,
              render: (rowData) => {
                return h('div', rowData.gender === 0 ? '男' : '女')
              },
            },
            {
              title: '头像',
              key: 'avatar',
              render: (rowData: any) => {
                return h(
                  NAvatar,
                  {
                    circle: true,
                    size: 'small',
                  },
                  { default: () => rowData.nickName.substring(0, 1) }
                )
              },
            },
            {
              title: '地址',
              key: 'address',
            },
            {
              title: '名称',
              key: 'nickName',
            },
            {
              title: '上次登录时间',
              key: 'lastLoginTime',
            },
            {
              title: '上次登录IP',
              key: 'lastLoginIp',
            },
            {
              title: '状态',
              key: 'status',
              render: (rowData) =>
                renderTag(!!rowData.status ? '正常' : '禁用', {
                  type: !!rowData.status ? 'success' : 'error',
                  size: 'small',
                }),
            },
          ],
          {
            align: 'center',
          } as DataTableColumn
        )
      )
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
            pagination.setTotalSize(res.totalSize)
          })
          .catch(console.log)
      }
      function onDeleteItem() {
        if (table.selectRows.value!.length !== 0) {
          navieDialog.warning({
            content: '是否要删除此数据，删除后不恢复？',
            positiveText: '删除',
            onPositiveClick: () => {
              message.success(
                '模拟删除成功，参数为：' +
                  JSON.stringify({
                    ids: table.selectRows.value!.join(','),
                  })
              )
            },
          })
        } else {
          message.error('请选择要删除的数据项')
        }
      }
      function onUpdateTable(newColumns: Array<TablePropsType>) {
        sortColumns(tableColumns, newColumns)
      }
      function onUpdateBorder(isBordered: boolean) {
        table.bordered.value = isBordered
      }
      onMounted(doRefresh)
      return {
        ...table,
        rowKey,
        tableColumns,
        pagination,
        onUpdateTable,
        onDeleteItem,
        doRefresh,
        onUpdateBorder,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    vertical-align: middle;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .avatar-vip {
      border: 2px solid #cece1e;
    }
    .vip {
      position: absolute;
      top: 0;
      right: -9px;
      width: 15px;
      transform: rotate(60deg);
    }
  }
  .gender-container {
    .gender-icon {
      width: 20px;
    }
  }
</style>
