<template>
  <n-button type="error" size="small" @click="onDelete">
    <template #icon>
      <n-icon>
        <TrashIcon />
      </n-icon>
    </template>
    删除
  </n-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Trash as TrashIcon } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'DeleteButton',
    components: {
      TrashIcon,
    },
    emits: ['delete'],
    setup(props, { emit }) {
      function onDelete() {
        emit('delete')
      }
      return {
        onDelete,
      }
    },
  })
</script>
