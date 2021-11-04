<template>
  <div class="relative">
    <n-card :content-style="{ padding: 0 }" class="container">
      <div class="text-center">
        <n-icon size="100" color="#0e7a0d">
          <CheckmarkCircle />
        </n-icon>
      </div>
      <div class="result"> 提交成功 </div>
      <div class="tip">
        提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message
        全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示
        “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
      </div>
      <div class="text-center action">
        <n-button type="primary" size="small">返回列表</n-button>
        <n-button size="small" class="ml-4 mr-4">查看项目</n-button>
        <n-button size="small">打印</n-button>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { CheckmarkCircle } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'Success',
    components: { CheckmarkCircle },
  })
</script>

<style lang="scss" scoped>
  .container {
    padding: 50px;
    .icon {
      color: #67c23a;
      font-size: 100px;
      margin: 30px 0;
    }
    .result {
      font-size: 24px;
      line-height: 1.8;
      text-align: center;
    }
    .tip {
      font-size: 14px;
      line-height: 1.6;
      text-align: center;
    }
    .action {
      margin-top: 30px;
    }
  }
</style>
