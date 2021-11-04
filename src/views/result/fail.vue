<template>
  <div class="main-container">
    <n-card :body-style="{ padding: 0 }" shadow="never" class="container">
      <div class="text-center">
        <n-icon size="100" color="#ce1414">
          <CloseCircle />
        </n-icon>
      </div>
      <div class="result"> 提交失败 </div>
      <div class="tip"> 请核对并修改以下信息后，再重新提交。 </div>
      <n-card :body-style="{ padding: 0 }" class="text-center reason">
        <div class="text-lg text-bold margin-bottom">您提交的内容有如下错误：</div>
        <div class="reason-item"
          ><i class="el-icon-circle-close text-red margin-right-xs"></i>您的账户已被冻结
          <n-tag type="primary" class="margin-left" size="small"
            >立即解冻<i class="el-icon-arrow-right"></i
          ></n-tag>
        </div>
        <div class="reason-item"
          ><i class="el-icon-circle-close text-red margin-right-xs"></i>您的账户还不具备申请资格
          <n-tag :underline="false" type="primary" class="margin-left" size="small">
            立即升级
            <i class="el-icon-arrow-right"></i>
          </n-tag>
        </div>
      </n-card>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { CloseCircle } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'Fail',
    components: { CloseCircle },
  })
</script>

<style lang="scss" scoped>
  .container {
    padding: 50px;
    .icon {
      color: #ed4014;
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
    .reason {
      padding: 24px 40px;
      text-align: left;
      border-radius: 4px;
      margin-top: 30px;
      .title {
        margin-bottom: 16px;
        font-weight: 500;
        font-size: 16px;
      }
      .reason-item {
        font-size: 14px;
      }
      .reason-item + .reason-item {
        margin-top: 15px;
      }
    }
  }
</style>
