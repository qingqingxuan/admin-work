<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #top-right>
            <AddButton @add="onAddItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          :loading="tableLoading"
          :data="dataList"
          :row-key="rowKey"
          :columns="tableColumns"
        />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" @confirm="onConfirm" content-height="50vh">
      <template #content>
        <DataForm ref="dataForm" :options="itemFormOptions" />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, h, onMounted, ref, Ref, unref } from 'vue'
  import { post } from '@/api/http'
  import { getMenuList } from '@/api/url'
  import {
    TableActionModel,
    useRenderAction,
    useRowKey,
    useTable,
    useTableColumn,
  } from '@/hooks/table'
  import { NIcon, useDialog, useMessage } from 'naive-ui'
  import { TableColumn } from 'naive-ui/lib/data-table/src/interface'
  import SvgIcon from '@/components/svg-icon/index.vue'
  import IconSelector from '@/components/common/IconSelector.vue'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import { renderInput, renderSwitch, renderTreeSelect } from '@/hooks/form'
  import { isExternal, transformTreeSelect } from '@/utils'
  import { findRouteByUrl } from '@/store/help'
  import usePermissionStore from '@/store/modules/permission'
  export default defineComponent({
    name: 'Menu',
    setup() {
      let actionModel = 'add'
      let tempItem: { menuUrl: string } | null = null
      const table = useTable()
      const naiveDialog = useDialog()
      const message = useMessage()
      const permissionStore = usePermissionStore()
      const modalDialog = ref<ModalDialogType | null>(null)
      const dataForm = ref<DataFormType | null>(null)
      const rowKey = useRowKey('menuUrl')
      const tableColumns = useTableColumn(
        [
          {
            title: '菜单名称',
            key: 'menuName',
          },
          {
            title: '菜单地址',
            key: 'menuUrl',
          },
          {
            title: '菜单图标',
            key: 'icon',
            render: (rowData) => {
              return rowData.iconPrefix === 'iconfont'
                ? h(SvgIcon, {
                    prefix: rowData.iconPrefix ? (rowData.iconPrefix as string) : 'iconfont',
                    name: rowData.icon ? (rowData.icon as string) : 'menu',
                  })
                : h(NIcon, null, {
                    default: () => {
                      return h(
                        'svg',
                        {
                          'aria-hidden': false,
                        },
                        {
                          default: () => {
                            return [
                              h('use', {
                                href: '#icon-menu',
                              }),
                            ]
                          },
                        }
                      )
                    },
                  })
            },
          },
          {
            title: '是否缓存',
            key: 'cacheable',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.cacheable ? '是' : '否') })
            },
          },
          {
            title: '是否隐藏',
            key: 'hidden',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.hidden ? '是' : '否') })
            },
          },
          {
            title: '是否固定标题栏',
            key: 'affix',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.affix ? '是' : '否') })
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
                  onClick: onDeleteItem.bind(null, rowData),
                },
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as TableColumn
      )
      const itemFormOptions = [
        {
          label: '上级菜单',
          key: 'parentPath',
          value: ref(null),
          validator: (formItem, message) => {
            if (!formItem.value.value) {
              message.error('请选择上级菜单')
              return false
            }
            return true
          },
          render: (formItem) =>
            renderTreeSelect(
              formItem.value,
              transformTreeSelect(unref(table.dataList)!, 'menuName', 'menuUrl'),
              {
                showPath: true,
              }
            ),
        },
        {
          label: '菜单名称',
          key: 'menuName',
          required: true,
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: '请输入菜单名称',
            }),
        },
        {
          label: '菜单地址',
          key: 'menuUrl',
          required: true,
          value: ref(null),
          disabled: ref(false),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: '请输入菜单地址',
              disabled: (formItem.disabled as Ref<boolean>).value,
            }),
          reset: (formItem) => {
            formItem.value.value = null
            ;(formItem.disabled as Ref<boolean>).value = false
          },
        },
        {
          label: '外链地址',
          key: 'outLink',
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: '请输入外链地址',
            }),
        },
        {
          label: '菜单图标',
          key: 'icon',
          value: ref(null),
          render: (formItem) => {
            return h(IconSelector, {
              defaultIcon: formItem.value.value,
              onUpdateIcon: (newIcon: any) => {
                formItem.value.value = newIcon.name
              },
            })
          },
        },
        {
          label: '是否缓存',
          key: 'cacheable',
          value: ref(false),
          render: (formItem) => renderSwitch(formItem.value),
        },
        {
          label: '是否隐藏',
          key: 'hidden',
          value: ref(false),
          render: (formItem) => renderSwitch(formItem.value),
        },
        {
          label: '是否固定',
          key: 'affix',
          value: ref(true),
          render: (formItem) => renderSwitch(formItem.value),
        },
      ] as Array<FormItem>
      function doRefresh() {
        post({
          url: getMenuList,
          data: {},
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function onAddItem() {
        actionModel = 'add'
        modalDialog.value?.show().then(() => {
          dataForm.value?.reset()
        })
      }
      function onUpdateItem(item: any) {
        actionModel = 'edit'
        tempItem = item
        itemFormOptions.forEach((it) => {
          it.value.value = item[it.key] || null
          if (it.key === 'menuUrl' && it.disabled) {
            if (isExternal(item.menuUrl)) {
              it.value.value = ''
            }
            ;(it.disabled as Ref<boolean>).value = true
          }
        })
        const external = itemFormOptions.find((it) => it.key === 'redirect')
        if (isExternal(item.menuUrl)) {
          external!.value.value = item.menuUrl
        }
        modalDialog.value?.show()
      }
      function onConfirm() {
        if (actionModel === 'add') {
          if (dataForm.value?.validator()) {
            message.success(
              '模拟创建菜单成功, 参数为:' + JSON.stringify(dataForm.value?.generatorParams())
            )
          }
        } else {
          if (dataForm.value?.validator()) {
            const params = dataForm.value?.generatorParams()
            if (tempItem) {
              const tempRoute = findRouteByUrl(
                permissionStore.getPermissionSideBar,
                tempItem.menuUrl
              )
              if (tempRoute && tempRoute.meta && tempRoute.meta.badge) {
                ;(tempRoute.meta as any).badge = (params as any).badge || ''
              }
            }
            message.success('模拟修改菜单成功, 参数为:' + JSON.stringify(params))
          }
        }
      }
      function onDeleteItem(item: any) {
        naiveDialog.warning({
          title: '提示',
          content: '是否要删除此数据？',
          positiveText: '删除',
          onPositiveClick: () => {
            message.success('模拟删除成功，参数为：' + JSON.stringify(item))
          },
        })
      }
      onMounted(doRefresh)
      return {
        rowKey,
        modalDialog,
        dataForm,
        ...table,
        itemFormOptions,
        tableColumns,
        onAddItem,
        onDeleteItem,
        onConfirm,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .icon-wrapper {
    list-style: none;
    border: 1px solid #f5f5f5;
    overflow: hidden;
    padding: 0;
    .icon-item {
      float: left;
      width: 25%;
      font-size: 26px;
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      text-align: center;
      cursor: pointer;
      & > div {
        font-size: 12px;
      }
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
  }
</style>
