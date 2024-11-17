import type {MainLocale} from "@/i18n/index.ts"
import type {DeepReadonly} from "vue"
import type {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static"
import type {Errors} from "@/api/handleError.ts";
import {defaultPlaceholder, formatIdName} from "@/api/handleError.ts";
import {jsonPrettyFormat} from "@/utils/json.ts";

export const mainLocaleEn: MainLocale = {
    BUTTON_edit: "Edit",
    BUTTON_submit: "Submit",
    BUTTON_delete: "Delete",
    BUTTON_clear: "Clear",
    BUTTON_save: "Save",
    BUTTON_cancel: "Cancel",
    BUTTON_load: "Load",
    BUTTON_export: "Export",
    BUTTON_test: "Test",

    ErrorCode_CONVERT__MODEL_NOT_FOUND: (error: Errors["CONVERT"]["MODEL_NOT_FOUND"]) =>
        `【Model not found in table conversion】Model 【${error.modelId}】 not found`,

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) =>
        `【Table conversion entity error】
  Outgoing association 【${formatIdName(error.association)}】 cannot find source column
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)} !not found!】 -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) =>
        `【Table conversion entity error】
  Incoming association 【${formatIdName(error.association)}】 cannot find target column
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)}】 -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)} !not found!】`,

    ErrorCode_CONVERT__ASSOCIATION_CANNOT_BE_ONE_TO_MANY: (error: Errors["CONVERT"]["ASSOCIATION_CANNOT_BE_ONE_TO_MANY"]) =>
        `【Table conversion entity error】
  Association 【${formatIdName(error.association)}】 cannot be !one-to-many!, please adjust the association type
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)}】 -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__MULTIPLE_COLUMNS_NOT_SUPPORTED: (error: Errors["CONVERT"]["MULTIPLE_COLUMNS_NOT_SUPPORTED"]) =>
        `【Table conversion entity error】
  Association 【${formatIdName(error.association)}】 does not support multiple columns
  Source table 【${formatIdName(error.sourceTable)}】 - Source columns ${error.sourceColumns.map(it => `【${formatIdName(it)}】`).join(", ")} -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target columns ${error.targetColumns.map(it => `【${formatIdName(it)}】`).join(", ")}`,

    ErrorCode_CONVERT__ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED: (error: Errors["CONVERT"]["ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED"]) =>
        `【Table conversion entity error】
  ID view does not support multiple primary keys
  IdView 【${error.idViewProperty}】
  Base property 【${error.baseProperty}】
  Association property 【${error.associationProperty}】
  Type table 【${formatIdName(error.typeTable)}】
  Type table primary key column IDs 【${error.typeTablePkColumnIds.join(', ')}】`,

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY"]) =>
        `【Table conversion entity error】
  Outgoing association 【${formatIdName(error.association)}】 cannot find source base property
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)}】 ->
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY"]) =>
        `【Table conversion entity error】
  Incoming association 【${formatIdName(error.association)}】 cannot find target base property
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)}】 ->
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)}】`,

    ErrorCode_CONVERT__PROPERTY_NAME_DUPLICATE: (error: Errors["CONVERT"]["PROPERTY_NAME_DUPLICATE"]) =>
        `【Table conversion entity error】
  Property name duplicate
  Table 【${formatIdName(error.table)}】
  Duplicate name 【${error.duplicateName}】
  Properties 【${error.properties.map(prop => `${jsonPrettyFormat(prop)}`).join(', ')}】`,

    ErrorCode_CONVERT__SUPER_TABLE_SUPER_ENTITY_NOT_MATCH: (error: Errors["CONVERT"]["SUPER_TABLE_SUPER_ENTITY_NOT_MATCH"]) =>
        `【Table conversion entity error】
  Super table and super entity do not match
  Table 【${formatIdName(error.table)}】
  Super table ID list 【${error.superTableIds.join(', ')}】
  Super entity ID list 【${error.superEntityIds.join(', ')}】`,

    ErrorCode_COLUMN_TYPE_MISS_REQUIRED_PARAM: (error: Errors["COLUMN_TYPE"]["MISS_REQUIRED_PARAM"]) =>
        `【Class type setting error】
  Missing required parameter
  Column 【${error.column != undefined ? formatIdName(error.column) : error.columnName != undefined ? error.columnName : defaultPlaceholder}】
  JDBC Code 【${error.typeCode}】
  Required parameter 【${error.requiredParam}】`,

    ErrorCode_DATA_SOURCE__CONNECT_FAIL: (error: Errors["DATA_SOURCE"]["CONNECT_FAIL"]) =>
        `Data source connection failed
  Exception message 【${error.exceptionMessage}】`,

    ErrorCode_MODEL__DEFAULT_ITEM_NOT_FOUND: (error: Errors["MODEL"]["DEFAULT_ITEM_NOT_FOUND"]) =>
        `【Default item of enum not found】
  Enum 【${formatIdName(error.enum)}】`,

    ErrorCode_MODEL__ID_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["ID_PROPERTY_NOT_FOUND"]) =>
        `【Entity ID property not found】
  Entity 【${formatIdName(error.entity)}】`,

    ErrorCode_GENERATE__MODEL_NOT_FOUND: (error: Errors["GENERATE"]["MODEL_NOT_FOUND"]) =>
        `【Generation error】
  Model not found
  Model ID 【${error.modelId}】`,

    ErrorCode_GENERATE__ENTITY_NOT_FOUND: (error: Errors["GENERATE"]["ENTITY_NOT_FOUND"]) =>
        `【Generation error】
  Entity not found
  Entity ID 【${error.entityId}】`,

    ErrorCode_GENERATE__INDEX_COLUMN_NOT_FOUND_IN_TABLE: (error: Errors["GENERATE"]["INDEX_COLUMN_NOT_FOUND_IN_TABLE"]) =>
        `【Generation error】
  Index column not found in table
  Index 【${formatIdName(error.index)}】
  Index column ID list 【${error.indexColumnIds.join(', ')}】
  Table 【${formatIdName(error.table)}】
  Table columns 【${error.tableColumns.map(col => col.name).join(', ')}】`,

    ErrorCode_GENERATE__DEFAULT_IMPORT_MORE_THAN_ONE: (error: Errors["GENERATE"]["DEFAULT_IMPORT_MORE_THAN_ONE"]) =>
        `【Generation error】
  More than one default import in the same path for vue
  Path 【${error.path}】
  Import items 【${error.importItems.join(', ')}】`,

    ErrorCode_LOAD_FROM_MODEL__INDEX_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEX_COLUMN_NOT_FOUND"]) =>
        `【Model import error】
  Index corresponding column not found
  Index 【${error.indexName}】
  Index used columns 【${error.indexColumnNames.join(', ')}】
  Table 【${formatIdName(error.table)}】
  Not found column name 【${error.notFoundColumnName}】`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Association 【${error.associationName}】 source table not found
  Source table 【${error.sourceTableName} !not found!】 - Source columns ${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  Target table 【${error.targetTableName}】 - Target columns ${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Association 【${error.associationName}】 target table not found
  Source table 【${error.sourceTableName}】 - Source columns ${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  Target table 【${error.targetTableName} !not found!】 - Target columns ${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_COLUMN_NOT_FOUND"]) =>
        `【Model import error】
  Association 【${error.associationName}】 source column not found
  Source table 【${error.sourceTableName}】 - Source columns ${error.sourceColumnNames.map(it => `【${it}${it === error.notFoundSourceColumnName ? ' !not found!' : ''}】`).join(', ')} ->
  Target table 【${error.targetTableName}】 - Target columns ${error.targetColumnNames.map(it => `【${it}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_COLUMN_NOT_FOUND"]) =>
        `【Model import error】
  Association 【${error.associationName}】 target column not found
  Source table 【${error.sourceTableName}】 - Source columns ${error.sourceColumnNames.map(it => `【${it}】`).join(', ')} ->
  Target table 【${error.targetTableName}】 - Target columns ${error.targetColumnNames.map(it => `【${it}${it === error.notFoundTargetColumnName ? ' !not found!' : ''}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Table 【${error.tableName}】 not found`,

    ErrorCode_LOAD_FROM_MODEL__TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_SUPER_TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Super table 【${error.notFoundSuperTableName}】 of table 【${formatIdName(error.table)}】 not found
  Current super tables of the table ${error.superTableNames.map(it => `【${it}${it === error.notFoundSuperTableName ? ' !not found!' : ''}】`).join(', ')}`,

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Original table 【${error.notFoundTableName}】 of indexes 【${error.indexNames.join(', ')}】 not found`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 column references cannot be empty`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_SOURCE_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_SOURCE_TABLE_NOT_MATCH"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced source table does not match
${error.columnToSourceTables.map(item => `  Column 【${item.column}】 -> Table 【${item.table}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_TARGET_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_TARGET_TABLE_NOT_MATCH"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced target table does not match
${error.columnToTargetTables.map(item => `  Column 【${item.column}】 -> Table 【${item.table}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__INDEX_COLUMN_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["INDEX_COLUMN_TABLE_NOT_MATCH"]) =>
        `【Data source import error】
  Index 【${error.indexName}】 column references do not match
${error.indexColumnToTables.map(item => `  Column 【${item.column}】 -> Table 【${item.table}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced table 【${error.tableName}】 not found`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced column 【${error.tableName}.${error.columnName}】 not found`,

    MESSAGE_save_success: 'Save Successful',
    MESSAGE_save_fail: 'Save Failed',
    MESSAGE_submit_success: 'Submit Successful',
    MESSAGE_submit_fail: 'Submit Failed',
    MESSAGE_edit_success: 'Edit Successful',
    MESSAGE_edit_fail: 'Edit Failed',
    MESSAGE_delete_success: 'Delete Successful',
    MESSAGE_delete_fail: 'Delete Failed',

    CONFIRM_delete: (target: string) => {
        return `Are you sure you want to delete ${target}?`
    },
    CONFIRM_button_confirm: "OK",
    CONFIRM_button_cancel: "NO",

    MESSAGE_router_loading_closeFail: "Route loading animation cannot closed correctly",

    MESSAGE_api_fetch_unexpectedResponseStatus: (fetchUrl: string, status: number, result: any) => {
        return `An unexpected status [${status}] occurred while fetching [${fetchUrl}], received [${JSON.stringify(result)}]`;
    },
    MESSAGE_api_fetch_unexpectedResponseType: (fetchUrl: string, contentType: string, result: any) => {
        return `An unexpected response type [${contentType}] occurred while fetching [${fetchUrl}], received [${JSON.stringify(result)}]`;
    },
    MESSAGE_api_fetch_unexpectedError: (fetchUrl: string, error: any) => {
        return `An error [${JSON.stringify(error)}] occurred while fetching [${fetchUrl}]`;
    },

    MESSAGE_clipBoard_cannotDirectLoad: "Data in the Clipboard cannot be directly Loaded into Graph",

    LABEL_OPERATION: "Operation",
    LABEL_CREATE_AT: "Create at",
    LABEL_MODIFY_AT: "Modify at",

    LABEL_ModelListPage_createNewModel: "Create New Model",
    LABEL_ModelListPage_manageDataSource: "Manage Data Source",
    LABEL_ModelListPage_loadModelJson: "Load Model (JSON)",

    LABEL_GlobalGenConfigForm: "Edit GlobalGenConfig",
    LABEL_TypeMappingForm: "Edit TypeMapping",
    LABEL_ColumnDefaultForm: "Edit ColumnDefault",
    LABEL_DebugLog: "Debug Log",

    LABEL_DebugLog_config: 'Debug Config',
    LABEL_DebugLog_filterTypes: 'Filter',
    LABEL_DebugLog_outputTypes: 'Output',
    LABEL_DebugLog_collectTypes: 'Collect',

    LABEL_DEBUG_type: 'Type',
    LABEL_DEBUG_message: 'Message',
    LABEL_DEBUG_timestamp: 'Timestamp',

    MESSAGE_DragDialog_noMatchParent: "No Match Parent",
    MESSAGE_DragDialog_cannotBeFullScreen: "Cannot be Full Screen (workaround: set props.canFullScreen to true)",

    LABEL_ModelForm_name: "Name",
    LABEL_ModelForm_author: "Author",
    LABEL_ModelForm_dataSourceType: "Data Source",
    LABEL_ModelForm_language: "Language",
    LABEL_ModelForm_packagePath: "Package Path",
    LABEL_ModelForm_tablePath: "Table Path",
    LABEL_ModelForm_remark: "Remark",
    LABEL_ModelForm_advanceOptions: "Advance Options",
    LABEL_ModelForm_content: "Content",

    LABEL_DataSource_new: "Create New Data Source",

    LABEL_DataSourceForm_name: "Name",
    LABEL_DataSourceForm_url: "URL",
    LABEL_DataSourceForm_username: "Username",
    LABEL_DataSourceForm_password: "Password",
    LABEL_DataSourceForm_remark: "Remark",

    MESSAGE_DataSourceForm_testSuccess: "Data Source Test Success",
    MESSAGE_DataSourceForm_testFail: "Data Source Test Fail",
    MESSAGE_DataSourceForm_saveFail: "Data Source Save Fail",

    MESSAGE_ModelListPage_modelNotFound: "Model Not Found",
    MESSAGE_ModelListPage_fileNotFound: "File Not Found",
    MESSAGE_ModelListPage_modelLoadSuccess: "Model Load Success",
    MESSAGE_ModelListPage_modelExportFail: "Model Export Fail",
    MESSAGE_ModelListPage_modelSaveSuccess: "Model Save Success",
    MESSAGE_ModelListPage_modelSaveFail: "Model Save Fail",
    MESSAGE_ModelListPage_modelEditSuccess: "Model Edit Success",
    MESSAGE_ModelListPage_modelEditFail: "Model Edit Fail",
    MESSAGE_ModelListPage_modelDeleteSuccess: "Model Delete Success",
    MESSAGE_ModelListPage_modelDeleteFail: "Model Delete Fail",

    MESSAGE_ModelEditorStore_graphLoadFail: "Graph Load Fail",
    MESSAGE_ModelEditorStore_modelNotLoad: "Model Not Load",
    MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound: "Model Failed to Save because Result was Not Found",
    MESSAGE_ModelEditorStore_modelSaveSuccess: "Model Save Success",
    MESSAGE_ModelEditorStore_modelSaveFail: "Model Save Fail",
    MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound: (id: string) => `Table Edit Fail, Node [${id}] Not Found`,
    MESSAGE_ModelEditorStore_tableDeleteFail_nodeNotFound: (id: string) => `Table Delete Fail, Node [${id}] Not Found`,
    MESSAGE_ModelEditorStore_associationEditFail_edgeNotFound: (id: string) => `Association Edit Fail, Edge [${id}] Not Found`,

    MESSAGE_ModelEditorPage_modelNotFound: "Model Not Found",
    MESSAGE_ModelEditorPage_modelLoadFail: "Model Load Fail",
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: "Are you sure you want to load the entire Schema",

    MESSAGE_modelFileOperations_importModel_validateFail: "Model import loading verification failed",

    LABEL_ModelEditorMainMenu_loadFromDataSource: "Load from Data Source",
    LABEL_ModelEditorMainMenu_loadFromModel: "Load from Model",
    LABEL_ModelEditorMainMenu_tableTitle: "Tables",
    LABEL_ModelEditorMainMenu_associationTitle: "Associations",
    LABEL_ModelEditorMainMenu_enumTitle: "Enums",
    LABEL_ModelEditorMainMenu_createTable: "Create Table",
    LABEL_ModelEditorMainMenu_createAssociation: "Create Association",
    LABEL_ModelEditorMainMenu_createEnum: "Create Enum",
    LABEL_ModelEditorMainMenu_associationShow_nameOnly: "Show: Name",
    LABEL_ModelEditorMainMenu_associationShow_joinTable: "Show: Join Table",
    LABEL_ModelEditorMainMenu_associationShow_joinColumn: "Show: Join Column",

    LABEL_ModelEditorGraph_saveModel: 'Save',
    LABEL_ModelEditorGraph_editModel: 'Edit',
    LABEL_ModelEditorGraph_undo: 'Undo',
    LABEL_ModelEditorGraph_redo: 'Redo',
    LABEL_ModelEditorGraph_layoutAndFit: 'Layout',
    LABEL_ModelEditorGraph_layout_LR: 'Left to Right',
    LABEL_ModelEditorGraph_layout_RL: 'Right to Left',
    LABEL_ModelEditorGraph_layout_TB: 'Top to Bottom',
    LABEL_ModelEditorGraph_layout_BT: 'Bottom to Top',
    LABEL_ModelEditorGraph_fit: 'Fit',
    LABEL_ModelEditorGraph_center: 'Center',

    VALIDATE_GenEnum_cannotBeDuplicate: (enumName: string) => {
        return `Enum【${enumName}】already exist`
    },

    LABEL_ModelEditorGraph_previewCode: 'Preview Code',
    LABEL_ModelEditorGraph_exportModel: 'Export Model',
    LABEL_ModelEditorGraph_downloadAll: 'Download All (ZIP)',

    LABEL_ModelEditorGraph_clean: 'Clean Graph',
    LABEL_ModelEditorGraph_cleanSelected: 'Clean Selection',
    LABEL_ModelEditorGraph_cleanAssociation: 'Clean Associations',
    LABEL_ModelEditorGraph_cleanSelectedAssociation: 'Clean Selected Associations',

    MESSAGE_ModelEditorGraph_history_cannotUndo: "Cannot Undo",
    MESSAGE_ModelEditorGraph_history_cannotRedo: "Cannot Redo",

    LABEL_TableForm_asSuperTable: "SuperTable",
    LABEL_TableForm_extendTables: "extends",
    LABEL_TableForm_columns: "Columns",
    LABEL_TableForm_indexes: "Indexes",
    LABEL_TableForm_columnType_pk: "Primary Key",
    LABEL_TableForm_columnType_autoIncrement: "Auto Increment",
    LABEL_TableForm_columnType_businessKey: "Business Key",
    LABEL_TableForm_columnType_keyGroup: "Key Group",
    LABEL_TableForm_columnType_logicalDelete: "Logical Delete",

    VALIDATE_GenAssociation_name_cannotBeEmpty: "The association name cannot be empty.",
    VALIDATE_GenAssociation_name_cannotBeDuplicate: "The association name cannot be duplicate.",
    VALIDATE_GenAssociation_joinMeta_cannotBeDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => `The tables and columns used are the same as those in the association [${otherAssociation.name}].`,
    VALIDATE_GenAssociation_joinMeta_cannotBeReverseDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => `The tables and columns used are the same as those in the association [${otherAssociation.name}], but in the opposite direction.`,
    VALIDATE_GenAssociation_sourceTable_notFound: (sourceTableName: string) => `The source table [${sourceTableName}] does not exist.`,
    VALIDATE_GenAssociation_targetTable_notFound: (targetTableName: string) => `The target table [${targetTableName}] does not exist.`,
    VALIDATE_GenAssociation_sourceTable_cannotBeSuper: (sourceTable: DeepReadonly<GenTableModelInput>) => `The source table [${sourceTable.name}] cannot be a parent table.`,
    VALIDATE_GenAssociation_targetTable_cannotBeSuper: (targetTable: DeepReadonly<GenTableModelInput>) => `The target table [${targetTable.name}] cannot be a parent table.`,
    VALIDATE_GenAssociation_sourceColumn_notFoundInSourceTable: (sourceColumnName: string, sourceTable: DeepReadonly<GenTableModelInput>) => `The source column [${sourceColumnName}] is not in the table [${sourceTable.name}].`,
    VALIDATE_GenAssociation_targetColumn_notFoundInTargetTable: (targetColumnName: string, targetTable: DeepReadonly<GenTableModelInput>) => `The target column [${targetColumnName}] is not in the table [${targetTable.name}].`,
    VALIDATE_GenAssociation_typeNotMatch: "The types on both ends are inconsistent.",
    VALIDATE_GenAssociation_columnCountNotMatch: "The number of columns on both ends is inconsistent.",
    VALIDATE_GenAssociation_sourceColumn_mustEntirePKOrNoneOfPK: (sourceTable: DeepReadonly<GenTableModelInput>) => `The source column must be either the complete primary key of the table [${sourceTable.name}] or not part of the primary key at all.`,
    VALIDATE_GenAssociation_targetColumn_mustEntirePKOrNoneOfPK: (targetTable: DeepReadonly<GenTableModelInput>) => `The target column must be either the complete primary key of the table [${targetTable.name}] or not part of the primary key at all.`,
    VALIDATE_GenAssociation_sourceOrTargetAtLeastOneSizePk: "At least one of the source or target must be a primary key.",

    LABEL_GenConfigForm_dataSourceType: "Data Source Type",
    LABEL_GenConfigForm_language: "Language",
    LABEL_GenConfigForm_defaultRealFk: "Use Real Foreign Key by Default",
    LABEL_GenConfigForm_databaseNamingStrategy: "Database Naming Strategy",
    LABEL_GenConfigForm_packagePath: "Package Path",
    LABEL_GenConfigForm_tablePath: "Mapping Table Path",
    LABEL_GenConfigForm_logicalDeletedAnnotation: "Logical Deletion Annotation",
    LABEL_GenConfigForm_tableAnnotation: "Generate Table Annotation",
    LABEL_GenConfigForm_columnAnnotation: "Generate Column Annotation",
    LABEL_GenConfigForm_joinColumnAnnotation: "Generate JoinColumn Annotation",
    LABEL_GenConfigForm_joinTableAnnotation: "Generate JoinTable Annotation",
    LABEL_GenConfigForm_idViewProperty: "Generate IdView",
    LABEL_GenConfigForm_tableNamePrefixes: "Table Name Prefixes",
    LABEL_GenConfigForm_tableNameSuffixes: "Table Name Suffixes",
    LABEL_GenConfigForm_tableCommentPrefixes: "Table Comment Prefixes",
    LABEL_GenConfigForm_tableCommentSuffixes: "Table Comment Suffixes",
    LABEL_GenConfigForm_columnNamePrefixes: "Column Name Prefixes",
    LABEL_GenConfigForm_columnNameSuffixes: "Column Name Suffixes",
    LABEL_GenConfigForm_columnCommentPrefixes: "Column Comment Prefixes",
    LABEL_GenConfigForm_columnCommentSuffixes: "Column Comment Suffixes",
    LABEL_GenConfigForm_tableDefinition: "Table Definition",
    LABEL_GenConfigForm_entityClassConfig: "Entity Class Configuration",
    LABEL_GenConfigForm_removeSuffix: "Remove Prefixes and Suffixes",

    LABEL_GenTypeMapping_dataSourceType: 'DataSource',
    LABEL_GenTypeMapping_typeExpression: 'DatabaseType Match (Regex)',
    LABEL_GenTypeMapping_language: 'Language',
    LABEL_GenTypeMapping_propertyType: 'MappingType',
    LABEL_GenTypeMapping_remark: 'Remark',

    VALIDATE_GenTypeMapping_cannotBeDuplicate: 'TypeMapping cannot be duplicate',
    VALIDATE_GenTypeMapping_typeExpression_cannotBeEmpty: 'TypeMapping DatabaseType Match cannot be empty',
    VALIDATE_GenTypeMapping_propertyType_cannotBeEmpty: 'TypeMapping MappingType cannot be empty',


    LABEL_GenColumnDefault_dataSourceType: 'Data Source Type',
    LABEL_GenColumnDefault_typeCode: 'Jdbc Type',
    LABEL_GenColumnDefault_segment: '→',
    LABEL_GenColumnDefault_rawType: 'Raw Type',
    LABEL_GenColumnDefault_dataSize: 'Length',
    LABEL_GenColumnDefault_numericPrecision: 'Precision',
    LABEL_GenColumnDefault_defaultValue: 'Default Value',
    LABEL_GenColumnDefault_remark: 'Remark',

    VALIDATE_GenColumnDefault_cannotBeDuplicate: 'The dataSourceType and typeCode of ColumnDefault cannot be duplicate',
    VALIDATE_GenColumnDefault_rawType_cannotBeEmpty: 'The Raw Type of ColumnDefault cannot be empty',
    VALIDATE_GenColumnDefault_dataSize_cannotBeEmpty: 'The Length of ColumnDefault cannot be empty',
    VALIDATE_GenColumnDefault_numericPrecision_cannotBeEmpty: 'The Precision of ColumnDefault cannot be empty',

    LABEL_GenTableColumn_category: 'Category',
    LABEL_GenTableColumn_name: 'Name',
    LABEL_GenTableColumn_comment: 'Comment',
    LABEL_GenTableColumn_type: 'Type',
    LABEL_GenTableColumn_typeNotNull: 'NonNull',
    LABEL_GenTableColumn_defaultValue: 'Default Value',

    LABEL_GenTableIndex_name: 'Name',
    LABEL_GenTableIndex_uniqueIndex: 'Unique',
    LABEL_GenTableIndex_columns: 'Reference Columns',

    LABEL_EnumForm_name: 'Name',
    LABEL_EnumForm_packagePath: 'Package Path',
    LABEL_EnumForm_comment: 'Comment',
    LABEL_EnumForm_type: 'Type',
    LABEL_EnumForm_typeUnset: 'Default',

    LABEL_GenEnumItem_name: 'Name',
    LABEL_GenEnumItem_value: 'Value',
    LABEL_GenEnumItem_comment: 'Comment',
}
