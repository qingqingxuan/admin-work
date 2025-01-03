<template>
  <a-modal v-model:visible="showModal" :title="title" class="modal-dialog-wrapper">
    <a-scrollbar class="modal-dialog__wrap">
      <slot></slot>
    </a-scrollbar>
    <template #footer>
      <a-space>
        <a-button @click="onCancel">取消</a-button>
        <a-button type="primary" @click="onConfirm">确定</a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'ModalDialog',
    props: {
      title: {
        type: String,
        default: '操作',
      },
      contentHeight: {
        type: String,
        default: '30vh',
      },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
      const showModal = ref(false)
      function toggle() {
        showModal.value = !showModal.value
        return Promise.resolve(showModal.value)
      }
      function show() {
        showModal.value = true
        return Promise.resolve(true)
      }
      function close() {
        showModal.value = false
        return Promise.resolve(false)
      }
      function onConfirm() {
        emit('confirm')
      }
      function onCancel() {
        showModal.value = false
        emit('cancel')
      }
      return {
        showModal,
        toggle,
        show,
        close,
        onConfirm,
        onCancel,
      }
    },
  })
</script>
<style>
  .modal-dialog__wrap {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
