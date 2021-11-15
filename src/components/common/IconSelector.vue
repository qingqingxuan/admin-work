<template>
  <n-popover trigger="click" placement="bottom" width="400">
    <template #trigger>
      <n-button>
        <template #icon v-if="selectItem.font_class">
          <span
            class="iconfont"
            :class="['icon-' + selectItem.font_class]"
            style="font-size: 20px"
          ></span> </template
        >{{ selectItem.name }}
      </n-button>
    </template>
    <n-scrollbar class="grid-wrapper">
      <n-grid :cols="4" style="height: 300px">
        <n-grid-item v-for="item of icons" :key="item.font_class">
          <div
            class="flex flex-col items-center justify-center p-2 icon-wrapper"
            @click="onIconClick(item)"
          >
            <span
              class="iconfont"
              :class="['icon-' + item.font_class]"
              style="font-size: 20px"
            ></span>
            <n-ellipsis :line-clamp="1" style="font-size: 12px">{{ item.name }}</n-ellipsis>
          </div>
        </n-grid-item>
      </n-grid>
    </n-scrollbar>
    <div class="flex justify-end mt-2 mb-2">
      <n-pagination
        :page="currentPage"
        :page-size="pageSize"
        :page-slot="5"
        :item-count="itemCount"
        @update-page="onUpdatePage"
      />
    </div>
  </n-popover>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, shallowReactive, toRef } from 'vue'
  import Iconfonts from '@/icons/iconfont/iconfont.json'
  export default defineComponent({
    name: 'IconSelector',
    props: {
      defaultIcon: String,
      onUpdateIcon: Function,
    },
    emits: ['selected'],
    setup(props, { emit }) {
      const defaultIcon = toRef(props, 'defaultIcon')
      const pageSize = 40
      const icons = shallowReactive(Iconfonts.glyphs.slice(0, 40))
      const currentPage = ref(1)
      const itemCount = computed(() => Iconfonts.glyphs.length)
      const selectItem = ref({ font_class: '', name: defaultIcon.value || '选择图标' })
      function onUpdatePage(page: number) {
        currentPage.value = page
        icons.length = 0
        const start = (currentPage.value - 1) * pageSize
        icons.push(...Iconfonts.glyphs.slice(start, start + pageSize))
      }
      // eslint-disable-next-line vue/no-setup-props-destructure
      const { onUpdateIcon } = props
      function onIconClick(item: any) {
        selectItem.value = item
        if (onUpdateIcon) {
          onUpdateIcon(item)
        } else {
          emit('selected', item)
        }
      }
      return {
        icons,
        selectItem,
        currentPage,
        pageSize,
        itemCount,
        onUpdatePage,
        onIconClick,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .grid-wrapper {
    .icon-wrapper {
      cursor: pointer;
      border: 1px solid #f5f5f5;
    }
  }
</style>
