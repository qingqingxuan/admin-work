<template>
  <div class="main-container">
    <n-grid :x-gap="10" :y-gap="10" :cols="6">
      <n-gi v-for="(item, index) of list" :key="index">
        <div class="flex items-center justify-center item">
          <span :class="[item.class]" :style="{ position: 'relative', zIndex: 1 }">{{
            item.label
          }}</span>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CssAnimation',
    data() {
      return {
        list: [
          {
            label: 'bubble-1',
            class: 'bubble-1 bubble',
          },
          {
            label: 'bubble-2',
            class: 'bubble-2 bubble',
          },
          {
            label: 'bubble-3',
            class: 'bubble-3 bubble',
          },
          {
            label: 'bubble-4',
            class: 'bubble-4 bubble',
          },
          {
            label: 'pillars-1',
            class: 'pillars-1',
          },
          {
            label: 'pillars-2',
            class: 'pillars-2',
          },
          {
            label: 'pillars-3',
            class: 'pillars-3',
          },
          {
            label: 'strike-through',
            class: 'strike-through',
          },
          {
            label: 'under-line-1',
            class: 'under-line-1',
          },
          {
            label: 'under-line-2',
            class: 'under-line-2',
          },
          {
            label: 'under-line-3',
            class: 'under-line-3',
          },
          {
            label: 'over-line-1',
            class: 'over-line-1',
          },
          {
            label: 'over-line-2',
            class: 'over-line-2',
          },
          {
            label: 'highlight-1',
            class: 'highlight-1',
          },
          {
            label: 'highlight-2',
            class: 'highlight-2',
          },
          {
            label: '未完待续…',
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/css-animi.scss';
  .item {
    background-color: #090821;
    color: #fff;
    min-height: 80px;
    border-radius: 5px;
    font-size: 18px;
    .bubble {
      padding: 0.5em 1em;
      font-size: inherit;
      background-color: hsl(236, 32%, 26%);
      overflow: hidden;
    }
  }
</style>
