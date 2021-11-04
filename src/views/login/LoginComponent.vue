<template>
  <div>
    <div class="login-container" v-if="!isMobileScreen">
      <div class="login-bg-wrapper">
        <img :src="ImageBg1" />
      </div>
      <div class="flex form-wrapper">
        <div class="left"></div>
        <div class="right">
          <div class="flex justify-center my-width flex-sub align-center">
            <div class="logo-wrapper">
              <img src="../../assets/logo.png" />
            </div>
            <div class="title margin-left">Vue Admin Work P</div>
          </div>
          <div class="mt-8 form-container">
            <div class="item-wrapper">
              <n-input
                v-model:value="username"
                placeholder="请输入用户名/手机号"
                prefix-icon="el-icon-user"
                clearable
              />
            </div>
            <div class="mt-4 item-wrapper">
              <n-input
                v-model:value="password"
                placeholder="请输入密码"
                type="password"
                clearable
                prefix-icon="el-icon-lock"
              />
            </div>
            <!-- <div class="item-wrapper">
            <VawVerify class="mt-4" @verify-success="onVerifySuccess" />
          </div> -->
            <div class="flex-sub"></div>
            <div class="mt-4">
              <n-button type="primary" class="login" :loading="loading" @click="onLogin">
                登录
              </n-button>
            </div>
          </div>
          <div class="mt-4 my-width flex-sub">
            <div class="flex justify-between">
              <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              <a :underline="false" type="primary">忘记密码？</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="m-login-container">
      <div class="header">
        <div class="the-p"> P </div>
        <div class="mt-4 text-lg font-bold text-white"> Vue Admin Work </div>
      </div>
      <div class="content">
        <n-input round placeholder="请输入用户名/手机号" size="large" v-model:value="username">
          <template #prefix>
            <n-icon>
              <PhoneIcon />
            </n-icon>
          </template>
        </n-input>
        <n-input
          class="mt-10"
          round
          placeholder="请输入密码"
          size="large"
          v-model:value="password"
          type="password"
          show-password-toggle
          :maxlength="8"
        >
          <template #prefix>
            <n-icon>
              <PasswordIcon />
            </n-icon>
          </template>
        </n-input>
        <n-button class="mt-20" round type="primary" block :loading="loading" @click="onLogin">
          登录
        </n-button>
        <div class="flex justify-between mt-4">
          <n-checkbox v-model:checked="autoLogin" color="#fff">自动登录</n-checkbox>
          <a class="text-white" type="primary">忘记密码？</a>
        </div>
      </div>
      <div class="footer">
        <n-divider>第三方登录</n-divider>
        <div class="flex justify-evenly">
          <n-icon color="#c3c3c3" size="30">
            <LogoAlipay />
          </n-icon>
          <n-icon color="#c3c3c3" size="30">
            <LogoGithub />
          </n-icon>
          <n-icon color="#c3c3c3" size="30">
            <LogoWechat />
          </n-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ImageBg1 from '@/assets/img_login_bg_01.jpg'
  import ImageMobileBg1 from '@/assets/img_login_mobile_bg_01.jpg'
  import { post, Response } from '@/api/http'
  import { login } from '@/api/url'
  import { UserState } from '@/store/types'
  import { useStore } from '@/store/store'
  import { useMessage } from 'naive-ui'
  import { useLayoutStore } from '@/components'
  import { DeviceType } from '@/types/store'
  import {
    PhonePortraitOutline as PhoneIcon,
    LockClosedOutline as PasswordIcon,
    LogoGithub,
    LogoAlipay,
    LogoWechat,
  } from '@vicons/ionicons5'
  export default defineComponent({
    name: 'Login',
    components: { PhoneIcon, PasswordIcon, LogoGithub, LogoAlipay, LogoWechat },
    setup() {
      const username = ref('admin')
      const password = ref('123456')
      const autoLogin = ref(true)
      const loading = ref(false)
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
      const message = useMessage()
      const layoutStore = useLayoutStore()
      const isMobileScreen = computed(() => {
        return layoutStore.state.device === DeviceType.MOBILE
      })
      const onLogin = () => {
        loading.value = true
        post({
          url: login,
          data: {
            username: username.value,
            password: password.value,
          },
        })
          .then(({ data }: Response) => {
            store.dispatch('user/saveUser', data as UserState).then(() => {
              router
                .replace({
                  path: route.query.redirect ? (route.query.redirect as string) : '/',
                })
                .then(() => {
                  loading.value = false
                })
            })
          })
          .catch((error) => {
            loading.value = false
            message.error(error.message)
          })
      }
      return {
        isMobileScreen,
        username,
        password,
        autoLogin,
        loading,
        onLogin,
        ImageBg1,
        ImageMobileBg1,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    .login-bg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .logo-wrapper {
      & img {
        width: 50px;
      }
      & img::after {
        content: '欢迎来到vue-admin-work-x';
      }
    }
    .login-footer-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      ::v-deep {
        .el-card {
          background-color: transparent;
        }
      }
    }
    .form-wrapper {
      position: absolute;
      top: 18.5%;
      left: 0;
      right: 0;
      bottom: 15.8%;
      @media screen and (max-width: 768px) {
        .left {
          display: none;
        }
        .right {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .my-width {
            width: 80%;
          }
          .title {
            display: block;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #34495e;
            text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
          }
          .form-container {
            width: 80%;
            min-height: 60%;
            text-align: center;
            background: rgba(183, 183, 183, 0.2);
            padding: 5%;
            border-radius: 5px;
            border: 2px solid #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-wrapper {
              width: 100%;
            }
            .login {
              width: 100%;
            }
          }
        }
      }
      @media screen and (min-width: 768px) and (max-width: 992px) {
        .left {
          display: none;
        }
        .right {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .my-width {
            width: 48%;
          }
          .title {
            display: block;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #5497ff;
          }
          .form-container {
            width: 50%;
            height: 60%;
            margin-bottom: 10%;
            text-align: center;
            background: rgba(183, 183, 183, 0.2);
            padding: 5%;
            border-radius: 5px;
            border: 2px solid #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-wrapper {
              width: 100%;
            }
            .login {
              width: 100%;
            }
          }
        }
      }
      @media screen and (min-width: 992px) {
        .left {
          display: block;
          flex: 1;
        }
        .right {
          margin-left: 10%;
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .my-width {
            width: 48%;
          }
          .title {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #5497ff;
          }
          .item-wrapper {
            width: 48%;
          }
          .login {
            width: 48%;
          }
        }
      }
    }
  }
  .m-login-container {
    position: relative;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    background: linear-gradient(#7a9ad7, #3b5a94, #133064);
    // background-image: url(../../assets/img_login_mobile_bg_01.jpg);
    .header {
      height: 25vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .the-p {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid #f5f5f5;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 56px;
        font-weight: bold;
      }
    }
    .top-line {
      background-image: linear-gradient(
        to right,
        rgba(117, 117, 117, 0.9) 25%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(117, 117, 117, 0.9) 75%
      );
      height: 1px;
      background-color: #ffffff;
    }
    .content {
      height: 40vh;
      margin: 5% 10%;
      border-radius: 10px;
      :deep(.n-input) {
        background-color: rgba(183, 183, 183, 0);
      }
      :deep(.n-input .n-input__input-el, .n-input .n-input__textarea-el) {
        color: #fff;
      }
      :deep(.n-checkbox .n-checkbox__label) {
        color: #fff;
      }
    }
    .footer {
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: 10%;
      :deep(.n-divider .n-divider__title) {
        color: #c3c3c3;
        font-size: 14px;
      }
      :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
        background-color: rgba(117, 117, 117);
      }
    }
  }
</style>
