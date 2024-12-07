import fs from 'node:fs/promises'
import { resolve, dirname, basename, extname } from 'node:path';
import { getTempFileScriptPart, getTempFileTemplatePart } from './utils';
import colors from 'picocolors'

const templateFileRegex = /[^.]+\.template\.vue$/
const elementRegex = /\.element\.vue$/
const naiveRegex = /\.naive\.vue$/
const antdRegex = /\.ant\.vue$/
const arcoRegex = /\.arco\.vue$/

const CompoentMap = {
  element: "ElementPlus",
  naive: "NaiveUI",
  arco: "ArcoDesign",
  ant: "antDesign",
}

const regexArray = [elementRegex, naiveRegex, antdRegex, arcoRegex]

let currentUIComponent = 'naive'
let compileMode = 'single'

const tempFileGraph = {}

function getTimestamp() {
  return new Date().getTime()
}

async function getTempFileContent(tempFilePath) {
  if (tempFilePath && tempFileGraph[tempFilePath]) {
    const findedFile = tempFileGraph[tempFilePath].find(it => basename(it).includes(currentUIComponent))
    if (findedFile) {
      if (compileMode === 'single') {
        return `<template>${findedFile}?${getTimestamp()}</template>`
      }
      const multiModeContent =
        `${getTempFileTemplatePart()}\n${await getTempFileScriptPart(findedFile, tempFileGraph[tempFilePath])}`
      return multiModeContent
    }
  }
  return `<template>${dirname(tempFilePath)}目录下未找到${CompoentMap[currentUIComponent]}组件库对应的.vue文件，如${basename(tempFilePath).split('.')[0]}.${currentUIComponent}.vue</template>`
}

async function handleSrcDir(src) {
  try {
    const srcPath = src
    const dirContentList = await fs.readdir(srcPath)
    const allFileList = await Promise.all(dirContentList.map(async it => {
      const stat = await fs.stat(resolve(srcPath, it))
      return { file: it, isDirectory: stat.isDirectory() }
    }))
    const fileList = allFileList.filter(it => !it.isDirectory).map(it => it.file)
    let createFilePath = ''
    for (const file of fileList) {
      if (isTargetFile(file)) {
        const fullPath = resolve(srcPath, file)
        if (!createFilePath)
          createFilePath = getCreateTemplateFilePath(fullPath)
        initTempFileGraph(createFilePath, fullPath)
      }
    }
    if (createFilePath) {
      await createTemplateFile(createFilePath)
    }
    const dirList = allFileList.filter(it => it.isDirectory).map(it => it.file)
    for (const dir of dirList) {
      await handleSrcDir(resolve(srcPath, dir))
    }
  } catch (error) {
    console.log(error);
  }
}

function getCreateTemplateFilePath(relativeFilePath) {
  const createFileName = basename(relativeFilePath).split('.')[0]
  return resolve(dirname(relativeFilePath), createFileName + '.template.vue')
}

function isTargetFile(path) {
  return regexArray.some(reg => reg.test(basename(path)))
}

function initTempFileGraph(tempFilePath, relativeFilePath) {
  if (!tempFileGraph[tempFilePath]) {
    tempFileGraph[tempFilePath] = []
  }
  if (!~tempFileGraph[tempFilePath].indexOf(relativeFilePath)) {
    tempFileGraph[tempFilePath].push(relativeFilePath)
  }
}

async function updateFileGraph(tempFilePath) {
  const dirPath = dirname(tempFilePath)
  const dirContentList = await fs.readdir(dirPath)
  const allFileList = await Promise.all(dirContentList.map(async it => {
    const stat = await fs.stat(resolve(dirPath, it))
    return { file: it, isDirectory: stat.isDirectory() }
  }))
  const tempFileName = basename(tempFilePath).split('.')[0]
  const fileList = allFileList.filter(it =>
    !it.isDirectory &&
    isTargetFile(it.file) &&
    basename(it.file).split('.')[0] === tempFileName).map(it => resolve(dirPath, it.file))
  tempFileGraph[tempFilePath] = fileList
  if (!Array.isArray(tempFileGraph[tempFilePath]) || tempFileGraph[tempFilePath].length === 0) {
    delete tempFileGraph[tempFilePath]
    await fs.unlink(tempFilePath)
    return false
  }
  return true
}

async function createTemplateFile(createFilePath) {
  try {
    await fs.access(createFilePath)
    await fs.chmod(createFilePath, 0o777)
    await fs.writeFile(createFilePath, await getTempFileContent(createFilePath))
    await fs.chmod(createFilePath, 0o444)
    console.info(colors.green(`"${createFilePath}" file changed`));
  } catch (error) {
    await fs.writeFile(createFilePath, await getTempFileContent(createFilePath))
    await fs.chmod(createFilePath, 0o444)
    console.info(colors.green(`"${createFilePath}" file changed`));
  }
}

export default function () {
  const watchPath = resolve(__dirname, '../src')
  return {
    name: "vite:gen-template-file",
    configResolved(config) {
      currentUIComponent = JSON.parse(config.define['__APP_UI_COMPONENT__'])
      compileMode = JSON.parse(config.define['__APP_COMPILE_MODE__'])
    },
    configureServer(server) {
      server.watcher.on('add', async (path) => {
        if (isTargetFile(path)) {
          const tempFilePath = getCreateTemplateFilePath(path)
          await updateFileGraph(tempFilePath)
          await createTemplateFile(tempFilePath)
        }
      });
      server.watcher.on('unlink', async (path) => {
        if (isTargetFile(path)) {
          const tempFilePath = getCreateTemplateFilePath(path)
          const res = await updateFileGraph(tempFilePath)
          res && await createTemplateFile(tempFilePath)
        } else if (templateFileRegex.test(path)) {
          console.error(colors.red(`${path} 模板文件已被删除，请重新运行项目生成该文件`))
        }
      });
      return () => {
        handleSrcDir(watchPath)
      }
    },
    async transform(code, id) {
      if (templateFileRegex.test(id)) {
        if (compileMode === 'single') {
          const reg = /<template>(.*?)<\/template>/
          const matched = code.match(reg)
          const matchedPath = matched && matched[1] ? matched[1] : ''
          return await fs.readFile(matchedPath.split('?')[0], 'utf-8')
        }
        return code
      }
    },
    handleHotUpdate(ctx) {
      if (compileMode === 'single') {
        const { file } = ctx
        if (isTargetFile(file))
          createTemplateFile(getCreateTemplateFilePath(file))
      }
    }
  }
}