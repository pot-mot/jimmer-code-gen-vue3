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

## 项目说明

### [图操作](src%2Fcomponents%2Fbusiness%2FgraphEditor%2Findex.ts)

基于函数式的设计封装了 init、selection、history、focus、center、layout 等常用操作，通过该 common store 作为组合式入口。

内部补充了[响应式数据](src%2Fcomponents%2Fbusiness%2FgraphEditor%2Fcommon%2FreactiveState.ts)以实现页面响应式变更。

如果需要复用 graph 通用操作仅需调用 useCommonGraphOperations 并将一个新的 graph 实例 load 入即可。

### [模型设计器 ModelEditor](src%2Fcomponents%2Fpages%2FModelEditor%2FPage.vue)

不依赖数据源直接设计模型结构，也可直接导入来自数据源的表结构以及其他模型。

由于视图层是由数据模型层控制渲染的，存在一些未能同步更新的风险。

同样由于数据层与视图层的变更不一致，历史撤回重做存在较大问题，暂时取消撤回重做，仅保留 log。

代码预览与下载需要依靠后端进行，因此**预览操作均会触发保存**。


### [拖曳缩放会话框 DragDialog.vue](src%2Fcomponents%2Fglobal%2Fdialog%2FDragDialog.vue)

考虑到有打开多个会话框进行数据对比的需要，项目中部分会话框使用基于 [Vue3DraggableResizable](https://github.com/a7650/vue3-draggable-resizable/blob/main/docs/document_zh.md) 实现而不使用 ElDialog。

## LICENSE

本项目使用 [GPL 许可](LICENSE)
