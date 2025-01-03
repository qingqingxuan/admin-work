<template>
  <div class="vaw-avatar-container">
    <a-dropdown trigger="hover" size="large" @select="handleSelect">
      <div class="action-wrapper">
        <div class="avatar">
          <a-avatar :size="30">
            <img :src="userStore.avatar" />
          </a-avatar>
        </div>
        <span class="nick-name">
          {{ userStore.nickName }}
        </span>
        <CaretDownOutlined class="tip" />
      </div>
      <template #content>
        <a-doption v-for="item of options" :key="item.key" :value="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          {{ item.label }}
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
  import { Modal } from '@arco-design/web-vue'
  import { defineComponent } from 'vue'
  import {
    IconUser as UserOutlined,
    IconPoweroff as LogoutOutlined,
    IconCaretDown as CaretDownOutlined,
  } from '@arco-design/web-vue/es/icon'
  import useUserStore from '@/store/modules/user'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'VAWavatar',
    components: { UserOutlined, LogoutOutlined, CaretDownOutlined },
    setup() {
      const userStore = useUserStore()
      const options = [
        {
          label: '个人中心',
          key: 'personal-center',
          icon: 'UserOutlined',
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: 'LogoutOutlined',
        },
      ]
      const router = useRouter()
      function personalCenter() {
        router.push('/personal/info')
      }
      function logout() {
        Modal.confirm({
          title: '提示',
          content: '是否要退出当前账号？',
          okText: '退出',
          cancelText: '再想想',
          onOk: () => {
            userStore.logout().then(() => {
              window.location.reload()
            })
          },
        })
      }
      function handleSelect(key: string) {
        console.log(key)
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
        userStore,
        options,
        handleSelect,
      }
    },
  })
</script>

<style lang="less" scoped>
@import "../../styles/variables.less";
  .vaw-avatar-container {
    .action-wrapper {
      display: flex;
      align-items: center;
      .avatar {
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
        margin: 0 5px;
        .tip {
          transform: rotate(0);
          transition: transform @transitionTime;
          margin-left: 2px;
        }
      }
    }
  }
  .vaw-avatar-container:hover {
    cursor: pointer;
    color: var(--primary-color);
    .tip {
      transform: rotate(180deg);
      transition: transform @transitionTime;
    }
  }
</style>
