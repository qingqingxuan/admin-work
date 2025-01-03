<template>
  <div class="loading-wrapper">
    <n-spin />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LoadingComponent',
  })
</script>

<style lang="scss" scoped>
  .loading-wrapper {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
