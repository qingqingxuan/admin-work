<template>
  <div class="vaw-avatar-container">
    <n-dropdown trigger="hover" :options="options" size="large" @select="handleSelect">
      <div class="action-wrapper">
        <div class="avatar">
          <n-avatar circle size="small" :src="state.userInfo.avatar" />
        </div>
        <span class="nick-name">
          <span>{{ state.userInfo.nickName }}</span>
        </span>
      </div>
    </n-dropdown>
  </div>
</template>

<script lang="ts">
  import { useDialog, NIcon } from 'naive-ui'
  import { defineComponent, h } from 'vue'
  import { useLayoutStore } from '../../components/index'
  import { Menu, LogInOutline } from '@vicons/ionicons5'

  export default defineComponent({
    name: 'VAWAvatar',
    setup() {
      const store = useLayoutStore()
      const options = [
        {
          label: '个人中心',
          key: 'personal-center',
          icon: () =>
            h(NIcon, null, {
              default: () => h(Menu),
            }),
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: () =>
            h(NIcon, null, {
              default: () => h(LogInOutline),
            }),
        },
      ]
      function personalCenter() {
        ;(store as any).onPersonalCenter && (store as any).onPersonalCenter()
      }
      const dialog = useDialog()
      function logout() {
        dialog.warning({
          title: '提示',
          content: '是否要退出当前账号？',
          positiveText: '退出',
          negativeText: '再想想',
          onPositiveClick: () => {
            ;(store as any).onLogout && (store as any).onLogout()
          },
        })
      }
      function handleSelect(key: string) {
        switch (key) {
          case 'personal-center':
            personalCenter()
            break
          case 'logout':
            logout()
            break
        }
      }
      return {
        state: store?.state,
        options,
        handleSelect,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables.scss';
  .vaw-avatar-container {
    .action-wrapper {
      display: flex;
      align-items: center;
      .avatar {
        width: calc(#{$logoHeight} - 15px);
        height: calc(#{$logoHeight} - 15px);
        display: flex;
        align-items: center;
        & > img {
          border: 1px solid #f6f6f6;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .nick-name {
        margin-left: 10px;
        .tip {
          transform: rotate(0);
          transition: transform $transitionTime;
        }
      }
    }
  }
  .vaw-avatar-container:hover {
    cursor: pointer;
    .nick-name .tip {
      transform: rotate(180deg);
      transition: transform $transitionTime;
    }
  }
</style>
