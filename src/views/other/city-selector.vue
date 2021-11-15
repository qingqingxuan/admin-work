<template>
  <n-space vertical>
    <n-alert title="提示" type="warning">
      城市列表所需要的数据源在 src/assets/data/ 文件夹下面：
      <ul>
        <li>
          <n-gradient-text type="error"
            >src/assets/data/provinces.json：单独的省份列表</n-gradient-text
          ></li
        >
        <li>
          <n-gradient-text type="error"
            >src/assets/data/cities.json：单独的城市列表</n-gradient-text
          ></li
        >
        <li>
          <n-gradient-text type="error"
            >src/assets/data/areas.json：单独的地区列表</n-gradient-text
          ></li
        >
        <li>
          <n-gradient-text type="error"
            >src/assets/data/pc-code.json：级联的省市列表</n-gradient-text
          ></li
        >
        <li>
          <n-gradient-text type="error"
            >src/assets/data/pca-code.json：级联的省市区列表</n-gradient-text
          ></li
        >
        <li>
          <n-gradient-text type="error"
            >src/assets/data/pcas-code.json：级联的省市区、街道列表</n-gradient-text
          ></li
        >
      </ul>
    </n-alert>
    <n-card :header-style="{ padding: '10px' }" title="单选某个选项" segmented>
      <n-space>
        <CitySelector data-type="province" @update:value="onSelectItem1" />
        <CitySelector data-type="city" @update:value="onSelectItem1" />
        <CitySelector data-type="area" @update:value="onSelectItem1" />
      </n-space>
      <template #footer> 当前选择的城市为：{{ JSON.stringify(currentItem1) }} </template>
    </n-card>
    <n-card :header-style="{ padding: '10px' }" title="级联选择" segmented>
      <div class="flex justify-evenly">
        <CitySelector data-type="pc" @update:value="onSelectItem2" />
        <CitySelector data-type="pca" style="margin: 0 2%" @update:value="onSelectItem2" />
        <CitySelector data-type="pcas" check-strategy="child" @update:value="onSelectItem2" />
      </div>
      <template #footer> 当前选择的城市为：{{ JSON.stringify(currentItem2) }} </template>
    </n-card>
    <n-card :header-style="{ padding: '10px' }" title="默认值" segmented>
      <div class="flex justify-evenly">
        <CitySelector
          :default-value="provinceValue"
          data-type="province"
          @update:value="onSelectItem3"
        />
        <CitySelector
          :default-value="pcaValue"
          data-type="pca"
          style="margin: 0 2%"
          @update:value="onSelectItem3"
        />
        <CitySelector
          :default-value="pcasValue"
          data-type="pcas"
          check-strategy="child"
          @update:value="onSelectItem3"
        />
      </div>
      <template #footer> 当前选择的城市为：{{ JSON.stringify(currentItem3) }} </template>
    </n-card>
  </n-space>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const provinceValue = ref('11')
  const pcaValue = ref('110101')
  const pcasValue = ref('370102003')
  const currentItem1 = ref('')
  const currentItem2 = ref('')
  const currentItem3 = ref('')
  function onSelectItem1(item: any) {
    currentItem1.value = item
  }
  function onSelectItem2(item: any) {
    currentItem2.value = item
  }
  function onSelectItem3(item: any) {
    currentItem3.value = item
  }
</script>
