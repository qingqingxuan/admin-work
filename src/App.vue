<template>
  <n-notification-provider>
    <n-message-provider>
      <n-loading-bar-provider>
        <router-view />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-notification-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'App',
  })
</script>
