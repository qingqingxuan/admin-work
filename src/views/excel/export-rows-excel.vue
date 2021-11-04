<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #top-right>
        <n-button type="primary" size="small" @click="exportExcel">导出选中的Excel </n-button>
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <n-data-table
          ref="tableRef"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
          @update:checked-row-keys="handleSelectionChange"
        />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import { DataTableColumn, useMessage } from 'naive-ui'
  import { defineComponent, h, onMounted, ref } from 'vue'
  import XLSX from 'xlsx'
  export default defineComponent({
    name: 'ExportRowsExcel',
    setup() {
      const tableRef = ref(null)
      const table = useTable()
      const message = useMessage()
      const selectRows = [] as Array<any>
      const rowKey = useRowKey('id')
      const tableColumns = useTableColumn(
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
            title: '地址',
            key: 'address',
          },
          {
            title: '上次登录时间',
            key: 'lastLoginTime',
          },
          {
            title: '上次登录IP',
            key: 'lastLoginIp',
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      function doRefresh() {
        post({
          url: getTableList,
          data: {
            page: 1,
            pageSize: 20,
          },
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function exportExcel() {
        if (selectRows.length === 0) {
          message.error('请选择要导出的行')
          return
        }
        const data = selectRows
          .map((it) => {
            return table.dataList.find((item: any) => item.id === it)
          })
          .map((it) => {
            return [
              it.nickName,
              it.gender === 0 ? '男' : '女',
              it.address,
              it.lastLoginTime,
              it.lastLoginIp,
            ]
          })
        data.unshift(['昵称', '性别', '地址', '上次登录时间', '上次登录IP'])
        const workSheet = XLSX.utils.aoa_to_sheet(data)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
        XLSX.writeFile(workBook, 'table-list.xlsx')
      }
      function handleSelectionChange(rows: Array<any>) {
        selectRows.length = 0
        selectRows.push(...rows)
      }
      onMounted(doRefresh)
      return {
        tableRef,
        ...table,
        tableColumns,
        rowKey,
        exportExcel,
        handleSelectionChange,
      }
    },
  })
</script>
