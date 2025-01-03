import { reactive, Ref, ref, shallowReactive } from 'vue'

import { TableFooterType, TableHeaderType } from '@/types/components'
import { TableColumnData } from '@arco-design/web-vue/es/table/interface'

type TableColumnPops = TableColumnData & { key: string | number }

interface Table {
  dataList: Array<any>
  bordered: Ref<boolean>
  striped: Ref<boolean>
  tableLoading: Ref<boolean>
  tableHeaderRef: Ref<TableHeaderType | null>
  tableFooterRef: Ref<TableFooterType | null>
  tableHeight: Ref<number>
  handleSuccess: (res: any) => Promise<any>
  useTableColumn: (columns: TableColumnPops[], options: TableColumnPops) => Array<any>
  indexColumn: {
    title: string
    key: string
    width: number
    dataIndex: string
  }
}

export const useTableHeight = async function (currentIns: any): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clientHeight =
        document.querySelector('.main-section')?.getBoundingClientRect().height || 0
      const tableHeaderHeight =
        document.querySelector('.arco-table-header')?.getBoundingClientRect().height || 41
      if (currentIns) {
        let tempHeight = tableHeaderHeight
        if (currentIns.refs.tableHeaderRef) {
          const header = (currentIns.refs as any).tableHeaderRef.$el
          tempHeight += header.clientHeight
        }
        if (currentIns.refs.tableFooterRef) {
          const footer = currentIns.refs.tableFooterRef.$el
          tempHeight += footer.clientHeight
        }
        resolve(clientHeight - tempHeight - 2)
      }
      resolve(150)
    }, 2000)
  })
}

export const useTable = function (): Table {
  const dataList = shallowReactive([]) as Array<any>
  const tableHeaderRef = ref<TableHeaderType | null>(null)
  const tableFooterRef = ref<TableFooterType | null>(null)
  const tableHeight = ref(200)
  const bordered = ref(false)
  const striped = ref(false)
  const tableLoading = ref(true)
  const handleSuccess = ({ data = [] }): Promise<any> => {
    tableLoading.value = false
    dataList.length = 0
    dataList.push(...data)
    return Promise.resolve(data)
  }
  return {
    dataList,
    tableHeaderRef,
    tableFooterRef,
    tableHeight,
    bordered,
    striped,
    tableLoading,
    handleSuccess,
    useTableColumn,
    indexColumn: useTableIndexColumn(),
  }
}

export const useRowKey = function (propName: string) {
  return propName
}

export const useRowSelection = function () {
  const type = ref('checkbox')
  const showCheckedAll = ref(true)
  const selectedRowKeys = ref<Array<string>>([])
  const onSelectionChange = (tempSelectRows: Array<string>) => {
    selectedRowKeys.value = tempSelectRows
  }
  return {
    type,
    showCheckedAll,
    selectedRowKeys,
    onSelectionChange,
  }
}

export const useTableColumn = function (
  columns: TableColumnPops[],
  options: TableColumnPops = { dataIndex: '', key: '', align: 'center' }
) {
  return columns.map((it) => {
    return {
      ...options,
      ...it,
    }
  })
}

export const useTableIndexColumn = function () {
  return {
    title: '序号',
    key: 'index',
    width: 80,
    dataIndex: 'index',
  }
}

export const usePagination = function (callback: () => void) {
  function onChange() {
    callback()
  }
  const paginationInfo = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageCount: 1,
    pageSizes: ['10', '20', '30', '40'],
    onChange,
    setTotalSize(totalSize: number) {
      paginationInfo.pageCount = totalSize
    },
  })
  return paginationInfo
}
