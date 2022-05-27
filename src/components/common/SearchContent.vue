<template>
  <teleport to="body">
    <div v-show="show" class="search-content-container" @click.self="onClose">
      <n-el class="w-4/5 search-content-wrapper sm:w-1/2">
        <n-input-group>
          <n-input v-model:value="content" placeholder="请输入要搜索的内容" />
          <n-button type="primary" @click="onSearch">搜索</n-button>
        </n-input-group>
      </n-el>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'SearchContent',
    setup() {
      const show = ref(false)
      const content = ref('')
      function onClose() {
        show.value = false
        content.value = ''
      }
      function onShow() {
        show.value = true
      }
      function onSearch() {
        if (!content.value) {
          return
        }
        content.value = ''
        show.value = false
        window.open('https://www.baidu.com/s?wd=' + content.value)
      }
      return {
        show,
        content,
        onClose,
        onShow,
        onSearch,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .search-content-container {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    .search-content-wrapper {
      padding: 20px;
      padding-bottom: 50px;
      margin-top: 20vh;
      height: fit-content;
      border-radius: 5px;
      background-color: var(--card-color);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }
  }
</style>
