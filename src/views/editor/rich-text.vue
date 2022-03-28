<template>
  <div class="main-container">
    <n-card
      title="文章标题"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '5px' }"
    >
      <n-input v-model="title" class="title-input" placeholder="请输入文章标题" />
    </n-card>
    <n-card
      title="文章内容"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '10px' }"
      class="mt-4"
    >
      <template #header-extra>
        <div class="flex">
          <n-space justify="end">
            <n-button type="primary" size="small" @click="setHtmlContent"
              >设置（回显）数据
            </n-button>
            <n-button type="primary" size="small" @click="getHtmlContent">获取HTML</n-button>
            <n-button type="warning" size="small" @click="getJsonContent">获取JSON</n-button>
          </n-space>
        </div>
      </template>
      <RichTextEditor ref="richTextEditor" :height="400" />
    </n-card>
    <div v-if="htmlContent" class="p-4 mt-4 priview-content" v-html="htmlContent"> </div>
    <div v-if="jsonContent" class="p-4 mt-4 priview-content">
      {{ jsonContent }}
    </div>
  </div>
</template>

<script lang="ts">
  import RichTextEditor from '../../components/common/RichTextEditor.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'RichText',
    components: { RichTextEditor },
    data() {
      return {
        title: '',
        htmlContent: '',
        jsonContent: '',
      }
    },
    methods: {
      getHtmlContent() {
        this.htmlContent = (
          this.$refs.richTextEditor as InstanceType<typeof RichTextEditor>
        ).getHtmlContent()
      },
      setHtmlContent() {
        const delta = {
          ops: [
            { insert: 'Hello ' },
            { insert: 'World', attributes: { bold: true } },
            { insert: '\n' },
          ],
        }
        ;(this.$refs.richTextEditor as InstanceType<typeof RichTextEditor>).setContents(delta)
      },
      getJsonContent() {
        this.jsonContent = (
          this.$refs.richTextEditor as InstanceType<typeof RichTextEditor>
        ).getJsonContent()
      },
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.ql-container.ql-snow) {
    border: none;
  }
  :deep(.ql-toolbar.ql-snow) {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  :deep(.ql-editor.ql-blank::before) {
    color: #afb4bd;
    font-size: 14px;
    font-style: normal;
  }
  .dark .priview-content {
    background: #5a5a5a;
    color: #fff;
  }
  .light .priview-content {
    background: #fff;
    color: #333;
  }
</style>
