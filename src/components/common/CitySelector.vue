<template>
  <n-cascader
    :default-value="defaultValue"
    value-field="code"
    label-field="name"
    :options="dataOptions"
    :placeholder="placeholder"
    :check-strategy="checkStrategy"
    clearable
    filterable
    :on-update:value="onValueChange"
  />
</template>

<script lang="ts" setup>
  import Provinces from '../../assets/data/provinces.json'
  import Cities from '../../assets/data/cities.json'
  import Araes from '../../assets/data/areas.json'
  import PC from '../../assets/data/pc-code.json'
  import PCA from '../../assets/data/pca-code.json'
  import PCAS from '../../assets/data/pcas-code.json'
  import { computed } from 'vue'
  import type { PropType } from 'vue'
  import type { CascaderOption } from 'naive-ui'
  const emits = defineEmits(['update:value'])
  const props = defineProps({
    defaultValue: {
      type: [Number, String, Array],
      default: null,
    },
    dataType: {
      type: String as PropType<'province' | 'city' | 'area' | 'pc' | 'pca' | 'pcas'>,
      default: 'Province',
    },
    checkStrategy: {
      type: String as PropType<'child' | 'all'>,
      default: 'all',
    },
  })
  const dataOptions = computed(() => {
    if (props.dataType === 'province') {
      return Provinces
    } else if (props.dataType === 'city') {
      return Cities
    } else if (props.dataType === 'area') {
      return Araes
    } else if (props.dataType === 'pc') {
      return PC
    } else if (props.dataType === 'pca') {
      return PCA
    }
    return PCAS
  })
  const placeholder = computed(() => {
    if (props.dataType === 'province') {
      return '请选择省份'
    } else if (props.dataType === 'city') {
      return '请选择城市'
    } else if (props.dataType === 'area') {
      return '请选择地区'
    } else if (props.dataType === 'pc') {
      return '请选择省市'
    } else if (props.dataType === 'pca') {
      return '请选择省市区'
    }
    return '请选择省市区、街道'
  })
  function onValueChange(
    value: string | number | Array<string | number> | null,
    option: CascaderOption | Array<CascaderOption | null> | null,
    pathValues: Array<CascaderOption | null>
  ) {
    const tempPathValues = pathValues
      ? pathValues.map((it: CascaderOption | null) => ({ code: it?.code, name: it?.name }))
      : null
    emits('update:value', {
      value,
      option,
      pathValues: tempPathValues,
    })
  }
</script>
