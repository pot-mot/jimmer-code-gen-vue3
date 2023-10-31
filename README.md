# Jimmer Code Gen 代码生成器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

> ## 重构内容
> 
> 补充单独的模型设计器
> 

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

```
vite build
```

## 核心设计说明

### 图表操作封装层

[graphEditor](src%2Futils%2FgraphEditor) 文件夹

基于函数式的设计封装了 init、selection、history、focus、center、layout 等常用操作

> 其中 layout 为 "为适应不同 node 尺寸" 因此没有在框架基础上实现，而是单独书写，可能存在较大问题，未来会考虑再次重构

基于该层补充业务逻辑即可组装出编辑器

业务逻辑主要基于事件和状态实现，即对应组件中的 eventBus 和 store

> 这部分设计是因为涉及编辑器与菜单栏联动，因此很有必要将业务功能中的核心操作（比如菜单向图中导入多张表，或者 schema 本身的删除）与编辑器内部的行为进行拆分

## TODO

### 数据库设计与同步

[表详细信息组件](src%2Fcomponents%2Fglobal%2FTableEntityDialog%2FTableInfo.vue)

[模型设计器组件](src%2Fcomponents%2FModelEditor%2Findex.vue)

[关联编辑器组件](src%2Fcomponents%2FAssociationEditor%2Findex.vue)

### 实体类管理

[实体详细信息组件](src%2Fcomponents%2FEntityGenerator%2Fentity%2FEntityInfo.vue)

- 实体属性新增修改删除

- 枚举创建（在实体属性的类型修改中实现）

[实体生成器 content 组件](src%2Fcomponents%2FEntityGenerator%2Findex.vue)

（这一块暂时没想好怎样设计）

- 实体类管理

- 枚举管理

## LICENSE

本项目使用 [GPL 许可](LICENSE)