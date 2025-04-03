<template>
  <n-notification-provider v-if="appComponentUI === 'naive'">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-notification-provider>
  <router-view v-else />
</template>

<script lang="ts">
  import { defineComponent, provide, ref } from 'vue'

  // 定义类型
  type AppUIComponent = 'naive' | string;

  const appComponentUI = ref<AppUIComponent>((window as any).__APP_UI_COMPONENT__);

  export default defineComponent({
    name: 'App',
    setup() {
      provide('componentUIName', appComponentUI);
      return {
        appComponentUI,
      }
    },
  })
</script>
