<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #table-config>
            <a-space>
              <SortableTable class="ml-4" :columns="tableColumns" @update="onUpdateTable" />
              <TableConfig
                @update-border="onUpdateBorder"
                @update-striped="onUpdateStriped"
                @refresh="doRefresh"
              />
            </a-space>
          </template>
        </TableHeader>
      </template>
      <template #default>
        <a-table
          :loading="tableLoading"
          :bordered="{ wrapper: bordered, cell: bordered }"
          :stripe="(striped as boolean)"
          :data="dataList"
          :pagination="false"
          :row-key="rowKey"
          :row-class-name="rowClassNameFun"
        >
          <template #columns>
            <a-table-column
              v-for="item of tableColumns"
              :data-index="(item.key as string)"
              v-bind="item"
              :key="item.key"
            >
              <template v-if="item.key === 'index'" #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'gender'" #cell="{ record }">
                {{ record.gender === 1 ? '男' : '女' }}
              </template>
              <template v-else-if="item.key === 'avatar'" #cell="{ record }">
                <a-avatar :size="30" :style="{ backgroundColor: 'var(--color-primary-light-1)' }">
                  {{ record.nickName.substring(0, 1) }}
                </a-avatar>
              </template>
              <template v-else-if="item.key === 'status'" #cell="{ record }">
                <a-tag color="blue" size="small" v-if="record.status === 1">正常</a-tag>
                <a-tag color="red" size="small" v-else>禁用</a-tag>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
      <template #footer>
        <TableFooter :pagination="pagination" position="end" />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { usePagination, useRowKey, useTable, useTableColumn } from '@/hooks/table.arco'
  import { TablePropsType } from '@/types/components.arco'
  import { sortColumns } from '@/utils/index.arco'
  import { Message, Modal } from '@arco-design/web-vue'
  import { defineComponent, onMounted, reactive } from 'vue'
  export default defineComponent({
    name: 'TableCustom',
    setup() {
      const table = useTable()
      const pagination = usePagination(doRefresh)
      const rowKey = useRowKey('id')
      const tableColumns = reactive(
        useTableColumn([
          table.indexColumn,
          {
            title: '名称',
            key: 'nickName',
            dataIndex: 'nickName',
            sortable: {
              sortDirections: ['ascend', 'descend'],
            },
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
        ])
      )
      console.log(tableColumns)

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
      function onDeleteItem(item: any) {
        if (item) {
          Modal.confirm({
            content: '是否要删除此数据，删除后不恢复？',
            okText: '删除',
            onOk: () => {
              Message.success('模拟删除成功，参数为：' + item.id)
            },
          })
        }
      }
      function onUpdateTable(newColumns: Array<TablePropsType>) {
        sortColumns(tableColumns, newColumns)
      }
      function onUpdateBorder(isBordered: boolean) {
        table.bordered.value = isBordered
      }
      function onUpdateStriped(isStriped: boolean) {
        table.striped.value = isStriped
      }
      function rowClassNameFun(_record: any, index: number) {
        return index % 2 === 1 && table.striped.value ? 'table-striped' : null
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
        onUpdateStriped,
        rowClassNameFun,
      }
    },
  })
</script>

<style lang="less" scoped>
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
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
