<template>
  <div id="tableHeaderContainer" class="relative" :style="{ zIndex: 9 }">
    <a-card :title="title" size="small" :bordered="isBordered">
      <template #extra v-if="showFilter">
        <a-space>
          <a-button type="primary" size="small" @click="doSearch">搜索</a-button>
          <a-button status="danger" size="small" @click="doResetSearch">重置</a-button>
        </a-space>
      </template>
      <slot name="search-content"></slot>
      <div class="flex justify-end">
        <slot name="table-config"></slot>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'TableHeader',
    props: {
      title: {
        type: String,
        default: '',
      },
      bordered: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['search', 'reset-search'],
    setup(props, { emit, slots }) {
      const showFilter = computed(() => !!slots['search-content'])
      const showSearchContent = ref(false)
      const target = ref<HTMLElement | null>(null)
      const isBordered = computed(() => props.bordered)
      onMounted(() => {
        nextTick(() => {
          target.value = document.getElementById('tableHeaderContainer')
        })
      })
      function doSearch() {
        showSearchContent.value = false
        emit('search')
      }
      function doResetSearch() {
        emit('reset-search')
      }
      return {
        showFilter,
        isBordered,
        showSearchContent,
        target,
        doSearch,
        doResetSearch,
      }
    },
  })
</script>
<style lang="less" scoped>
  :deep(.arco-drawer-footer) {
    border-bottom: 2px solid #f5f5f5;
  }
</style>
