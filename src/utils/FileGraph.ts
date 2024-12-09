import { basename, dirname, resolve, extname } from 'path-browserify'
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
  extName: string
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
    .find((it) => !it.includes('index') && !it.includes('Index'))
  return name || ''
}

export function initFileGraph(
  asynComponents: Record<string, () => Promise<unknown>> | Record<string, unknown>
) {
  const fileGraph = Object.keys(asynComponents).reduce((pre: any, cur) => {
    const baseName = basename(cur)
    const extName = extname(cur)
    const dirName = resolve(dirname(cur), baseName.split('.')[0])
    if (!pre[dirName]) {
      pre[dirName] = {
        componentName: (asynComponents[cur] as any).default
          ? (asynComponents[cur] as any).default.name || toHump(getComponentName(cur))
          : toHump(getComponentName(dirName)),
        component: (asynComponents[cur] as any).default || null,
        extName,
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
    const item = fileGraph[it]
    const fullFileName = it + item.extName
    if (item.templateFile) {
      item.componentPath = item.templateFile
    } else if (asynComponents[fullFileName]) {
      item.componentPath = fullFileName
    } else {
      item.componentPath = fullFileName
    }
  })
  return fileGraph
}
