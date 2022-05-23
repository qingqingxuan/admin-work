<template>
  <n-space vertical>
    <n-card>
      <div class="text-lg">
        当前版本号：{{ version }}
        <n-button class="ml-4" type="primary" @click="showContact = true">获取源码</n-button>
      </div>
    </n-card>
    <n-card title="依赖">
      <n-descriptions
        label-placement="top"
        bordered
        :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <n-descriptions-item :label="item.label" v-for="item of dependenciesList" :key="item.label">
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="开发依赖">
      <n-descriptions
        label-placement="top"
        bordered
        :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <n-descriptions-item
          :label="item.label"
          v-for="item of devDependenciesList"
          :key="item.label"
        >
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-modal v-model:show="showContact" display-directive="show">
      <n-card title="获取源码" :bordered="false" preset="card">
        <template #header-extra>
          <n-icon size="20">
            <Close @click="showContact = false" />
          </n-icon>
        </template>
        <div class="flex flex-col items-center justify-center">
          <img src="/src/assets/qrcode.jpg" />
          <div>关注公众号：<strong>知码前端</strong>获取源码</div>
        </div>
      </n-card>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
  import useAppInfo from '@/hooks/useAppInfo'
  import { onMounted, reactive, ref } from 'vue'
  import { Close } from '@vicons/ionicons5'
  const { version, dependencies, devDependencies } = useAppInfo()
  const showContact = ref(false)
  const dependenciesList = reactive<Record<string, string>[]>([])
  const devDependenciesList = reactive<Record<string, string>[]>([])
  onMounted(() => {
    const depValues = Object.values(dependencies)
    Object.keys(dependencies).map((it, index) => {
      dependenciesList.push({
        label: it,
        value: depValues[index],
      })
    })
    const devDepValues = Object.values(devDependencies)
    Object.keys(devDependencies).map((it, index) => {
      devDependenciesList.push({
        label: it,
        value: devDepValues[index],
      })
    })
  })
</script>
