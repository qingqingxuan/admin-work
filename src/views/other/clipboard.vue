<template>
  <n-card title="请输入内容" :content-style="{ padding: '10px' }">
    <n-input-group>
      <n-input :style="{ width: '50%' }" v-model:value="content" placeholder="请输入内容" />
      <n-button ghost type="primary" class="copy" :data-clipboard-text="content" @click="onCopy">
        复制
      </n-button>
    </n-input-group>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Clipboard from 'clipboard'
  import { useMessage } from 'naive-ui'

  export default defineComponent({
    name: 'Clipboard',
    setup() {
      const content = ref('')
      const message = useMessage()
      const onCopy = () => {
        const clipboard = new Clipboard('.copy')
        clipboard.on('success', (e) => {
          message.success('复制成功，内容为：' + e.text)
        })
      }
      return {
        content,
        onCopy,
      }
    },
  })
</script>
