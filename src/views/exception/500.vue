<template>
  <div class="main-container">
    <ExceptionStatus status="500" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ExceptionStatus from './components/ExceptionStatus.vue'
  export default defineComponent({
    name: 'Page500',
    components: {
      ExceptionStatus,
    },
  })
</script>
