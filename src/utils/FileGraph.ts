import { basename, dirname, resolve, extname } from 'path-browserify'
import { toHump } from '.'
import type { Component, DefineComponent } from 'vue'

const templateRegex = /[^.]+\.template\.vue$/

const fileExtTypeList = ['.vue', '.jsx', '.tsx']
const uiTypeList = ['element', 'naive', 'ant', 'arco']

function generateRegex() {
  return fileExtTypeList.reduce((pre, ext) => {
    pre.push(
      uiTypeList.reduce((p, ui) => {
        p.push(new RegExp(`.${ui}${ext}$`))
        return p
      }, [])
    )
    return pre
  }, [])
}

const [regexVueArray, regexJsxArray, regexTsxArray] = generateRegex()

export interface FileGraphItemInterface {
  componentName?: string
  component?: Component | DefineComponent | null
  url: string
  componentPath: string
  templateFile: string
  extName: string
  normalFiles: string[]
  vueFiles: string[]
  jsxFiles: string[]
  tsxFiles: string[]
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
        normalFiles: [],
        vueFiles: [],
        jsxFiles: [],
        tsxFiles: [],
      } as FileGraphItemInterface
    }
    if (templateRegex.test(baseName)) {
      pre[dirName].templateFile = cur
    } else if (regexVueArray.some((it) => it.test(baseName))) {
      pre[dirName].vueFiles.push(cur)
    } else if (regexJsxArray.some((it) => it.test(baseName))) {
      pre[dirName].jsxFiles.push(cur)
    } else if (regexTsxArray.some((it) => it.test(baseName))) {
      pre[dirName].tsxFiles.push(cur)
    } else {
      pre[dirName].normalFiles.push(cur)
    }
    return pre
  }, {}) as FileGraphInterface
  Object.keys(fileGraph).forEach((it) => {
    const item = fileGraph[it]
    if (item.templateFile) {
      item.componentPath = item.templateFile
    } else {
      const ext = fileExtTypeList.find((ext) => !!asynComponents[it + ext])
      const fullFileName = it + ext
      item.componentPath = fullFileName
    }
  })
  return fileGraph
}
