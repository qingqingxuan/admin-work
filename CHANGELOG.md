### 2021-11-29(v: 1.0.7)

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
