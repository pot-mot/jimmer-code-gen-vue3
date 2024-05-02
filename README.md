# Jimmer Code Gen 模型设计器

[项目文档](https://pot-mot.github.io/jimmer-code-gen-doc/)

一款实体模型设计与代码生成工具，旨在快捷创建 [Jimmer](https://github.com/babyfish-ct/jimmer) 下的实体与关联。

目前支持数据库表、关联、枚举的外部导入与设计，并支持生成对应 DDL 和 Java、Kotlin 实体。

默认本前端项目打包产物已内置于后端项目[发行版](https://github.com/pot-mot/jimmer-code-gen-kotlin/releases)内，可直接下载
jar 包启动使用。

## 仓库地址

| 后端                                                                         | 前端                                                                       |
|----------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [Github](https://github.com/pot-mot/jimmer-code-gen-kotlin)                | [Github](https://github.com/pot-mot/jimmer-code-gen-vue3)                |
| [Gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin) | [Gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-vue3) |

## 基本命令

| 命令             | 说明                      |
|----------------|-------------------------|
| `pnpm install` | 下载依赖                    |
| `pnpm dev`     | 启动项目                    |
| `pnpm build`   | 构建项目，执行前将先进行`vue-tsc`校验 |
| `pnpm api`     | 应用前后端免对接生成的接口           |

## 项目结构

| 分块                                      | 说明                                                                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [global](src%2Fcomponents%2Fglobal)     | 全局通用组件，如 [DragDialog](src%2Fcomponents%2Fglobal%2Fdialog%2FDragDialog.vue)、[EditList](src%2Fcomponents%2Fglobal%2Flist%2FEditList.vue) |
| [business](src%2Fcomponents%2Fbusiness) | 业务组件，包含了实体表单与校验，如[TableForm](src%2Fcomponents%2Fbusiness%2Ftable%2FTableForm.vue)                                                      |
| [pages](src%2Fcomponents%2Fpages)       | 页面组件，如 [ModelEditor](src%2Fcomponents%2Fpages%2FModelEditor)                                                                           |

## LICENSE

本项目使用 [GPL 许可](LICENSE)
