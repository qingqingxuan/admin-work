<template>
  <div class="vaw-tab-bar-container">
    <div class="flex items-center">
      <n-icon
        class="arrow-wrapper"
        :class="{ 'arrow-wrapper__disabled': leftArrowDisabled }"
        @click="leftArrowClick"
      >
        <ChevronBack />
      </n-icon>
      <n-scrollbar ref="scrollbar" :x-scrollable="true" :size="0">
        <n-button
          v-for="item of getVisitedRoutes"
          :key="item.path"
          :type="currentTab === item.path ? 'primary' : 'default'"
          class="tab-item"
          strong
          secondary
          style="--n-height: 24px; --n-font-weight: 200"
          :data="item.path"
          @click.self="itemClick(item)"
          @contextmenu="onContextMenu(item, $event)"
        >
          <span
            style="font-size: 12px; margin-top: 2px"
            class="text-item"
            @click.self="itemClick(item)"
          >
            {{ item.meta ? item.meta.title : item.name }}
          </span>
          <n-icon v-if="!item.meta?.affix" class="icon-item" @click="removeTab(item)">
            <Close />
          </n-icon>
        </n-button>
      </n-scrollbar>
      <n-icon
        class="arrow-wrapper"
        :class="{ 'arrow-wrapper__disabled': rightArrowDisabled }"
        style="transform: rotate(180deg)"
        @click="rightArrowClick"
      >
        <ChevronBack />
      </n-icon>
      <n-dropdown :options="contextMenuOptions" placement="left-start" @select="onDropDownSelect">
        <n-icon class="arrow-wrapper" @click="rightArrowClick">
          <Menu />
        </n-icon>
      </n-dropdown>
    </div>
    <ul v-show="showContextMenu" class="contex-menu-wrapper" :style="contextMenuStyle">
      <li>
        <n-button :underline="false" type="text" @click="refreshRoute">
          <template #icon>
            <n-icon>
              <Refresh />
            </n-icon>
          </template>
          刷新页面
        </n-button>
      </li>
      <li :disabled="showLeftMenu">
        <n-button :disabled="showLeftMenu" type="text" @click="closeLeft">
          <template #icon>
            <n-icon>
              <ArrowBack />
            </n-icon> </template
          >关闭左侧
        </n-button>
      </li>
      <li :disabled="showRightMenu">
        <n-button :disabled="showRightMenu" type="text" @click="closeRight">
          <template #icon>
            <n-icon>
              <ArrowForward />
            </n-icon>
          </template>
          关闭右侧
        </n-button>
      </li>
      <li>
        <n-button icon="el-icon-close" type="text" @click="closeAll">
          <template #icon>
            <n-icon>
              <Close />
            </n-icon>
          </template>
          关闭所有
        </n-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, h } from 'vue'
  import { NIcon, NScrollbar } from 'naive-ui'
  import { Close, ChevronBack, Refresh, ArrowBack, ArrowForward, Menu } from '@vicons/ionicons5'
  import { mapActions, mapState } from 'pinia'
  import useVisitedRouteStore from '@/store/modules/visited-routes'
  import { RouteRecordRaw } from 'vue-router'
  export default defineComponent({
    name: 'TabBar',
    components: { Close, ChevronBack, Refresh, ArrowBack, ArrowForward, Menu },
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
        rightArrowDisabled: false,
        leftArrowDisabled: false,
        contextMenuOptions: [
          {
            label: '刷新页面',
            key: 'refresh',
            icon() {
              return h(NIcon, null, {
                default: () => h(Refresh),
              })
            },
          },
          {
            label: '关闭所有',
            key: 'close',
            icon() {
              return h(NIcon, null, {
                default: () => h(Close),
              })
            },
          },
        ],
      }
    },
    computed: {
      ...mapState(useVisitedRouteStore, ['getVisitedRoutes']),
    },
    watch: {
      $route(newVal) {
        this.currentTab = newVal.fullPath || ''
        setTimeout(() => {
          const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
          const el = document.querySelector(`[data="${this.currentTab}"]`) as HTMLElement
          el &&
            scrollbar.scrollTo(
              {
                left: el.offsetLeft,
                debounce: true,
                behavior: 'smooth',
              } as any,
              0
            )
        }, 0)
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
      itemClick(item: RouteRecordRaw) {
        this.handleTabClick(item.path || item.path || '/')
      },
      handleTabClick(path: string) {
        this.$router.push(path)
      },
      isAffix(route: RouteRecordRaw) {
        return route.meta && route.meta.affix
      },
      onContextMenu(item: RouteRecordRaw, e: MouseEvent) {
        const { clientX } = e
        const { x } = this.$el.getBoundingClientRect()
        e.preventDefault()
        this.selectRoute = item
        if (this.selectRoute) {
          this.showLeftMenu = this.isLeftLast(item.path || '/')
          this.showRightMenu = this.isRightLast(item.path || '/')
          const screenWidth = document.body.clientWidth
          this.contextMenuStyle.left =
            (clientX + 130 > screenWidth ? clientX - 130 - x - 15 : clientX - x + 15) + 'px'
          this.contextMenuStyle.top = '25px'
          this.showContextMenu = true
        }
      },
      removeTab(item: RouteRecordRaw) {
        this.removeVisitedRoute(item).then((lastPath) => {
          this.$router.push(lastPath)
        })
      },
      // context menu actions
      isLeftLast(tempRoute: string) {
        return this.getVisitedRoutes.findIndex((it) => it.path === tempRoute) === 0
      },
      isRightLast(tempRoute: string) {
        return (
          this.getVisitedRoutes.findIndex((it) => it.path === tempRoute) ===
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
        this.$router.replace({ path: '/redirect' + this.$route.path })
      },
      closeLeft() {
        if (!this.selectRoute) return
        this.closeLeftVisitedView(this.selectRoute as RouteRecordRaw).then(() => {
          if (this.$route.fullPath !== (this.selectRoute as RouteRecordRaw).path) {
            this.$router.push(this.findLastRoutePath())
          }
        })
      },
      closeRight() {
        if (!this.selectRoute) return
        this.closeRightVisitedView(this.selectRoute as RouteRecordRaw).then(() => {
          if (this.$route.path !== (this.selectRoute as RouteRecordRaw).path) {
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
        const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
        const scrollX = scrollbar.$el?.scrollLeft || 0
        scrollbar.scrollTo(
          {
            left: Math.max(0, scrollX - 200),
            debounce: true,
            behavior: 'smooth',
          } as any,
          0
        )
        this.isDisabledArrow()
      },
      rightArrowClick() {
        const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
        const scrollX = scrollbar.$el?.scrollLeft || 0
        scrollbar.scrollTo(
          {
            left: scrollX + 200,
            debounce: false,
            behavior: 'smooth',
          } as any,
          0
        )
        this.isDisabledArrow()
      },
      isDisabledArrow() {
        setTimeout(() => {
          const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
          const { scrollLeft, scrollWidth, clientWidth } = scrollbar.$el as HTMLElement
          this.leftArrowDisabled = scrollLeft === 0
          this.rightArrowDisabled = scrollLeft === scrollWidth - clientWidth
        }, 100)
      },
    },
  })
</script>

<style lang="scss" scoped>
  .vaw-tab-bar-container {
    position: relative;
    height: $tabHeight;
    line-height: calc(#{$tabHeight} - 3px);
    box-sizing: border-box;
    white-space: nowrap;
    box-shadow: 10px 5px 10px rgb(0 0 0 / 10%);
    .contex-menu-wrapper {
      position: absolute;
      width: 130px;
      z-index: 999;
      list-style: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      background-color: var(--base-color);
      padding-left: 0;
      & > li {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 5px 0;
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
      transition: margin-left $transitionTime;
    }
    .tab-no-humburger-wrapper {
      margin-left: 0;
      transition: margin-left $transitionTime;
    }

    .tab-item {
      padding: 7px 10px;
      cursor: pointer;
      .icon-item {
        margin-left: 0;
        width: 0;
        height: 0;
        transition: all 0.2s ease-in-out;
        overflow: hidden;
      }
      &:hover {
        .icon-item {
          display: inline;
          width: 14px;
          height: 14px;
          margin-left: 5px;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.12);
          border-radius: 50%;
          padding: 1px;
          transition: all 0.2s ease-in-out;
        }
      }
    }
    .tab-item + .tab-item {
      margin-left: 10px;
    }
    .arrow-wrapper {
      cursor: pointer;
      font-size: 20px;
      margin: 0 8px;
    }
    .arrow-wrapper__disabled {
      cursor: not-allowed;
      color: #b9b9b9;
    }
  }
</style>
