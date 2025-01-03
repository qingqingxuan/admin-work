<template>
  <a-drawer v-model:visible="opened" placement="right" title="系统设置" closable width="280px">
    <a-scrollbar
      :outer-style="{ height: '100%' }"
      style="height: 100%; overflow-y: auto; overflow-x: hidden"
    >
      <div class="wrapper">
        <a-divider dashed>主题设置</a-divider>
        <div class="flex justify-around pb-8">
          <div v-for="(item, index) of themeList" :key="index" class="example-wrapper">
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              :tip-text="item.tipText"
              @click="themeClick(item)"
            />
          </div>
        </div>
        <a-divider dashed>侧边栏样式</a-divider>
        <div class="flex justify-around pb-8">
          <div
            v-for="(item, index) of sideExampleList"
            :key="index"
            :span="6"
            class="example-wrapper"
          >
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              @click="exampleClick(item)"
            />
          </div>
        </div>
        <a-divider dashed>布局模式</a-divider>
        <div class="flex justify-around pb-8">
          <div v-for="(item, index) of layoutExampleList" :key="index" class="example-wrapper">
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              :class="[item.class || '']"
              :tip-text="item.tipText"
              @click="layoutExampleClick(item)"
            />
          </div>
        </div>
        <div style="height: 20px"></div>
        <a-divider dashed>主题颜色</a-divider>
        <a-row :gutter="[10, 10]">
          <a-col v-for="(item, index) of primartyColorList" :key="index" :span="4">
            <div
              class="color-wrapper"
              :class="{ circle: item.checked }"
              :style="{ backgroundColor: item.value }"
              @click="colorClick(item)"
            ></div>
          </a-col>
        </a-row>
        <div style="height: 20px"></div>
        <a-divider dashed>菜单设置</a-divider>
        <div class="setting-item-wrapper">
          <span style="width: 100px">菜单宽度</span>
          <a-input-number v-model="menuWidth" size="small" :min="200" :max="400" :step="10" />
        </div>
        <a-divider dashed>页面切换动画</a-divider>
        <div class="setting-item-wrapper">
          <span style="width: 100px">动画效果</span>
          <a-select v-model="appStore.pageAnim" :options="animOptions" @change="onAnimUpdate" />
        </div>
        <a-divider dashed>按钮显示</a-divider>
        <div class="setting-item-wrapper">
          <span>搜索</span>
          <a-switch v-model="appStore.actionBar.isShowSearch" />
        </div>
        <div class="setting-item-wrapper">
          <span>消息</span>
          <a-switch v-model="appStore.actionBar.isShowMessage" />
        </div>
        <div class="setting-item-wrapper">
          <span>刷新</span>
          <a-switch v-model="appStore.actionBar.isShowRefresh" />
        </div>
        <div class="setting-item-wrapper">
          <span>全屏</span>
          <a-switch v-model="appStore.actionBar.isShowFullScreen" />
        </div>
        <a-divider />
      </div>
    </a-scrollbar>
  </a-drawer>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { ModalDialogType } from '@/types/components'
  import { useMenuWidth } from '@/hooks/useMenuWidth'
  import LeftBg from '@/assets/bg_img.webp'
  import useAppConfigStore from '@/store/modules/app-config'
  import { ThemeMode } from '@/store/types'
  import useTheme from '@/hooks/useTheme'
  import usePrimaryColor from '@/hooks/usePrimaryColor'
  export default defineComponent({
    name: 'Setting',
    setup() {
      const appInfoDialog = ref<ModalDialogType | null>()
      const opened = ref(false)
      const appStore = useAppConfigStore()
      const showContact = ref(false)
      const menuWidth = ref(useMenuWidth())
      const themeList = reactive([
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'light',
          tipText: '明亮',
        },
        {
          leftBg: '#000000',
          rightTopBg: '#000000',
          rightBottomBg: '#333333',
          checked: false,
          themeId: 'dark',
          tipText: '暗黑',
        },
      ])
      const sideExampleList = reactive([
        {
          leftBg: '#000000',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'dark',
        },
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'white',
        },
        {
          leftBg: `url(${LeftBg})`,
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'image',
        },
      ])
      const layoutExampleList = reactive([
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: true,
          layoutId: 'ltr',
          tipText: '左右',
        },
        {
          leftBg: '#d4d4d4',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'ttb',
          class: 'extra-class',
          tipText: '上下',
        },
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'lcr',
          class: 'extra-class-1',
          tipText: '分栏',
        },
      ])
      const primartyColorList = reactive([
        {
          name: 'cyan',
          value: '#165dff',
          checked: true,
        },
        {
          name: 'blue',
          value: '#409eff',
          checked: false,
        },
        {
          name: 'red',
          value: '#F5222D',
          checked: false,
        },
        {
          name: 'purple',
          value: '#722ED1',
          checked: false,
        },
        {
          name: 'ee4f12',
          value: '#ee4f12',
          checked: false,
        },
        {
          name: '0096c7',
          value: '#0096c7',
          checked: false,
        },
        {
          name: 'ff9801',
          value: '#ff9801',
          checked: false,
        },
        {
          name: 'ff3d68',
          value: '#ff3d68',
          checked: false,
        },
        {
          name: '01c1d4',
          value: '#01c1d4',
          checked: false,
        },
        {
          name: '71efa3',
          value: '#71efa3',
          checked: false,
        },
        {
          name: '171010',
          value: '#171010',
          checked: false,
        },
        {
          name: '78dec7',
          value: '#78dec7',
          checked: false,
        },
        {
          name: '1768ac',
          value: '#1768ac',
          checked: false,
        },
        {
          name: '1427df',
          value: '#1427df',
          checked: false,
        },
        {
          name: 'D022FF',
          value: '#D022FF',
          checked: false,
        },
        {
          name: 'BB59F0',
          value: '#BB59F0',
          checked: false,
        },
        {
          name: 'B6DAF0',
          value: '#B6DAF0',
          checked: false,
        },
        {
          name: '14DAF0',
          value: '#14DAF0',
          checked: false,
        },
      ])
      const animOptions = reactive([
        {
          label: '渐隐渐现',
          value: 'opacity',
        },
        {
          label: '左右滑动',
          value: 'fade',
        },
        {
          label: '上下滑动',
          value: 'down',
        },
        {
          label: '缩放效果',
          value: 'scale',
        },
      ])
      onMounted(() => {
        themeList.forEach((it) => {
          it.checked = appStore.theme === it.themeId
        })
        sideExampleList.forEach((it) => {
          it.checked = appStore.sideTheme === it.themeId
        })
        layoutExampleList.forEach((it) => {
          it.checked = appStore.layoutMode === it.layoutId
        })
        primartyColorList.forEach((it) => {
          it.checked = appStore.themeColor === it.value
        })
      })
      function openDrawer() {
        opened.value = true
      }
      function themeClick(item: any) {
        themeList.forEach((it) => {
          it.checked = it === item
        })
        if (item.themeId === ThemeMode.DARK) {
          exampleClick(sideExampleList[0])
        }
        appStore.changeTheme(item.themeId)
        useTheme(item.themeId)
      }
      function exampleClick(item: any) {
        if (appStore.theme === ThemeMode.DARK) {
          Message.error('深色模式下不能更改侧边栏颜色')
          return
        }
        sideExampleList.forEach((it) => {
          it.checked = it === item
        })
        appStore.changeSideBarTheme(item.themeId)
      }
      function layoutExampleClick(item: any) {
        layoutExampleList.forEach((it) => {
          it.checked = it === item
        })
        appStore.changeLayoutMode(item.layoutId)
      }
      function colorClick(item: any) {
        primartyColorList.forEach((it) => {
          it.checked = it === item
        })
        appStore.changePrimaryColor(item.value)
        usePrimaryColor(item.value)
      }
      function onShowTabbar(val: boolean) {
        // appStore.changeShowTabbar(val)
      }
      function openAppInfo() {
        appInfoDialog.value?.toggle()
      }
      function onAnimUpdate(val: any) {
        appStore.changePageAnim(val)
      }
      watch(
        () => menuWidth.value,
        (newVal) => {
          appStore.changeSideWidth(newVal)
        }
      )
      return {
        appStore,
        appInfoDialog,
        showContact,
        opened,
        themeList,
        sideExampleList,
        layoutExampleList,
        primartyColorList,
        openDrawer,
        themeClick,
        exampleClick,
        onShowTabbar,
        layoutExampleClick,
        onAnimUpdate,
        colorClick,
        openAppInfo,
        animOptions,
        menuWidth,
      }
    },
  })
</script>

<style lang="less" scoped>
  @width: 60px;

  .wrapper {
    margin-top: -16px;
    overflow-x: hidden;

    .close-wrapper {
      text-align: right;
      font-size: 20px;
    }

    .color-wrapper {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #c1c1c1;
      margin-bottom: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .circle::after {
      content: '';
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgb(3, 190, 50);
      text-align: center;
    }

    .setting-item-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: 14px;
    }
  }
</style>
