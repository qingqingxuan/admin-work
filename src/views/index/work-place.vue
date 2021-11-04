<template>
  <div class="main-container">
    <n-card title="工作台" :content-style="{ padding: '10px' }" :header-style="{ padding: '10px' }">
      <div v-if="!isMobileScreen" class="flex margin-top">
        <div class="avatar-wrapper">
          <img :src="avatar" />
        </div>
        <div class="flex flex-col justify-around ml-3.5 flex-1">
          <div class="text-lg">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
          <div class="text-sm text-gray-500">
            <i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~
          </div>
        </div>
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
      </div>
      <div v-else>
        <div class="flex">
          <div class="mt-1 avatar-wrapper">
            <img :src="avatar" />
          </div>
          <div class="flex flex-col justify-around ml-4 flex-sub">
            <div class="text-xl">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
            <div class="text-sm text-gray-500"
              ><i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~</div
            >
          </div>
        </div>
        <div class="flex mt-4">
          <div class="flex flex-col items-center flex-1">
            <div class="text-gray">项目数</div>
            <div class="text-xl">12</div>
          </div>
          <div class="flex flex-col items-center flex-1">
            <div class="text-gray">待办项</div>
            <div class="text-xl">3/20</div>
          </div>
          <div class="flex flex-col items-center flex-1">
            <div class="text-gray">当前日期</div>
            <div class="text-xl">{{ currentDate }}</div>
          </div>
        </div>
      </div>
    </n-card>
    <div v-if="!isMobileScreen" class="flex mt-1">
      <div style="flex: 3">
        <n-card header-style="padding: 10px" :content-style="{ padding: '5px' }" title="我的课程">
          <n-grid :x-gap="8" :y-gap="8" :cols="3">
            <n-grid-item v-for="(item, index) of dataItems" :key="index">
              <ProjectItem :item="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card
          title="动态信息"
          header-style="padding: 10px"
          :content-style="{ padding: '5px' }"
          class="mt-1"
        >
          <div v-for="(item, index) of trendsItems" :key="index">
            <TrendsItem :item="item">
              <template #title="{ title }">
                <div v-html="title"></div>
              </template>
            </TrendsItem>
          </div>
        </n-card>
      </div>
      <div style="flex: 2; margin-left: 5px">
        <n-card
          title="快捷操作"
          :content-style="{ padding: 0 }"
          :header-style="{ padding: '10px' }"
        >
          <n-grid :x-gap="1" :y-gap="1" :cols="3">
            <n-grid-item v-for="(item, index) of fastActions" :key="index">
              <div
                @click="fastActionClick(item)"
                class="flex flex-col items-center justify-center fast-item-wrapper"
              >
                <span
                  :class="[item.icon, 'iconfont']"
                  :style="{ color: item.color, fontSize: '25px' }"
                ></span>
                <span class="mt-1">{{ item.title }}</span>
              </div>
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card
          title="待办事项"
          class="mt-1"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
          :footer-style="{ padding: '0px' }"
        >
          <TodoItem v-for="(item, index) of tempWaitingItems" :key="index" :item="item" />
          <div v-if="isShowMore" class="text-center">
            <n-button type="text" @click="toggleMore">
              {{ showWatingMode ? '收起更多' : '显示更多' }}
              <template #icon>
                <i class="iconfont" :class="[showWatingMode ? 'icon-caret-up' : 'icon-caret-down']">
                </i>
              </template>
            </n-button>
          </div>
        </n-card>
      </div>
    </div>
    <div v-else class="mt-1">
      <n-card
        title="我的课程"
        :content-style="{ padding: '5px' }"
        :header-style="{ padding: '5px' }"
      >
        <n-grid :x-gap="10" :y-gap="10" :cols="3">
          <n-grid-item v-for="(item, index) of dataItems" :key="index">
            <ProjectItem :item="item" />
          </n-grid-item>
        </n-grid>
      </n-card>
      <n-card
        title="动态信息"
        :content-style="{ padding: '5px' }"
        :header-style="{ padding: '5px' }"
        class="mt-1"
      >
        <div v-for="(item, index) of trendsItems" :key="index">
          <TrendsItem :item="item">
            <template #title="{ title }">
              <div v-html="title"></div>
            </template>
          </TrendsItem>
        </div>
      </n-card>
      <n-card
        title="快捷操作"
        :content-style="{ padding: 0 }"
        :header-style="{ padding: '5px' }"
        class="mt-1"
      >
        <n-grid :x-gap="10" :y-gap="10" :cols="3">
          <n-grid-item v-for="(item, index) of fastActions" :key="index">
            <div
              @click="fastActionClick(item)"
              class="flex flex-col items-center justify-center fast-item-wrapper"
            >
              <div
                :class="[item.icon, 'iconfont']"
                :style="{ color: item.color, fontSize: '20px' }"
              ></div>
              <div class="margin-top-xs">{{ item.title }}</div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>
      <n-card
        title="待办事项"
        class="mt-1"
        :content-style="{ padding: '10px' }"
        :header-style="{ padding: '5px' }"
      >
        <TodoItem v-for="(item, index) of tempWaitingItems" :key="index" :item="item" />
        <div v-if="isShowMore" class="text-center">
          <n-button type="text" @click="toggleMore"
            >{{ showWatingMode ? '收起更多' : '显示更多' }}
            <i
              class="el-icon-view"
              :class="[showWatingMode ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"
            >
            </i>
          </n-button>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts">
  import ProjectItem from './components/ProjectItem.vue'
  import TrendsItem from './components/TrendsItem.vue'
  import TodoItem from './components/TodoItem.vue'
  import W_LOGO from '@/assets/the_w.png'
  import X_LOGO from '@/assets/the_x.png'
  import P_LOGO from '@/assets/the_p.png'
  import REACT_PATH from '@/assets/img_react.jpeg'
  import VUE_PATH from '@/assets/img_vue.jpeg'
  import ANGULAR_PATH from '@/assets/img_angular.jpeg'
  import AVATAR_01 from '@/assets/img_avatar_01.jpeg'
  import AVATAR_02 from '@/assets/img_avatar_02.jpeg'
  import AVATAR_DEFAULT from '@/assets/img_avatar_default.png'
  import { computed, defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
  import { useRouter } from 'vue-router'
  import { useStore } from '@/store/store'
  import { random } from 'lodash'
  import { useLayoutStore } from '@/components'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      ProjectItem,
      TrendsItem,
      TodoItem,
    },
    setup() {
      const waitingItmes = [
        {
          content: '早上，中午，晚上上下班别忘记打卡',
          time: '04-05',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '给经理打印文件',
          time: '04-04',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '下班断电',
          time: '04-03',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '等到周末的时候和同事一起去逛街，买新衣服，买新手机，买包包，各种买买买',
          time: '04-02',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '新同事入职培训工作',
          time: '04-01',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '给领导安排机票，酒店住宿等问题',
          time: '03-31',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
      ]
      const isShowMore = computed(() => {
        return waitingItmes.length > 4
      })
      const layoutStore = useLayoutStore()
      const isMobileScreen = computed(() => {
        return layoutStore.state.device === 'mobile'
      })
      const store = useStore()
      const avatar = computed(() => store.state.user.avatar)
      const tempWaitingItems = reactive([] as Array<any>)
      const showWatingMode = ref(false)
      const toggleMore = () => {
        showWatingMode.value = !showWatingMode.value
        tempWaitingItems.length = 0
        if (showWatingMode.value) {
          tempWaitingItems.push(...waitingItmes)
        } else {
          tempWaitingItems.push(...waitingItmes.slice(0, 4))
        }
      }
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      onMounted(() => {
        tempWaitingItems.push(
          ...(waitingItmes.length > 4 ? waitingItmes.slice(0, 4) : waitingItmes)
        )
      })
      return {
        isShowMore,
        isMobileScreen,
        tempWaitingItems,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work',
            imagePath: W_LOGO,
            target: 'http://qingqingxuan.gitee.io/vue-admin-work',
          },
          {
            title: 'Vue Admin Work X',
            imagePath: X_LOGO,
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
          },
          {
            title: 'Vue Admin Work P',
            imagePath: P_LOGO,
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-p',
          },
          {
            title: 'React',
            imagePath: REACT_PATH,
          },
          {
            title: 'Vue',
            imagePath: VUE_PATH,
          },
          {
            title: 'Angular',
            imagePath: ANGULAR_PATH,
          },
        ],
        trendsItems: [
          {
            avatar: AVATAR_01,
            title:
              '<span><span class="text-blue-600">孙悟空</span>发表了一条动态<span class="text-blue-600">《看我七十二变》</span></span>',
          },
          {
            avatar: AVATAR_02,
            title:
              '<span><span class="text-blue-600">唐僧</span>赞了<span class="text-blue-600">八戒</span><span class="text-blue-600">~今天晚上的猪头肉真香~</span></span>',
          },
          {
            avatar: AVATAR_01,
            title:
              '<span><span class="text-blue-600">孙悟空</span>发表了一条动态<span class="text-blue-600">《看我七十二变》</span></span>',
          },
          {
            avatar: AVATAR_02,
            title:
              '<span><span class="text-blue-600">唐僧</span>赞了<span class="text-blue-600">八戒</span><span class="text-blue-600">~今天晚上的猪头肉真香~</span></span>',
          },
          {
            avatar: AVATAR_DEFAULT,
            title: '<span><span class="text-blue-600">我</span>提交了请假申请',
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
        showWatingMode,
        fastActionClick,
        toggleMore,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-wrapper {
    width: 5rem;
    height: 5rem;
    max-width: 5rem;
    max-height: 5rem;
    min-width: 5rem;
    min-height: 5rem;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid yellowgreen;
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
