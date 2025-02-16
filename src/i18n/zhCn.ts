import type {MainLocaleKeyParam, ProjectLocale} from "@/i18n/index.ts"
import type {DeepReadonly} from "vue"
import type {GenAssociationModelInput, GenTableModelInput, IdName} from "@/api/__generated/model/static"
import {defaultPlaceholder, Errors, formatIdName} from "@/api/handleError.ts"
import {jsonPrettyFormat} from "@/utils/json.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

export const localeZhCn: ProjectLocale = {
    BUTTON_edit: "编辑",
    BUTTON_submit: "提交",
    BUTTON_delete: "删除",
    BUTTON_clear: "清理",
    BUTTON_save: "保存",
    BUTTON_cancel: "取消",
    BUTTON_load: "导入",
    BUTTON_export: "导出",
    BUTTON_test: "测试",

    ErrorCode_CONVERT__MODEL_NOT_FOUND: (error: Errors["CONVERT"]["MODEL_NOT_FOUND"]) =>
        `【表转换实体错误】
  模型【${error.modelId}】未找到`,

    ErrorCode_CONVERT__ENTITY_MATCH_TABLE_NOT_FOUND: (error: Errors["CONVERT"]["ENTITY_MATCH_TABLE_NOT_FOUND"]) =>
        `【表转换实体错误】
  实体【${formatIdName(error.entity)}】对应表【${error.tableId}】未找到`,

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) =>
        `【表转换实体错误】
  对外关联【${formatIdName(error.association)}】无法找到源列
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)} !未找到!】 -> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) =>
        `【表转换实体错误】
  对内关联【${formatIdName(error.association)}】无法找到目标列
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)}】 -> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)} !未找到!】`,

    ErrorCode_CONVERT__ASSOCIATION_CANNOT_BE_ONE_TO_MANY: (error: Errors["CONVERT"]["ASSOCIATION_CANNOT_BE_ONE_TO_MANY"]) =>
        `【表转换实体错误】
  关联【${formatIdName(error.association)}】不能为 !一对多!，请调整关联类型
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)}】 -> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__MULTIPLE_COLUMNS_NOT_SUPPORTED: (error: Errors["CONVERT"]["MULTIPLE_COLUMNS_NOT_SUPPORTED"]) =>
        `【表转换实体错误】
  关联【${formatIdName(error.association)}】不可为多列
  源表【${formatIdName(error.sourceTable)}】 - 源列${error.sourceColumns.map(it => `【${formatIdName(it)}】`).join(", ")} -> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列${error.targetColumns.map(it => `【${formatIdName(it)}】`).join(", ")}`,

    ErrorCode_CONVERT__ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED: (error: Errors["CONVERT"]["ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED"]) =>
        `【表转换实体错误】
  ID 视图暂时不支持多个主键
  IdView【${error.idViewProperty}】
  基础属性【${error.baseProperty}】
  关联属性【${error.associationProperty}】
  类型表【${formatIdName(error.typeTable)}】
  类型表主键列ID【${error.typeTablePkColumnIds.join(', ')}】`,

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY"]) =>
        `【表转换实体错误】
  对外关联【${formatIdName(error.association)}】无法找到源基础属性
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)}】 ->
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY"]) =>
        `【表转换实体错误】
  对内关联【${formatIdName(error.association)}】无法找到目标基础属性
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)}】 ->
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__PROPERTY_NAME_DUPLICATE: (error: Errors["CONVERT"]["PROPERTY_NAME_DUPLICATE"]) =>
        `【表转换实体错误】
  属性名称重复
  表【${formatIdName(error.table)}】
  重复名称【${error.duplicateName}】
  属性【${error.properties.map(prop => `${jsonPrettyFormat(prop)}`).join(', ')}】`,

    ErrorCode_CONVERT__SUPER_TABLE_SUPER_ENTITY_NOT_MATCH: (error: Errors["CONVERT"]["SUPER_TABLE_SUPER_ENTITY_NOT_MATCH"]) =>
        `【表转换实体错误】
  上级表与上级实体不匹配
  表【${formatIdName(error.table)}】
  上级表ID列表【${error.superTableIds.join(', ')}】
  上级实体ID列表【${error.superEntityIds.join(', ')}】`,

    ErrorCode_COLUMN_TYPE_MISS_REQUIRED_PARAM: (error: Errors["COLUMN_TYPE"]["MISS_REQUIRED_PARAM"]) =>
        `【类类型设置错误】
  缺少必需参数
  列【${error.column != undefined ? formatIdName(error.column) : error.columnName != undefined ? error.columnName : defaultPlaceholder}】
  JDBC Code【${error.typeCode}】
  必需参数【${error.requiredParam}】`,

    ErrorCode_DATA_SOURCE__CONNECT_FAIL: (error: Errors["DATA_SOURCE"]["CONNECT_FAIL"]) =>
        `数据源连接失败
  异常信息【${error.exceptionMessage}】`,

    ErrorCode_DATA_SOURCE__H2__INIT_FAIL: (error: Errors["DATA_SOURCE"]["H2__INIT_FAIL"]) =>
        `【H2 初始化失败】
  异常信息：${error.exceptionMessage}`,

    ErrorCode_DATA_SOURCE__SQL_EXECUTE_FAIL: (error: Errors["DATA_SOURCE"]["SQL_EXECUTE_FAIL"]) =>
        `【SQL 执行失败】
  SQL 语句：${error.sql}
  异常信息：${error.exceptionMessage}`,

    ErrorCode_DATA_SOURCE__DATA_SOURCE_NOT_FOUND: (error: Errors["DATA_SOURCE"]["DATA_SOURCE_NOT_FOUND"]) =>
        `【数据源未找到】
  数据源 ID：${error.id}`,

    ErrorCode_MODEL__DEFAULT_ITEM_NOT_FOUND: (error: Errors["MODEL"]["DEFAULT_ITEM_NOT_FOUND"]) =>
        `【枚举默认项不存在】
  枚举【${formatIdName(error.enum)}】`,

    ErrorCode_MODEL__ID_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["ID_PROPERTY_NOT_FOUND"]) =>
        `【实体ID属性未找到】
  实体【${formatIdName(error.entity)}】`,

    ErrorCode_MODEL__ID_PROPERTY_MORE_THAN_ONE: (error: Errors["MODEL"]["ID_PROPERTY_MORE_THAN_ONE"]) =>
        `【实体ID属性存在多个】
  实体【${formatIdName(error.entity)}】
  属性${error.idProperties.map(it => `【${formatIdName(it)}】`).join(", ")}`,

    ErrorCode_MODEL__LONG_ASSOCIATION_CIRCULAR_DEPENDENCE: (error: Errors["MODEL"]["LONG_ASSOCIATION_CIRCULAR_DEPENDENCE"]) =>
        `【实体关联存在循环依赖】
  实体【${formatIdName(error.entity)}】
  关联路径:
    ${error.properties.map(it => `【${formatIdName(it)}】`).join("\n    ")}`,

    ErrorCode_MODEL__SUB_ENTITY_NO_CURRENT_PATH: (error: Errors["MODEL"]["SUB_ENTITY_NO_CURRENT_PATH"]) =>
        `【子实体缺失当前路径】
  实体【${formatIdName(error.entity)}】
  关联路径:
    ${error.pathProperties.map(it => `【${formatIdName(it)}】`).join("\n    ")}`,

    ErrorCode_MODEL__INDEX_REF_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["INDEX_REF_PROPERTY_NOT_FOUND"]) =>
        `【索引引用属性未找到】
  实体【${formatIdName(error.entity)}】
  属性${error.entityProperties.map(it => `【${formatIdName(it)}${it.id === error.notFoundPropertyId ? ' !未找到!' : ''}】`).join(", ")}
  索引【${formatIdName(error.index)}】
  索引引用的属性${error.indexPropertyIds.map(it => `【${it}${it === error.notFoundPropertyId ? ' !未找到!' : ''}】`).join(", ")}`,

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY"]) =>
        `【树形实体错误】
  树形实体【${formatIdName(error.entity)}】无法找到父属性
  自关联属性【${error.selfAssociationProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY"]) =>
        `【树形实体错误】
  树形实体【${formatIdName(error.entity)}】无法找到子属性
  自关联属性【${error.selfAssociationProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,

    ErrorCode_GENERATE__MODEL_NOT_FOUND: (error: Errors["GENERATE"]["MODEL_NOT_FOUND"]) =>
        `【生成错误】
  模型未找到
  模型ID【${error.modelId}】`,

    ErrorCode_GENERATE__ENTITY_NOT_FOUND: (error: Errors["GENERATE"]["ENTITY_NOT_FOUND"]) =>
        `【生成错误】
  实体未找到
  实体ID【${error.entityId}】`,

    ErrorCode_GENERATE__ENUM_NOT_FOUND: (error: Errors["GENERATE"]["ENUM_NOT_FOUND"]) =>
        `【生成错误】
  枚举未找到
  枚举ID【${error.enumId}】`,

    ErrorCode_GENERATE__INDEX_COLUMN_NOT_FOUND_IN_TABLE: (error: Errors["GENERATE"]["INDEX_COLUMN_NOT_FOUND_IN_TABLE"]) =>
        `【生成错误】
  索引列在表中未找到
  索引【${formatIdName(error.index)}】
  索引列ID列表【${error.indexColumnIds.join(', ')}】
  表【${formatIdName(error.table)}】
  表列【${error.tableColumns.map(col => col.name).join(', ')}】`,

    ErrorCode_GENERATE__DEFAULT_IMPORT_MORE_THAN_ONE: (error: Errors["GENERATE"]["DEFAULT_IMPORT_MORE_THAN_ONE"]) =>
        `【生成错误】
  vue default import 同路径存在多于一个导入
  路径【${error.path}】
  导入项【${error.importItems.join(', ')}】`,

    ErrorCode_GENERATE__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["GENERATE"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) =>
        `【生成错误】
  对外关联【${formatIdName(error.association)}】无法找到源列
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)} !未找到!】 -> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)}】`,

    ErrorCode_GENERATE__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["GENERATE"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) =>
        `【生成错误】
  对内关联【${formatIdName(error.association)}】无法找到目标列
  源表【${formatIdName(error.sourceTable)}】 - 源列【${formatIdName(error.sourceColumn)}】-> 
  目标表【${formatIdName(error.targetTable)}】 - 目标列【${formatIdName(error.targetColumn)} !未找到!】`,

    ErrorCode_LOAD_FROM_MODEL__INDEX_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEX_COLUMN_NOT_FOUND"]) =>
        `【模型导入错误】
  索引对应列未找到
  索引【${error.indexName}】
  索引使用列【${error.indexColumnNames.join(', ')}】
  表【${formatIdName(error.table)}】
  未找到列名称【${error.notFoundColumnName}】`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  关联【${error.associationName}】源表未找到
  源表【${error.sourceTableName} !未找到!】 - 源列${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  目标表【${error.targetTableName}】 - 目标列${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  关联【${error.associationName}】目标表未找到
  源表【${error.sourceTableName}】 - 源列${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  目标表【${error.targetTableName} !未找到!】 - 目标列${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_COLUMN_NOT_FOUND"]) =>
        `【模型导入错误】
  关联【${error.associationName}】源列未找到
  源表【${error.sourceTableName}】 - 源列${error.sourceColumnNames.map(it => `【${it}${it === error.notFoundSourceColumnName ? ' !未找到!' : ''}】`).join(', ')} ->
  目标表【${error.targetTableName}】 - 目标列${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_COLUMN_NOT_FOUND"]) =>
        `【模型导入错误】
  关联【${error.associationName}】目标列未找到
  源表【${error.sourceTableName}】 - 源列${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  目标表【${error.targetTableName}】 - 目标列${error.targetColumnNames.map(it => `【${it}${it === error.notFoundTargetColumnName ? ' !未找到!' : ''}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  表【${error.tableName}】未找到`,

    ErrorCode_LOAD_FROM_MODEL__TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_SUPER_TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  表【${formatIdName(error.table)}】的上级表【${error.notFoundSuperTableName}】未找到
  表目前的上级表${error.superTableNames.map(it => `【${it}${it === error.notFoundSuperTableName ? ' !未找到!' : ''}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  索引【${error.indexNames.join(', ')}】原始表【${error.notFoundTableName}】未找到`,

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_SUPER_TABLE_NOT_FOUND"]) =>
        `【模型导入错误】
  索引【${error.indexNames.join(', ')}】对应表【${formatIdName(error.table)}】的上级表【${error.superTableIds}】未找到`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY"]) =>
        `【从数据源导入错误】
  外键【${error.foreignKeyName}】关联列引用不能为空`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS"]) =>
        `【从数据源导入错误】
  外键【${error.foreignKeyName}】引用了多个列，暂不支持
${error.columnTablePairs.map(item => `  列【${formatIdName(item.column)}】 -> 表【${formatIdName(item.table)}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__INDEX_COLUMN_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["INDEX_COLUMN_TABLE_NOT_MATCH"]) =>
        `【从数据源导入错误】
  索引【${error.indexName}】中的列引用的表不一致
${error.indexColumnToTables.map(item => `  列【${formatIdName(item.column)}】 -> 表【${formatIdName(item.table)}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND"]) =>
        `【从数据源导入错误】
  外键【${error.foreignKeyName}】引用表【${error.tableName}】未找到`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND"]) =>
        `【从数据源导入错误】
  外键【${error.foreignKeyName}】引用列【${error.tableName}.${error.columnName}】未找到`,

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_CANNOT_MATCH_TABLE: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_CANNOT_MATCH_TABLE"]) =>
        `【实体无法匹配表】
  实体【${error.entityName}】无法匹配表【${error.tableName}】`,

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND"]) =>
        `【匹配的表转换实体未找到】
  实体【${error.entityName}】匹配表【${formatIdName(error.table)}】转换后的实体未找到`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_MATCH_COLUMN: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_MATCH_COLUMN"]) =>
        `【属性无法匹配列】
  实体【${formatIdName(error.entity)}】属性【${error.propertyName}】无法匹配列`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_REMATCH_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_REMATCH_OLD_PROPERTY"]) =>
        `【属性无法重新匹配旧属性】
  实体【${formatIdName(error.entity)}】属性【${error.propertyName}】无法重新匹配旧属性【${formatIdName(error.matchedColumn)}】`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY"]) =>
        `【属性匹配了多个旧属性】
  实体【${formatIdName(error.entity)}】属性【${error.propertyName}】匹配了多个旧属性【${error.matchedProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,


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

    MESSAGE_clipBoard_cannotDirectLoad: "剪切板中数据无法直接导入",
    MESSAGE_clipBoard_cannotDirectLoad_validateError: (errors: any) => `剪切板中数据无法直接导入\n原因: ${JSON.stringify(errors)}`,

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
    MESSAGE_ModelEditorPage_modelLoadFail: "模型导入失败",
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: "您确定要导入整个数据架构？",
    CONFIRM_ModelEditorPage_modelLoad_singleTable: "您确定要导入该表和它的全部关联？",

    MESSAGE_modelFileOperations_importModelJson_validateFail: "模型JSON导入加载校验失败",
    MESSAGE_modelFileOperations_importModelJson_convertModelFail: "模型JSON导入转换实体失败",
    MESSAGE_modelFileOperations_importModelJson_convertModelFail_entities_businessWillNotBeSaved: "模型JSON导入转换实体失败, \n实体业务配置也将不会被保存",
    MESSAGE_modelFileOperations_importModelJson_entities_saveBusinessFail: "模型JSON导入保存实体业务配置失败",

    LABEL_ModelEditorMainMenu_loadFromDataSource: "从数据源加载",
    LABEL_ModelEditorMainMenu_loadFromModel: "从模型导入",
    LABEL_ModelEditorMainMenu_tableTitle: "表",
    LABEL_ModelEditorMainMenu_associationTitle: "关联",
    LABEL_ModelEditorMainMenu_enumTitle: "枚举",
    LABEL_ModelEditorMainMenu_createTable: "新建表",
    LABEL_ModelEditorMainMenu_combineTable: "组合表",
    LABEL_ModelEditorMainMenu_createAssociation: "新建关联",
    LABEL_ModelEditorMainMenu_batchCreateAssociation: "批量创建",
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

    MESSAGE_ModelEditorGraph_modelSaveSuccess: "模型保存成功",
    MESSAGE_ModelEditorGraph_modelSaveError: (e: any) => `模型保存失败，错误：${e}`,

    MESSAGE_ModelEditorGraph_someChangeNotSave: "有变更尚未保存",

    LABEL_ModelEditorGraph_previewCode: '预览代码',
    LABEL_ModelEditorGraph_exportModel: '导出模型',
    LABEL_ModelEditorGraph_downloadAll: '下载全部 (ZIP)',
    LABEL_ModelEditorGraph_downloadCurrent: '下载当前',
    LABEL_ModelEditorGraph_downloadFiltered: '下载过滤后 (ZIP)',

    LABEL_ModelEditorGraph_clean: '清理画布',
    LABEL_ModelEditorGraph_cleanSelected: '清理选中部分',
    LABEL_ModelEditorGraph_cleanAssociation: '清理关联',
    LABEL_ModelEditorGraph_cleanSelectedAssociation: '清理选中关联',

    MESSAGE_ModelEditorGraph_history_cannotUndo: "不可撤回",
    MESSAGE_ModelEditorGraph_history_cannotRedo: "不可重做",

    LABEL_GraphSearcher_tableKeywords: "表关键字",
    LABEL_GraphSearcher_columnKeywords: "列关键字",
    LABEL_GraphSearcher_enumKeywords: "枚举关键字",
    LABEL_GraphSearcher_indexKeywords: "索引关键字",
    LABEL_GraphSearcher_superTableKeywords: "上级表关键字",
    LABEL_GraphSearcher_associationKeywords: "关联关键字",
    LABEL_GraphSearcher_associationType: "关联类型",
    LABEL_GraphSearcher_selectAll: "选择全部",

    VALIDATE_GenModel_nameCannotBeEmpty: "模型名不得为空",
    VALIDATE_ModelForm_graphDataValidationFailed: "图数据校验失败，请参考控制台报错",
    VALIDATE_ModelForm_graphDataJsonConversionFailed: "图数据 JSON 转换失败，请参考控制台报错",

    VALIDATE_GenModel_tableValidError: (tableName: string, subMessage: MainLocaleKeyParam) => {
        return `表【${tableName}】存在问题：${useI18nStore().translate(subMessage)}`;
    },
    VALIDATE_GenModel_associationValidError(associationName: string, subMessage: MainLocaleKeyParam): string {
        return `关联【${associationName}】存在问题：${useI18nStore().translate(subMessage)}`;
    },
    VALIDATE_GenModel_enumValidError(enumName: string, subMessage: MainLocaleKeyParam): string {
        return `枚举【${enumName}】存在问题：${useI18nStore().translate(subMessage)}`;
    },

    LABEL_TableForm_asSuperTable: "作为上级表",
    LABEL_TableForm_extendTables: "继承的表",
    LABEL_TableForm_columns: "列",
    LABEL_TableForm_indexes: "索引",
    LABEL_TableForm_columnType_pk: "主键",
    LABEL_TableForm_columnType_autoIncrement: "自增",
    LABEL_TableForm_columnType_businessKey: "业务键",
    LABEL_TableForm_columnType_keyGroup: "键组",
    LABEL_TableForm_columnType_logicalDelete: "逻辑删除",

    VALIDATE_GenTable_nameCannotBeEmpty: "表名不得为空",
    VALIDATE_GenTable_nameCannotBeDuplicate: (tableName: string) => `表名【${tableName}】不可重复`,
    VALIDATE_GenTable_columnNameCannotBeEmpty: "列名不得为空",
    VALIDATE_GenTable_columnNameCannotBeDuplicate: (columnName: string) => `列名【${columnName}】不可重复`,
    VALIDATE_GenTable_columnDataSizeCannotBeNull: (columnName: string) => `列【${columnName}】的长度不可为空`,
    VALIDATE_GenTable_columnNumericPrecisionCannotBeNull: (columnName: string) => `列【${columnName}】的精度不可为空`,
    VALIDATE_GenTable_columnEnumNotFound: (columnName: string, enumName: string) => `列【${columnName}】对应枚举【${enumName}】不存在`,
    VALIDATE_GenTable_indexNameCannotBeEmpty: "索引名不得为空",
    VALIDATE_GenTable_indexNameCannotBeDuplicate: (indexName: string) => `索引名【${indexName}】不可重复`,
    VALIDATE_GenTable_superTableNotFound: (superTableName: string) => `【${superTableName}】不存在/不是上级表/存在循环依赖`,
    VALIDATE_GenTable_primaryKeyMustBeSingle: "仅可有一个主键",
    VALIDATE_GenTable_mustHavePrimaryKey: "必须要有一个主键，或作为上级表",
    VALIDATE_GenTable_primaryKeyNotAllowed: "上级表中已具有主键，当前表中不需要主键",
    VALIDATE_GenTable_primaryKeyMustBeNotNull: (columnName: string) => `主键列【${columnName}】必须非空`,
    VALIDATE_GenTable_primaryKeyCannotBeEnum: (columnName: string) => `主键列【${columnName}】不可为枚举类型`,
    VALIDATE_GenTable_primaryKeyCannotBeBusinessKey: (columnName: string) => `主键列【${columnName}】不可为 Key`,
    VALIDATE_GenTable_primaryKeyCannotBeLogicalDelete: (columnName: string) => `主键列【${columnName}】不可为逻辑删除`,
    VALIDATE_GenTable_columnNameConflictWithSuperTable: (columnName: string) => `列名【${columnName}】与上级表中的列名重复`,
    VALIDATE_GenTable_columnNameConflictWithChildTable: (columnName: string) => `列名【${columnName}】与子表中的列名重复`,
    VALIDATE_GenTable_indexColumnNotFound: (indexName: string, columnName: string) => `索引【${indexName}】引用列【${columnName}】不存在`,
    VALIDATE_GenTable_indexColumnNameCannotBeEmpty: (indexName: string) => `索引【${indexName}】引用列名不得为空`,
    VALIDATE_GenTable_indexColumnNameCannotBeDuplicate: (indexName: string, columnName: string) => `索引【${indexName}】引用列名【${columnName}】不可重复`,

    LABEL_TableCombineForm_superTableName: "上级表名称",
    LABEL_TableCombineForm_tables: "表",
    LABEL_TableCombineForm_tables_placeholder: "选择表",
    LABEL_TableCombineForm_tables_selectAll: "选择全部",
    LABEL_TableCombineForm_columns: "列",
    LABEL_TableCombineForm_columns_placeholder: "选择列",
    LABEL_TableCombineForm_columns_selectAll: "选择全部",

    LABEL_AssociationForm_name: "关联名称",
    LABEL_AssociationForm_mappingAssociation: "映射关联",
    LABEL_AssociationForm_sourceTableName_placeholder: "源表",
    LABEL_AssociationForm_sourceTableName_selectAll: "选择全部",
    LABEL_AssociationForm_targetTableName_placeholder: "目标表",
    LABEL_AssociationForm_sourceColumnName_placeholder: "源列",
    LABEL_AssociationForm_placeSelectSourceTableFirst: "请先选择源表",
    LABEL_AssociationForm_targetColumnName_placeholder: "目标列",
    LABEL_AssociationForm_placeSelectTargetTableFirst: "请先选择目标表",
    LABEL_AssociationForm_type: "关联类型",
    LABEL_AssociationForm_fake: "伪外键",
    LABEL_AssociationForm_dissociateAction: "脱钩行为",
    LABEL_AssociationForm_updateAction: "更新行为",
    LABEL_AssociationForm_deleteAction: "删除行为",

    VALIDATE_GenAssociation_name_cannotBeEmpty: "关联名不可为空",
    VALIDATE_GenAssociation_name_cannotBeDuplicate: "关联名不可重复",
    VALIDATE_GenAssociation_joinMeta_cannotBeDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => `与关联【${otherAssociation.name}】使用的表与列相同`,
    VALIDATE_GenAssociation_joinMeta_cannotBeReverseDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => `与关联【${otherAssociation.name}】方向相反但使用的表与列相同`,
    VALIDATE_GenAssociation_sourceTable_notFound: (sourceTableName: string) => `源表【${sourceTableName}】不存在`,
    VALIDATE_GenAssociation_targetTable_notFound: (targetTableName: string) => `目标表【${targetTableName}】不存在`,
    VALIDATE_GenAssociation_sourceTable_cannotBeSuper: (sourceTable: DeepReadonly<GenTableModelInput>) => `源表【${sourceTable.name}】不可以是上级表`,
    VALIDATE_GenAssociation_targetTable_cannotBeSuper: (targetTable: DeepReadonly<GenTableModelInput>) => `目标表【${targetTable.name}】不可以是上级表`,
    VALIDATE_GenAssociation_sourceColumn_notFoundInSourceTable: (sourceColumnName: string, sourceTable: DeepReadonly<GenTableModelInput>) => `源列【${sourceColumnName}】不在表【${sourceTable.name}】中`,
    VALIDATE_GenAssociation_targetColumn_notFoundInTargetTable: (targetColumnName: string, targetTable: DeepReadonly<GenTableModelInput>) => `目标列【${targetColumnName}】不在表【${targetTable.name}】中`,
    VALIDATE_GenAssociation_typeNotMatch: "两端类型不一致",
    VALIDATE_GenAssociation_columnCountNotMatch: "两端列数量不一致",
    VALIDATE_GenAssociation_sourceColumn_mustEntirePKOrNoneOfPK: (sourceTable: DeepReadonly<GenTableModelInput>) => `源列必须是表【${sourceTable.name}】完整的主键或者都不在主键中`,
    VALIDATE_GenAssociation_targetColumn_mustEntirePKOrNoneOfPK: (targetTable: DeepReadonly<GenTableModelInput>) => `目标列必须是表【${targetTable.name}】完整的主键或者都不在主键中`,
    VALIDATE_GenAssociation_sourceOrTargetAtLeastOneSizePk: "源与目标中至少一方需要是主键",

    LABEL_GenConfigForm_dataSourceType: "数据源类型",
    LABEL_GenConfigForm_language: "语言",
    LABEL_GenConfigForm_defaultRealFk: "默认使用真实外键",
    LABEL_GenConfigForm_databaseNamingStrategy: "数据库命名策略",
    LABEL_GenConfigForm_packagePath: "包路径",
    LABEL_GenConfigForm_tablePath: "映射表路径",
    LABEL_GenConfigForm_defaultIdType: "Id 类型",
    LABEL_GenConfigForm_generatedIdAnnotation: "生成 Id 注解",
    LABEL_GenConfigForm_logicalDeletedAnnotation: "逻辑删除注解",
    LABEL_GenConfigForm_tableAnnotation: "生成 Table 注解",
    LABEL_GenConfigForm_columnAnnotation: "生成 Column 注解",
    LABEL_GenConfigForm_joinColumnAnnotation: "生成 JoinColumn 注解",
    LABEL_GenConfigForm_joinTableAnnotation: "生成 JoinTable 注解",
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
    LABEL_GenTableColumn_defaultKeyGroup: '[默认组]',

    LABEL_GenTableIndex_name: '名称',
    LABEL_GenTableIndex_uniqueIndex: '唯一',
    LABEL_GenTableIndex_columns: '引用列',

    LABEL_EntityBusiness_page: "管理端页面",
    LABEL_EntityBusiness_add: "新增",
    LABEL_EntityBusiness_edit: "编辑",
    LABEL_EntityBusiness_detail: "详情",
    LABEL_EntityBusiness_query: "查询",
    LABEL_EntityBusiness_delete: "删除",
    LABEL_EntityBusiness_shortAssociation: "短关联",
    LABEL_EntityBusiness_longAssociation: "长关联",

    LABEL_EntityBusiness_hasPage: "具有页面",
    LABEL_EntityBusiness_canAdd: "新增接口",
    LABEL_EntityBusiness_canEdit: "编辑接口",
    LABEL_EntityBusiness_canQuery: "查询接口",
    LABEL_EntityBusiness_canDelete: "删除接口",
    LABEL_EntityBusiness_pageCanAdd: "页面可新增",
    LABEL_EntityBusiness_pageCanEdit: "页面可编辑",
    LABEL_EntityBusiness_pageCanViewDetail: "页面可查看明细",
    LABEL_EntityBusiness_pageCanQuery: "页面可查询",
    LABEL_EntityBusiness_pageCanDelete: "页面可删除",
    LABEL_EntityBusiness_queryByPage: "页面采用分页查询",

    LABEL_EntityBusiness_DTO_ListView: "列表视图",
    LABEL_EntityBusiness_DTO_InsertInput: "新增输入",
    LABEL_EntityBusiness_DTO_UpdateInput: "修改输入",
    LABEL_EntityBusiness_DTO_DetailView: "详情视图",
    LABEL_EntityBusiness_DTO_Specification: "查询规格",
    LABEL_EntityBusiness_DTO_OptionView: "选项视图",
    LABEL_EntityBusiness_DTO_ShortView: "短视图",
    LABEL_EntityBusiness_DTO_LongView: "长视图",
    LABEL_EntityBusiness_DTO_LongInput: "长输入",

    LABEL_GenEntityProperty_name: "名称",
    LABEL_GenEntityProperty_comment: "注释",
    LABEL_GenEntityProperty_type: "类型",
    LABEL_GenEntityProperty_typeNotNull: "非空",
    LABEL_GenEntityProperty_listType: "是列表",
    LABEL_GenEntityProperty_annotation: "注解",
    LABEL_GenEntityProperty_business: "业务",

    LABEL_DeleteTarget_Model: "模型",
    LABEL_DeleteTarget_DataSource: "数据源",
    LABEL_DeleteTarget_Schema: "架构",
    LABEL_DeleteTarget_Table: "表",
    LABEL_DeleteTarget_Association: "关联",
    LABEL_DeleteTarget_Enum: "枚举",

    LABEL_EnumForm_name: '名称',
    LABEL_EnumForm_packagePath: '包路径',
    LABEL_EnumForm_notNullDefaultItem: "表单项非空时的默认选项",
    LABEL_EnumForm_comment: '注释',
    LABEL_EnumForm_type: '类型',
    LABEL_EnumForm_typeUnset: '默认',

    VALIDATE_GenEnum_cannotBeDuplicate: (enumName: string) => {
        return `枚举【${enumName}】已存在`
    },
    VALIDATE_GenEnum_nameCannotBeEmpty: "枚举名不得为空",
    VALIDATE_GenEnum_itemsCannotBeEmpty: "必须至少有一个枚举项",
    VALIDATE_GenEnum_notNullDefaultItemRequired: "必须有表单项非空时的默认选项",
    VALIDATE_GenEnum_defaultItemUnique: "默认值必须唯一",
    VALIDATE_GenEnum_itemNameCannotBeEmpty: "枚举项名称不得为空",
    VALIDATE_GenEnum_itemNameCannotBeDuplicate: (itemName: string) => `枚举项名称【${itemName}】不可重复`,
    VALIDATE_GenEnum_ordinalValueMustBeInteger: "ordinal 枚举项的值必须为整数",
    VALIDATE_GenEnum_itemValueCannotBeEmpty: "枚举项值不得为空",
    VALIDATE_GenEnum_itemValueCannotBeDuplicate: (itemValue: string) => `枚举项值【${itemValue}】不可重复`,
    VALIDATE_GenEnum_nameCannotBeDuplicate: (enumName: string) => `枚举【${enumName}】名称与其他枚举重复`,

    LABEL_GenEnumItem_name: '名称',
    LABEL_GenEnumItem_value: '值',
    LABEL_GenEnumItem_comment: '注释',

    LABEL_ColumnTypeForm_jdbcType: "JDBC类型",
    LABEL_ColumnTypeForm_overwriteByRaw: "生成DDL时以【字面类型】覆盖【JDBC类型】",
    LABEL_ColumnTypeForm_rawType: "字面类型",
    LABEL_ColumnTypeForm_sizeAndPrecision: "长度精度",
    LABEL_ColumnTypeForm_mappedEnum: "映射枚举",

    LABEL_EntityConfigForm_name: '名称',
    LABEL_EntityConfigForm_comment: '注释',
    LABEL_EntityConfigForm_remark: '备注',
    LABEL_EntityConfigForm_overwriteName: '覆盖自动生成名称',
    LABEL_EntityConfigForm_overwriteComment: '覆盖自动生成注释',
    LABEL_EntityConfigForm_properties: "属性",
    LABEL_EntityConfigForm_businessConfig: "业务配置",

    LABEL_EntityConfigForm_property_generatedId: "生成 Id",
    LABEL_EntityConfigForm_property_generatedIdAnnotation: "生成 Id 注解",
    LABEL_EntityConfigForm_property_logicalDeletedAnnotation: "逻辑删除注解",
    LABEL_EntityConfigForm_property_otherAnnotation: "额外注解",
    LABEL_EntityConfigForm_property_name: '名称',
    LABEL_EntityConfigForm_property_comment: '注释',
    LABEL_EntityConfigForm_property_remark: '备注',
    LABEL_EntityConfigForm_property_type: '类型',
    LABEL_EntityConfigForm_property_listType: '列表类型',
    LABEL_EntityConfigForm_property_longAssociation: '长关联',
    LABEL_EntityConfigForm_property_body: '属性体',
    LABEL_EntityConfigForm_property_overwriteName: '覆盖自动生成名称',
    LABEL_EntityConfigForm_property_overwriteComment: '覆盖自动生成注释',
    LABEL_EntityConfigForm_property_typeNotNull: '非空',
    LABEL_EntityConfigForm_property_specialFormType: '特殊表单类型',

    VALIDATE_Entity_nameCannotBeEmpty: "实体名称不得为空",
    VALIDATE_Entity_nameCannotBeDuplicate: (entityName: string) => `实体名称【${entityName}】不可重复`,
    VALIDATE_Entity_otherAnnotation_importLineCannotBeEmpty: (entityName: string) => `实体【${entityName}】附加注解中的导入行不得为空`,
    VALIDATE_Entity_otherAnnotation_importLineCannotBeDuplicate: (entityName: string, importLine: string) => `实体【${entityName}】附加注解中的导入行【${importLine}】重复`,
    VALIDATE_Entity_otherAnnotation_annotationCannotBeEmpty: (entityName: string) => `实体【${entityName}】附加注解不得为空`,
    VALIDATE_Entity_otherAnnotation_annotationCannotBeDuplicate: (entityName: string, annotation: string) => `实体【${entityName}】附加注解【${annotation}】重复`,
    VALIDATE_Entity_propertyNameCannotBeEmpty: "属性名称不得为空",
    VALIDATE_Entity_propertyNameCannotBeDuplicate: (propertyName: string) => `属性名称【${propertyName}】不可重复`,
    VALIDATE_Entity_propertyTypeCannotBeEmpty: (propertyName: string) => `属性【${propertyName}】的类型不得为空`,
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeEmpty: (propertyName: string) => `属性【${propertyName}】附加注解中的导入行不得为空`,
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => `属性【${propertyName}】附加注解中的导入行【${importLine}】重复`,
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeEmpty: (propertyName: string) => `属性【${propertyName}】附加注解不得为空`,
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeDuplicate: (propertyName: string, annotation: string) => `属性【${propertyName}】附加注解【${annotation}】重复`,
    VALIDATE_Entity_propertyBody_importLineCannotBeEmpty: (propertyName: string) => `属性【${propertyName}】体中的导入行不得为空`,
    VALIDATE_Entity_propertyBody_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => `属性【${propertyName}】体中的导入行【${importLine}】重复`,

    MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel: (idName: IdName) => `表【${formatIdName(idName)}】在当前模型中未找到`,
    MESSAGE_GenerateFileMenu_clickEntityNotFound: (idName: IdName) => `实体【${formatIdName(idName)}】未找到`,
    MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel: (idName: IdName) => `关联【${formatIdName(idName)}】在当前模型中未找到`,
    MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel: (idName: IdName) => `枚举【${formatIdName(idName)}】在当前模型中未找到`,
}
