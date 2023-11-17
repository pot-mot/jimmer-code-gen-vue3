# Jimmer Code Gen 模型设计器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

## 后端项目地址

[乱跑-了 / jimmer-code-gen](https://gitee.com/run-around---whats-wrong/jimmer-code-gen.git)

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
> 1. [vite.config.ts](vite.config.ts) 
> 2. [api/index.ts](src%2Fapi%2Findex.ts) 中的 BASE_URL
> 3. 后端项目的跨域设置
> 以解决访问问题

```
vite build
```

## 核心设计说明

### 组件封装

> 此处存在大量封装不明确与职责划分模糊，未来仍需改进

#### 图表操作工具层

[graphEditor](src%2Futils%2FgraphEditor)

基于函数式的设计封装了 init、selection、history、focus、center、layout 等常用操作。
基本入口为 [commonStore.ts](src%2Futils%2FgraphEditor%2FcommonStore.ts)，如果需要再设计 graph 也仅需将一个新的 graph 示例 load 入 store 即可。

> 其中 layout 为 "为适应不同 node 尺寸" 因此没有在框架基础上实现，而是单独书写，可能存在较大问题，未来会考虑再次重构

#### 关联编辑器

[AssociationEditor](src%2Fcomponents%2FAssociationEditor)

作为较早期设计，基于直接从数据库获取结构进行关联设置。

正如命名，因不涉及表结构变更，因此整体功能非常简单，直接根据表结构与关联映射为实体。

前置需求是**需要具备现成的数据库结构与可以直接连接的数据源**

#### 模型设计器

[ModelEditor](src%2Fcomponents%2FModelEditor)

基于关联编辑器重新调整的模型设计器，可以不依赖数据源直接设计模型结构。

表节点结构为实时更新补充了相当多数据监听，但仍有很多情况不可正常的触发视图更新，很多地方存在需要强行书写的情况，因此谨慎调整相关代码。

代码预览部分需要依靠后端的严格类型系统进行，因此**预览操作均会触发保存**。

- 未来将补充 log 功能。

#### DragDialog

考虑到有同时查看多个的需求，项目中大部分会话框使用 [DragDialog.vue](src%2Fcomponents%2Fcommon%2FdragDialog%2FDragDialog.vue) 而不是 ElDialog。

#### 实体类管理（TODO）

- 实体属性新增修改删除

- 枚举创建（在模型及实体的属性的类型修改中实现）

## LICENSE

本项目使用 [GPL 许可](LICENSE)