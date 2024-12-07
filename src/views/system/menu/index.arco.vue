<template>
  <div>
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<script setup lang="ts">
import useAppUI from '@/hooks/useAppUI';

const ui = useAppUI()
console.log(ui?.value);

</script>
