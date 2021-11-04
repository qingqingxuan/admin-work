<template>
  <div class="vaw-header-layout">
    <div class="logo-wrapper">
      <Logo :always-show="true" />
    </div>
    <div style="flex: 1"></div>
    <div v-if="state.device !== 'mobile'" class="right-wrapper">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLayoutStore } from '../../components/index'
  export default defineComponent({
    name: 'VAWHeader',
    setup() {
      const store = useLayoutStore()
      return {
        state: store?.state,
      }
    },
  })
</script>

<style scoped lang="scss">
  @import '../../assets/styles/variables.scss';
  .vaw-header-layout {
    height: $logoHeight;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);
    .logo-wrapper {
      width: $menuWidth;
    }
    .menu-wrapper {
      flex: 1;
      overflow: hidden;
    }
    .right-wrapper {
      height: 100%;
    }
    .avatar-wrapper {
      padding-right: 15px;
    }
  }
</style>
