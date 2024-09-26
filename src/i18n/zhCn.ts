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

    MESSAGE_save_success: '保存成功',
    MESSAGE_save_fail: '保存失败',
    MESSAGE_submit_success: '提交成功',
    MESSAGE_submit_fail: '提交失败',
    MESSAGE_edit_success: '编辑成功',
    MESSAGE_edit_fail: '编辑失败',
    MESSAGE_delete_success: '删除成功',
    MESSAGE_delete_fail: '删除失败',

    LABEL_OPERATION: "操作",
    LABEL_CREATE_AT: "创建于",
    LABEL_MODIFY_AT: "修改于",

    LABEL_ModelListPage_createNewModel: "创建新模型",
    LABEL_ModelListPage_manageDataSource: "管理数据源",
    LABEL_ModelListPage_loadModelJson: "导入模型 JSON",

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

    LABEL_ModelForm_name: "名称",
    LABEL_ModelForm_author: "作者",
    LABEL_ModelForm_dataSourceType: "数据源类型",
    LABEL_ModelForm_language: "语言",
    LABEL_ModelForm_packagePath: "包路径",
    LABEL_ModelForm_tablePath: "表路径",
    LABEL_ModelForm_remark: "备注",
    LABEL_ModelForm_advanceOptions: "高级选项",
    LABEL_ModelForm_content: "内容",

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

    VALIDATE_GenTypeMapping_cannot_be_duplicate: 'TypeMapping 不可重复',
    VALIDATE_GenTypeMapping_typeExpression_cannot_be_empty: 'TypeMapping 数据库类型表达式不可为空',
    VALIDATE_GenTypeMapping_propertyType_cannot_be_empty: 'TypeMapping 映射类型不可为空',

    LABEL_GenColumnDefault_dataSourceType: '数据源类型',
    LABEL_GenColumnDefault_typeCode: 'Jdbc 类型',
    LABEL_GenColumnDefault_segment: '→',
    LABEL_GenColumnDefault_rawType: '字面类型',
    LABEL_GenColumnDefault_dataSize: '长度',
    LABEL_GenColumnDefault_numericPrecision: '精度',
    LABEL_GenColumnDefault_defaultValue: '默认值',
    LABEL_GenColumnDefault_remark: '备注',

    VALIDATE_GenColumnDefault_cannot_be_duplicate: 'ColumnDefault 的 dataSourceType 和 typeCode 不可重复',
    VALIDATE_GenColumnDefault_rawType_cannot_be_empty: "ColumnDefault 的字面类型不可为空",
    VALIDATE_GenColumnDefault_dataSize_cannot_be_empty: 'ColumnDefault 的长度不可为空',
    VALIDATE_GenColumnDefault_numericPrecision_cannot_be_empty: 'ColumnDefault 的精度不可为空',

    LABEL_GenTableColumn_category: '列类别',
    LABEL_GenTableColumn_name: '列名',
    LABEL_GenTableColumn_comment: '注释',
    LABEL_GenTableColumn_type: '类型',
    LABEL_GenTableColumn_typeNotNull: '非空',
    LABEL_GenTableColumn_defaultValue: '默认值',

    LABEL_GenTableIndex_name: '名称',
    LABEL_GenTableIndex_uniqueIndex: '唯一',
    LABEL_GenTableIndex_columns: '引用列',

    LABEL_GenEnumItem_name: '名称',
    LABEL_GenEnumItem_value: '值',
    LABEL_GenEnumItem_comment: '注释',
}
