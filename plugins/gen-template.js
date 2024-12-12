var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports, module) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// generate-main-vue-file.js
import fs from "node:fs/promises";
import { resolve as resolve2, dirname, basename as basename2, extname as extname2 } from "node:path";

// utils.js
import { basename, extname, resolve } from "node:path";
var templateFileRegex = /[^.]+\.template\.vue$/;
var fileExtTypeList = [".vue", ".jsx", ".tsx"];
var uiTypeList = ["element", "naive", "ant", "arco"];
function generateRegex() {
  return fileExtTypeList.reduce((pre, ext) => {
    pre.push(
      uiTypeList.reduce((p, ui) => {
        p.push(new RegExp(`.${ui}${ext}$`));
        return p;
      }, [])
    );
    return pre;
  }, []);
}
var [regexVueArray, regexJsxArray, regexTsxArray] = generateRegex();
var ComponentMap = {
  element: "ElementPlus",
  naive: "NaiveUI",
  arco: "ArcoDesign",
  ant: "AntDesign"
};
function toCamelCase(filename) {
  const parts = filename.split(".");
  const nameParts = parts.slice(0, -1);
  return nameParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
function getExts(fileList) {
  const fileModel = fileList.reduce((pre, cur) => {
    const ext = extname(cur);
    const name = cur.replace(ext, "");
    if (!pre[name]) {
      pre[name] = [void 0, void 0, void 0];
    }
    if (ext === ".vue") {
      pre[name].splice(0, 1, ext);
    } else if (ext === ".jsx") {
      pre[name].splice(1, 1, ext);
    } else if (ext === ".tsx") {
      pre[name].splice(2, 1, ext);
    }
    return pre;
  }, {});
  return fileModel;
}
async function getRefFileList(fileList) {
  const componetList = [];
  const componetNameList = [];
  const fileModel = getExts(fileList);
  for (const it of Object.keys(fileModel)) {
    const fileName = basename(it);
    const ext = fileModel[it].find((it2) => !!it2) || ".vue";
    const camelCaseFileName = toCamelCase(fileName + ext);
    if (componetNameList.includes(camelCaseFileName)) {
      continue;
    }
    componetList.push(`const ${camelCaseFileName} = defineAsyncComponent(() => import("./${ext === ".vue" ? fileName + ".vue" : fileName}"))`);
    componetNameList.push(camelCaseFileName);
  }
  const componentGraph = `const componentGraph = {
  ${componetNameList.join(",\n	")}
}`;
  return componetList.join("\n") + "\n" + componentGraph;
}
function getTempFileTemplatePart() {
  return `<template>
  <!--\u8BE5\u6587\u4EF6\u662F\u7CFB\u7EDF\u751F\u6210\u7684\u53EA\u8BFB\u6587\u4EF6\uFF0C\u8BF7\u4E0D\u8981\u4FEE\u6539\u8BE5\u6587\u4EF6-->
  <component ref="asyncComponentRef" :is="asyncComponentName" v-bind="$attrs">
    <template #[item]="props" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="props" />
    </template>
  </component>
</template>`;
}
async function getTempFileScriptPart(findedFile, tempFileList) {
  const importer = await getRefFileList(tempFileList);
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
  const n = \`\${capitalizeFirstLetter('${basename(findedFile).split(".")[0]}')}\${capitalizeFirstLetter(unref(componentUIName))}\`
  const c = componentGraph[n]
  if (!c) {
    return () => (<div>\u6CA1\u6709\u5728\u76EE\u5F55\u4E0B\u627E\u5230 {convertFileName(n + ".vue")} \u6587\u4EF6</div>)
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
</script>`;
}
function getComponentImportInfo(fileList, uiComponent) {
  const reg = new RegExp(`(pages)/(?:[^/]+/)*[^/]+.(${uiComponent}|template).(vue|jsx|tsx)$`);
  const imports = Array.from(fileList).filter((it) => reg.test(it)).reduce((pre, cur) => {
    const relativePath = cur.split("src")[1];
    pre += `
  {
    path:'.${relativePath}',
    fullPath: '${cur}',
    loader: () => import('${cur}')
  },`;
    return pre;
  }, "");
  return `export default [${imports}
]`;
}

// generate-main-vue-file.js
var import_picocolors = __toESM(require_picocolors());
var virtualModuleId = "virtual:component-import";
var resolvedVirtualModuleId = "\0" + virtualModuleId;
var currentUIComponent = "naive";
var compileMode = "single";
var tempFileGraph = {};
var allFilePaths = [];
function isSingleMode() {
  return compileMode === "single";
}
function getTimestamp() {
  return (/* @__PURE__ */ new Date()).getTime();
}
async function getTempFileContent(tempFilePath) {
  if (tempFilePath && tempFileGraph[tempFilePath]) {
    const findedFile = tempFileGraph[tempFilePath].find((it) => basename2(it).includes(currentUIComponent));
    if (findedFile) {
      if (compileMode === "single") {
        const exts = getExts(tempFileGraph[tempFilePath]);
        const fileNameWithoutExt = findedFile.replace(extname2(findedFile), "");
        const ext = (exts[fileNameWithoutExt].find((ext2) => !!ext2) || ".vue").replace(".", "");
        const finalFileName = fileNameWithoutExt + "." + ext;
        if (ext === "jsx" || ext === "tsx") {
          return `<script lang="${ext}">
${await fs.readFile(finalFileName, "utf-8")}
</script>`;
        }
        return `<template>${finalFileName}?${getTimestamp()}</template>`;
      }
      const multiModeContent = `${getTempFileTemplatePart()}
${await getTempFileScriptPart(findedFile, tempFileGraph[tempFilePath])}`;
      return multiModeContent;
    }
  }
  return `<template>${dirname(tempFilePath)}\u76EE\u5F55\u4E0B\u672A\u627E\u5230${ComponentMap[currentUIComponent]}\u7EC4\u4EF6\u5E93\u5BF9\u5E94\u7684.vue\u6587\u4EF6\uFF0C\u5982${basename2(tempFilePath).split(".")[0]}.${currentUIComponent}.vue</template>`;
}
async function handleSrcDir(src) {
  try {
    const srcPath = src;
    const dirContentList = await fs.readdir(srcPath);
    const allFileList = await Promise.all(dirContentList.map(async (it) => {
      const stat = await fs.stat(resolve2(srcPath, it));
      return { file: it, isDirectory: stat.isDirectory() };
    }));
    const fileList = allFileList.filter((it) => !it.isDirectory).map((it) => it.file);
    allFilePaths.push(...allFileList.filter((it) => !it.isDirectory && fileExtTypeList.includes(extname2(it.file))).map((it) => resolve2(src, it.file)));
    let createFilePath = "";
    for (const file of fileList) {
      if (isTargetFile(file)) {
        const fullPath = resolve2(srcPath, file);
        if (!createFilePath)
          createFilePath = getCreateTemplateFilePath(fullPath);
        initTempFileGraph(createFilePath, fullPath);
      }
    }
    if (createFilePath) {
      await createTemplateFile(createFilePath);
    }
    const dirList = allFileList.filter((it) => it.isDirectory).map((it) => it.file);
    for (const dir of dirList) {
      await handleSrcDir(resolve2(srcPath, dir));
    }
  } catch (error) {
    console.log(error);
  }
}
function getCreateTemplateFilePath(relativeFilePath) {
  const createFileName = basename2(relativeFilePath).split(".")[0];
  return resolve2(dirname(relativeFilePath), createFileName + ".template.vue");
}
function isTargetFile(path) {
  return regexVueArray.some((reg) => reg.test(basename2(path))) || regexJsxArray.some((reg) => reg.test(basename2(path))) || regexTsxArray.some((reg) => reg.test(basename2(path)));
}
function initTempFileGraph(tempFilePath, relativeFilePath) {
  if (!tempFileGraph[tempFilePath]) {
    tempFileGraph[tempFilePath] = [];
  }
  if (!~tempFileGraph[tempFilePath].indexOf(relativeFilePath)) {
    tempFileGraph[tempFilePath].push(relativeFilePath);
  }
}
async function updateFileGraph(tempFilePath) {
  const dirPath = dirname(tempFilePath);
  const dirContentList = await fs.readdir(dirPath);
  const allFileList = await Promise.all(dirContentList.map(async (it) => {
    const stat = await fs.stat(resolve2(dirPath, it));
    return { file: it, isDirectory: stat.isDirectory() };
  }));
  const tempFileName = basename2(tempFilePath).split(".")[0];
  const fileList = allFileList.filter((it) => !it.isDirectory && isTargetFile(it.file) && basename2(it.file).split(".")[0] === tempFileName).map((it) => resolve2(dirPath, it.file));
  tempFileGraph[tempFilePath] = fileList;
  if (!Array.isArray(tempFileGraph[tempFilePath]) || tempFileGraph[tempFilePath].length === 0) {
    delete tempFileGraph[tempFilePath];
    await fs.unlink(tempFilePath);
    return false;
  }
  return true;
}
async function createTemplateFile(createFilePath) {
  try {
    await fs.access(createFilePath);
    await fs.chmod(createFilePath, 511);
    await fs.writeFile(createFilePath, await getTempFileContent(createFilePath));
    await fs.chmod(createFilePath, 292);
    console.info(import_picocolors.default.green(`\u3010gen-template\u3011"${createFilePath}" file changed`));
  } catch (error) {
    await fs.writeFile(createFilePath, await getTempFileContent(createFilePath));
    await fs.chmod(createFilePath, 292);
    console.info(import_picocolors.default.green(`\u3010gen-template\u3011"${createFilePath}" file changed`));
  }
}
function generate_main_vue_file_default() {
  const watchPath = resolve2(__dirname, "../src");
  return {
    name: "vite:gen-template-file",
    async configResolved(config) {
      currentUIComponent = JSON.parse(config.define["__APP_UI_COMPONENT__"]);
      compileMode = JSON.parse(config.define["__APP_COMPILE_MODE__"]);
      await handleSrcDir(watchPath);
    },
    configureServer(server) {
      server.watcher.on("add", async (path) => {
        if (isSingleMode()) {
          if (fileExtTypeList.includes(extname2(path))) {
            allFilePaths.push(path);
          }
        }
        if (isTargetFile(path)) {
          const tempFilePath = getCreateTemplateFilePath(path);
          await updateFileGraph(tempFilePath);
          await createTemplateFile(tempFilePath);
        }
      });
      server.watcher.on("unlink", async (path) => {
        if (isSingleMode()) {
          const indexOf = allFilePaths.indexOf(path);
          if (~indexOf) {
            allFilePaths.splice(indexOf, 1);
          }
        }
        if (isTargetFile(path)) {
          const tempFilePath = getCreateTemplateFilePath(path);
          const res = await updateFileGraph(tempFilePath);
          res && await createTemplateFile(tempFilePath);
        } else if (templateFileRegex.test(path)) {
          console.error(import_picocolors.default.red(`${path} \u6A21\u677F\u6587\u4EF6\u5DF2\u88AB\u5220\u9664\uFF0C\u8BF7\u91CD\u65B0\u8FD0\u884C\u9879\u76EE\u751F\u6210\u8BE5\u6587\u4EF6`));
        }
      });
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        if (isSingleMode()) {
          return resolvedVirtualModuleId;
        }
        throw new Error(virtualModuleId + " \u865A\u62DF\u5BFC\u5165\u53EA\u80FD\u5728 single \u7F16\u8BD1\u6A21\u5F0F\u4E0B\u4F7F\u7528");
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        if (isSingleMode()) {
          return getComponentImportInfo(new Set(allFilePaths), currentUIComponent);
        }
        throw new Error(virtualModuleId + " \u865A\u62DF\u5BFC\u5165\u53EA\u80FD\u5728 single \u7F16\u8BD1\u6A21\u5F0F\u4E0B\u4F7F\u7528");
      }
    },
    async transform(code, id) {
      if (templateFileRegex.test(id)) {
        if (compileMode === "single") {
          const reg = /<template>(.*?)<\/template>/;
          const matched = code.match(reg);
          const matchedPath = matched && matched[1] ? matched[1] : "";
          const fileName = matchedPath.split("?")[0];
          if (/<script\s+lang="(jsx|tsx)">/.test(code))
            return code;
          return await fs.readFile(fileName, "utf-8");
        }
        return code;
      }
    },
    handleHotUpdate(ctx) {
      if (compileMode === "single") {
        const { file } = ctx;
        if (isTargetFile(file)) {
          createTemplateFile(getCreateTemplateFilePath(file));
        }
      }
    }
  };
}
export {
  generate_main_vue_file_default as default
};
