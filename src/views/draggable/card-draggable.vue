<template>
  <div class="main-container">
    <n-card title="拖动更换图标位置">
      <template #header-extra>
        <n-button size="small" type="primary" @click="resetElements">重置元素位置</n-button>
      </template>
      <draggable
        :list="list"
        animation="500"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        tag="ul"
      >
        <template #item="{ element }">
          <li class="card-item">
            <SvgIcon
              prefix="iconfont"
              :name="element.icon"
              style="font-size: 30px"
              :style="{ color: element.color }"
            />
            <div class="label">{{ element.label }}</div>
          </li>
        </template>
      </draggable>
    </n-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive } from 'vue'
  import draggable from 'vuedraggable'
  import Iconfonts from '@/icons/iconfont/iconfont.json'
  interface IconItemType {
    label: string
    icon: string
    id: string
    color: string
  }
  export default defineComponent({
    name: 'CardDraggable',
    components: { draggable },
    setup() {
      const iconList = Iconfonts.glyphs.slice(0, 100)
      const list: Array<IconItemType> = reactive([])
      const drag = false
      const colors = [
        '#e54d42',
        '#f37b1d',
        '#fbbd08',
        '#8dc63f',
        '#39b54a',
        '#1cbbb4',
        '#0081ff',
        '#6739b6',
        '#9c26b0',
        '#e03997',
        '#a5673f',
        '#8799a3',
      ]
      const getRandomColor = (): string => {
        return colors[Math.floor(Math.random() * colors.length)]
      }
      const resetElements = (): void => {
        list.length = 0
        list.push(
          ...iconList.map((it, index: number): IconItemType => {
            return {
              label: `第 ${index + 1} 个元素`,
              icon: it.font_class,
              id: it.icon_id,
              color: getRandomColor(),
            }
          })
        )
      }
      onMounted(() => {
        list.push(
          ...iconList.map((it, index: number): IconItemType => {
            return {
              label: `第 ${index + 1} 个元素`,
              icon: it.font_class,
              id: it.icon_id,
              color: getRandomColor(),
            }
          })
        )
      })
      return {
        drag,
        list,
        resetElements,
      }
    },
  })
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    padding: 0;
    border-top: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
    overflow: hidden;
  }
  .card-item {
    height: 100px;
    padding: 10px 0;
    width: 12.5%;
    text-align: center;
    cursor: move;
    float: left;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    .icon {
      font-size: 40px;
    }
    .label {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .card-item:hover {
    .icon {
      transform: scale(1.5);
      transition: transform 0.1s ease-in-out;
    }
  }
</style>
