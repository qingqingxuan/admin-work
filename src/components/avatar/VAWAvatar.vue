<template>
  <div class="vaw-avatar-container">
    <n-dropdown trigger="hover" :options="options" size="large" @select="handleSelect">
      <div class="action-wrapper">
        <div class="avatar">
          <n-avatar circle size="small" :src="state.userInfo.avatar" />
        </div>
        <span class="nick-name el-dropdown-link">
          <span>{{ state.userInfo.nickName }}</span> <i class="el-icon-arrow-down tip"></i>
        </span>
      </div>
    </n-dropdown>
  </div>
</template>

<script lang="ts">
  import { useDialog } from 'naive-ui'
  import { defineComponent } from 'vue'
  import { useLayoutStore } from '../../components/index'

  export default defineComponent({
    name: 'VAWAvatar',
    setup() {
      const store = useLayoutStore()
      const options = [
        {
          label: '个人中心',
          key: 'personal-center',
        },
        {
          label: '退出登录',
          key: 'logout',
        },
      ]
      function personalCenter() {
        ;(store as any).onPersonalCenter && (store as any).onPersonalCenter()
      }
      const dialog = useDialog()
      function logout() {
        // ElMessageBox({
        //   title: '提示',
        //   message: '是否要退出登录？',
        //   type: 'warning',
        //   confirmButtonText: '退出',
        //   cancelButtonText: '取消',
        //   showCancelButton: true
        // }).then(() => {
        //   store.onLogout && store.onLogout()
        // }).catch(() => {
        //   store.cancelLogout && store.cancelLogout()
        // })
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
