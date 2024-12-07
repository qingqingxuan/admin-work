import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver, ArcoResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'
import vueTemplate from './plugins/gen-template'

export default (config) => {
  console.log(config)

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
        // excludeNames: ['Logo'],
        resolvers: [
          (name: string) => {
            console.log(config)
          },
          NaiveUiResolver(),
          ArcoResolver({ sideEffect: true }),
        ],
      }),
      vueJsx(),
    ],
    define: {
      __APP_UI_COMPONENT__: JSON.stringify('naive'),
      __APP_COMPILE_MODE__: JSON.stringify('multi'),
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
