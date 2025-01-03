<template>
  <a-button type="primary" status="success" size="mini" @click="onAdd">
    <template #icon>
      <IconPlus />
    </template>
    添加
  </a-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AddButton',
    emits: ['add'],
    setup(props, { emit }) {
      function onAdd() {
        emit('add')
      }
      return {
        onAdd,
      }
    },
  })
</script>
