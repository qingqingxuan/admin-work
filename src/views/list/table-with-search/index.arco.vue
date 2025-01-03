<template>
  <div class="main-container">
    <TableBody ref="tableBody">
      <template #header>
        <TableHeader
          ref="tableHeaderRef"
          :show-filter="true"
          title="表格搜索"
          @search="onSearch"
          @reset-search="onResetSearch"
        >
          <template #search-content>
            <a-form layout="inline" :model="{}">
              <a-row>
                <a-col v-for="item of conditionItems" :key="item.key" :span="8">
                  <a-form-item :label="item.label">
                    <template v-if="item.render">
                      <FormRender :render="item.render" :formItem="item" />
                    </template>
                    <template v-else>
                      <template v-if="item.type === 'input'">
                        <a-input v-model="item.value.value" :placeholder="item.placeholder" />
                      </template>
                      <template v-if="item.type === 'select'">
                        <a-select v-model="item.value.value" :placeholder="item.placeholder">
                          <a-option
                            v-for="optionItem of item.optionItems"
                            :key="optionItem.value"
                            :value="optionItem.value"
                          >
                            {{ optionItem.label }}
                          </a-option>
                        </a-select>
                      </template>
                      <template v-if="item.type === 'date'">
                        <a-date-picker v-model="item.value.value" />
                      </template>
                      <template v-if="item.type === 'time'">
                        <a-time-picker v-model="item.value.value" value-format="HH:mm:ss" />
                      </template>
                    </template>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </template>
        </TableHeader>
      </template>
      <a-table
        :bordered="false"
        :row-selection="{ selectedRowKeys, showCheckedAll }"
        :loading="tableLoading"
        :data="dataList"
        :columns="tableColumns"
        :pagination="false"
        :rowKey="rowKey"
        :scroll="{ y: tableHeight }"
        @selection-change="onSelectionChange"
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
              <a-avatar
                :autocapitalize="30"
                :style="{ backgroundColor: 'var(--color-primary-light-1)' }"
              >
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
      <template #footer>
        <TableFooter ref="tableFooterRef" :pagination="pagination" />
      </template>
    </TableBody>
  </div>
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
  import FormRender from '@/components/common/FormRender'
  import { FormItem } from '@/types/components.arco'
  import { Input, Message } from '@arco-design/web-vue'
  import { defineComponent, h, onMounted, ref, getCurrentInstance } from 'vue'
  import type { Dayjs } from 'dayjs'
  const conditionItems: Array<FormItem> = [
    {
      key: 'name',
      label: '用户姓名',
      type: 'input',
      placeholder: '请输入用户姓名',
      value: ref(''),
      reset: function () {
        this.value.value = ''
      },
      render: (formItem: FormItem) => {
        return h(Input, {
          placeholder: '这是render渲染的',
          modelValue: formItem.value.value,
          'onUpdate:modelValue': (value) => {
            formItem.value.value = value
          },
        })
      },
    },
    {
      key: 'date',
      label: '创建日期',
      type: 'date',
      value: ref<Dayjs>(),
    },
    {
      key: 'sex',
      label: '用户姓别',
      value: ref(),
      type: 'select',
      placeholder: '请选择用户姓别',
      optionItems: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
      reset: function () {
        this.value.value = undefined
      },
    },
    {
      key: 'time',
      label: '创建时间',
      type: 'time',
      value: ref<string>(''),
    },
  ]
  export default defineComponent({
    name: 'TableWithSearch',
    components: {
      FormRender,
    },
    setup() {
      const searchForm = ref()
      const pagination = usePagination(doRefresh)
      const { selectedRowKeys, onSelectionChange, showCheckedAll } = useRowSelection()
      const table = useTable()
      const rowKey = useRowKey('id')
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
          width: 100,
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
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      function onSearch() {
        Message.success(
          '模拟查询成功，参数为：' +
            JSON.stringify(
              conditionItems.reduce((pre, cur) => {
                ;(pre as any)[cur.key] = cur.value.value
                return pre
              }, {})
            )
        )
      }
      function onResetSearch() {
        conditionItems.forEach((it) => {
          it.reset ? it.reset() : (it.value.value = '')
        })
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        console.log('tableHeight', table.tableHeight.value)
        doRefresh()
      })
      return {
        ...table,
        rowKey,
        pagination,
        searchForm,
        tableColumns,
        conditionItems,
        onSearch,
        onResetSearch,
        selectedRowKeys,
        showCheckedAll,
        onSelectionChange,
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
