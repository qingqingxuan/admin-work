<template>
  <a-tabs style="width: 280px" size="small">
    <a-tab-pane key="unread">
      <template #title>
        <span>
          <icon-email />
          未读
        </span>
      </template>
      <a-list :bordered="false">
        <a-list-item v-for="(item, index) of data" :key="index">
          <a-list-item-meta :title="item.title" description="各部门主管，下午三点在大会议室开会">
            <template #avatar>
              <a-avatar :style="{ backgroundColor: '#3370ff' }">
                <IconUser />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-tab-pane>
    <a-tab-pane key="read">
      <template #title>
        <span>
          <icon-email />
          已读
        </span>
      </template>
      <a-list :bordered="false">
        <a-list-item v-for="(item, index) of data" :key="index">
          <a-list-item-meta :title="item.title" description="各部门主管，下午三点在大会议室开会">
            <template #avatar>
              <a-avatar :style="{ backgroundColor: '#ff0000' }">
                <IconUser />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-tab-pane>
    <template #extra>
      <a-button type="text" size="small">清空</a-button>
      <a-button type="text" status="success" size="small">更多</a-button>
    </template>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const data = [
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
      ]
      return {
        data,
      }
    },
  })
</script>
<style lang="less" scoped>
  :deep(.arco-list-medium > .arco-list-content > .arco-list-item) {
    padding: 0 !important;
  }
</style>
