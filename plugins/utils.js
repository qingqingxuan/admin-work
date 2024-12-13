import { basename, extname, resolve } from 'node:path'
import fs from 'fs/promises'
import colors from 'picocolors'
import fg from 'fast-glob'


export const templateFileRegex = /[^.]+\.template\.vue$/

export const fileExtTypeList = ['.vue', '.jsx', '.tsx']
export const uiTypeList = ['element', 'naive', 'ant', 'arco']

export function searchComponents(glob) {
  const files = fg.sync(glob, {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: process.cwd(),
    absolute: true,
  })
  return files
}

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

export const [regexVueArray, regexJsxArray, regexTsxArray] = generateRegex()

export const ComponentMap = {
  element: "ElementPlus",
  naive: "NaiveUI",
  arco: "ArcoDesign",
  ant: "AntDesign",
}


function toCamelCase(filename) {
  const parts = filename.split('.');
  const nameParts = parts.slice(0, -1);
  return nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

export function getExts(fileList) {
  const fileModel = fileList.reduce((pre, cur) => {
    const ext = extname(cur)
    const name = cur.replace(ext, '')
    if (!pre[name]) {
      pre[name] = [undefined, undefined, undefined]
    }
    if (ext === '.vue') {
      pre[name].splice(0, 1, ext)
    } else if (ext === '.jsx') {
      pre[name].splice(1, 1, ext)
    } else if (ext === '.tsx') {
      pre[name].splice(2, 1, ext)
    }
    return pre
  }, {})
  return fileModel
}

async function getRefFileList(fileList) {
  const componetList = []
  const componetNameList = []
  const fileModel = getExts(fileList)
  for (const it of Object.keys(fileModel)) {
    const fileName = basename(it)
    const ext = fileModel[it].find(it => !!it) || '.vue'
    const camelCaseFileName = toCamelCase(fileName + ext)
    if (componetNameList.includes(camelCaseFileName)) {
      continue
    }
    componetList.push(`const ${camelCaseFileName} = defineAsyncComponent(() => import("./${ext === '.vue' ? (fileName + '.vue') : fileName}"))`)
    componetNameList.push(camelCaseFileName)
  }
  const componentGraph = `const componentGraph = {
  ${componetNameList.join(',\n\t')}
}`
  return componetList.join('\n') + '\n' + componentGraph
}

export function getTempFileTemplatePart() {
  return `<template>
  <!--该文件是系统生成的只读文件，请不要修改该文件-->
  <component ref="asyncComponentRef" :is="asyncComponentName" v-bind="$attrs">
    <template #[item]="props" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="props" />
    </template>
  </component>
</template>`
}

export async function getTempFileScriptPart(findedFile, tempFileList) {
  const importer = await getRefFileList(tempFileList)
  return `
<script setup lang="tsx">
import { computed, defineAsyncComponent, inject, ref, unref } from "vue"
import type { DefineComponent } from "vue"
${importer}
const asyncComponentRef = ref()
const expose = {}
const componentUIName = inject("componentUIName", ref('naive'))
function capitalizeFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function convertFileName(filename: string) {
  const [namePart, extension] = filename.split(".")
  const convertedName = namePart.replace(
    /([a-z])([A-Z])/g,
    (_: any, p1: any, p2: string) => \`\${p1}.\${p2.toLowerCase()}\`
  )
  return \`\${convertedName}.\${extension}\`
}
const asyncComponentName = computed<DefineComponent>(() => {
  const n = \`\${capitalizeFirstLetter('${basename(findedFile).split('.')[0]}')}\${capitalizeFirstLetter(unref(componentUIName))}\`
  const c = componentGraph[n]
  if (!c) {
    return () => (<div>没有在目录下找到 {convertFileName(n + ".(vue|jsx|tsx)")} 文件</div>)
  }
  return c
})
const exposeProxy = new Proxy(expose, {
  has: function () {
    return true
  },
  get: function (_, prop) {
    if (typeof prop === "string" && !prop.toString().startsWith("__v")) {
      return asyncComponentRef.value && asyncComponentRef.value[prop.toString()]
    }
  },
})
defineExpose(exposeProxy)
</script>`
}

export async function unlinkComponentImportsFile() {
  try {
    const createFilePath = resolve(process.cwd(), 'src', 'components-import.js')
    await fs.access(createFilePath)
    await fs.unlink(createFilePath)
  } catch (error) {
  }
}

export function getComponentImportInfo(path, fileList, uiComponent) {
  const reg = new RegExp(`${path.replace('/', '\/')}\/(?:[^/]+\/)*[^/]+\.(${uiComponent}|template)\.(vue|jsx|tsx)$`)
  const imports = Array.from(fileList).filter(it => reg.test(it)).reduce((pre, cur) => {
    const relativePath = cur.split('src')[1]
    pre += `
  {
    path:'.${relativePath}',
    fullPath: '${cur}',
    loader: () => import('${cur}')
  },`
    return pre
  }, '')
  return `export default [${imports}\n]`
}

export async function createComponentListJsonFile(fileList, uiComponent) {
  const createFilePath = resolve(process.cwd(), 'src', 'components-import.js')
  const imports = getComponentImportInfo(fileList, uiComponent)
  try {
    await fs.access(createFilePath)
    await fs.chmod(createFilePath, 0o777)
    await fs.writeFile(createFilePath, imports)
    await fs.chmod(createFilePath, 0o444)
    console.info(colors.green(`【gen-template】"${createFilePath}" file changed`));
  } catch (error) {
    await fs.writeFile(createFilePath, imports)
    await fs.chmod(createFilePath, 0o444)
    console.info(colors.green(`【gen-template】"${createFilePath}" file changed`));
  }
}