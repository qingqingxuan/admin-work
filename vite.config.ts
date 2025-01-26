import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { join } from 'path'
import vitePluginCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver, ArcoResolver } from 'unplugin-vue-components/resolvers'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'

import vueJsx from '@vitejs/plugin-vue-jsx'
import vueAdapter from './plugins/dist'
import { defineConfig, Plugin } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [
    vueAdapter({
      compileMode: 'single',
      rules: ['naive', 'arco', 'element'],
    }) as Plugin,
    {
      name: 'init-config',
      resolveId(id) {
        if (id === 'virtual:init') {
          return id
        }
      },
      async load(id) {
        if (id === 'virtual:init') {
          const filePath = join(__dirname, 'adapter.arco.js')
          if (existsSync(filePath)) {
            return await readFile(filePath, 'utf-8')
          } else {
            return ''
          }
        }
      },
    },
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
})
