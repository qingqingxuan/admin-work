<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader ref="tableHeaderRef" :show-filter="false">
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
          :scroll="{ y: tableHeight }"
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
              <template v-if="item.key === 'index'" #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'routeName'" #cell="{ record }">
                {{ record.routeName ?? '系统默认  ' }}
              </template>
              <template v-else-if="item.key === 'icon'" #cell="{ record }">
                <component :is="record.icon || 'IconMenu'" style="font-size: 18px" />
              </template>
              <template v-else-if="item.key === 'cacheable'" #cell="{ record }">
                <a-tag size="small" :color="record.cacheable ? 'blue' : 'red'">
                  {{ record.cacheable ? '是' : '否' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'hidden'" #cell="{ record }">
                <a-tag size="small" :color="record.hidden ? 'blue' : 'red'">
                  {{ record.hidden ? '是' : '否' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'affix'" #cell="{ record }">
                <a-tag size="small" :color="record.affix ? 'blue' : 'red'">
                  {{ record.affix ? '是' : '否' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button status="success" @click="onUpdateItem(record)" size="mini">
                    编辑
                  </a-button>
                  <a-button status="danger" size="mini" @click="onDeleteItem(record)"
                    >删除</a-button
                  >
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog
      ref="modalDialog"
      :title="actionModel === 'add' ? '添加菜单' : '编辑菜单'"
      @confirm="onConfirm"
      content-height="50vh"
    >
      <a-form :model="{}" :wrapperCol="{ span: 18 }">
        <a-form-item
          :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
          :label="item.label"
          v-for="item of itemFormOptions"
          :key="item.key"
        >
          <template v-if="item.type === 'tree-select'">
            <a-tree-select
              v-model="item.value.value"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="item.placeholder"
              allow-clear
              :data="treeData"
            >
            </a-tree-select>
          </template>
          <template v-if="item.type === 'input'">
            <a-input
              v-model="item.value.value"
              :placeholder="item.placeholder"
              :disabled="item.disabled ? item.disabled.value : false"
            ></a-input>
          </template>
          <template v-if="item.type === 'icon'">
            <IconSelector v-model:value="item.value.value"></IconSelector>
          </template>
          <template v-if="item.type === 'switch'">
            <a-switch v-model="item.value.value"></a-switch>
          </template>
        </a-form-item>
      </a-form>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, h, onMounted, ref, Ref } from 'vue'
  import { post } from '@/api/http'
  import { getMenuList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table.arco'
  import { ModalDialogType, FormItem } from '@/types/components.arco'
  import { Message, Modal } from '@arco-design/web-vue'
  interface TreeItem {
    title: string
    key: string
    children?: TreeItem[]
  }
  export default defineComponent({
    name: 'Menu',
    setup() {
      const actionModel = ref('add')
      let tempItem: { menuUrl: string } | null = null
      const table = useTable()
      const treeData = ref<Array<TreeItem>>([])
      const modalDialog = ref<ModalDialogType | null>(null)
      const dataForm = ref()
      const rowKey = useRowKey('menuUrl')
      const tableColumns = useTableColumn([
        {
          title: '菜单名称',
          key: 'menuName',
          dataIndex: 'menuName',
        },
        {
          title: '菜单地址',
          key: 'menuUrl',
          dataIndex: 'menuUrl',
        },
        {
          title: '路由name',
          key: 'routeName',
          dataIndex: 'routeName',
        },
        {
          title: '菜单图标',
          key: 'icon',
          dataIndex: 'icon',
        },
        {
          title: '是否缓存',
          key: 'cacheable',
          dataIndex: 'cacheable',
        },
        {
          title: '是否隐藏',
          key: 'hidden',
          dataIndex: 'hidden',
        },
        {
          title: '是否固定标题栏',
          key: 'affix',
          dataIndex: 'affix',
          width: 150,
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
        },
      ])
      const itemFormOptions = [
        {
          label: '上级菜单',
          key: 'parentPath',
          value: ref(''),
          placeholder: '请选择上级菜单',
          type: 'tree-select',
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '菜单名称',
          key: 'menuName',
          required: true,
          type: 'input',
          placeholder: '请输入菜单名称',
          value: ref(''),
          validator: function () {
            if (!this.value.value) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '菜单地址',
          key: 'menuUrl',
          required: true,
          value: ref(''),
          type: 'input',
          disabled: ref(false),
          placeholder: '请输入菜单地址',
          validator: function () {
            if (!this.value.value) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '路由名称',
          key: 'routeName',
          type: 'input',
          placeholder: '请输入路由名称',
          value: ref(''),
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '外链地址',
          key: 'redirect',
          type: 'input',
          placeholder: '请输入外链地址',
          value: ref(''),
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '菜单图标',
          key: 'icon',
          type: 'icon',
          value: ref(''),
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '是否缓存',
          key: 'cacheable',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
        {
          label: '是否隐藏',
          key: 'hidden',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
        {
          label: '是否固定',
          key: 'affix',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
      ] as Array<FormItem>

      function transformRoutes(routes: any[], parentPath: string = '/'): TreeItem[] {
        const list: TreeItem[] = []
        routes
          .filter((it) => it.hidden !== true && it.fullPath !== parentPath)
          .forEach((it) => {
            const searchItem: TreeItem = {
              key: it.menuUrl,
              title: it.menuName,
            }
            if (it.children && it.children.length > 0) {
              searchItem.children = transformRoutes(it.children, it.fullPath)
            }
            list.push(searchItem)
          })
        return list
      }
      function doRefresh() {
        post({
          url: getMenuList,
          data: {},
        })
          .then(table.handleSuccess)
          .then((data) => {
            treeData.value = transformRoutes(data)
          })
          .catch(console.log)
      }
      function onAddItem() {
        actionModel.value = 'add'
        itemFormOptions.forEach((it) => {
          it.reset && it.reset()
          if (it.key === 'menuUrl') {
            ;(it.disabled as Ref<boolean>).value = false
          }
        })
        modalDialog.value?.show()
      }
      function onUpdateItem(item: any) {
        actionModel.value = 'edit'
        tempItem = item
        itemFormOptions.forEach((it) => {
          it.value.value = item[it.key] || null
          if (it.key === 'menuUrl' && it.disabled) {
            ;(it.disabled as Ref<boolean>).value = true
          }
        })
        modalDialog.value?.show()
      }
      function onConfirm() {
        if (actionModel.value === 'add') {
          if (itemFormOptions.every((it) => (it.validator ? it.validator() : true))) {
            modalDialog.value?.close()
            Message.success(
              '模拟创建菜单成功, 参数为:' +
                JSON.stringify(
                  itemFormOptions.reduce((pre, cur) => {
                    ;(pre as any)[cur.key] = cur.value.value || ''
                    return pre
                  }, {})
                )
            )
          }
        } else {
          if (itemFormOptions.every((it) => (it.validator ? it.validator() : true))) {
            modalDialog.value?.close()
            Message.success(
              '模拟修改菜单成功, 参数为:' +
                JSON.stringify(
                  itemFormOptions.reduce((pre, cur) => {
                    ;(pre as any)[cur.key] = cur.value.value || ''
                    return pre
                  }, {})
                )
            )
          }
        }
      }
      function onDeleteItem(item: any) {
        Modal.confirm({
          title: '提示',
          content: '是否要删除此数据？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            Message.success('模拟删除成功，参数为：' + JSON.stringify(item))
          },
        })
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        console.log(table.tableHeight.value)
        doRefresh()
      })
      return {
        rowKey,
        actionModel,
        modalDialog,
        dataForm,
        ...table,
        treeData,
        itemFormOptions,
        tableColumns,
        onAddItem,
        onDeleteItem,
        onUpdateItem,
        onConfirm,
      }
    },
  })
</script>
<style lang="less" scoped>
  :deep(.arco-table-cell-expand-icon) {
    justify-content: space-around;
  }
</style>
