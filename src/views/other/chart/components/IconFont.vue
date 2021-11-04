<template>
  <div>
    <n-grid cols="xs:2 s:3 m:4 l:6 xl:8" class="icon-parent" responsive="screen">
      <n-grid-item v-for="item of icons" :key="item.icon_id">
        <div class="flex flex-col items-center justify-center icon-wrapper">
          <SvgIcon prefix="iconfont" :name="item.font_class" style="font-size: 30px" />
          <div class="text-xs">{{ item.font_class }}</div>
          <div class="text-center copy" @click="onCopy(item)"> 复制 </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import Iconfonts from '@/icons/iconfont/iconfont.json'
  import { useMessage } from 'naive-ui'
  interface IconItem {
    font_class: string
    icon_id: string
    name: string
    unicode: string
    unicode_decimal: number
  }

  export default defineComponent({
    name: 'IconFont',
    setup() {
      const message = useMessage()
      const icons = reactive([] as Array<IconItem>)
      icons.push(...Iconfonts.glyphs)
      const onCopy = (item: IconItem) => {
        message.success('复制成功:' + JSON.stringify(item))
      }
      return {
        icons,
        onCopy,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .icon-parent {
    border-top: 1px solid #f7f7f7;
    border-left: 1px solid #f7f7f7;
    .icon-wrapper {
      position: relative;
      height: 100px;
      border-right: 1px solid #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
      overflow: hidden;
      padding-bottom: 0;
      transition: padding-bottom 0.2s ease-in-out;
      &:hover {
        color: #409eff;
        box-shadow: 0 0 10px #f0f0f0;
        padding-bottom: 22px;
        transition: padding-bottom 0.2s ease-in-out;
        .copy {
          cursor: pointer;
          transform: translateY(0);
          transition: transform 0.2s ease-in-out;
        }
      }
      .copy {
        position: absolute;
        background-color: #409eff;
        padding: 5px 0;
        color: #fff;
        font-size: 12px;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
</style>
