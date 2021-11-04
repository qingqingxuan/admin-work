<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #top-right>
        <n-button type="primary" size="small" @click="exportExcel">导出Excel </n-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <n-data-table ref="tableRef" :data="dataList" :columns="tableColumns" />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { useTable, useTableColumn } from '@/hooks/table'
  import { defineComponent, onMounted, ref, h } from 'vue'
  import XLSX from 'xlsx'
  import { DataTableColumn } from 'naive-ui'
  export default defineComponent({
    name: 'ExportExcel',
    setup() {
      const tableRef = ref(null)
      const table = useTable()
      const tableColumns = useTableColumn(
        [
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
        const workSheet = XLSX.utils.table_to_sheet((tableRef.value as any).$el)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
        XLSX.writeFile(workBook, 'tale-list.xlsx')
      }
      onMounted(doRefresh)
      return {
        tableRef,
        tableColumns,
        ...table,
        exportExcel,
      }
    },
  })
</script>
