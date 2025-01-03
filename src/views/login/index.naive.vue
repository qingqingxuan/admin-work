<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="theme">
    <LoginComponent />
  </n-config-provider>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { ThemeMode } from '@/store/types'
  import { darkTheme } from 'naive-ui'
  import { computed, defineComponent } from 'vue'
  import LoginComponent from './LoginComponent.vue'
  export default defineComponent({
    name: 'Login',
    components: { LoginComponent },
    setup() {
      const appConfig = useAppConfigStore()
      const theme = computed(() => {
        return appConfig.theme === ThemeMode.DARK ? darkTheme : null
      })
      const themeOverrides = computed(() => {
        return {
          common: {
            primaryColor: appConfig.themeColor,
            primaryColorHover: appConfig.themeColor,
          },
        }
      })
      return {
        theme,
        themeOverrides,
      }
    },
  })
</script>
<style>
  @keyframes grow {
    from {
      width: 0;
    }
    to {
      width: 80vw;
    }
  }

  @keyframes blink {
    from {
      border-right-color: #eee;
    }
    to {
      border-right-color: #222;
    }
  }
  @keyframes blink-arrow {
    from {
      color: #222;
    }
    to {
      color: #eee;
    }
  }
</style>
<style lang="scss" scoped>
  .splash-container {
    background-color: rgba($color: #000000, $alpha: 1);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    @mixin bg-img {
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.9) 25%,
        rgba(0, 0, 0, 0.1) 50%,
        rgba(0, 0, 0, 0.9) 75%
      );
      position: absolute;
      left: 10%;
      right: 10%;
      height: 2px;
      width: 80%;
      background-color: #ffffff;
    }
    .top-line {
      top: 10vh;
      transform: translateX(-120%);
      @include bg-img();
    }
    .bottom-line {
      bottom: 10vh;
      transform: translateX(120%);
      @include bg-img();
    }
    .animation-line {
      transform: translateX(0);
      transition: transform 1s ease-in-out;
    }
    .center-text {
      width: 80vw;
      border-right: 2px solid #eee;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      animation: grow 4s steps(35) 1.5s normal both, blink 1s steps(35) infinite normal;
      .the {
        font-size: 14px;
      }
      .p-text {
        font-size: 80px;
      }
    }
  }
  .arrow {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20px;
    text-align: center;
    .arrow-icon {
      font-size: 30px;
      animation: blink-arrow 1s linear infinite alternate;
    }
  }
  .show-splash {
    transform: translateY(0);
    transition: transform 0.5s linear;
  }
  .hidden-splash {
    transform: translateY(-100%);
    transition: transform 0.5s linear;
  }
  .login-wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .show-login {
    top: 0;
    transition: top 0.5s linear;
  }
  .hidden-login {
    top: 100vh;
    transition: top 0.5s linear;
  }
</style>
