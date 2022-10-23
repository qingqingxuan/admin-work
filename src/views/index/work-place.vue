<template>
  <div class="main-container">
    <n-card title="工作台" :content-style="{ padding: '10px' }" :header-style="{ padding: '10px' }">
      <n-grid :cols="4" :y-gap="15" item-responsive responsive="screen">
        <n-grid-item class="flex" span="4 s:2 m:2 l:2 xl:2 2xl:2">
          <div class="avatar-wrapper">
            <img :src="avatar" />
          </div>
          <div class="flex flex-col justify-around ml-3.5 flex-1">
            <div class="text-lg">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
            <div class="text-sm text-gray-500">今日有小雨，出门别忘记带伞哦~ </div>
          </div>
        </n-grid-item>
        <n-grid-item class="flex justify-end" span="4 s:2 m:2 l:2 xl:2 2xl:2">
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">项目数</div>
            <div class="text-xl">12</div>
          </div>
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">待办项</div>
            <div class="text-xl">3/20</div>
          </div>
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">当前日期</div>
            <div class="text-xl">{{ currentDate }}</div>
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-grid
      class="mt-4 mb-4"
      :y-gap="15"
      :x-gap="15"
      cols="2 s:2 m:3 l:6 xl:6 2xl:6"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) of fastActions" :key="index">
        <n-card @click="fastActionClick(item)">
          <div class="flex flex-col items-center justify-center">
            <span
              :class="[item.icon, 'iconfont']"
              :style="{ color: item.color, fontSize: '30px' }"
            ></span>
            <span class="mt-1">{{ item.title }}</span>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid
      class="mt-4 mb-4"
      :y-gap="15"
      :x-gap="15"
      cols="2 s:2 m:3 l:6 xl:6 2xl:6"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) of dataItems" :key="index">
        <ProjectItem :item="item" />
      </n-grid-item>
    </n-grid>

    <n-grid cols="1 s:1 m:2 l:2 xl:2 2xl:2" :y-gap="15" :x-gap="15" responsive="screen">
      <n-grid-item>
        <n-card
          title="项目进度"
          :content-style="{ padding: '5px' }"
          :header-style="{ padding: '10px' }"
        >
          <n-data-table :columns="columns" :data="dataSource" :pagination="false" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card
          title="项目动态"
          :content-style="{ padding: '5px' }"
          :header-style="{ padding: '10px' }"
        >
          <TodoItem v-for="(item, index) of waitingItmes" :key="index" :item="item" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import ProjectItem from './components/ProjectItem.vue'
  import TodoItem from './components/TodoItem.vue'
  import { computed, defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { random } from 'lodash-es'
  import useUserStore from '@/store/modules/user'
  import { DeviceType } from '@/store/types'
  import useAppConfigStore from '@/store/modules/app-config'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      ProjectItem,
      TodoItem,
    },
    setup() {
      const appConfigStore = useAppConfigStore()
      const waitingItmes = [
        {
          name: 'lyj',
          content: '哎哟，不错哟，加油',
          time: '04-04',
        },
        {
          name: '王总',
          content: '给经理打印文件',
          time: '04-04',
        },
        {
          name: '老李',
          content: '等到周末的时候和同事一起去逛街，买新衣服，买新手机，买包包，各种买买买',
          time: '04-02',
        },
        {
          name: '花哥',
          content: '新同事入职培训工作',
          time: '04-01',
        },
        {
          name: '清清玄',
          content: '给领导安排机票，酒店住宿等问题',
          time: '03-31',
        },
      ]
      const isMobileScreen = computed(() => {
        return appConfigStore.deviceType === DeviceType.MOBILE
      })
      const dataSource = [
        {
          key: '1',
          projectName: 'Arco Admin 开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 100,
          status: '完成',
        },
        {
          key: '2',
          projectName: '官网开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 90,
          status: '进行中',
        },
        {
          key: '3',
          projectName: '文档编写',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 80,
          status: '进行中',
        },
        {
          key: '4',
          projectName: '各版本升级工作',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
        {
          key: '5',
          projectName: '软文编写',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
        {
          key: '5',
          projectName: '工具编写',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
      ]
      const userStore = useUserStore()
      const avatar = computed(() => userStore.avatar)
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      return {
        isMobileScreen,
        waitingItmes,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Element UI',
          },
          {
            title: 'Vue Admin Work X',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Element Plus',
          },
          {
            title: 'Admin Work Pro',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'NaiveUI',
          },
          {
            title: 'Arco Work',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'ArcoDesign',
          },
          {
            title: 'Vue Admin Work A',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Antd',
          },
          {
            title: 'Admin Work',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'NaiveUI',
          },
        ],
        fastActions: [
          {
            title: '首页',
            icon: 'icon-dashboard-fill',
            path: '/',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '系统管理',
            path: '/system/department',
            icon: 'icon-setting-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '列表',
            path: '/list/table-custom',
            icon: 'icon-detail-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '表单',
            path: '/form/base-form-view',
            icon: 'icon-file-text-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '多级菜单',
            path: '/next/menu2/menu-2-1/menu-2-1-1',
            icon: 'icon-golden-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '更多功能',
            path: '/other/qrcode',
            icon: 'icon-appstore-fill',
            color: COLORS[random(0, COLORS.length)],
          },
        ],
        fastActionClick,
        dataSource,
        columns: [
          {
            title: '项目名',
            key: 'projectName',
          },
          {
            title: '开始时间',
            key: 'beginTime',
          },
          {
            title: '结束时间',
            key: 'endTime',
          },
          {
            title: '进度',
            key: 'progress',
          },
          {
            title: '状态',
            key: 'status',
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-wrapper {
    width: 3rem;
    height: 3rem;
    max-width: 3rem;
    max-height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
    }
  }
  .item-action {
    position: relative;
    padding: 0 30px;
  }
  .item-action::after {
    position: absolute;
    top: 20%;
    right: 0;
    height: 60%;
    content: '';
    display: block;
    width: 1px;
    background-color: #e0e0e0;
  }
  div.item-action:last-child::after {
    width: 0;
  }
  .fast-item-wrapper {
    border-right: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    height: 80px;
  }
  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }
  .el-link + .el-link {
    margin-bottom: 10px;
  }
</style>
