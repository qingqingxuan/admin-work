<template>
  <div class="vaw-tab-bar-container">
    <div v-if="showHumburger" class="humburger-wrapper">
      <Humburger />
    </div>
    <div :class="{ 'tab-humburger-wrapper': showHumburger }" class="flex items-center">
      <n-icon
        class="arrow-wrapper"
        :class="{ 'arrow-wrapper__disabled': leftArrowDisabled }"
        @click="leftArrowClick"
      >
        <ChevronBack />
      </n-icon>
      <n-scrollbar ref="scrollbar" :x-scrollable="true" :size="0">
        <n-button
          v-for="item of state.visitedView"
          :key="item.fullPath"
          :type="currentTab === item.fullPath ? 'primary' : 'default'"
          class="mx-1 rounded-sm tab-item"
          style="--n-height: 24px; --n-font-weight: 200"
          @click.self="itemClick(item.fullPath, $event)"
          @contextmenu="onContextMenu(item.fullPath, $event)"
        >
          <span
            style="font-size: 12px; margin-top: 2px"
            class="text-item"
            @click.self="itemChildClick(item.fullPath, $event)"
          >
            {{ item.meta ? item.meta.title : item.name }}
          </span>
          <n-icon v-if="!item.meta?.affix" class="icon-item" @click="iconClick(item.fullPath)">
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
  import store from '../../store'
  import path from 'path-browserify'
  import { defineComponent, h } from 'vue'
  import { RouteRecordRawWithHidden } from '../../types/store'
  import { NIcon, NScrollbar } from 'naive-ui'
  import { Close, ChevronBack, Refresh, ArrowBack, ArrowForward, Menu } from '@vicons/ionicons5'
  export default defineComponent({
    name: 'TabBar',
    components: { Close, ChevronBack, Refresh, ArrowBack, ArrowForward, Menu },
    props: {
      showHumburger: {
        type: Boolean,
        default: false,
      },
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
        state: store.state,
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
    watch: {
      $route(newVal) {
        if (['404', '500', '403', 'not-found', 'Login'].includes(newVal.name)) {
          this.currentTab = ''
          return
        }
        if (newVal.meta.noShowTabbar) {
          this.currentTab = ''
          return
        }
        if (newVal.query?.noShowTabbar) {
          this.currentTab = ''
          return
        }
        if (newVal.name) {
          store.addVisitedView(newVal).then((route) => {
            this.currentTab = route.fullPath || ''
            const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
            scrollbar.scrollTo(
              {
                left: 1000000000,
                debounce: true,
                behavior: 'smooth',
              } as any,
              0
            )
          })
        }
      },
      showContextMenu(val) {
        if (val) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      },
    },
    mounted() {
      this.initRoute()
    },
    methods: {
      initRoute() {
        const affixedRoutes = this.findAffixedRoutes(
          this.state.permissionRoutes as Array<RouteRecordRawWithHidden>,
          '/'
        )
        affixedRoutes.forEach((it) => {
          store.addVisitedView(it)
        })
        if (['404', '500', '403', 'not-found', 'Login'].includes(this.$route.name as string)) {
          this.currentTab = ''
          return
        }
        if (this.$route.meta.noShowTabbar) {
          this.currentTab = ''
          return
        }
        store
          .addVisitedView({
            path: this.$route.path,
            fullPath: this.$route.fullPath,
            meta: this.$route.meta,
          } as RouteRecordRawWithHidden)
          .then((route) => {
            this.currentTab = route.fullPath as string
            this.$nextTick(() => {
              const elements = document.querySelectorAll('.tab-item .text-item')
              let currentEle: HTMLElement | null = null
              for (let index = 0; index < elements.length; index++) {
                const temp = elements[index] as HTMLElement
                if (temp.innerText === route.meta?.title) {
                  currentEle = elements[index] as HTMLElement
                  break
                }
              }
              const scrollbar = this.$refs.scrollbar as InstanceType<typeof NScrollbar>
              if (currentEle) {
                scrollbar.scrollTo(
                  {
                    left: currentEle?.parentElement?.parentElement?.offsetLeft,
                    debounce: true,
                    behavior: 'smooth',
                  } as any,
                  0
                )
                this.isDisabledArrow()
              }
            })
          })
      },
      itemClick(path: string | undefined, e: MouseEvent) {
        this.handleTabClick(e.target as HTMLElement, path || '/')
      },
      itemChildClick(path: string | undefined, e: MouseEvent) {
        this.handleTabClick(
          (e.target as HTMLElement).parentElement?.parentElement as HTMLElement,
          path || '/'
        )
      },
      handleTabClick(el: HTMLElement, path: string) {
        ;(this.$refs.scrollbar as InstanceType<typeof NScrollbar>).scrollTo(
          {
            left: el.offsetLeft,
            debounce: true,
            behavior: 'smooth',
          } as any,
          0
        )
        this.$router.push(path)
      },
      iconClick(fullPath: string | undefined) {
        this.removeTab(fullPath || '/')
      },
      findAffixedRoutes(routes: Array<RouteRecordRawWithHidden>, basePath: string) {
        const temp = [] as Array<RouteRecordRawWithHidden>
        routes.forEach((it) => {
          if (!it.hidden && it.meta && it.meta.affix) {
            temp.push({
              name: it.name,
              fullPath: it.fullPath,
              path: it.path,
              meta: it.meta,
            } as RouteRecordRawWithHidden)
          }
          if (it.children && it.children.length > 0) {
            temp.push(...this.findAffixedRoutes(it.children, path.resolve(basePath, it.path)))
          }
        })
        return temp
      },
      isAffix(route: RouteRecordRawWithHidden) {
        return route.meta && route.meta.affix
      },
      onContextMenu(fullPath: string | undefined, e: MouseEvent) {
        const tempView = this.state.visitedView.find((it) => it.fullPath === fullPath)
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
        const findItem = this.state.visitedView.find((it) => it.fullPath === fullPath)
        if (findItem) {
          store.removeVisitedView(findItem as RouteRecordRawWithHidden).then(() => {
            if (this.currentTab === fullPath) {
              this.currentTab =
                this.state.visitedView[this.state.visitedView.length - 1].fullPath || ''
              this.$router.push(this.currentTab)
            }
          })
        }
      },
      // context menu actions
      isLeftLast(tempRoute: string) {
        return this.state.visitedView.findIndex((it) => it.fullPath === tempRoute) === 0
      },
      isRightLast(tempRoute: string) {
        return (
          this.state.visitedView.findIndex((it) => it.fullPath === tempRoute) ===
          this.state.visitedView.length - 1
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
        store.closeLeftVisitedView(this.selectRoute as RouteRecordRawWithHidden).then(() => {
          if (this.$route.fullPath !== (this.selectRoute as RouteRecordRawWithHidden).fullPath) {
            this.$router.push(
              this.state.visitedView[this.state.visitedView.length - 1].fullPath as string
            )
          }
        })
      },
      closeRight() {
        if (!this.selectRoute) return
        store.closeRightVisitedView(this.selectRoute as RouteRecordRawWithHidden).then(() => {
          if (this.$route.fullPath !== (this.selectRoute as RouteRecordRawWithHidden).fullPath) {
            this.$router.push(
              this.state.visitedView[this.state.visitedView.length - 1].fullPath as string
            )
          }
        })
      },
      closeAll() {
        store.closeAllVisitedView().then(() => {
          this.$router.push(
            this.state.visitedView[this.state.visitedView.length - 1].fullPath as string
          )
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
  @import '../../assets/styles/variables.scss';
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
