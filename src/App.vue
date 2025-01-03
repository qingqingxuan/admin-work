<template>
  <n-notification-provider v-if="appCompoentUI === 'naive'">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-notification-provider>
  <router-view v-else />
</template>

<script lang="ts">
  import { defineComponent, provide, ref } from 'vue'

  const appCompoentUI = ref((window as any).__APP_UI_COMPONENT__)

  export default defineComponent({
    name: 'App',
    setup() {
      provide('componentUIName', appCompoentUI)
      return {
        appCompoentUI,
      }
    },
  })
</script>
