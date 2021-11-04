<template>
  <div class="main-container">
    <div class="editor-container">
      <MarkdownEditor
        ref="markdownEditor"
        v-model="editorText"
        :height="400"
        placeholder="Insert here…"
      />
    </div>
    <div class="mt-5">
      <n-space>
        <n-button size="small" @click="addText">增加文本</n-button>
        <n-button size="small" @click="addImage">增加图片</n-button>
        <n-button size="small" type="primary" @click="getHTML">预览HTML</n-button>
      </n-space>
    </div>
    <div v-if="priviewContent" class="p-4 mt-4 priview-content" v-html="priviewContent"></div>
  </div>
</template>

<script lang="ts">
  import MarkdownEditor from '../../components/common/MarkdownEditor.vue'
  import { defineComponent } from 'vue'
  import SimpleMDE from 'simplemde'

  export default defineComponent({
    name: 'Markdown',
    components: {
      MarkdownEditor,
    },
    data() {
      return {
        editorText: '',
        priviewContent: '',
      }
    },
    methods: {
      addText() {
        ;(this.$refs.markdownEditor as InstanceType<typeof MarkdownEditor>).addText(
          '\n### 新增内容'
        )
      },
      addImage() {
        ;(this.$refs.markdownEditor as InstanceType<typeof MarkdownEditor>).addImage(
          '\n![](https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png)'
        )
      },
      getHTML() {
        this.priviewContent = (SimpleMDE.prototype as any).markdown(this.editorText)
      },
    },
  })
</script>

<style lang="scss" scoped>
  .editor-container {
    position: relative;
  }
  .theme-dark .priview-content {
    background: #5a5a5a;
    color: #fff;
  }
  .priview-content {
    background: #fff;
    color: #333;
  }
</style>
