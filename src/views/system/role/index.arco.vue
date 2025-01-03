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
          :pagination="false"
          :row-key="rowKey"
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
              <template v-else-if="item.key === 'gender'" #cell="{ record }">
                {{ record.gender === 1 ? '男' : '女' }}
              </template>
              <template v-else-if="item.key === 'avatar'" #cell="{ record }">
                <a-avatar>
                  <img :src="record.avatar" />
                </a-avatar>
              </template>
              <template v-else-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button status="success" size="mini" @click="onUpdateItem(record)"
                    >编辑</a-button
                  >
                  <a-button status="danger" size="mini" @click="onDeleteItem(record)"
                    >删除</a-button
                  >
                  <a-button status="warning" size="mini" @click="onShowMenu(record)">
                    菜单权限
                  </a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" :title="actionTitle" @confirm="onDataFormConfirm">
      <a-form :model="formModel">
        <a-form-item
          :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
          :label="item.label"
          v-for="item of formItems"
          :key="item.key"
        >
          <template v-if="item.type === 'input'">
            <a-input :placeholder="item.placeholder" v-model="item.value.value">
              <template #prepend v-if="item.key === 'roleCode'">
                {{ ROLE_CODE_FLAG }}
              </template>
            </a-input>
          </template>
          <template v-if="item.type === 'textarea'">
            <a-textarea
              v-model="item.value.value"
              :placeholder="item.placeholder"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </template>
        </a-form-item>
      </a-form>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="编辑菜单权限">
      <a-tree
        :data="menuData"
        checkable
        v-model:expanded-keys="defaultExpandedKeys"
        v-model:checked-keys="defaultCheckedKeys"
      />
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getMenuListByRoleId, getRoleList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table.arco'
  import { ModalDialogType, FormItem } from '@/types/components.arco'
  import { Message, Modal } from '@arco-design/web-vue'
  import { defineComponent, nextTick, onMounted, ref } from 'vue'
  const ROLE_CODE_FLAG = 'ROLE_'
  const formItems = [
    {
      label: '角色名称',
      type: 'input',
      key: 'name',
      value: ref(''),

      required: true,
      placeholder: '请输入角色名称',
      validator: function () {
        if (!this.value.value) {
          Message.error(this.placeholder || '')
          return false
        }
        return true
      },
    },
    {
      label: '角色编号',
      key: 'roleCode',
      value: ref(''),
      type: 'input',
      required: true,
      placeholder: '请输入角色编号',
      validator: function () {
        if (!this.value.value) {
          Message.error(this.placeholder || '')
          return false
        }
        return true
      },
    },
    {
      label: '角色描述',
      key: 'description',
      value: ref(''),
      type: 'textarea',
      placeholder: '请输入角色描述',
    },
  ] as FormItem[]
  function handleMenuData(
    menuData: Array<any>,
    defaultCheckedKeys: Array<string>,
    defaultExpandedKeys: Array<string>
  ) {
    const tempMenus = [] as Array<any>
    menuData.forEach((it) => {
      const tempMenu = {} as any
      tempMenu.key = it.menuUrl
      tempMenu.title = it.menuName
      defaultCheckedKeys.push(tempMenu.key as string)
      if (it.children) {
        defaultExpandedKeys.push(tempMenu.key as string)
        tempMenu.children = handleMenuData(it.children, defaultCheckedKeys, defaultExpandedKeys)
      }
      tempMenus.push(tempMenu)
    })
    return tempMenus
  }
  export default defineComponent({
    name: 'Role',
    setup() {
      const modalDialogRef = ref<ModalDialogType | null>(null)
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const table = useTable()
      const rowKey = useRowKey('id')
      const actionTitle = ref('添加角色')
      const menuData = ref([] as Array<any>)
      const tableColumns = useTableColumn([
        table.indexColumn,
        {
          title: '角色名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '角色编号',
          key: 'roleCode',
          dataIndex: 'roleCode',
        },
        {
          title: '角色描述',
          key: 'description',
          dataIndex: 'description',
        },
        {
          title: '创建时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
        },
      ])
      const defaultCheckedKeys = ref([] as Array<string>)
      const defaultExpandedKeys = ref([] as Array<string>)
      const formModel = ref({})
      function doRefresh() {
        post({
          url: getRoleList,
          data: {},
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function onAddItem() {
        actionTitle.value = '添加角色'
        modalDialogRef.value?.toggle()
        formItems.forEach((it) => {
          if (it.reset) {
            it.reset()
          } else {
            it.value.value = ''
          }
        })
      }
      function onUpdateItem(item: any) {
        actionTitle.value = '编辑角色'
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems.forEach((it) => {
            const key = it.key
            const propName = item[key]
            if (propName) {
              if (it.key === 'roleCode') {
                it.value.value = propName.replace(ROLE_CODE_FLAG, '')
              } else {
                it.value.value = propName
              }
            }
          })
        })
      }
      function onDeleteItem(data: any) {
        Modal.confirm({
          title: '提示',
          content: '是否要删除此角色？',
          cancelText: '取消',
          okText: '删除',
          onOk: () => {
            Message.success('模拟角色删除成功，参数为' + JSON.stringify(data))
          },
        })
      }
      function onDataFormConfirm() {
        if (formItems.every((it) => (it.validator ? it.validator() : true))) {
          modalDialogRef.value?.toggle()
          Message.success(
            '模拟菜单添加成功，参数为：' +
              JSON.stringify(
                formItems.reduce((pre, cur) => {
                  ;(pre as any)[cur.key] = cur.value.value
                  return pre
                }, {})
              )
          )
        }
      }
      function onShowMenu(item: any) {
        post({
          url: getMenuListByRoleId,
          data: {
            roleId: item.id,
          },
        })
          .then((res) => {
            menuData.value = []
            defaultCheckedKeys.value = []
            defaultExpandedKeys.value = []
            menuData.value = handleMenuData(
              res.data,
              defaultCheckedKeys.value,
              defaultExpandedKeys.value
            )
            menuModalDialogRef.value?.toggle()
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        ROLE_CODE_FLAG,
        modalDialogRef,
        menuModalDialogRef,
        rowKey,
        formModel,
        menuData,
        tableColumns,
        formItems,
        actionTitle,
        defaultCheckedKeys,
        defaultExpandedKeys,
        ...table,
        onAddItem,
        onDataFormConfirm,
        onShowMenu,
        onDeleteItem,
        onUpdateItem,
      }
    },
  })
</script>
