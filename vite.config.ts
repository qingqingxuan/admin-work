import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver, ArcoResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'
import vueAdapter from './plugins/dist'

export default () => {
  return {
    base: '/',
    plugins: [
      vueAdapter({
        compileMode: 'single',
        rules: ['naive', 'arco', 'element'],
      }),
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/styles/variables.scss" as *;',
        },
        less: {
          additionalData: '@import "./src/styles/variables.less";',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src') + '/',
        },
        {
          find: '@vt',
          replacement: 'virtual:template',
        },
      ],
    },
    server: {
      open: true,
    },
  }
}
