import { Message } from '@arco-design/web-vue'
import { Ref, VNode } from 'vue'

export interface HeaderCellStyle {
  backgroundColor?: string
  color: string
}

export interface TableConfig {
  dataList: Array<any>
  stripe: boolean
  border: boolean
  size: string
  headerCellStyle: HeaderCellStyle
  height: string | number
  tableLoading: boolean
}

export interface SelectOptionItem {
  label: string
  value: any
}

export interface TableSearchItem {
  key: string | number
  label: string
  value: Ref<any>
  placeholder?: string
  associatedOption?: string
  onChange?: (value: any, associationItem: string) => void
  span?: number
}

export interface FormItem extends TableSearchItem {
  required?: boolean
  validator?: (value?: FormItem, message?: typeof Message) => boolean
  hidden?: boolean
  type?: string
  maxLength?: number
  rows?: number
  disabled?: Ref<boolean>
  optionItems?: Array<SelectOptionItem>
  path?: string
  reset?: (formItem?: FormItem) => void
  render?: (formItem: FormItem) => VNode
}

export interface LikeSearchModel {
  conditionItems: Array<TableSearchItem> | null
  extraParams?: (() => Record<string, any>) | Record<string, any>
}

export interface TablePropsType {
  title: string
  key: string
  sortIndex: number
  checked: boolean
}

// export type ModalDialogType = InstanceType<typeof ModalDialog>

export type ModalDialogType = InstanceType<
  typeof import('../components/common/ModalDialog.vue').default
>

// export type DataFormType = InstanceType<typeof import('../components/common/DataForm').default>

export type TableHeaderType = InstanceType<
  typeof import('../components/common/table-header/index.naive.vue').default
>

export type TableFooterType = InstanceType<
  typeof import('../components/common/TableFooter.vue').default
>
