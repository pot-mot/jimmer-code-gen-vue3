# Jimmer Code Gen 模型设计器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

## Git 仓库地址

### 前端
- [Github 前端](https://github.com/pot-mot/jimmer-code-gen-vue3)
- [Gitee 前端](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-vue3)

### 后端
- [Github 后端](https://github.com/pot-mot/jimmer-code-gen-kotlin)
- [Gitee 后端](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin)

## 启动项目

进入项目根目录

下载全部依赖
```
pnpm install
```

启动
```
vite
```

### 更新 api

进入项目根目录

```
pnpm run api
```

### 打包

> 项目没有配置部署环境，需要根据实际情况修改: 
> 
> 1. [vite.config.ts](vite.config.ts) 
> 2. [api/index.ts](src%2Fapi%2Findex.ts) 中的 BASE_URL
> 3. 后端项目的跨域设置
> 
> 以解决访问问题

```
vite build
```

## 核心设计说明

### 组件封装

> 此处存在大量封装不明确与职责划分模糊，未来仍需改进

#### [图表操作](src%2Fcomponents%2Fbusiness%2FgraphEditor%2Findex.ts)

基于函数式的设计封装了 init、selection、history、focus、center、layout 等常用操作，通过该 common store 作为组合式入口。

内部补充了[响应式数据](src%2Fcomponents%2Fbusiness%2FgraphEditor%2Fcommon%2FreactiveState.ts)以实现页面响应式变更。

如果需要复用 graph 通用操作仅需调用 useCommonGraphOperations 并将一个新的 graph 实例 load 入即可。

#### [模型设计器 ModelEditor](src%2Fcomponents%2Fpages%2FModelEditor%2FPage.vue)

基于关联编辑器重新调整的模型设计器，可以不依赖数据源直接设计模型结构。

表节点结构为实时更新补充了相当多数据监听，但仍有很多情况不可正常的触发视图更新，很多地方存在需要强行书写的情况，因此谨慎调整相关代码。

代码预览部分需要依靠后端的严格类型系统进行，因此**预览操作均会触发保存**。

- 未来将补充 log 功能。

#### [拖曳缩放会话框 DragDialog.vue](src%2Fcomponents%2Fglobal%2Fdialog%2FDragDialog.vue)

考虑到有打开多个会话框进行数据对比的需要，项目中部分会话框使用基于 [Vue3DraggableResizable](https://github.com/a7650/vue3-draggable-resizable/blob/main/docs/document_zh.md) 实现的此会话框而不是 ElDialog。

#### [（TODO）实体类、枚举、包管理](src%2Fcomponents%2Fpages%2FEntityGenerator%2FPage.vue)

目前只有包目录可用

- 未来将补充实体、枚举、业务类、dto 的编辑。

## LICENSE

本项目使用 [GPL 许可](LICENSE)
