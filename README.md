# Jimmer Code Gen 模型设计器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

## 文档

[github page](https://pot-mot.github.io/jimmer-code-gen-doc/)

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
pnpm dev
```

更新 api
```
pnpm api
```

打包
```
pnpm build
```

## 项目说明

### [图编辑器](src%2Fcomponents%2Fglobal%2FgraphEditor)

基于函数式的设计封装了 init、selection、history、focus、center、layout 等常用操作，通过该 common store 作为组合式入口。

内部补充了[响应式数据](src%2Fcomponents%2Fglobal%2FgraphEditor%2Fdata%2FreactiveState.ts)以实现页面响应式变更。

### [模型设计器](src%2Fcomponents%2Fpages%2FModelEditor)

不依赖数据源直接设计模型结构，也可直接导入来自数据源的表结构以及其他模型。

## LICENSE

本项目使用 [GPL 许可](LICENSE)
