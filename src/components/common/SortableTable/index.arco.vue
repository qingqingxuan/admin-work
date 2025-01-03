<template>
  <a-popover :style="{ width: '200px' }" trigger="click" @popup-visible-change="onPopVisibleChange">
    <template #content>
      <div style="border-bottom: 1px solid #f5f5f5" class="flex items-center justify-between">
        <a-checkbox v-model="allChecked" @change="onAllChange"> 全选 </a-checkbox>
        <a-button type="text" class="text-right" @click="onReset"> 重置 </a-button>
      </div>
      <div class="pt-2 pb-2" id="sortColumnWrapper">
        <div class="column-item" v-for="item of innerTableProps" :key="item.key">
          <a-checkbox v-model="item.checked" :label="item.title" @change="onChange">
            {{ item.title }}
          </a-checkbox>
          <div class="flex-1"></div>
          <icon-menu class="handle-icon" />
        </div>
      </div>
    </template>
    <a-button type="primary" size="small" shape="circle">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </a-popover>
</template>

<script lang="ts">
  import { TablePropsType } from '@/types/components.arco'
  import { defineComponent, PropType, reactive, ref, toRef, nextTick } from 'vue'
  import Sortable from 'sortablejs'
  import { cloneDeep, isUndefined } from 'lodash-es'
  import { IconMenu, IconSettings } from '@arco-design/web-vue/es/icon'
  export default defineComponent({
    name: 'SortableTable',
    components: {
      IconMenu,
      IconSettings,
    },
    props: {
      columns: {
        type: Array as PropType<TablePropsType[]>,
        require: true,
      },
    },
    emits: ['update'],
    setup(props, { emit }) {
      const tempTableProps = toRef(props, 'columns')
      const originColumns = cloneDeep<TablePropsType[]>(tempTableProps.value!)
      const tempArray =
        tempTableProps.value
          ?.filter((it) => !!it.key)
          .map((it) => {
            return {
              ...it,
              checked: true,
            } as TablePropsType
          }) || []
      const innerTableProps = reactive<TablePropsType[]>(tempArray)
      const isIndeterminate = ref(
        innerTableProps.filter((it) => it.checked).length !== innerTableProps.length
      )
      const allChecked = ref(innerTableProps.every((it) => it.checked))
      function onAllChange(value: any) {
        innerTableProps.forEach((it) => (it.checked = value))
        onUpdateValue(innerTableProps.filter((it) => it.checked))
      }
      const onChange = () => {
        const checkedItems = innerTableProps.filter((it) => it.checked)
        allChecked.value = checkedItems.length === innerTableProps.length
        isIndeterminate.value =
          checkedItems.length > 0 && checkedItems.length !== innerTableProps.length
        onUpdateValue(checkedItems)
      }
      const onReset = () => {
        innerTableProps.length = 0
        innerTableProps.push(...originColumns)
        innerTableProps.forEach((it) => (it.checked = true))
        allChecked.value = true
        onUpdateValue(innerTableProps)
      }
      function onUpdateValue(columns: TablePropsType[]) {
        emit(
          'update',
          columns.filter((it) => it.checked)
        )
      }
      function onPopVisibleChange(visible: boolean) {
        if (visible) {
          nextTick(() => {
            new Sortable(document.getElementById('sortColumnWrapper') as HTMLElement, {
              handle: '.handle-icon',
              animation: 150,
              dataIdAttr: '',
              onEnd({ newIndex, oldIndex }) {
                if (isUndefined(newIndex) || isUndefined(oldIndex)) {
                  return
                }
                const originItem = innerTableProps[oldIndex]
                if (newIndex > oldIndex) {
                  innerTableProps.splice(newIndex + 1, 0, originItem)
                  innerTableProps.splice(oldIndex, 1)
                } else {
                  innerTableProps.splice(newIndex, 0, originItem)
                  innerTableProps.splice(oldIndex + 1, 1)
                }
                onUpdateValue(innerTableProps)
              },
            })
          })
        }
      }
      return {
        innerTableProps,
        isIndeterminate,
        allChecked,
        onAllChange,
        onChange,
        onReset,
        onUpdateValue,
        onPopVisibleChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  .column-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    .handle-icon {
      &:hover {
        cursor: move;
      }
    }
  }
</style>
