# Sunl-UI

尚德机构的 UI 方法论以及基于 React 的实现。

框架基于 [react-component](https://github.com/react-component) 开发。


## 任务认领

提交一个 Issue 认领 还未开发的组件，注意认领前先搜索一下 Issue，看有没有人已经认领了。

不允许一次认领多个组件

提交 Issue 的格式为：

标题：

认领组件 componentname

内容可以为空。

## 开发规范

### 1 组件开发

组件基于 [react-component](https://github.com/react-component) 二次开发。

所有组件都放置在 `components/` 目录下，每个组件单独一个文件夹。

组件目录中需要有 `style` 和 `demo` 目录，分别放置样式文件和demo脚本。

在组件目录的根目录创建一个 `README.md` 文件，用来描述组件，组件 API，如何使用组件等信息。

组件代码可以直接放到组件目录的根目录，尽量保持一个文件，如果代码量过大，可以根据实际开发拆分成多个文件。

创建组件模板命令：

`npm run create -- --component="componentname"`

该命令会在 `components/` 目录下创建一个 `componenname` 目录，为你创建好规范的组件目录和惊天文件

### 2 JS开发规范

遵循 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react)，为了保证大家能够尽量按照规范开发，使用 [ESLint](https://github.com/eslint/eslint) 作为 JS 检查工具。ESLint 配置继承自 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)，并对 Airbnb 的默认配置做了部分调整：

1) 2 个空格改为 4 个空格

2) 结尾不需要加分号

3) JSX 能够写在 .js 文件中

4) no-static-element-interactions（warning）

5) JSX 及 JSX prop 缩进 4 个空格

6) 依赖类型安装错误，等级从 error 改为 warning

具体配置可以参考 [.eslintrc.js](http://172.16.117.224/fe/sunl-ui/blob/master/.eslintrc.js) 文件

运行 `npm run eslint:components` 命令会对 components/ 目录中的 js 做 lint 操作

运行 `npm run fixeslint:conponets` 命令会对 components/ 目录中的 js 做 lint 操作，如果 lint 项支持 `--fix`，那么 eslint 会自动帮你修复错误

建议在编辑器里安装 eslint 插件，这样在开发的时候你能随时知道 lint 结果。

**注意** lint 是非常重要的，一定要保证 lint 结果不能有 error，warning 是可以适当容忍的。如果 lint 结果存在 error，你又非常任性的不去修改，那么你首先会发现 dev 环境也就是 demo 页面无法编译了。你放弃 dev 环境，想直接提交代码，那么你会发现，你是无法向 gitlab 提交代码的

重事三：lint 是非常重要的！ lint 是非常重要的！ lint 是非常重要的！

### 3 样式开发规范

遵循 [GitHub CSS 样式规范](https://github.com/primer/stylelint-config-primer)，为了保证大家能够尽量按照规范开发，使用 [stylelint](https://stylelint.io/) 作为 Less/Css 代码检查工具。stylelint 配置继承自 [stylelint-config-primer](https://github.com/primer/stylelint-config-primer)，并对 GitHub 的默认配置做了部分调整：

1) 2 个空格改为 4 个空格

2) 禁用样式属性声明顺序报错（[declaration-block-properties-order](https://stylelint.io/user-guide/rules/declaration-block-properties-order/) 已经被 stylelint deprecated）

3) 可以使用 type 选择器，但是只能在组合选择器（compounded type selectors），或者后代选择器（descendant type selectors）中使用（[selector-no-type](https://stylelint.io/user-guide/rules/selector-no-type/)）

4) 禁用 nested 样式属性之前空行的判断（[rule-nested-empty-line-before](https://stylelint.io/user-guide/rules/rule-nested-empty-line-before/) 已经被 晒太阳了零deprecated） 

具体配置可以参考 [.stylelintrc](http://172.16.117.224/fe/sunl-ui/blob/master/.stylelintrcs) 文件

运行 `npm run stylelint:components` 命令会对 components/ 目录中的 less 做 lint 操作

运行 `npm run fixstylelint:conponets` 命令会对 components/ 目录中的 less 做格式化操作（[stylefmt](https://github.com/morishitter/stylefmt)）

**注意** 与 ESLint一样，stylelint 同样非常重要的，一定要保证 lint 结果不能有 error，warning 是可以适当容忍的。如果 lint 结果存在 error，你又非常任性的不去修改，那么你首先会发现 dev 环境也就是 demo 页面无法编译了。你放弃 dev 环境，想直接提交代码，那么你会发现，你是无法向 gitlab 提交代码的

重事三：lint 是非常重要的！ lint 是非常重要的！ lint 是非常重要的！

### 4 第三方

* 工具：[lodash](https://lodash.com/)
* 依赖管理：[yarn](https://yarnpkg.com)
* 样式：[less](http://lesscss.org/) + [BEM](https://en.bem.info/methodology/css/) + [CSS Modules](https://github.com/css-modules/css-modules)
* 基础组件：[react-component](https://github.com/react-component)

### 5 demo

为了方便开发和调试，支持分组件demo，运行下面的命令可以单独启动某一个组件的demo

`npm run demo -- --component="componenname"`



* BEM 命名
* 每种组件定义自己的前缀，如按钮，可以定义为 `btn`。
* css modules 自动编译，最终输出的样式会添加前缀 `sunl-`。

以 Button 组件为例：

component/button/button.js 中有关样式的代码：

声明样式前缀

`const prefix = 'btn'`

生成样式

```
let classname = classNames(prefix, {
	[`${prefix}--${type}`]: type,
	[`${prefix}--${size}`]: size,
	[`${prefix}--${type}-clicked`]: clicked,
	[`${prefix}--${type}-selected`]: selected,
})
        
var className = classNames(...classname.split(' ').map(value => styles[value]))

```

## 安装

## 使用

#### 引用样式

`import from 'sunl-ui/dist/sui.css'`

#### 引用组件

`
import { Button } from 'sunl-ui'

<Button type="important" text="重要按钮" size="big" />

`
## 设计标注图

### 1 基础组件

![](https://ww3.sinaimg.cn/large/006tNc79ly1ffqmjpaezmj316h352aqs.jpg)

### 2 弹窗

![](https://ww2.sinaimg.cn/large/006tNc79ly1ffdz5vwsv5j31f11hptit.jpg)





