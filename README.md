# Jimmer Code Gen 代码生成器

项目基于 Vite + Vue3 + TypeScript + Element-Plus 编写

目前支持如下两个核心功能

- **关联编辑**
- **实体生成**

目前关联编辑并不携带建模部分，仅支持数据库结构的单向导入，且仅支持在实体类间创建 ManyToOne 或 OneToOne 的单指向关系


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

> 此处是包括前后端在内的未完成功能点

- 全局配置修改  
[GenConfigDialog.vue](src%2Fcomponents%2Fdialog%2FGenConfigDialog.vue)
- 包管理（实体类与枚举的包，包自身的树形管理等）  
[EntityMenu.vue](src%2Fcomponents%2FEntityGenerator%2Fmenu%2FEntityMenu.vue)
- 实体类属性新增修改删除   
[EntityInfo.vue](src%2Fcomponents%2FEntityGenerator%2Fentity%2FEntityInfo.vue)  
(未来这一块的目录应该会有较大变动)
  - 枚举管理
- 表关联新增修改删除  
[index.vue](src%2Fcomponents%2Fdialog%2FTableDialog%2Findex.vue)

## LICENSE

本项目使用 [GPL 许可](LICENSE)