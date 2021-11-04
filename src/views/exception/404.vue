<template>
  <div class="main-container">
    <ExceptionStatus status="404" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ExceptionStatus from './components/ExceptionStatus.vue'
  export default defineComponent({
    name: 'Page404',
    components: {
      ExceptionStatus,
    },
  })
</script>
