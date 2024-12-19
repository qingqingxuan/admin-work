import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver, ArcoResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'
import vueTemplate from './plugins/dist/generate-main-vue-file'

export default () => {
  return {
    base: '/',
    plugins: [
      vueTemplate(),
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vitePluginCompression({
        threshold: 1024 * 10,
      }),
      ViteComponents({
        globs: ['src/components/*.{vue}'],
        resolvers: [NaiveUiResolver(), ArcoResolver({ sideEffect: true })],
      }),
      vueJsx(),
    ],
    define: {
      __APP_UI_COMPONENT__: JSON.stringify('naive'),
      __APP_COMPILE_MODE__: JSON.stringify('single'),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/styles/variables.scss" as *;',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src') + '/',
        },
      ],
    },
    server: {
      open: true,
    },
  }
}
