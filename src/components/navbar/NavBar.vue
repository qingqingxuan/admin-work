<template>
  <div class="vaw-nav-bar-wrapper">
    <Humburger />
    <Breadcrumb v-if="state.device !== 'mobile'" />
    <div style="flex: 1"></div>
    <div class="right-wrapper">
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
  import { RefreshOutline as RefreshIcon } from '@vicons/ionicons5'
  export default defineComponent({
    name: 'NavBar',
    components: { RefreshIcon },
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
  .vaw-nav-bar-wrapper {
    height: $logoHeight;
    max-height: $logoHeight;
    min-height: $logoHeight;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    .avatar-wrapper {
      padding-right: 15px;
    }
    .right-wrapper {
      height: 100%;
    }
  }
</style>
