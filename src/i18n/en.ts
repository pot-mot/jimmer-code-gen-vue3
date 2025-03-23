import type {MainLocaleKeyParam, ProjectLocale} from "@/i18n/index.ts"
import type {DeepReadonly} from "vue"
import type {GenAssociationModelInput, GenTableModelInput, IdName} from "@/api/__generated/model/static"
import type {Errors} from "@/api/handleError.ts";
import {defaultPlaceholder, formatIdName} from "@/api/handleError.ts";
import {jsonPrettyFormat} from "@/utils/json.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

export const localeEn: ProjectLocale = {
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
        `【Table conversion entity error】
  Model 【${error.modelId}】 not found`,

    ErrorCode_CONVERT__ENTITY_MATCH_TABLE_NOT_FOUND: (error: Errors["CONVERT"]["ENTITY_MATCH_TABLE_NOT_FOUND"]) =>
        `【Table conversion entity error】
  Entity 【${formatIdName(error.entity)}】 match table 【${error.tableId}】not found`,

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

    ErrorCode_DATA_SOURCE__H2__INIT_FAIL: (error: Errors["DATA_SOURCE"]["H2__INIT_FAIL"]) =>
        `【H2 Initialization Failed】
  Exception Message: ${error.exceptionMessage}`,

    ErrorCode_DATA_SOURCE__SQL_EXECUTE_FAIL: (error: Errors["DATA_SOURCE"]["SQL_EXECUTE_FAIL"]) =>
        `【SQL Execution Failed】
  SQL Statement: ${error.sql}
  Exception Message: ${error.exceptionMessage}`,

    ErrorCode_DATA_SOURCE__DATA_SOURCE_NOT_FOUND: (error: Errors["DATA_SOURCE"]["DATA_SOURCE_NOT_FOUND"]) =>
        `【Data Source Not Found】
  Data Source ID: ${error.id}`,

    ErrorCode_MODEL__DEFAULT_ITEM_NOT_FOUND: (error: Errors["MODEL"]["DEFAULT_ITEM_NOT_FOUND"]) =>
        `【Default item of enum not found】
  Enum 【${formatIdName(error.enum)}】`,

    ErrorCode_MODEL__ID_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["ID_PROPERTY_NOT_FOUND"]) =>
        `【Entity ID property not found】
  Entity 【${formatIdName(error.entity)}】`,

    ErrorCode_MODEL__ID_PROPERTY_MORE_THAN_ONE: (error: Errors["MODEL"]["ID_PROPERTY_MORE_THAN_ONE"]) =>
        `【Entity ID property more than one】
  Entity 【${formatIdName(error.entity)}】, Id Properties ${error.idProperties.map(it => `【${formatIdName(it)}】`).join(", ")}`,

    ErrorCode_MODEL__LONG_ASSOCIATION_CIRCULAR_DEPENDENCE: (error: Errors["MODEL"]["LONG_ASSOCIATION_CIRCULAR_DEPENDENCE"]) =>
        `【Long Association Circular Dependence】
  Entity【${formatIdName(error.entity)}】
  Association Path:
    ${error.properties.map(it => `【${formatIdName(it)}】`).join("\n    ")}`,

    ErrorCode_MODEL__SUB_ENTITY_NO_CURRENT_PATH: (error: Errors["MODEL"]["SUB_ENTITY_NO_CURRENT_PATH"]) =>
        `【Sub Entity No Current Path】
  Entity【${formatIdName(error.entity)}】
  Association Path:
    ${error.pathProperties.map(it => `【${formatIdName(it)}】`).join("\n    ")}`,

    ErrorCode_MODEL__INDEX_REF_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["INDEX_REF_PROPERTY_NOT_FOUND"]) =>
        `【Index Referenced Property Not Found】
  Entity【${formatIdName(error.entity)}】
  Properties ${error.entityProperties.map(it => `【${formatIdName(it)}${it.id === error.notFoundPropertyId ? ' !Not Found!' : ''}】`).join(", ")}
  Index【${formatIdName(error.index)}】
  Index Referenced Properties ${error.indexPropertyIds.map(it => `【${it}${it === error.notFoundPropertyId ? ' !Not Found!' : ''}】`).join(", ")}`,

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY"]) =>
        `【Tree Entity Error】
  Tree Entity 【${formatIdName(error.entity)}】 cannot find parent property
  Self-association properties 【${error.selfAssociationProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY"]) =>
        `【Tree Entity Error】
  Tree Entity 【${formatIdName(error.entity)}】 cannot find children property
  Self-association properties 【${error.selfAssociationProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,

    ErrorCode_GENERATE__MODEL_NOT_FOUND: (error: Errors["GENERATE"]["MODEL_NOT_FOUND"]) =>
        `【Generation error】
  Model not found
  Model ID 【${error.modelId}】`,

    ErrorCode_GENERATE__ENTITY_NOT_FOUND: (error: Errors["GENERATE"]["ENTITY_NOT_FOUND"]) =>
        `【Generation error】
  Entity not found
  Entity ID 【${error.entityId}】`,

    ErrorCode_GENERATE__ENUM_NOT_FOUND: (error: Errors["GENERATE"]["ENUM_NOT_FOUND"]) =>
        `【Generation error】
  Enum not found
  Enum ID 【${error.enumId}】`,

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

    ErrorCode_GENERATE__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["GENERATE"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) =>
        `【Table conversion entity error】
  Out association 【${formatIdName(error.association)}】 cannot find source column
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)} !not found!】 -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)}】`,

    ErrorCode_GENERATE__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["GENERATE"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) =>
        `【Table conversion entity error】
  In association 【${formatIdName(error.association)}】 cannot find target column
  Source table 【${formatIdName(error.sourceTable)}】 - Source column 【${formatIdName(error.sourceColumn)}】 -> 
  Target table 【${formatIdName(error.targetTable)}】 - Target column 【${formatIdName(error.targetColumn)} !not found!】`,

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

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_SUPER_TABLE_NOT_FOUND"]) =>
        `【Model import error】
  Index 【${error.indexNames.join(', ')}】 match table 【${formatIdName(error.table)}】 superTables 【${error.superTableIds}】 not found`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 column references cannot be empty`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced more than one column, cannot support.
${error.columnTablePairs.map(item => `  Column 【${formatIdName(item.column)}】 -> Table 【${formatIdName(item.table)}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__INDEX_COLUMN_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["INDEX_COLUMN_TABLE_NOT_MATCH"]) =>
        `【Data source import error】
  Index 【${error.indexName}】 column references do not match
${error.indexColumnToTables.map(item => `  Column 【${formatIdName(item.column)}】 -> Table 【${formatIdName(item.table)}】`).join('\n')}`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced table 【${error.tableName}】 not found`,

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND"]) =>
        `【Data source import error】
  Foreign key 【${error.foreignKeyName}】 referenced column 【${error.tableName}.${error.columnName}】 not found`,

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_CANNOT_MATCH_TABLE: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_CANNOT_MATCH_TABLE"]) =>
        `【Entity Cannot Match Table】
  Entity 【${error.entityName}】 cannot match table 【${error.tableName}】`,

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND"]) =>
        `【Converted Entity Not Found for Matched Table】
  Entity 【${error.entityName}】 matched table 【${formatIdName(error.table)}】 converted entity not found`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_MATCH_COLUMN: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_MATCH_COLUMN"]) =>
        `【Property Cannot Match Column】
  Entity 【${formatIdName(error.entity)}】 property 【${error.propertyName}】 cannot match column`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_REMATCH_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_REMATCH_OLD_PROPERTY"]) =>
        `【Property Cannot Rematch Old Property】
  Entity 【${formatIdName(error.entity)}】 property 【${error.propertyName}】 cannot rematch old property 【${formatIdName(error.matchedColumn)}】`,

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY"]) =>
        `【Property Matched More Than One Old Property】
  Entity 【${formatIdName(error.entity)}】 property 【${error.propertyName}】 matched more than one old properties 【${error.matchedProperties.map(it => `【${formatIdName(it)}】`).join(", ")}】`,

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

    MESSAGE_clipBoard_cannotDirectLoad: "Data in the Clipboard cannot be directly Loaded",
    MESSAGE_clipBoard_cannotDirectLoad_validateError: (errors: any) => `Data in the Clipboard cannot be directly Loaded\nReason: ${JSON.stringify(errors)}`,

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
    LABEL_ModelForm_entitiesConfig: "Entities Config",
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
    CONFIRM_ModelEditorPage_modelLoad_model: "Are you sure you want to load the Model",
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: "Are you sure you want to load the entire Schema",
    CONFIRM_ModelEditorPage_modelLoad_singleTable: "Are you sure you want to load the Table and its Associations",

    MESSAGE_modelFileOperations_importModelJson_validateFail: "Model JSON import verification failed",
    MESSAGE_modelFileOperations_importModelJson_convertModelFail: "Model JSON import convert entity fail",
    MESSAGE_modelFileOperations_importModelJson_convertModelFail_entities_businessWillNotBeSaved: "Model JSON import convert entity fail, \nentities-business-config will not be saved",
    MESSAGE_modelFileOperations_importModelJson_entities_saveBusinessFail: "Model JSON import save entities-business-config fail",

    LABEL_ModelEditorMainMenu_loadFromDataSource: "Load from Data Source",
    LABEL_ModelEditorMainMenu_loadFromModel: "Load from Model",
    LABEL_ModelEditorMainMenu_dataModelTitle: "Data Model",
    LABEL_ModelEditorMainMenu_associationTitle: "Associations",
    LABEL_ModelEditorMainMenu_createTable: "Create Table",
    LABEL_ModelEditorMainMenu_combineTable: "Combine Table",
    LABEL_ModelEditorMainMenu_createAssociation: "Create Association",
    LABEL_ModelEditorMainMenu_batchCreateAssociation: "Batch Create",
    LABEL_ModelEditorMainMenu_createEnum: "Create Enum",

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

    MESSAGE_ModelEditorGraph_modelSaveSuccess: "Model Save Success",
    MESSAGE_ModelEditorGraph_modelSaveError: (e: any) => `Model Save Error, Error: ${e}`,

    MESSAGE_ModelEditorGraph_someChangeNotSave: () => "Some Change Not Save",

    LABEL_ModelEditorGraph_previewCode: 'Preview Code',
    LABEL_ModelEditorGraph_exportModel: 'Export Model',
    LABEL_ModelEditorGraph_downloadAll: 'Download All (ZIP)',
    LABEL_ModelEditorGraph_downloadCurrent: 'Download Current',
    LABEL_ModelEditorGraph_downloadFiltered: 'Download Filtered (ZIP)',

    LABEL_ModelEditorGraph_clean: 'Clean Graph',
    LABEL_ModelEditorGraph_cleanSelected: 'Clean Selection',
    LABEL_ModelEditorGraph_cleanAssociation: 'Clean Associations',
    LABEL_ModelEditorGraph_cleanSelectedAssociation: 'Clean Selected Associations',

    MESSAGE_ModelEditorGraph_history_cannotUndo: "Cannot Undo",
    MESSAGE_ModelEditorGraph_history_cannotRedo: "Cannot Redo",

    LABEL_GraphSearcher_tableKeywords: "Table Keywords",
    LABEL_GraphSearcher_columnKeywords: "Column Keywords",
    LABEL_GraphSearcher_enumKeywords: "Enum Keywords",
    LABEL_GraphSearcher_indexKeywords: "Index Keywords",
    LABEL_GraphSearcher_superTableKeywords: "SuperTable Keywords",
    LABEL_GraphSearcher_associationKeywords: "Association Keywords",
    LABEL_GraphSearcher_associationType: "Association Type",
    LABEL_GraphSearcher_selectAll: "Select All",

    VALIDATE_GenModel_nameCannotBeEmpty: "Model name cannot be empty",
    VALIDATE_ModelForm_graphDataValidationFailed: "Graph data validation failed, please refer to the console error",
    VALIDATE_ModelForm_graphDataJsonConversionFailed: "Graph data JSON conversion failed, please refer to the console error",

    VALIDATE_GenModel_subGroupValidError: (subGroupName: string, subMessage: MainLocaleKeyParam) =>  {
        return `SubGroup [${subGroupName}] has problem: ${useI18nStore().translate(subMessage)}`;
    },
    VALIDATE_GenModel_tableValidError: (tableName: string, subMessage: MainLocaleKeyParam) => {
        return `Table [${tableName}] has problem: ${useI18nStore().translate(subMessage)}`;
    },
    VALIDATE_GenModel_associationValidError(associationName: string, subMessage: MainLocaleKeyParam): string {
        return `Association [${associationName}] has problem: ${useI18nStore().translate(subMessage)}`;
    },
    VALIDATE_GenModel_enumValidError(enumName: string, subMessage: MainLocaleKeyParam): string {
        return `Enum [${enumName}] has problem: ${useI18nStore().translate(subMessage)}`;
    },

    LABEL_ModelSubGroup_name: "Name",
    LABEL_ModelSubGroup_comment: "Comment",
    LABEL_ModelSubGroup_subPackagePath: "Sub Package Path",
    LABEL_ModelSubGroup_color: "Color",

    LABEL_TableForm_name: "Name",
    LABEL_TableForm_comment: "Comment",
    LABEL_TableForm_remark: "Remark",
    LABEL_TableForm_asSuperTable: "SuperTable",
    LABEL_TableForm_extendTables: "extends",
    LABEL_TableForm_columns: "Columns",
    LABEL_TableForm_indexes: "Indexes",
    LABEL_TableForm_columnType_pk: "Primary Key",
    LABEL_TableForm_columnType_autoIncrement: "Auto Increment",
    LABEL_TableForm_columnType_businessKey: "Business Key",
    LABEL_TableForm_columnType_keyGroup: "Key Group",
    LABEL_TableForm_columnType_logicalDelete: "Logical Delete",

    VALIDATE_GenTable_nameCannotBeEmpty: "Table name cannot be empty",
    VALIDATE_GenTable_subGroupNotExist: (subGroupName: string) => `SubGroup [${subGroupName}] not existed`,
    VALIDATE_GenTable_nameCannotBeDuplicate: (tableName: string) => `Table name [${tableName}] cannot be duplicated`,
    VALIDATE_GenTable_columnNameCannotBeEmpty: "Column name cannot be empty",
    VALIDATE_GenTable_columnNameCannotBeDuplicate: (columnName: string) => `Column name [${columnName}] cannot be duplicated`,
    VALIDATE_GenTable_columnDataSizeCannotBeNull: (columnName: string) => `Column [${columnName}] data size cannot be null`,
    VALIDATE_GenTable_columnNumericPrecisionCannotBeNull: (columnName: string) => `Column [${columnName}] numeric precision cannot be null`,
    VALIDATE_GenTable_columnEnumNotFound: (columnName: string, enumName: string) => `Column [${columnName}] corresponding enum [${enumName}] not found`,
    VALIDATE_GenTable_indexNameCannotBeEmpty: "Index name cannot be empty",
    VALIDATE_GenTable_indexNameCannotBeDuplicate: (indexName: string) => `Index name [${indexName}] cannot be duplicated`,
    VALIDATE_GenTable_superTableNotFound: (superTableName: string) => `[${superTableName}] does not exist/is not a super table/has circular dependency`,
    VALIDATE_GenTable_primaryKeyMustBeSingle: "Only one primary key is allowed",
    VALIDATE_GenTable_mustHavePrimaryKey: "A primary key must be present, or the table should be a super table",
    VALIDATE_GenTable_primaryKeyNotAllowed: "The super table already has a primary key, so the current table does not need a primary key",
    VALIDATE_GenTable_primaryKeyMustBeNotNull: (columnName: string) => `Primary key column [${columnName}] must not be null`,
    VALIDATE_GenTable_primaryKeyCannotBeEnum: (columnName: string) => `Primary key column [${columnName}] cannot be an enum type`,
    VALIDATE_GenTable_primaryKeyCannotBeBusinessKey: (columnName: string) => `Primary key column [${columnName}] cannot be a business key`,
    VALIDATE_GenTable_primaryKeyCannotBeLogicalDelete: (columnName: string) => `Primary key column [${columnName}] cannot be a logical delete`,
    VALIDATE_GenTable_columnNameConflictWithSuperTable: (columnName: string) => `Column name [${columnName}] conflicts with a column in the super table`,
    VALIDATE_GenTable_columnNameConflictWithChildTable: (columnName: string) => `Column name [${columnName}] conflicts with a column in the child table`,
    VALIDATE_GenTable_indexColumnNotFound: (indexName: string, columnName: string) => `Index [${indexName}] references column [${columnName}] not found`,
    VALIDATE_GenTable_indexColumnNameCannotBeEmpty: (indexName: string) => `Index [${indexName}] referenced column name cannot be empty`,
    VALIDATE_GenTable_indexColumnNameCannotBeDuplicate: (indexName: string, columnName: string) => `Index [${indexName}] referenced column name [${columnName}] cannot be duplicated`,

    LABEL_TableCombineForm_superTableName: "Super Table Name",
    LABEL_TableCombineForm_tables: "Tables",
    LABEL_TableCombineForm_tables_placeholder: "Select Table",
    LABEL_TableCombineForm_tables_selectAll: "Select All",
    LABEL_TableCombineForm_columns: "Columns",
    LABEL_TableCombineForm_columns_placeholder: "Select Column",
    LABEL_TableCombineForm_columns_selectAll: "Select All",

    LABEL_AssociationForm_name: "Association Name",
    LABEL_AssociationForm_mappingAssociation: "Mapping Association",
    LABEL_AssociationForm_sourceTableName_placeholder: "Source Table",
    LABEL_AssociationForm_sourceTableName_selectAll: "Select All",
    LABEL_AssociationForm_targetTableName_placeholder: "Target Table",
    LABEL_AssociationForm_sourceColumnName_placeholder: "Source Column",
    LABEL_AssociationForm_placeSelectSourceTableFirst: "Please Select Source Table",
    LABEL_AssociationForm_targetColumnName_placeholder: "Target Column",
    LABEL_AssociationForm_placeSelectTargetTableFirst: "Please Select Target Table",
    LABEL_AssociationForm_type: "Association Type",
    LABEL_AssociationForm_fake: "Fake Foreign  Key",
    LABEL_AssociationForm_dissociateAction: "Dissociation Action",
    LABEL_AssociationForm_updateAction: "Update Action",
    LABEL_AssociationForm_deleteAction: "Delete Action",

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
    LABEL_GenConfigForm_defaultIdType: "Id Type",
    LABEL_GenConfigForm_generatedIdAnnotation: "Generated Id Annotation",
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

    LABEL_ModelSubGroupSelect_placeholder: 'Select SubGroup',

    LABEL_EnumSelect_placeholder: 'Select Enum',

    LABEL_GenTableColumn_category: 'Category',
    LABEL_GenTableColumn_name: 'Name',
    LABEL_GenTableColumn_comment: 'Comment',
    LABEL_GenTableColumn_type: 'Type',
    LABEL_GenTableColumn_typeNotNull: 'NonNull',
    LABEL_GenTableColumn_defaultValue: 'Default Value',
    LABEL_GenTableColumn_defaultKeyGroup: '[Default Group]',

    LABEL_GenTableIndex_name: 'Name',
    LABEL_GenTableIndex_uniqueIndex: 'Unique',
    LABEL_GenTableIndex_columns: 'Reference Columns',

    LABEL_EntityBusiness_page: "Management Page",
    LABEL_EntityBusiness_add: "Add",
    LABEL_EntityBusiness_edit: "Edit",
    LABEL_EntityBusiness_detail: "Detail",
    LABEL_EntityBusiness_query: "Query",
    LABEL_EntityBusiness_delete: "Delete",
    LABEL_EntityBusiness_shortAssociation: "Short Association",
    LABEL_EntityBusiness_longAssociation: "LongAssociation",

    LABEL_EntityBusiness_hasPage: "Has Page",
    LABEL_EntityBusiness_canAdd: "Add Interface",
    LABEL_EntityBusiness_canEdit: "Edit Interface",
    LABEL_EntityBusiness_canQuery: "Query Interface",
    LABEL_EntityBusiness_canDelete: "Delete Interface",
    LABEL_EntityBusiness_pageCanAdd: "Page Can Add",
    LABEL_EntityBusiness_pageCanEdit: "Page Can Edit",
    LABEL_EntityBusiness_pageCanViewDetail: "Page Can View Detail",
    LABEL_EntityBusiness_pageCanQuery: "Page Can Query",
    LABEL_EntityBusiness_pageCanDelete: "Page Can Delete",
    LABEL_EntityBusiness_queryByPage: "Page Uses Pagination Query",

    LABEL_EntityBusiness_DTO_ListView: "List View",
    LABEL_EntityBusiness_DTO_InsertInput: "Insert Input",
    LABEL_EntityBusiness_DTO_UpdateInput: "Update Input",
    LABEL_EntityBusiness_DTO_DetailView: "Detail View",
    LABEL_EntityBusiness_DTO_Specification: "Query Specification",
    LABEL_EntityBusiness_DTO_OptionView: "Option View",
    LABEL_EntityBusiness_DTO_ShortView: "Short View",
    LABEL_EntityBusiness_DTO_LongView: "Long View",
    LABEL_EntityBusiness_DTO_LongInput: "Long Input",

    LABEL_GenEntityProperty_name: "Name",
    LABEL_GenEntityProperty_comment: "Comment",
    LABEL_GenEntityProperty_type: "Type",
    LABEL_GenEntityProperty_typeNotNull: "Not Null",
    LABEL_GenEntityProperty_listType: "List Type",
    LABEL_GenEntityProperty_annotation: "Annotation",
    LABEL_GenEntityProperty_business: "Business",

    LABEL_DeleteTarget_Model: "Model",
    LABEL_DeleteTarget_DataSource: "DataSource",
    LABEL_DeleteTarget_Schema: "Schema",
    LABEL_DeleteTarget_SubGroup: "SubGroup",
    LABEL_DeleteTarget_Table: "Table",
    LABEL_DeleteTarget_Association: "Association",
    LABEL_DeleteTarget_Enum: "Enum",

    LABEL_EnumForm_name: 'Name',
    LABEL_EnumForm_packagePath: 'Package Path',
    LABEL_EnumForm_notNullDefaultItem: 'Default Item For Not Null FormItem',
    LABEL_EnumForm_comment: 'Comment',
    LABEL_EnumForm_type: 'Type',
    LABEL_EnumForm_typeUnset: 'Default',

    VALIDATE_GenEnum_nameCannotBeEmpty: "Enum name cannot be empty",
    VALIDATE_GenEnum_subGroupNotExist: (subGroupName: string) => `SubGroup [${subGroupName}] not existed`,
    VALIDATE_GenEnum_itemsCannotBeEmpty: "There must be at least one enum item",
    VALIDATE_GenEnum_notNullDefaultItemRequired: "There must have a Default Item for Not Null FormItem",
    VALIDATE_GenEnum_defaultItemUnique: "The default value must be unique",
    VALIDATE_GenEnum_itemNameCannotBeEmpty: "Enum item name cannot be empty",
    VALIDATE_GenEnum_itemNameCannotBeDuplicate: (itemName: string) => `Enum item name [${itemName}] cannot be duplicated`,
    VALIDATE_GenEnum_ordinalValueMustBeInteger: "Ordinal enum item values must be integers",
    VALIDATE_GenEnum_itemValueCannotBeEmpty: "Enum item value cannot be empty",
    VALIDATE_GenEnum_itemValueCannotBeDuplicate: (itemValue: string) => `Enum item value [${itemValue}] cannot be duplicated`,
    VALIDATE_GenEnum_nameCannotBeDuplicate: (enumName: string) => `Enum [${enumName}] name cannot be duplicated`,

    LABEL_GenEnumItem_name: 'Name',
    LABEL_GenEnumItem_value: 'Value',
    LABEL_GenEnumItem_comment: 'Comment',

    LABEL_ColumnTypeForm_jdbcType: "JDBC Type",
    LABEL_ColumnTypeForm_overwriteByRaw: "Overwrite by Raw",
    LABEL_ColumnTypeForm_rawType: "Raw Type",
    LABEL_ColumnTypeForm_sizeAndPrecision: "Size and Precision",
    LABEL_ColumnTypeForm_mappedEnum: "Mapped Enum",

    LABEL_EntityConfigForm_name: 'Name',
    LABEL_EntityConfigForm_comment: 'Comment',
    LABEL_EntityConfigForm_remark: 'Remark',
    LABEL_EntityConfigForm_overwriteName: 'Overwrite Name',
    LABEL_EntityConfigForm_overwriteComment: 'Overwrite Comment',
    LABEL_EntityConfigForm_properties: "Properties",
    LABEL_EntityConfigForm_businessConfig: "Business Config",

    LABEL_EntityConfigForm_property_generatedId: "Generated Id",
    LABEL_EntityConfigForm_property_generatedIdAnnotation: "Generated Id Annotation",
    LABEL_EntityConfigForm_property_logicalDeletedAnnotation: "Logical Deleted Annotation",
    LABEL_EntityConfigForm_property_otherAnnotation: "Other Annotation",
    LABEL_EntityConfigForm_property_name: 'Name',
    LABEL_EntityConfigForm_property_comment: 'Comment',
    LABEL_EntityConfigForm_property_remark: 'Remark',
    LABEL_EntityConfigForm_property_type: 'Type',
    LABEL_EntityConfigForm_property_listType: 'List Type',
    LABEL_EntityConfigForm_property_longAssociation: 'Long Association',
    LABEL_EntityConfigForm_property_body: 'Body',
    LABEL_EntityConfigForm_property_overwriteName: 'Overwrite Name',
    LABEL_EntityConfigForm_property_overwriteComment: 'Overwrite Comment',
    LABEL_EntityConfigForm_property_typeNotNull: 'Not Null',
    LABEL_EntityConfigForm_property_specialFormType: 'Special Form Type',

    VALIDATE_Entity_nameCannotBeEmpty: "Entity name cannot be empty",
    VALIDATE_Entity_nameCannotBeDuplicate: (entityName: string) => `Entity name [${entityName}] is duplicated`,
    VALIDATE_Entity_otherAnnotation_importLineCannotBeEmpty: (entityName: string) => `Import line in other annotation of entity [${entityName}] cannot be empty`,
    VALIDATE_Entity_otherAnnotation_importLineCannotBeDuplicate: (entityName: string, importLine: string) => `Import line [${importLine}] in other annotation of entity [${entityName}] is duplicated`,
    VALIDATE_Entity_otherAnnotation_annotationCannotBeEmpty: (entityName: string) => `Annotation of entity [${entityName}] cannot be empty`,
    VALIDATE_Entity_otherAnnotation_annotationCannotBeDuplicate: (entityName: string, annotation: string) => `Annotation [${annotation}] of entity [${entityName}] is duplicated`,
    VALIDATE_Entity_propertyNameCannotBeEmpty: "Property name cannot be empty",
    VALIDATE_Entity_propertyNameCannotBeDuplicate: (propertyName: string) => `Property name [${propertyName}] is duplicated`,
    VALIDATE_Entity_propertyTypeCannotBeEmpty: (propertyName: string) => `Property type of [${propertyName}] cannot be empty`,
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeEmpty: (propertyName: string) => `Import line in other annotation of property [${propertyName}] cannot be empty`,
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => `Import line [${importLine}] in other annotation of property [${propertyName}] is duplicated`,
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeEmpty: (propertyName: string) => `Annotation of property [${propertyName}] cannot be empty`,
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeDuplicate: (propertyName: string, annotation: string) => `Annotation [${annotation}] of property [${propertyName}] is duplicated`,
    VALIDATE_Entity_propertyBody_importLineCannotBeEmpty: (propertyName: string) => `Import line in body of property [${propertyName}] cannot be empty`,
    VALIDATE_Entity_propertyBody_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => `Import line [${importLine}] in body of property [${propertyName}] is duplicated`,


    VALIDATE_ModelSubGroup_nameCannotBeEmpty: "SubGroup Name can not be empty",
    VALIDATE_ModelSubGroup_nameCannotBeDuplicate: (modelSubGroupName: string) => `SubGroup Name [${modelSubGroupName}] is duplicated`,


    MESSAGE_GenerateFileMenu_clickSubGroupNotFoundInCurrentModel: (idName: IdName) => `SubGroup [${formatIdName(idName)}] not found in Current Model`,
    MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel: (idName: IdName) => `Table [${formatIdName(idName)}] not found in Current Model`,
    MESSAGE_GenerateFileMenu_clickEntityNotFound: (idName: IdName) => `Entity [${formatIdName(idName)}] not found`,
    MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel: (idName: IdName) => `Association [${formatIdName(idName)}] not found in Current Model`,
    MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel: (idName: IdName) => `Enum [${formatIdName(idName)}] not found in Current Model`,

}
