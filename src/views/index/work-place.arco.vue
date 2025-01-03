<template>
  <div class="main-container">
    <a-card
      title="工作台"
      :bodyStyle="{ padding: '10px' }"
      :headStyle="{ padding: '0 10px' }"
      size="small"
      :bordered="false"
      class="card-border-radius"
    >
      <a-row class="margin-top" wrap>
        <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="14">
          <div class="flex justify-center items-center">
            <div class="avatar-wrapper">
              <img :src="avatar" />
            </div>
            <div class="flex flex-col justify-around ml-3.5 flex-1">
              <div class="text-lg">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
              <div class="text-sm text-gray-500 mt-1">今日有小雨，出门别忘记带伞哦~</div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="10">
          <div class="flex justify-end items-center h-full w-full mt-4">
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">项目数</div>
              <div class="text-lg mt-2">12</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">待办项</div>
              <div class="text-lg mt-2">3/20</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">当前日期</div>
              <div class="text-lg mt-2">{{ currentDate }}</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <div class="mt-3"></div>
    <a-row :gutter="[20, 10]">
      <a-col
        :xs="12"
        :sm="8"
        :md="8"
        :xl="4"
        :xxl="4"
        v-for="(item, index) of fastActions"
        :key="index"
      >
        <a-card
          @click="fastActionClick(item)"
          class="flex flex-col items-center justify-center fast-item-wrapper"
          :bordered="false"
        >
          <a-space direction="vertical" align="center">
            <component :is="item.icon" :style="{ color: item.color, fontSize: '28px' }" />
            <span class="mt-8 text-md">{{ item.title }}</span>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <div class="mt-3"></div>
    <a-card
      :body-style="{ padding: '0px' }"
      :bordered="false"
      class="card-border-radius"
      title="AdminWork各版本说明"
    >
      <a-table :data="dataList" :pagination="false" :bordered="false">
        <template #columns>
          <a-table-column data-index="projectName" :width="180" title="项目名" />
          <a-table-column title="版权">
            <template #cell="{ record }">
              <a-tag :color="record.isEmpower ? 'red' : ''">
                {{ record.isEmpower ? '付费授权' : '免费开源' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="状态">
            <template #cell="{ record }">
              <a-tag :color="record.status === '持续更新' ? 'blue' : 'red'">
                {{ record.status }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="标签">
            <template #cell="{ record }">
              <a-tag
                v-for="tag of record.tags"
                color="arcoblue"
                :key="tag"
                style="margin-right: 10px"
              >
                {{ tag }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column data-index="status" title="操作">
            <template #cell="{ record }">
              <a-button
                size="mini"
                type="primary"
                status="success"
                style="margin-right: 10px"
                @click="onPreview(record)"
              >
                预览
              </a-button>
              <a-popover position="left">
                <template #content>
                  <div v-if="!record.isEmpower" style="text-align: center">
                    <img style="width: 150px" :src="WeiXin" />
                    <div> 关注公众号《知码前端》获取源码下载链接 </div>
                  </div>
                  <div v-else style="text-align: center">
                    <img style="width: 150px" :src="WeiXinCustom" />
                    <div> 咨询获取授权详情，请添加微信好友 </div>
                  </div>
                </template>
                <a-button size="mini" type="primary" status="warning"> 获取源码 </a-button>
              </a-popover>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts">
  import WeiXin from '@/assets/qrcode.jpg'
  import WeiXinCustom from '@/assets/arco/custom_weixin.jpg'
  import { computed, defineComponent, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { random } from 'lodash-es'
  import useUserStore from '@/store/modules/user'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    setup() {
      const userStore = useUserStore()
      const avatar = computed(() => userStore.avatar)
      const tempWaitingItems = reactive([] as Array<any>)
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      const dataList = [
        {
          key: '1',
          projectName: 'Admin Work Pro',
          tags: ['vue3', 'vite', 'naive-ui', 'typescript'],
          isEmpower: true,
          status: '持续更新',
          target: 'http://p.vueadminwork.com',
        },
        {
          key: '2',
          projectName: 'Arco Work',
          tags: ['vue3', 'vite', 'arco-design', 'typescript'],
          isEmpower: false,
          status: '持续更新',
          target: 'http://arco.vueadminwork.com',
        },
        {
          key: '3',
          projectName: 'Admin Work',
          tags: ['vue3', 'vite', 'naive-ui', 'typescript'],
          isEmpower: false,
          status: '持续更新',
          target: 'http://aw.vueadminwork.com',
        },
        {
          key: '4',
          projectName: 'Admin Work X',
          tags: ['vue3', 'vite/webpack', 'element-plus', 'typescript'],
          isEmpower: false,
          status: '持续更新',
          target: 'http://x.vueadminwork.com',
        },
        {
          key: '5',
          projectName: 'Admin Work A',
          tags: ['vue3', 'vite', 'ant-design', 'typescript'],
          isEmpower: false,
          status: '持续更新',
          target: 'http://a.vueadminwork.com',
        },
        {
          key: '6',
          projectName: 'Admin Work Basic',
          tags: ['vue2', 'webpack', 'element-ui', 'javascript'],
          isEmpower: false,
          status: '停止维护',
          target: 'http://qingqingxuan.gitee.io/arco-work',
        },
      ]
      return {
        tempWaitingItems,
        WeiXin,
        WeiXinCustom,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        fastActions: [
          {
            title: '首页',
            icon: 'icon-dashboard',
            path: '/',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '系统管理',
            path: '/system/department',
            icon: 'icon-settings',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '列表',
            path: '/list/table-custom',
            icon: 'icon-list',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '表单',
            path: '/form/base-form-view',
            icon: 'icon-edit',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '多级菜单',
            path: '/next/menu2/menu-2-1/menu-2-1-1',
            icon: 'icon-share-alt',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '更多功能',
            path: '/other/chart/icons',
            icon: 'icon-apps',
            color: COLORS[random(0, COLORS.length)],
          },
        ],
        dataList,
        fastActionClick,
        onPreview: function (item: any) {
          window.open(item.target)
        },
      }
    },
  })
</script>

<style lang="less" scoped>
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
    background-color: var(--border-color);
  }

  div.item-action:last-child::after {
    width: 0;
  }

  .fast-item-wrapper {
    height: 80px;
    border-radius: 8px;

    .anticon {
      font-size: 20px;
    }
  }

  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }
</style>
