### 2022-10-23(v: 2.1.5)

- 升级: 升级 `naive-ui` 版本到： `v2.34.1`

### 2022-10-23(v: 2.1.4)

- 升级: 升级 `naive-ui` 版本到： `v2.34.2`

- 适配: 适配当项目通过 `pnpm` 包管理器进行管理项目时启动和运行报错的问题

### 2022-6-27(v: 2.1.2)

- 升级: 升级 `naive-ui` 版本到： `v2.33.0`

### 2022-6-27(v: 2.1.1)

- 升级: 升级 `naive-ui` 版本到： `v2.30.6`
- 新增：新增自定义: axios request interceptor for useing pinia

### 2022-5-26(v: 2.1.0)

- 重要调整：对框架核心功能做了重要的调整，移除了很多没有用的代码，完善流程，升级文件比较多，这里不一一列举

### 2022-5-18(v: 2.0.2)

- 重要调整：重做 `布局模式`中的 `上下` 模式

### 2022-5-12(v: 2.0.1)

- 升级：完善并修改 `department` 页面中的逻辑和 bug

- 适配：升级 `tailwindcss` 版本 并且 适配修复 `tailwindcss` 高版本 与 `naive-ui` 样式冲突的问题。

- 调整：调整 `tabbar` 中 `tab-item` 样式

- 修复：修复 `isSingle` 属性下不能用的 bug

### 2022-4-12(v: 2.0.0)

- 升级：升级 `naive-ui` 版本 到 `2.28.0`

- 重要升级：菜单可以从本地路由中过滤

  - 之前的菜单都是根据接口数据从本地 `views` 中动态加载，但在某些场景下或者某些人的开发习惯，可能需要根据本地定义中的路由表（如：`src/router/index.ts` 中的 `asyncRoutes`）中动态加载。如果接口中的菜单配置项和本地路由表中的配置项重复，优先使用本地路由表中的配置项。
  - 在根据权限获取到菜单列表的时候，就可以根据以下三种方式加载路由：
    - 完全从 本地 `views` 中动态加载
    - 完全从 本地 `路由表` 中动态加载
    - 本地 `views` 和 本地 `路由表` 两种方式的结合。注：本地 `路由表`方式的 `优先级要高于` 本地 `views`的方式。（本项目默认的使用方式）

- 优化：把 `src/router/index.ts`中的路由分类

  - `constantRoutes` 存放一些系统页面，如`login`、`redirect`、`404`、`403`、`500`等
  - `asyncRoutes` 存放一些需要根据权限加载的路由
  - `extraRoutes` 存放一些由一级页面进入二级及多级页面，不需要在菜单中展示，同时也不需要根据权限加载的路由。如：列表详情页面

- 新增：在菜单数据结构中新增`routeName`属性，方便在有些时候可以自己命令菜单路由名称

  - 在定义路由的时候，需要指定 `name` 属性，项目目前使用的方式是根据 `menuUrl` 获取最后的路径为 `name` 属性值，如 `/system/department`，就会以 `department` 为 `name`属性。
  - 但在某些场景下，可能需要自定义 `name`，这个时候就可以根据 `routeName` 配置项来指定，如指定为 `my-department`。当没有配置此配置项时，还是会使用根据 `menuUrl` 获取最后的路径为 `name`属性值。

- 新增：在菜单数据结构中新增`localFilePath`属性，方便在有些时候可以自己自定义 `vue` 文件路径

  - 在动态加载路由的时候，系统会根据 `menuUrl` 从 `src/views` 中动态加载 `.vue` 文件。
  - 但在某些场景下，可能会根据自定义的 `path` 从 `src/views` 中动态加载 `.vue` 文件。
  - 注：`localFilePath` 在配置的时候要以`views`为参考，可以配置成，如：`system/department` 或者 `./system/department` 或者 `/system/department`。切记：不要加文件后缀名`.vue`

- 新增：在菜单数据结构中新增`isRootPath`属性，可以自定义 `/` 路径跳转的页面地址

  - 在动态加载路由的时候，会增加一个 `path` 为 `/` 的路由，在访问 `http://localhost:3000/` 的时候会加载此配置路由，此路由不方便指定具体的 `component`，但可以指定一个 `redirect` 属性，这样就可以动态配置此路由的跳转页面
  - 如果对某个具体的路由指定 `isRootPath` 为 `true` 的时候，会把此路由的 `path或者menuUrl` 指定为 `/` 路由的 `redirect`属性值
  - 注：
    - 如果没有指定任何路由为 `isRootPath`，则会以根据权限获取的菜单中的第一个元素的 `children` 属性的第一个元素的 `menuUrl` 指定为 `/` 路由的 `redirect`属性值
    - 如果指定了多个路由配置项 `isRootPath` 为 `true`，则会以按顺序获取第一个路由
    - 要指定到某个具体的叶子路由中，如果某个路由下面有 `children` 属性并且不为空，则判定该路由不是叶子路由

- 新增：`defaultRoutes` 为了在一开始对接项目的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。如果设置获取 `菜单` 的地址为空时，会加载此 `defaultRoutes`，否则会加载接口中的菜单数据

  - 在刚开始对接正式后台接口的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。这个时候可以先把 `根据角色获取菜单数据的接口` 置为 `''`，对应本项目中就是，`src/api/url.ts`中的以下地址

  ```ts
  // 在有接口的时候，要配置成真实的接口
  export const getMenuListByRoleId = '/getMenusByRoleId'
  // 在没有接口时候，可以先配置成 '' ，等后台人员提供了接口再进行修改成真实的接口
  export const getMenuListByRoleId = ''
  ```

  - 系统在获取 `getMenuListByRoleId` 地址的时候，发现不是真实的地址，就会加载 `defaultRoutes` 中的路由，以能进入系统的主页面，进行其它的开发工作

