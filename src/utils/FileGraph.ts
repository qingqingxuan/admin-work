import { basename, dirname, resolve } from 'path-browserify'
import { toHump } from '.'
import type { Component, DefineComponent } from 'vue'

const templateRegex = /[^.]+\.template\.vue$/
const elementRegex = /\.element\.vue$/
const naiveRegex = /\.naive\.vue$/
const antdRegex = /\.ant\.vue$/
const arcoRegex = /\.arco\.vue$/

const regexArray = [elementRegex, naiveRegex, antdRegex, arcoRegex]

export interface FileGraphItemInterface {
  componentName?: string
  component?: Component | DefineComponent | null
  url: string
  componentPath: string
  templateFile: string
  uiFiles: string[]
  normalFiles: string[]
}

export interface FileGraphInterface {
  [key: string]: FileGraphItemInterface
}

export function getComponentName(key: string) {
  const paths = key.split('/')
  const name = paths
    .filter((it) => !!it && it !== '.')
    .reverse()
    .find(
      (it) =>
        it !== 'index.vue' &&
        it !== 'index.ts' &&
        it !== 'index.tsx' &&
        it !== 'index.js' &&
        it !== 'index.jsx'
    )
    ?.replace('.vue', '')
    .replace('.tsx', '')
    .replace('.jsx', '')
  return name || ''
}

export function initFileGraph(
  asynComponents: Record<string, () => Promise<unknown>> | Record<string, unknown>
) {
  const fileGraph = Object.keys(asynComponents).reduce((pre: any, cur) => {
    const baseName = basename(cur)
    const dirName = resolve(dirname(cur), baseName.split('.')[0])
    if (!pre[dirName]) {
      pre[dirName] = {
        componentName: (asynComponents[cur] as any).default
          ? (asynComponents[cur] as any).default.name || toHump(getComponentName(cur))
          : '',
        component: (asynComponents[cur] as any).default || null,
        url: dirName.replace('.', ''),
        componentPath: '',
        templateFile: '',
        uiFiles: [],
        normalFiles: [],
      }
    }
    if (templateRegex.test(baseName)) {
      pre[dirName].templateFile = cur
    } else if (regexArray.some((it) => it.test(baseName))) {
      pre[dirName].uiFiles.push(cur)
    } else {
      pre[dirName].normalFiles.push(cur)
    }
    return pre
  }, {}) as FileGraphInterface
  Object.keys(fileGraph).forEach((it) => {
    const dirName = it
    const item = fileGraph[it]

    const indexVueFile = dirName + '/index.vue'
    const indexTsxFile = dirName + '/index.tsx'
    const indexJsxFile = dirName + '/index.jsx'

    if (item.templateFile) {
      item.componentPath = item.templateFile
    } else if (asynComponents[indexVueFile]) {
      item.componentPath = indexVueFile
    } else if (asynComponents[indexTsxFile]) {
      item.componentPath = indexTsxFile
    } else if (asynComponents[indexJsxFile]) {
      item.componentPath = indexJsxFile
    } else {
      // throw new Error('请确保' + dirName + '目录下有 xx.template.vue 文件 或者 index.{vue|tsx|jsx} 文件 ')
    }
  })
  return fileGraph
}
