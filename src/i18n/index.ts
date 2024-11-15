import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {AllErrors} from "@/api/__generated";

export type MainLocale = {
    BUTTON_edit: string
    BUTTON_submit: string
    BUTTON_delete: string
    BUTTON_clear: string
    BUTTON_save: string
    BUTTON_cancel: string
    BUTTON_load: string
    BUTTON_export: string
    BUTTON_test: string

    ErrorCode_CONVERT_MODEL_NOT_FOUND: (error: AllErrors & {
        family: "CONVERT",
        code: "MODEL_NOT_FOUND"
    }) => string

    ErrorCode_CONVERT_OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: AllErrors & {
        family: "CONVERT",
        code: "OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"
    }) => string

    ErrorCode_CONVERT_IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: AllErrors & {
        family: "CONVERT",
        code: "IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"
    }) => string

    ErrorCode_CONVERT_ASSOCIATION_CANNOT_BE_ONE_TO_MANY: (error: AllErrors & {
        family: "CONVERT",
        code: "ASSOCIATION_CANNOT_BE_ONE_TO_MANY"
    }) => string

    ErrorCode_CONVERT_MULTIPLE_COLUMNS_NOT_SUPPORTED: (error: AllErrors & {
        family: "CONVERT",
        code: "MULTIPLE_COLUMNS_NOT_SUPPORTED"
    }) => string

    ErrorCode_CONVERT_ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED: (error: AllErrors & {
        family: "CONVERT",
        code: "ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED"
    }) => string

    ErrorCode_CONVERT_OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY: (error: AllErrors & {
        family: "CONVERT",
        code: "OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY"
    }) => string

    ErrorCode_CONVERT_IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY: (error: AllErrors & {
        family: "CONVERT",
        code: "IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY"
    }) => string

    ErrorCode_CONVERT_PROPERTY_NAME_DUPLICATE: (error: AllErrors & {
        family: "CONVERT",
        code: "PROPERTY_NAME_DUPLICATE"
    }) => string

    ErrorCode_CONVERT_SUPER_TABLE_SUPER_ENTITY_NOT_MATCH: (error: AllErrors & {
        family: "CONVERT",
        code: "SUPER_TABLE_SUPER_ENTITY_NOT_MATCH"
    }) => string

    ErrorCode_COLUMN_TYPE_MISS_REQUIRED_PARAM: (error: AllErrors & {
        family: "COLUMN_TYPE",
        code: "MISS_REQUIRED_PARAM"
    }) => string

    ErrorCode_DATA_SOURCE_CONNECT_FAIL: (error: AllErrors & {
        family: "DATA_SOURCE",
        code: "CONNECT_FAIL"
    }) => string

    ErrorCode_MODEL_DEFAULT_ITEM_NOT_FOUND: (error: AllErrors & {
        family: "MODEL",
        code: "DEFAULT_ITEM_NOT_FOUND"
    }) => string

    ErrorCode_MODEL_ID_PROPERTY_NOT_FOUND: (error: AllErrors & {
        family: "MODEL",
        code: "ID_PROPERTY_NOT_FOUND"
    }) => string

    ErrorCode_GENERATE_MODEL_NOT_FOUND: (error: AllErrors & {
        family: "GENERATE",
        code: "MODEL_NOT_FOUND"
    }) => string

    ErrorCode_GENERATE_ENTITY_NOT_FOUND: (error: AllErrors & {
        family: "GENERATE",
        code: "ENTITY_NOT_FOUND"
    }) => string

    ErrorCode_GENERATE_INDEX_COLUMN_NOT_FOUND_IN_TABLE: (error: AllErrors & {
        family: "GENERATE",
        code: "INDEX_COLUMN_NOT_FOUND_IN_TABLE"
    }) => string

    ErrorCode_GENERATE_CAN_ONLY_HAVE_ONE_DEFAULT_IMPORT_FOR_ONE_PATH: (error: AllErrors & {
        family: "GENERATE",
        code: "CAN_ONLY_HAVE_ONE_DEFAULT_IMPORT_FOR_ONE_PATH"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_INDEX_COLUMN_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "INDEX_COLUMN_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_ASSOCIATION_SOURCE_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "ASSOCIATION_SOURCE_TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_ASSOCIATION_TARGET_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "ASSOCIATION_TARGET_TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_ASSOCIATION_SOURCE_COLUMN_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "ASSOCIATION_SOURCE_COLUMN_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_ASSOCIATION_TARGET_COLUMN_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "ASSOCIATION_TARGET_COLUMN_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_TABLE_SUPER_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "TABLE_SUPER_TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_MODEL_INDEXES_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_MODEL",
        code: "INDEXES_TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_SOURCE_TABLE_NOT_MATCH: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_SOURCE_TABLE_NOT_MATCH"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_TARGET_TABLE_NOT_MATCH: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_TARGET_TABLE_NOT_MATCH"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_INDEX_COLUMN_TABLE_NOT_MATCH: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "INDEX_COLUMN_TABLE_NOT_MATCH"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_COLUMN_REFERENCE_SCHEMA_NOT_MATCH: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_COLUMN_REFERENCE_SCHEMA_NOT_MATCH"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND"
    }) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE_ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND: (error: AllErrors & {
        family: "LOAD_FROM_DATA_SOURCE",
        code: "ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND"
    }) => string

    MESSAGE_save_success: string
    MESSAGE_save_fail: string
    MESSAGE_submit_success: string
    MESSAGE_submit_fail: string
    MESSAGE_edit_success: string
    MESSAGE_edit_fail: string
    MESSAGE_delete_success: string
    MESSAGE_delete_fail: string

    CONFIRM_delete: (target: string) => string
    CONFIRM_button_confirm: string
    CONFIRM_button_cancel: string

    MESSAGE_router_loading_closeFail: string

    MESSAGE_api_fetch_unexpectedResponseStatus: (fetchUrl: string, status: number, response: Response) => string
    MESSAGE_api_fetch_unexpectedResponseType: (fetchUrl: string, contentType: string, response: Response) => string
    MESSAGE_api_fetch_unexpectedError: (fetchUrl: string, error: any) => string

    LABEL_OPERATION: string
    LABEL_CREATE_AT: string
    LABEL_MODIFY_AT: string

    MESSAGE_clipBoard_cannotDirectLoad: string

    LABEL_ModelListPage_createNewModel: string
    LABEL_ModelListPage_manageDataSource: string
    LABEL_ModelListPage_loadModelJson: string

    LABEL_GlobalGenConfigForm: string
    LABEL_TypeMappingForm: string
    LABEL_ColumnDefaultForm: string
    LABEL_DebugLog: string

    LABEL_DebugLog_config: string
    LABEL_DebugLog_filterTypes: string
    LABEL_DebugLog_outputTypes: string
    LABEL_DebugLog_collectTypes: string

    LABEL_DEBUG_type: string
    LABEL_DEBUG_message: string
    LABEL_DEBUG_timestamp: string

    MESSAGE_DragDialog_noMatchParent: string
    MESSAGE_DragDialog_cannotBeFullScreen: string

    LABEL_ModelForm_name: string
    LABEL_ModelForm_author: string
    LABEL_ModelForm_dataSourceType: string
    LABEL_ModelForm_language: string
    LABEL_ModelForm_packagePath: string
    LABEL_ModelForm_tablePath: string
    LABEL_ModelForm_remark: string
    LABEL_ModelForm_advanceOptions: string
    LABEL_ModelForm_content: string

    LABEL_DataSource_new: string

    LABEL_DataSourceForm_name: string
    LABEL_DataSourceForm_url: string
    LABEL_DataSourceForm_username: string
    LABEL_DataSourceForm_password: string
    LABEL_DataSourceForm_remark: string

    MESSAGE_DataSourceForm_testSuccess: string
    MESSAGE_DataSourceForm_testFail: string
    MESSAGE_DataSourceForm_saveFail: string

    MESSAGE_ModelListPage_modelNotFound: string
    MESSAGE_ModelListPage_fileNotFound: string
    MESSAGE_ModelListPage_modelLoadSuccess: string
    MESSAGE_ModelListPage_modelExportFail: string
    MESSAGE_ModelListPage_modelSaveSuccess: string
    MESSAGE_ModelListPage_modelSaveFail: string
    MESSAGE_ModelListPage_modelEditSuccess: string
    MESSAGE_ModelListPage_modelEditFail: string
    MESSAGE_ModelListPage_modelDeleteSuccess: string
    MESSAGE_ModelListPage_modelDeleteFail: string

    MESSAGE_ModelEditorStore_graphLoadFail: string
    MESSAGE_ModelEditorStore_modelNotLoad: string
    MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound: string
    MESSAGE_ModelEditorStore_modelSaveSuccess: string
    MESSAGE_ModelEditorStore_modelSaveFail: string
    MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound: (id: string) => string
    MESSAGE_ModelEditorStore_tableDeleteFail_nodeNotFound: (id: string) => string
    MESSAGE_ModelEditorStore_associationEditFail_edgeNotFound: (id: string) => string

    MESSAGE_ModelEditorPage_modelNotFound: string
    MESSAGE_ModelEditorPage_modelLoadFail: string
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: string

    MESSAGE_modelFileOperations_importModel_validateFail: string

    LABEL_ModelEditorMainMenu_loadFromDataSource: string
    LABEL_ModelEditorMainMenu_loadFromModel: string
    LABEL_ModelEditorMainMenu_tableTitle: string
    LABEL_ModelEditorMainMenu_associationTitle: string
    LABEL_ModelEditorMainMenu_enumTitle: string
    LABEL_ModelEditorMainMenu_createTable: string
    LABEL_ModelEditorMainMenu_createEnum: string
    LABEL_ModelEditorMainMenu_associationShow_nameOnly: string
    LABEL_ModelEditorMainMenu_associationShow_joinTable: string
    LABEL_ModelEditorMainMenu_associationShow_joinColumn: string

    LABEL_ModelEditorGraph_saveModel: string
    LABEL_ModelEditorGraph_editModel: string
    LABEL_ModelEditorGraph_undo: string
    LABEL_ModelEditorGraph_redo: string
    LABEL_ModelEditorGraph_layoutAndFit: string
    LABEL_ModelEditorGraph_layout_LR: string
    LABEL_ModelEditorGraph_layout_RL: string
    LABEL_ModelEditorGraph_layout_TB: string
    LABEL_ModelEditorGraph_layout_BT: string
    LABEL_ModelEditorGraph_fit: string
    LABEL_ModelEditorGraph_center: string

    LABEL_ModelEditorGraph_previewCode: string
    LABEL_ModelEditorGraph_exportModel: string
    LABEL_ModelEditorGraph_downloadAll: string

    LABEL_ModelEditorGraph_clean: string
    LABEL_ModelEditorGraph_cleanSelected: string
    LABEL_ModelEditorGraph_cleanAssociation: string
    LABEL_ModelEditorGraph_cleanSelectedAssociation: string

    MESSAGE_ModelEditorGraph_history_cannotUndo: string
    MESSAGE_ModelEditorGraph_history_cannotRedo: string

    LABEL_TableForm_asSuperTable: string
    LABEL_TableForm_extendTables: string
    LABEL_TableForm_columns: string
    LABEL_TableForm_indexes: string
    LABEL_TableForm_columnType_pk: string
    LABEL_TableForm_columnType_autoIncrement: string
    LABEL_TableForm_columnType_businessKey: string
    LABEL_TableForm_columnType_logicalDelete: string

    VALIDATE_GenAssociation_name_cannotBeEmpty: string
    VALIDATE_GenAssociation_name_cannotBeDuplicate: string
    VALIDATE_GenAssociation_joinMeta_cannotBeDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => string
    VALIDATE_GenAssociation_joinMeta_cannotBeReverseDuplicate: (otherAssociation: DeepReadonly<GenAssociationModelInput>) => string
    VALIDATE_GenAssociation_sourceTable_notFound: (sourceTableName: string) => string
    VALIDATE_GenAssociation_targetTable_notFound: (targetTableName: string) => string
    VALIDATE_GenAssociation_sourceTable_cannotBeSuper: (sourceTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_targetTable_cannotBeSuper: (targetTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_sourceColumn_notFoundInSourceTable: (sourceColumnName: string, sourceTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_targetColumn_notFoundInTargetTable: (targetColumnName: string, targetTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_typeNotMatch: string
    VALIDATE_GenAssociation_columnCountNotMatch: string
    VALIDATE_GenAssociation_sourceColumn_mustEntirePKOrNoneOfPK: (sourceTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_targetColumn_mustEntirePKOrNoneOfPK: (targetTable: DeepReadonly<GenTableModelInput>) => string
    VALIDATE_GenAssociation_sourceOrTargetAtLeastOneSizePk: string

    LABEL_GenConfigForm_dataSourceType: string
    LABEL_GenConfigForm_language: string
    LABEL_GenConfigForm_defaultRealFk: string
    LABEL_GenConfigForm_databaseNamingStrategy: string
    LABEL_GenConfigForm_packagePath: string
    LABEL_GenConfigForm_tablePath: string
    LABEL_GenConfigForm_logicalDeletedAnnotation: string
    LABEL_GenConfigForm_tableAnnotation: string
    LABEL_GenConfigForm_columnAnnotation: string
    LABEL_GenConfigForm_joinColumnAnnotation: string
    LABEL_GenConfigForm_joinTableAnnotation: string
    LABEL_GenConfigForm_idViewProperty: string
    LABEL_GenConfigForm_tableNamePrefixes: string
    LABEL_GenConfigForm_tableNameSuffixes: string
    LABEL_GenConfigForm_tableCommentPrefixes: string
    LABEL_GenConfigForm_tableCommentSuffixes: string
    LABEL_GenConfigForm_columnNamePrefixes: string
    LABEL_GenConfigForm_columnNameSuffixes: string
    LABEL_GenConfigForm_columnCommentPrefixes: string
    LABEL_GenConfigForm_columnCommentSuffixes: string
    LABEL_GenConfigForm_tableDefinition: string
    LABEL_GenConfigForm_entityClassConfig: string
    LABEL_GenConfigForm_removeSuffix: string

    LABEL_GenTypeMapping_dataSourceType: string
    LABEL_GenTypeMapping_typeExpression: string
    LABEL_GenTypeMapping_language: string
    LABEL_GenTypeMapping_propertyType: string
    LABEL_GenTypeMapping_remark: string

    VALIDATE_GenTypeMapping_cannotBeDuplicate: string
    VALIDATE_GenTypeMapping_typeExpression_cannotBeEmpty: string
    VALIDATE_GenTypeMapping_propertyType_cannotBeEmpty: string

    LABEL_GenColumnDefault_dataSourceType: string
    LABEL_GenColumnDefault_typeCode: string
    LABEL_GenColumnDefault_segment: string
    LABEL_GenColumnDefault_rawType: string
    LABEL_GenColumnDefault_dataSize: string
    LABEL_GenColumnDefault_numericPrecision: string
    LABEL_GenColumnDefault_defaultValue: string
    LABEL_GenColumnDefault_remark: string

    VALIDATE_GenColumnDefault_cannotBeDuplicate: string
    VALIDATE_GenColumnDefault_rawType_cannotBeEmpty: string
    VALIDATE_GenColumnDefault_dataSize_cannotBeEmpty: string
    VALIDATE_GenColumnDefault_numericPrecision_cannotBeEmpty: string

    LABEL_GenTableColumn_category: string,
    LABEL_GenTableColumn_name: string,
    LABEL_GenTableColumn_comment: string,
    LABEL_GenTableColumn_type: string,
    LABEL_GenTableColumn_typeNotNull: string,
    LABEL_GenTableColumn_defaultValue: string,

    LABEL_GenTableIndex_name: string
    LABEL_GenTableIndex_uniqueIndex: string
    LABEL_GenTableIndex_columns: string

    LABEL_EnumForm_name: string
    LABEL_EnumForm_packagePath: string
    LABEL_EnumForm_comment: string
    LABEL_EnumForm_type: string
    LABEL_EnumForm_typeUnset: string

    VALIDATE_GenEnum_cannotBeDuplicate: (enumName: string) => string

    LABEL_GenEnumItem_name: string
    LABEL_GenEnumItem_value: string
    LABEL_GenEnumItem_comment: string
}

type MainLocaleKey = keyof MainLocale

type MainLocaleKeyWithArgs<
    K extends MainLocaleKey = MainLocaleKey,
    V extends MainLocale[K] = MainLocale[K]
> =
    { key: K, args: V extends (...args: infer A) => string ? A : [] }

export type MainLocaleKeyParam =
    MainLocaleKey | MainLocaleKeyWithArgs
