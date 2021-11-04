<template>
  <div class="logo-wrapper">
    <img v-if="showLogo" class="logo-img" src="../../assets/logo.png" />
    <div v-if="showTitle" :class="[!state.isCollapse || alwaysShow ? 'show-title' : 'close-title']">
      <span class="logo-title">{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLayoutStore } from '../../components/index'
  import { projectName } from '../../setting'
  export default defineComponent({
    name: 'Logo',
    props: {
      showTitle: {
        type: Boolean,
        default: true,
      },
      showLogo: {
        type: Boolean,
        default: true,
      },
      alwaysShow: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const store = useLayoutStore()
      return {
        state: store?.state,
        projectName,
      }
    },
  })
</script>
<style lang="scss" scoped>
  @import '../../assets/styles/variables.scss';
  .logo-wrapper {
    height: $logoHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px dashed var(--border-color);
    .logo-img {
      width: 30px;
    }
    .logo-title {
      font-weight: bold;
    }
    .show-title {
      transform: scale(1);
      width: auto;
      transition: transform 0.2s ease-in;
    }
    .close-title {
      transform: scale(0);
      width: 0;
    }
  }
</style>
