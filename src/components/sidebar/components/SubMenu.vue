<template>
  <a-sub-menu :key="menuInfo.key">
    <template #title>
      <span class="sub-menu-lable">{{ menuInfo.label }}</span>
    </template>
    <template #icon>
      <component
        :is="menuInfo.icon || 'icon-menu'"
        style="font-size: 16px; vertical-align: middle"
      />
    </template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <component :is="item.icon || 'icon-menu'" />
          </template>
          <component :is="item.label" v-if="typeof item.label === 'function'" />
          <span v-else>{{ item.label }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SubMenu',
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  })
</script>
<style scoped>
  .sub-menu-lable {
    flex: 1;
    margin-left: 3px;
  }
</style>
