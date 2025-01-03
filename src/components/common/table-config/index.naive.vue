<template>
  <n-space align="center">
    <n-checkbox v-model:checked="border" @update-checked="updateBorder">表格边框</n-checkbox>
    <n-tooltip class="item" trigger="hover" placement="top">
      刷新页面
      <template #trigger>
        <n-button circle type="warning" size="small" @click="doRefresh">
          <template #icon>
            <n-icon>
              <RefreshIcon />
            </n-icon>
          </template>
        </n-button>
      </template>
    </n-tooltip>
  </n-space>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { RefreshOutline as RefreshIcon } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'TableConfig',
    components: { RefreshIcon },
    emits: ['refresh', 'update-border'],
    setup(props, { emit }) {
      function doRefresh() {
        emit('refresh')
      }
      const border = ref(false)
      function updateBorder() {
        emit('update-border', border.value)
      }
      return {
        border,
        doRefresh,
        updateBorder,
      }
    },
  })
</script>
