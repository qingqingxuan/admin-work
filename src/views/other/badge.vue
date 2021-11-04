<template>
  <div>
    <n-grid :cols="2" :x-gap="10" :y-gap="10">
      <n-gi>
        <n-card
          title="警告信息alert"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <n-space vertical :size="12">
            <n-alert title="默认类型" type="default">
              <template #icon>
                <n-icon>
                  <Desktop />
                </n-icon>
              </template>
              无论遇到什么困难，生活总是要继续~
            </n-alert>
            <n-alert title="Info 类型" type="info"> 万事开头难，只能一直努力！！！ </n-alert>
            <n-alert title="Success 类型" type="success">
              成功就是眼前，过了黑夜就是白天，加油~~
            </n-alert>
            <n-alert title="Warning 类型" type="warning">
              想想昨天，看看今天，望望明天；一切都会好起来
            </n-alert>
            <n-alert title="Error 类型" type="error"> 有人欺负人，请不犹豫，请还回去 </n-alert>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card
          title="对话框Dialog"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <div class="padding">
            <n-space>
              <n-button size="small" type="primary" @click="openConfirm('warning')">警告</n-button>
              <n-button size="small" type="warning" @click="openConfirm('success')">成功</n-button>
              <n-button size="small" type="info" @click="openConfirm('error')">错误</n-button>
            </n-space>
          </div>
        </n-card>
        <n-card
          class="mt-2"
          title="信息Message"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <n-space>
            <n-button type="info" @click="openMessage('info')"> 信息 </n-button>
            <n-button type="error" @click="openMessage('error')"> 错误 </n-button>
            <n-button type="warning" @click="openMessage('warning')"> 警告 </n-button>
            <n-button type="success" @click="openMessage('success')"> 成功 </n-button>
            <n-button type="primary" @click="openMessage('loading')"> 加载中 </n-button>
          </n-space>
        </n-card>
        <n-card
          class="mt-2"
          title="通知Notification"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <n-space>
            <n-button type="info" @click="openNotification('info')"> 信息 </n-button>
            <n-button type="error" @click="openNotification('error')"> 错误 </n-button>
            <n-button type="warning" @click="openNotification('warning')"> 警告 </n-button>
            <n-button type="success" @click="openNotification('success')"> 成功 </n-button>
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Desktop } from '@vicons/ionicons5'
  import { useDialog, useMessage, useNotification } from 'naive-ui'

  export default defineComponent({
    name: 'Badge',
    components: { Desktop },
    setup() {
      const dialog = useDialog()
      const message = useMessage()
      const notification = useNotification()
      function openConfirm(type: string) {
        switch (type) {
          case 'warning':
            dialog.warning({
              title: '警告',
              content: '你确定要离开我？',
              positiveText: '确定',
              negativeText: '不确定',
              onPositiveClick: () => {
                message.success('确定')
              },
              onNegativeClick: () => {
                message.error('不确定')
              },
            })
            break
          case 'success':
            dialog.success({
              title: '成功',
              content: '小哥哥你太棒了~~',
              positiveText: '哇哦~',
            })
            break
          case 'error':
            dialog.error({
              title: '错误',
              content: '知道错了吗，下次改了',
              positiveText: '快哭了',
              onPositiveClick: () => {
                message.success('我知道了')
              },
            })
            break
        }
      }
      function openMessage(type: string) {
        switch (type) {
          case 'info':
            message.info('在心碎中认清遗憾 生命漫长也短暂跳动心脏长出藤蔓')
            break
          case 'error':
            message.error('愿为险而战 跌入灰暗坠入深渊')
            break
          case 'warning':
            message.warning('沾满泥土的脸 没有神的光环')
            break
          case 'success':
            message.success('握紧手中的平凡 此心自称无憾生命的火已点燃')
            break
          case 'loading':
            message.loading('有一天也许会走远 也许还能再相见')
            break
        }
      }
      function openNotification(type: string) {
        switch (type) {
          case 'info':
            notification.info({
              content: '在心碎中认清遗憾 生命漫长也短暂跳动心脏长出藤蔓',
              meta: '只要平凡',
            })
            break
          case 'error':
            notification.error({
              content: '愿为险而战 跌入灰暗坠入深渊',
              meta: '只要平凡',
            })
            break
          case 'warning':
            notification.warning({
              content: '沾满泥土的脸 没有神的光环',
              meta: '只要平凡',
            })
            break
          case 'success':
            notification.success({
              content: '握紧手中的平凡 此心自称无憾生命的火已点燃',
              meta: '只要平凡',
            })
            break
        }
      }
      return {
        openConfirm,
        openMessage,
        openNotification,
      }
    },
  })
</script>
