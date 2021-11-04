<template>
  <n-card
    title="生成二维码"
    :header-style="{ padding: '5px 10px' }"
    :content-style="{ padding: '10px' }"
  >
    <n-grid :x-gap="10" :y-gap="10" :cols="3" class="mt-4">
      <n-grid-item>
        <n-card
          :segmented="{
            content: 'hard',
          }"
          title="带logo"
          :header-style="{ padding: '5px' }"
          :content-style="{ padding: 0 }"
        >
          <div class="text-center flex justify-center">
            <canvas id="logoCanvas" width="250" height="250"></canvas>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item v-for="(item, index) of qrcodeList" :key="index">
        <n-card
          :segmented="{
            content: 'hard',
          }"
          :title="item.title"
          :header-style="{ padding: '5px' }"
          :content-style="{ padding: '5px' }"
        >
          <div class="text-center">
            <img :src="item.url" class="canvas" style="margin: 0 auto" />
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import Qrcode from 'qrcode'
  import logo from '@/assets/logo.png'
  import { useMessage } from 'naive-ui'
  interface QrcodeItem {
    title: string
    url: string
  }
  export default defineComponent({
    name: 'Qrcode',
    setup() {
      const qrText = ref('')
      const qrUrl = ref('')
      const qrcodeList = reactive([] as Array<QrcodeItem>)
      const message = useMessage()
      const generatorCode = (it: any) => {
        if (!qrText.value) {
          message.error('请输入二维码文本内容')
          return
        }
        Qrcode.toDataURL(qrText.value, {
          width: 250,
          margin: it.margin,
          color: {
            dark: it.darkColor,
            light: it.lightColor,
          },
        }).then((res: any) => {
          qrcodeList.push({
            title: it.title,
            url: res,
          } as QrcodeItem)
        })
      }
      const generatorCodeWithLogo = () => {
        const canvas = document.getElementById('logoCanvas') as HTMLCanvasElement
        Qrcode.toCanvas(canvas, qrText.value, {
          width: 250,
        }).then(() => {
          const context = canvas.getContext('2d')
          const img = new Image()
          const x = (canvas.getBoundingClientRect().width - 50) / 2
          img.src = logo
          img.onload = () => {
            context?.drawImage(img, x, x, 50, 50)
          }
        })
      }
      onMounted(() => {
        qrText.value = 'vue-admin-work-x'
        ;[
          {
            title: '普通样式',
            lightColor: '',
            darkColor: '',
          },
          {
            title: '前景色样式',
            lightColor: '',
            darkColor: '#ff0000',
          },
          {
            title: '背景色样式',
            lightColor: '#ffff00',
            darkColor: '',
          },
          {
            title: '混合样式',
            lightColor: '#ffff00',
            darkColor: '#ff0000',
          },
          {
            title: '小间距',
            margin: 10,
            lightColor: '#409eff',
            darkColor: '',
          },
        ].forEach(generatorCode)
        generatorCodeWithLogo()
      })
      return {
        qrcodeList,
        qrText,
        logo,
        qrUrl,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .content-wrappar {
    .canvas {
      width: 250px !important;
      height: 250px !important;
      border: 2px solid #f5f5f5;
    }
    .setting-wrapper {
      width: 50%;
      .label {
        width: 50px;
      }
      .slider-wrapper {
        width: 100%;
      }
    }
  }
</style>
