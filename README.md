# Jimmer Code Gen 代码生成器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

> ## 重构内容
> 将原本 table -> entity 的生成方式改为以 model 为中心的生成方式
>
> **在关联编辑中，将以 column 为核心的建立方式转化成以 model 为核心的建立方式**
> 
> 补充单独的 model 的建立与编辑功能
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

## TODO

### 数据库设计与同步

[表详细信息组件](src%2Fcomponents%2Fglobal%2FTableEntityDialog%2FTableInfo.vue)

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