### 2022-4-12(v: 1.1.5)

- 升级：升级 `naive-ui` 版本 到 `2.28.0`

- 修改：修复 `tabbar` 滑动异常的 bug，优化滑动流程

- 修改：修改在 `menu` 在多级显示的情况下，刷新浏览器不默认展开的 bug。close [#10](https://github.com/qingqingxuan/admin-work/issues/10)

### 2022-3-28(v: 1.1.4)

- 升级：升级 `naive-ui` 版本 到 `2.27.0`

- 调整：`menu` 菜单，在 `dark` 模式下突出显示样式

- 新增：`RichTextEditor` 数据回显功能

### 2022-3-6(v: 1.1.3)

- 升级：升级 `naive-ui` 版本 到 `2.26.1`

- 升级: 升级`naive-ui`组件由原来的全部引入改成按需引入，新增第三方依赖：`unplugin-vue-components`，删除 `layouts/index.ts` 手动引入的 `naive-ui` 组件

- 修复：`tabbar`中的按钮文本不居中显示的样式 bug

- 调整：重新设置 `table` 中 `按钮` 的显示样式更加精美

- 调整：优化 `table-body`中 `n-table` 高度的流程逻辑，满足自适应高度的场景

- 调整：把 `tableHeader` 和 `tableFooter` 合并到 `tableBody`中

### 2022-1-17(v: 1.1.1)

- 升级：升级 `vue` 版本 到 `3.2.26`

- 升级：升级 `naive-ui` 版本 到 `2.24.0`

- 调整：去除 `layouts/setting/index.vue` 中 `n-scrollbar` 组件

### 2021-12-29(v: 1.1.0)

- 升级：升级 `vue` 版本 到 `3.2.25`

- 新增：`pinia` 第三方依赖

- 调整（重要）：使用 `pinia` 替换 `vuex`

- 优化（重要）：调整 `layoutStore` 获取用户信息信息逻辑

### 2021-12-29(v: 1.0.10)

- 调整外链功能：调整外链功能，把 `redirect` 字段更换成 `outLink`

- 升级：升级 `tailwindcss` 版本 到 `2.2.16`

### 2021-12-18(v: 1.0.9)

- 调整：调整 `menu` 菜单的颜色搭配

- 新增：`base-form-view.vue` 添加 `preset` 属性演示

- 修复：页面不满一屏时，上下滑动的 bug

### 2021-12-17(v: 1.0.8)

- 升级：升级 `NaiveUI`版本为 `2.23.0`

- 修改：把列`表页面`中所有 `swtich` 组件修改为 `Tag`组件

- 修复：修改 `menu.vue`中以下 bug

  - 修改外链显示问题
  - 父级菜单显示全路径
  - 删除 `菜单` 中 `badge` 提示信息功能，在某些情况下会导致 `bug`

- 新增：`/src/hooks/form.ts`文件中新增渲染 `NTag` 方法

### 2021-12-16(v: 1.0.7)

- 升级：升级 `NaiveUI`组件库版本到 `2.22.0`
- 修复：升级 `NaiveUI` 之后， `tabbar` 中的 `button` 过高的 bug
- 删除：删除 `侧边栏` 蓝色背景样式，因为在某些情况下会导致颜色搭配不好的问题

### 2021-11-29(v: 1.0.6)

- 修复：tabbar 中的 item 鼠标切换时上下不对齐的 bug 关闭 [issue-#3](https://github.com/qingqingxuan/admin-work/issues/3)
- 修复：breadcrumd 中，没有到对应路由的情况下，显示 空 bug

### 2021-11-25(v: 1.0.5)

- 修复：切换账号的时候，菜单不更换的 bug
- 修复：当 用户名 过短的时候，下拉菜单会超出的 bug
- 修复：`table-custom.vue` 过滤表单没有内容的 bug, 点击 `删除` 按钮没有效果的 bug
- 修复：`useTitle` 文档标题显示不正确的 bug
- 修复：`role.vue` 不同角色显示的菜单一样的 bug

### 2021-11-19(v: 1.0.4)

- 修复：在 npm run build 模式下，编译不通过的 bug
- 修复：用户列表 中头像不显示的 bug，关闭 [issue-#2](https://github.com/qingqingxuan/admin-work/issues/2)

### 2021-11-17(v: 1.0.3)

- 重置：重新设计登录页面样式
- 修改：progressbar 不随着主题色变换的 bug
- 修改：footer 距离上面一定的距离
- 修复：swtich 在 table 里面不能点击的 bug，关闭 [issue-#1](https://github.com/qingqingxuan/admin-work/issues/1)

### 2021-11-15(v: 1.0.2)

- 新增：图标选择器 组件
- 新增：大图预览 组件
- 新增：省市区选择 组件
- 新增：新添加了几个主流 主题颜色
- 升级：升级 naive-ui 版本：2.20.3
- 修改：首页 加载样式 重新设计

### 2021-11-12(v: 1.0.1)

- 修改：加载页面动画
- 修复：顶部 设置 按钮，在某些情况下会隐藏的 bug
- 修复：tabbar 中 scrollbar 报错的 bug
- 微调：tabbar 中 `Tag Item`的样式
