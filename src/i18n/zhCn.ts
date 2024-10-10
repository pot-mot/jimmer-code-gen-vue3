import {MainLocale} from "@/i18n/index.ts";

export const mainLocaleZhCn: MainLocale = {
    BUTTON_edit: "编辑",
    BUTTON_submit: "提交",
    BUTTON_delete: "删除",
    BUTTON_clear: "清理",
    BUTTON_save: "保存",
    BUTTON_cancel: "取消",
    BUTTON_load: "导入",
    BUTTON_export: "导出",
    BUTTON_test: "测试",

    MESSAGE_save_success: '保存成功',
    MESSAGE_save_fail: '保存失败',
    MESSAGE_submit_success: '提交成功',
    MESSAGE_submit_fail: '提交失败',
    MESSAGE_edit_success: '编辑成功',
    MESSAGE_edit_fail: '编辑失败',
    MESSAGE_delete_success: '删除成功',
    MESSAGE_delete_fail: '删除失败',

    CONFIRM_delete: (target: string) => {
        return `你确定要删除 ${target} 吗？`
    },
    CONFIRM_button_confirm: "确定",
    CONFIRM_button_cancel: "取消",

    MESSAGE_router_loading_closeFail: "路由加载动画无法正确关闭",

    MESSAGE_api_fetch_unexpectedResponseStatus: (fetchUrl: string, status: number, result: any) => {
        return `请求【${fetchUrl}】时出现预期之外的状态【${status}】，收到【${JSON.stringify(result)}】`
    },
    MESSAGE_api_fetch_unexpectedResponseType: (fetchUrl: string, contentType: string, result: any) => {
        return `请求【${fetchUrl}】时出现预期之外的响应类型【${contentType}】，收到【${JSON.stringify(result)}】`
    },
    MESSAGE_api_fetch_unexpectedError: (fetchUrl: string, error: any) => {
        return `请求【${fetchUrl}】时出现错误【${JSON.stringify(error)}】`
    },

    MESSAGE_clipBoard_cannotLoad: "剪切板中数据无法直接导入画布",

    LABEL_OPERATION: "操作",
    LABEL_CREATE_AT: "创建于",
    LABEL_MODIFY_AT: "修改于",

    LABEL_ModelListPage_createNewModel: "创建新模型",
    LABEL_ModelListPage_manageDataSource: "管理数据源",
    LABEL_ModelListPage_loadModelJson: "导入模型 (JSON)",

    LABEL_GlobalGenConfigForm: "全局生成配置",
    LABEL_TypeMappingForm: "类型映射配置",
    LABEL_ColumnDefaultForm: "列默认配置",
    LABEL_DebugLog: "Debug 日志",

    LABEL_DebugLog_config: 'Debug 配置',
    LABEL_DebugLog_filterTypes: '过滤类型',
    LABEL_DebugLog_outputTypes: '输出类型',
    LABEL_DebugLog_collectTypes: '收集类型',

    LABEL_DEBUG_type: '类型',
    LABEL_DEBUG_message: '消息内容',
    LABEL_DEBUG_timestamp: '时间戳',

    MESSAGE_DragDialog_noMatchParent: "找不到父级元素",
    MESSAGE_DragDialog_cannotBeFullScreen: "不可全屏（解决方法：将 props.canFullScreen 设置为 true）",

    LABEL_ModelForm_name: "名称",
    LABEL_ModelForm_author: "作者",
    LABEL_ModelForm_dataSourceType: "数据源类型",
    LABEL_ModelForm_language: "语言",
    LABEL_ModelForm_packagePath: "包路径",
    LABEL_ModelForm_tablePath: "表路径",
    LABEL_ModelForm_remark: "备注",
    LABEL_ModelForm_advanceOptions: "高级选项",
    LABEL_ModelForm_content: "内容",

    LABEL_DataSource_new: "新增数据源",

    LABEL_DataSourceForm_name: "名称",
    LABEL_DataSourceForm_url: "URL",
    LABEL_DataSourceForm_username: "用户名",
    LABEL_DataSourceForm_password: "密码",
    LABEL_DataSourceForm_remark: "备注",

    MESSAGE_DataSourceForm_testSuccess: "数据源测试成功",
    MESSAGE_DataSourceForm_testFail: "数据源测试失败",
    MESSAGE_DataSourceForm_saveFail: "数据源保存失败",

    MESSAGE_ModelListPage_modelNotFound: "模型未找到",
    MESSAGE_ModelListPage_fileNotFound: "文件未找到",
    MESSAGE_ModelListPage_modelLoadSuccess: "模型导入成功",
    MESSAGE_ModelListPage_modelExportFail: "模型导出失败",
    MESSAGE_ModelListPage_modelSaveSuccess: "模型保存成功",
    MESSAGE_ModelListPage_modelSaveFail: "模型保存失败",
    MESSAGE_ModelListPage_modelEditSuccess: "模型编辑成功",
    MESSAGE_ModelListPage_modelEditFail: "模型编辑失败",
    MESSAGE_ModelListPage_modelDeleteSuccess: "模型删除成功",
    MESSAGE_ModelListPage_modelDeleteFail: "模型删除失败",

    MESSAGE_ModelEditorStore_graphLoadFail: "图加载失败",
    MESSAGE_ModelEditorStore_modelNotLoad: "模型未加载",
    MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound: "模型保存失败，返回结果未找到",
    MESSAGE_ModelEditorStore_modelSaveSuccess: "模型保存成功",
    MESSAGE_ModelEditorStore_modelSaveFail: "模型保存失败",
    MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound: (id: string) => `表编辑失败，节点【${id}】找不到`,
    MESSAGE_ModelEditorStore_tableDeleteFail_nodeNotFound: (id: string) => `表删除失败，节点【${id}】找不到`,
    MESSAGE_ModelEditorStore_associationEditFail_edgeNotFound: (id: string) => `关联编辑失败，边【${id}】找不到`,

    MESSAGE_ModelEditorPage_modelNotFound: "模型未找到",
    MESSAGE_ModelEditorPage_modelLoadFail: "模型加载失败",
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: "您确定要加载整个 Schema？",

    MESSAGE_modelFileOperations_importModel_validateFail: "模型导入加载校验失败",

    LABEL_ModelEditorMainMenu_loadFromDataSource: "从数据源加载",
    LABEL_ModelEditorMainMenu_loadFromModel: "从模型加载",
    LABEL_ModelEditorMainMenu_tableTitle: "表",
    LABEL_ModelEditorMainMenu_associationTitle: "关联",
    LABEL_ModelEditorMainMenu_enumTitle: "枚举",
    LABEL_ModelEditorMainMenu_createTable: "新建表",
    LABEL_ModelEditorMainMenu_createEnum: "新建枚举",
    LABEL_ModelEditorMainMenu_associationShow_nameOnly: "显示：名称",
    LABEL_ModelEditorMainMenu_associationShow_joinTable: "显示：连接表",
    LABEL_ModelEditorMainMenu_associationShow_joinColumn: "显示：连接列",

    LABEL_ModelEditorGraph_saveModel: '保存',
    LABEL_ModelEditorGraph_editModel: '编辑',
    LABEL_ModelEditorGraph_undo: '撤回',
    LABEL_ModelEditorGraph_redo: '重做',
    LABEL_ModelEditorGraph_layoutAndFit: '整理布局',
    LABEL_ModelEditorGraph_layout_LR: '左至右',
    LABEL_ModelEditorGraph_layout_RL: '右至左',
    LABEL_ModelEditorGraph_layout_TB: '上至下',
    LABEL_ModelEditorGraph_layout_BT: '下至上',
    LABEL_ModelEditorGraph_fit: '适应画布',
    LABEL_ModelEditorGraph_center: '居中',

    VALIDATE_GenEnum_cannotBeDuplicate: (enumName: string) => {
        return `枚举【${enumName}】已存在`
    },

    LABEL_ModelEditorGraph_previewSql: '预览 SQL',
    LABEL_ModelEditorGraph_previewEntity: '预览实体',
    LABEL_ModelEditorGraph_exportModelJson: '导出模型 (JSON)',
    LABEL_ModelEditorGraph_downloadAll: '下载全部 (ZIP)',

    LABEL_ModelEditorGraph_clean: '清理画布',
    LABEL_ModelEditorGraph_cleanSelected: '清理选中部分',
    LABEL_ModelEditorGraph_cleanAssociation: '清理关联',
    LABEL_ModelEditorGraph_cleanSelectedAssociation: '清理选中关联',

    LABEL_TableForm_asSuperTable: "作为上级表",
    LABEL_TableForm_extendTables: "继承的表",
    LABEL_TableForm_columns: "列",
    LABEL_TableForm_indexes: "索引",
    LABEL_TableForm_columnType_pk: "主键",
    LABEL_TableForm_columnType_autoIncrement: "自增",
    LABEL_TableForm_columnType_businessKey: "业务键",
    LABEL_TableForm_columnType_logicalDelete: "逻辑删除",

    LABEL_GenConfigForm_dataSourceType: "数据源类型",
    LABEL_GenConfigForm_language: "语言",
    LABEL_GenConfigForm_defaultRealFk: "默认使用真实外键",
    LABEL_GenConfigForm_databaseNamingStrategy: "数据库命名策略",
    LABEL_GenConfigForm_packagePath: "包路径",
    LABEL_GenConfigForm_tablePath: "映射表路径",
    LABEL_GenConfigForm_logicalDeletedAnnotation: "逻辑删除注释",
    LABEL_GenConfigForm_tableAnnotation: "生成 Table 注释",
    LABEL_GenConfigForm_columnAnnotation: "生成 Column 注释",
    LABEL_GenConfigForm_joinColumnAnnotation: "生成 JoinColumn 注释",
    LABEL_GenConfigForm_joinTableAnnotation: "生成 JoinTable 注释",
    LABEL_GenConfigForm_idViewProperty: "生成 IdView",
    LABEL_GenConfigForm_tableNamePrefixes: "表名前缀",
    LABEL_GenConfigForm_tableNameSuffixes: "表名后缀",
    LABEL_GenConfigForm_tableCommentPrefixes: "表注释前缀",
    LABEL_GenConfigForm_tableCommentSuffixes: "表注释后缀",
    LABEL_GenConfigForm_columnNamePrefixes: "列名前缀",
    LABEL_GenConfigForm_columnNameSuffixes: "列名后缀",
    LABEL_GenConfigForm_columnCommentPrefixes: "列注释前缀",
    LABEL_GenConfigForm_columnCommentSuffixes: "列注释后缀",
    LABEL_GenConfigForm_tableDefinition: "表定义",
    LABEL_GenConfigForm_entityClassConfig: "实体类配置",
    LABEL_GenConfigForm_removeSuffix: "移除前后缀",

    LABEL_GenTypeMapping_dataSourceType: '数据源类型',
    LABEL_GenTypeMapping_typeExpression: '数据库类型匹配表达式（正则）',
    LABEL_GenTypeMapping_language: '后端语言',
    LABEL_GenTypeMapping_propertyType: '映射类型',
    LABEL_GenTypeMapping_remark: '备注',

    VALIDATE_GenTypeMapping_cannotBeDuplicate: 'TypeMapping 不可重复',
    VALIDATE_GenTypeMapping_typeExpression_cannotBeEmpty: 'TypeMapping 数据库类型表达式不可为空',
    VALIDATE_GenTypeMapping_propertyType_cannotBeEmpty: 'TypeMapping 映射类型不可为空',

    LABEL_GenColumnDefault_dataSourceType: '数据源类型',
    LABEL_GenColumnDefault_typeCode: 'Jdbc 类型',
    LABEL_GenColumnDefault_segment: '→',
    LABEL_GenColumnDefault_rawType: '字面类型',
    LABEL_GenColumnDefault_dataSize: '长度',
    LABEL_GenColumnDefault_numericPrecision: '精度',
    LABEL_GenColumnDefault_defaultValue: '默认值',
    LABEL_GenColumnDefault_remark: '备注',

    VALIDATE_GenColumnDefault_cannotBeDuplicate: 'ColumnDefault 数据源类型和Jdbc 类型组合不可重复',
    VALIDATE_GenColumnDefault_rawType_cannotBeEmpty: "ColumnDefault 的字面类型不可为空",
    VALIDATE_GenColumnDefault_dataSize_cannotBeEmpty: 'ColumnDefault 的长度不可为空',
    VALIDATE_GenColumnDefault_numericPrecision_cannotBeEmpty: 'ColumnDefault 的精度不可为空',

    LABEL_GenTableColumn_category: '列类别',
    LABEL_GenTableColumn_name: '列名',
    LABEL_GenTableColumn_comment: '注释',
    LABEL_GenTableColumn_type: '类型',
    LABEL_GenTableColumn_typeNotNull: '非空',
    LABEL_GenTableColumn_defaultValue: '默认值',

    LABEL_GenTableIndex_name: '名称',
    LABEL_GenTableIndex_uniqueIndex: '唯一',
    LABEL_GenTableIndex_columns: '引用列',

    LABEL_EnumForm_name: '名称',
    LABEL_EnumForm_comment: '注释',
    LABEL_EnumForm_type: '类型',
    LABEL_EnumForm_typeUnset: '默认',

    LABEL_GenEnumItem_name: '名称',
    LABEL_GenEnumItem_value: '值',
    LABEL_GenEnumItem_comment: '注释',
}
