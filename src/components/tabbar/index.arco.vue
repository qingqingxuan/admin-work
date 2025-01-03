<template>
  <a-card :body-style="{ padding: 0 }" :bordered="false">
    <div class="vaw-tab-bar-container">
      <div class="flex items-center justify-center h-full">
        <span class="arrow-wrapper" @click="leftArrowClick">
          <LeftOutlined />
        </span>
        <Scrollbar ref="scrollbar" class="flex-1" wrap-class="tab-bar__wrapper">
          <div class="flex">
            <a-button
              v-for="item of getVisitedRoutes"
              :key="item.path"
              :type="currentTab === item.path ? 'outline' : 'secondary'"
              class="mx-1 tab-item"
              size="small"
              :data="item.path"
              @click="itemClick(item, $event)"
              @contextmenu="onContextMenu(item.path, $event)"
            >
              {{ item.meta ? item.meta.title : item.name }}
              <span v-if="!item.meta?.affix" class="icon-item" @click.stop="iconClick(item.path)">
                <CloseOutlined />
              </span>
            </a-button>
          </div>
        </Scrollbar>
        <span class="arrow-wrapper" style="transform: rotate(180deg)" @click="rightArrowClick">
          <LeftOutlined />
        </span>
      </div>
      <ul v-show="showContextMenu" class="contex-menu-wrapper" :style="contextMenuStyle">
        <li>
          <a-button type="text" @click="refreshRoute">
            <template #icon>
              <ReloadOutlined style="vertical-align: text-bottom" />
            </template>
            刷新页面
          </a-button>
        </li>
        <li :disabled="showLeftMenu">
          <a-button :disabled="showLeftMenu" type="text" @click="closeLeft">
            <template #icon>
              <ArrowLeftOutlined style="vertical-align: text-bottom" />
            </template>
            关闭左侧
          </a-button>
        </li>
        <li :disabled="showRightMenu">
          <a-button :disabled="showRightMenu" type="text" @click="closeRight">
            <template #icon>
              <ArrowRightOutlined style="vertical-align: text-bottom" />
            </template>
            关闭右侧
          </a-button>
        </li>
        <li>
          <a-button type="text" @click="closeAll">
            <template #icon>
              <CloseOutlined style="vertical-align: text-bottom" />
            </template>
            关闭所有
          </a-button>
        </li>
      </ul>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { mapState, mapActions } from 'pinia'
  import { defineComponent, unref } from 'vue'
  import {
    IconClose as CloseOutlined,
    IconLeft as LeftOutlined,
    IconRefresh as ReloadOutlined,
    IconToLeft as ArrowLeftOutlined,
    IconToRight as ArrowRightOutlined,
  } from '@arco-design/web-vue/es/icon'
  import useVisitedRouteStore from '@/store/modules/visited-routes'
  import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
  export default defineComponent({
    name: 'TabBar',
    components: {
      CloseOutlined,
      LeftOutlined,
      ReloadOutlined,
      ArrowLeftOutlined,
      ArrowRightOutlined,
    },
    data() {
      return {
        currentTab: this.$route.fullPath,
        contextMenuStyle: {
          left: '0',
          top: '0',
        },
        showContextMenu: false,
        selectRoute: {},
        showLeftMenu: true,
        showRightMenu: true,
      }
    },
    computed: {
      ...mapState(useVisitedRouteStore, ['getVisitedRoutes']),
    },
    watch: {
      $route: {
        handler(newVal) {
          this.currentTab = newVal.fullPath || ''
          // setTimeout(() => {
          //   const scrollbar = unref((this.$refs.scrollbar as any).getWrapContainer())
          //   const el = document.querySelector(`[data="${this.currentTab}"]`) as HTMLElement
          //   el &&
          //     scrollbar.scrollTo({
          //       left: el.offsetLeft,
          //       behavior: 'smooth',
          //     })
          // }, 0)
        },
        immediate: true,
      },
      showContextMenu(val) {
        if (val) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      },
    },
    methods: {
      ...mapActions(useVisitedRouteStore, [
        'removeVisitedRoute',
        'findLastRoutePath',
        'closeRightVisitedView',
        'closeLeftVisitedView',
        'closeAllVisitedView',
      ]),
      itemClick(path: RouteRecordRaw, e: MouseEvent) {
        this.handleTabClick(e.target as HTMLElement, path)
      },
      itemChildClick(path: RouteRecordRaw, e: MouseEvent) {
        this.handleTabClick(
          (e.target as HTMLElement).parentElement?.parentElement as HTMLElement,
          path
        )
      },
      handleTabClick(el: HTMLElement, path: RouteRecordRaw) {
        this.$router.push(path).then(() => {
          // const scrollbar = unref((this.$refs.scrollbar as any).getWrapContainer())
          // scrollbar.scrollTo({
          //   left: el.offsetLeft,
          //   behavior: 'smooth',
          // })
        })
      },
      iconClick(fullPath: string | undefined) {
        this.removeTab(fullPath || '/')
      },
      isAffix(route: RouteRecordRaw) {
        return route.meta && route.meta.affix
      },
      onContextMenu(fullPath: string | undefined, e: MouseEvent) {
        const tempView = this.getVisitedRoutes.find((it) => it.fullPath === fullPath)
        if (!tempView) return
        const { clientX } = e
        const { x } = this.$el.getBoundingClientRect()
        e.preventDefault()
        this.selectRoute = tempView
        if (this.selectRoute) {
          this.showLeftMenu = this.isLeftLast(fullPath || '/')
          this.showRightMenu = this.isRightLast(fullPath || '/')
          const screenWidth = document.body.clientWidth
          this.contextMenuStyle.left =
            (clientX + 130 > screenWidth ? clientX - 130 - x - 15 : clientX - x + 15) + 'px'
          this.contextMenuStyle.top = '25px'
          this.showContextMenu = true
        }
      },
      removeTab(fullPath: string) {
        const findItem = this.getVisitedRoutes.find((it) => it.fullPath === fullPath)
        if (findItem) {
          this.removeVisitedRoute(findItem).then(() => {
            if (this.currentTab === fullPath) {
              this.currentTab = this.findLastRoutePath()
              this.$router.push(this.currentTab)
            }
          })
        }
      },
      // context menu actions
      isLeftLast(tempRoute: string) {
        return this.getVisitedRoutes.findIndex((it) => it.fullPath === tempRoute) === 0
      },
      isRightLast(tempRoute: string) {
        return (
          this.getVisitedRoutes.findIndex((it) => it.fullPath === tempRoute) ===
          this.getVisitedRoutes.length - 1
        )
      },
      onDropDownSelect(key: string) {
        switch (key) {
          case 'refresh':
            this.refreshRoute()
            break
          case 'close':
            this.closeAll()
            break
        }
      },
      refreshRoute() {
        this.$router.replace({ path: '/redirect' + this.$route.path, query: this.$route.query })
      },
      closeLeft() {
        if (!this.selectRoute) return
        this.closeLeftVisitedView(this.selectRoute as RouteLocationNormalized).then(() => {
          if (this.$route.fullPath !== (this.selectRoute as RouteLocationNormalized).fullPath) {
            this.$router.push(this.findLastRoutePath())
          }
        })
      },
      closeRight() {
        if (!this.selectRoute) return
        this.closeRightVisitedView(this.selectRoute as RouteLocationNormalized).then(() => {
          if (this.$route.fullPath !== (this.selectRoute as RouteLocationNormalized).fullPath) {
            this.$router.push(this.findLastRoutePath())
          }
        })
      },
      closeAll() {
        this.closeAllVisitedView().then(() => {
          this.$router.push(this.findLastRoutePath())
        })
      },
      closeMenu() {
        this.showContextMenu = false
      },
      leftArrowClick() {
        const scrollbar = unref((this.$refs.scrollbar as any).getWrapContainer())
        const scrollX = scrollbar.scrollLeft || 0
        scrollbar.scrollTo({
          left: Math.max(0, scrollX - 200),
          behavior: 'smooth',
        })
      },
      rightArrowClick() {
        const scrollbar = unref((this.$refs.scrollbar as any).getWrapContainer())
        const scrollX = scrollbar.scrollLeft || 0
        scrollbar.scrollTo({
          left: scrollX + 200,
          behavior: 'smooth',
        })
      },
    },
  })
