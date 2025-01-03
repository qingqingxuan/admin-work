<template>
  <a-card
    :body-style="{ padding: 0, width: '100%' }"
    class="table-footer-container"
    :bordered="isBordered"
  >
    <div class="flex items-center" :class="[innerPosition]">
      <a-pagination
        v-model:current="pagination.page"
        v-model:pageSize="pagination.pageSize"
        :show-page-size="pagination.showSizePicker"
        :total="pagination?.pageCount"
        show-total
        @page-size-change="onPageSizeChange"
        @change="onChange"
        size="small"
      />
      <a-button
        v-if="showRefresh"
        style="margin-left: 10px"
        shape="circle"
        size="small"
        type="primary"
        @click="refresh"
      >
        <template #icon>
          <IconLoop style="font-size: 14px" />
        </template>
      </a-button>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { computed, defineComponent, toRef, PropType } from 'vue'
  import { IconLoop } from '@arco-design/web-vue/es/icon'

  export default defineComponent({
    name: 'TableFooter',
    components: {
      IconLoop,
    },
    props: {
      pagination: {
        type: Object,
        default: () => ({}),
        require: true,
      },
      showRefresh: {
        type: Boolean,
        default: true,
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String as PropType<'start' | 'center' | 'end'>,
        default: 'center',
      },
    },
    setup(props) {
      const pagination = toRef(props, 'pagination')
      const isBordered = computed(() => props.bordered)
      const innerPosition = computed(() => {
        return 'justify-' + props.position
      })
      function onChange(page: number) {
        ;(pagination as any).value.page = page
        ;(pagination as any).value.onChange()
      }
      function onPageSizeChange(pageSize: number) {
        ;(pagination as any).value.pageSize = pageSize
        ;(pagination as any).value.onChange()
      }
      function refresh() {
        ;(pagination as any).value.onChange()
      }
      return {
        isBordered,
        innerPosition,
        onChange,
        onPageSizeChange,
        refresh,
      }
    },
  })
</script>
<style lang="less" scoped>
  :deep(.arco-pagination-item-active) {
    color: var(--color-white);
  }
  :deep(.arco-pagination-item-active:hover) {
    color: var(--color-white);
  }
  .table-footer-container {
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
