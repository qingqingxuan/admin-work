<template>
  <n-card :header-style="{ padding: '10px' }" title="图标选择器" segmented>
    <n-space justify="center">
      <IconSelector @selected="onSelectedIcon" />
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui'

  const message = useMessage()
  function onSelectedIcon(item: any) {
    message.success('已选择：' + item.name + ' 图标')
  }
</script>
