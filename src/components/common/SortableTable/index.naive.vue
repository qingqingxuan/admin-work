<template>
  <n-popover :style="{ width: '200px' }" placement="left-start" trigger="click">
    <template #default>
      <div style="border-bottom: 1px solid #f5f5f5" class="flex items-center justify-between">
        <n-checkbox
          v-model:checked="allChecked"
          :indeterminate="isIndeterminate"
          @update:checked="onAllChange"
        >
          全选
        </n-checkbox>
        <n-button type="text" class="text-right"> 重置 </n-button>
      </div>
      <draggable
        :list="innerTableProps"
        animation="500"
        tag="transition-group"
        item-key="key"
        @end="onUpdateValue"
      >
        <template #item="{ element }">
          <div class="flex pt-2 pb-2">
            <n-checkbox
              v-model:checked="element.checked"
              :label="element.prop"
              @update:checked="onChange"
            >
              {{ element.title }}
            </n-checkbox>
            <div class="flex-1"></div>
            <n-icon>
              <MenuIcon />
            </n-icon>
          </div>
        </template>
      </draggable>
    </template>
    <template #trigger>
      <n-button type="success" size="small" circle>
        <template #icon>
          <n-icon>
            <SettingsIcon />
          </n-icon>
        </template>
      </n-button>
    </template>
  </n-popover>
</template>

<script lang="ts">
  import { TablePropsType } from '@/types/components'
  import { defineComponent, PropType, reactive, ref, toRef } from 'vue'
  import draggable from 'vuedraggable'
  import { SettingsOutline as SettingsIcon } from '@vicons/ionicons5'
  import { Menu as MenuIcon } from '@vicons/ionicons5'
  export default defineComponent({
    name: 'SortableTable',
    components: { draggable, SettingsIcon, MenuIcon },
    props: {
      columns: {
        type: Array as PropType<TablePropsType[]>,
        require: true,
      },
    },
    emits: ['update'],
    setup(props, { emit }) {
      const tempTableProps = toRef(props, 'columns')
      const tempArray =
        tempTableProps.value
          ?.filter((it) => !!it.key)
          .map((it) => {
            return {
              ...it,
              checked: ref(true),
            } as TablePropsType
          }) || []
      const innerTableProps = reactive(tempArray)
      const isIndeterminate = ref(
        innerTableProps.filter((it) => it.checked).length !== innerTableProps.length
      )
      const allChecked = ref(innerTableProps.every((it) => it.checked))
      const onAllChange = (value: boolean) => {
        innerTableProps.forEach((it) => (it.checked = value))
        emit(
          'update',
          innerTableProps.filter((it) => it.checked)
        )
      }
      const onChange = () => {
        const checkedItems = innerTableProps.filter((it) => it.checked)
        allChecked.value = checkedItems.length === innerTableProps.length
        isIndeterminate.value =
          checkedItems.length > 0 && checkedItems.length !== innerTableProps.length
        emit('update', checkedItems)
      }
      const onReset = () => {
        innerTableProps.forEach((it) => (it.checked = true))
        onChange()
      }
      function onUpdateValue() {
        emit('update', innerTableProps)
      }
      return {
        innerTableProps,
        isIndeterminate,
        allChecked,
        onAllChange,
        onChange,
        onReset,
        onUpdateValue,
      }
    },
  })
</script>
