import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'

export default () => {
  return {
    base: '/',
    plugins: [
      vue(),
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vitePluginCompression({
        threshold: 1024 * 10,
      }),
      ViteComponents({
        resolvers: [NaiveUiResolver()],
      }),
      vueJsx(),
    ],
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