</script>

<style>
  .tab-bar__wrapper {
    display: flex;
    align-items: center;
  }
</style>

<style lang="less" scoped>
  :deep(.arco-btn-outline) {
    border: 1px solid rgba(var(--primary-5), 0.7) !important;
    color: rgba(var(--primary-5), 0.7) !important;
    &:hover {
      border: 1px solid rgba(var(--primary-5), 1) !important;
      color: rgba(var(--primary-5), 1) !important;
    }
  }
  :deep(.arco-btn-disabled) {
    background-color: transparent !important;
    color: rgba(var(--primary-5), 0.7) !important;
  }
  :deep(.arco-btn-primary) {
    background-color: rgba(var(--primary-5), 0.8) !important;
    &:hover {
      background-color: rgba(var(--primary-5), 1) !important;
    }
  }
  .vaw-tab-bar-container {
    :deep(.arco-btn-size-small) {
      padding: 0 8px;
      height: 24px;
    }
    position: relative;
    height: @tabHeight;
    box-sizing: border-box;
    white-space: nowrap;
    box-shadow: 10px 5px 10px rgb(0 0 0 / 10%);
    .contex-menu-wrapper {
      position: absolute;
      width: 130px;
      z-index: 999;
      list-style: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      background-color: #fff;
      padding-left: 0;
      & > li {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 5px 0;
        & button {
          width: 100%;
        }
      }
      & > li:hover {
        color: var(--primary-color);
      }
    }
    .humburger-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .tab-humburger-wrapper {
      margin-left: 40px;
      transition: margin-left @transitionTime;
    }
    .tab-no-humburger-wrapper {
      margin-left: 0;
      transition: margin-left @transitionTime;
    }

    .tab-item {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      .icon-item {
        margin-left: 0;
        width: 0;
        transition: all 0.2s ease-in-out;
        display: inline-flex;
        overflow: hidden;
      }
      &:hover {
        .icon-item {
          display: inline-flex;
          width: 16px;
          height: 16px;
          max-width: 16px;
          max-height: 16px;
          margin-left: 5px;
          font-size: 12px;
          transform: scale(0.8);
          background-color: rgba(0, 0, 0, 0.12);
          border-radius: 50%;
          padding: 2px;
          transition: all 0.2s ease-in-out;
        }
      }
    }
    .arrow-wrapper {
      cursor: pointer;
      font-size: 16px;
      margin: 0 8px;
      display: inline-flex;
    }
    .arrow-wrapper__disabled {
      cursor: not-allowed;
      color: #b9b9b9;
    }
  }
</style>
