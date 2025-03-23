import type {GenAssociationModelInput, GenTableModelInput, IdName} from "@/api/__generated/model/static"
import type {DeepReadonly} from "vue"
import type {Errors} from "@/api/handleError.ts"

type MainLocale = {
    BUTTON_edit: string
    BUTTON_submit: string
    BUTTON_delete: string
    BUTTON_clear: string
    BUTTON_save: string
    BUTTON_cancel: string
    BUTTON_load: string
    BUTTON_export: string
    BUTTON_test: string

    ErrorCode_CONVERT__MODEL_NOT_FOUND: (error: Errors["CONVERT"]["MODEL_NOT_FOUND"]) => string

    ErrorCode_CONVERT__ENTITY_MATCH_TABLE_NOT_FOUND: (error: Errors["CONVERT"]["ENTITY_MATCH_TABLE_NOT_FOUND"]) => string

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) => string

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) => string

    ErrorCode_CONVERT__ASSOCIATION_CANNOT_BE_ONE_TO_MANY: (error: Errors["CONVERT"]["ASSOCIATION_CANNOT_BE_ONE_TO_MANY"]) => string

    ErrorCode_CONVERT__MULTIPLE_COLUMNS_NOT_SUPPORTED: (error: Errors["CONVERT"]["MULTIPLE_COLUMNS_NOT_SUPPORTED"]) => string

    ErrorCode_CONVERT__ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED: (error: Errors["CONVERT"]["ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED"]) => string

    ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY: (error: Errors["CONVERT"]["OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY"]) => string

    ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY: (error: Errors["CONVERT"]["IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY"]) => string

    ErrorCode_CONVERT__PROPERTY_NAME_DUPLICATE: (error: Errors["CONVERT"]["PROPERTY_NAME_DUPLICATE"]) => string

    ErrorCode_CONVERT__SUPER_TABLE_SUPER_ENTITY_NOT_MATCH: (error: Errors["CONVERT"]["SUPER_TABLE_SUPER_ENTITY_NOT_MATCH"]) => string

    ErrorCode_COLUMN_TYPE_MISS_REQUIRED_PARAM: (error: Errors["COLUMN_TYPE"]["MISS_REQUIRED_PARAM"]) => string

    ErrorCode_DATA_SOURCE__CONNECT_FAIL: (error: Errors["DATA_SOURCE"]["CONNECT_FAIL"]) => string

    ErrorCode_DATA_SOURCE__H2__INIT_FAIL: (error: Errors["DATA_SOURCE"]["H2__INIT_FAIL"]) => string

    ErrorCode_DATA_SOURCE__SQL_EXECUTE_FAIL: (error: Errors["DATA_SOURCE"]["SQL_EXECUTE_FAIL"]) => string

    ErrorCode_DATA_SOURCE__DATA_SOURCE_NOT_FOUND: (error: Errors["DATA_SOURCE"]["DATA_SOURCE_NOT_FOUND"]) => string

    ErrorCode_MODEL__DEFAULT_ITEM_NOT_FOUND: (error: Errors["MODEL"]["DEFAULT_ITEM_NOT_FOUND"]) => string

    ErrorCode_MODEL__ID_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["ID_PROPERTY_NOT_FOUND"]) => string

    ErrorCode_MODEL__ID_PROPERTY_MORE_THAN_ONE: (error: Errors["MODEL"]["ID_PROPERTY_MORE_THAN_ONE"]) => string

    ErrorCode_MODEL__LONG_ASSOCIATION_CIRCULAR_DEPENDENCE: (error: Errors["MODEL"]["LONG_ASSOCIATION_CIRCULAR_DEPENDENCE"]) => string

    ErrorCode_MODEL__SUB_ENTITY_NO_CURRENT_PATH: (error: Errors["MODEL"]["SUB_ENTITY_NO_CURRENT_PATH"]) => string

    ErrorCode_MODEL__INDEX_REF_PROPERTY_NOT_FOUND: (error: Errors["MODEL"]["INDEX_REF_PROPERTY_NOT_FOUND"]) => string

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY"]) => string

    ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY: (error: Errors["MODEL"]["TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY"]) => string

    ErrorCode_GENERATE__MODEL_NOT_FOUND: (error: Errors["GENERATE"]["MODEL_NOT_FOUND"]) => string

    ErrorCode_GENERATE__ENTITY_NOT_FOUND: (error: Errors["GENERATE"]["ENTITY_NOT_FOUND"]) => string

    ErrorCode_GENERATE__ENUM_NOT_FOUND: (error: Errors["GENERATE"]["ENUM_NOT_FOUND"]) => string

    ErrorCode_GENERATE__INDEX_COLUMN_NOT_FOUND_IN_TABLE: (error: Errors["GENERATE"]["INDEX_COLUMN_NOT_FOUND_IN_TABLE"]) => string

    ErrorCode_GENERATE__DEFAULT_IMPORT_MORE_THAN_ONE: (error: Errors["GENERATE"]["DEFAULT_IMPORT_MORE_THAN_ONE"]) => string

    ErrorCode_GENERATE__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN: (error: Errors["GENERATE"]["OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN"]) => string

    ErrorCode_GENERATE__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN: (error: Errors["GENERATE"]["IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN"]) => string

    ErrorCode_LOAD_FROM_MODEL__INDEX_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEX_COLUMN_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_SOURCE_COLUMN_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["ASSOCIATION_TARGET_COLUMN_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["TABLE_SUPER_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_SUPER_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_MODEL"]["INDEXES_TABLE_SUPER_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY"]) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_CANNOT_SUPPORT_MULTI_COLUMNS"]) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE__INDEX_COLUMN_TABLE_NOT_MATCH: (error: Errors["LOAD_FROM_DATA_SOURCE"]["INDEX_COLUMN_TABLE_NOT_MATCH"]) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND"]) => string

    ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND: (error: Errors["LOAD_FROM_DATA_SOURCE"]["ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND"]) => string

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_CANNOT_MATCH_TABLE: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_CANNOT_MATCH_TABLE"]) => string

    ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND: (error: Errors["MODEL_BUSINESS_INPUT"]["ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND"]) => string

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_MATCH_COLUMN: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_MATCH_COLUMN"]) => string

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_REMATCH_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_CANNOT_REMATCH_OLD_PROPERTY"]) => string

    ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY: (error: Errors["MODEL_BUSINESS_INPUT"]["PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY"]) => string

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
    MESSAGE_clipBoard_cannotDirectLoad_validateError: (errors: any) => string

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
    LABEL_ModelForm_entitiesConfig: string
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
    CONFIRM_ModelEditorPage_modelLoad_model: string
    CONFIRM_ModelEditorPage_modelLoad_entireSchema: string
    CONFIRM_ModelEditorPage_modelLoad_singleTable: string

    MESSAGE_modelFileOperations_importModelJson_validateFail: string
    MESSAGE_modelFileOperations_importModelJson_convertModelFail: string
    MESSAGE_modelFileOperations_importModelJson_convertModelFail_entities_businessWillNotBeSaved: string
    MESSAGE_modelFileOperations_importModelJson_entities_saveBusinessFail: string

    LABEL_ModelEditorMainMenu_loadFromDataSource: string
    LABEL_ModelEditorMainMenu_loadFromModel: string
    LABEL_ModelEditorMainMenu_dataModelTitle: string
    LABEL_ModelEditorMainMenu_associationTitle: string
    LABEL_ModelEditorMainMenu_createTable: string
    LABEL_ModelEditorMainMenu_combineTable: string
    LABEL_ModelEditorMainMenu_createAssociation: string
    LABEL_ModelEditorMainMenu_batchCreateAssociation: string
    LABEL_ModelEditorMainMenu_createEnum: string

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

    MESSAGE_ModelEditorGraph_modelSaveSuccess: string
    MESSAGE_ModelEditorGraph_modelSaveError: (e: any) => string

    MESSAGE_ModelEditorGraph_someChangeNotSave: (modelData: string, editorData: string) => string

    LABEL_ModelEditorGraph_previewCode: string
    LABEL_ModelEditorGraph_exportModel: string
    LABEL_ModelEditorGraph_downloadAll: string
    LABEL_ModelEditorGraph_downloadCurrent: string
    LABEL_ModelEditorGraph_downloadFiltered: string

    LABEL_ModelEditorGraph_clean: string
    LABEL_ModelEditorGraph_cleanSelected: string
    LABEL_ModelEditorGraph_cleanAssociation: string
    LABEL_ModelEditorGraph_cleanSelectedAssociation: string

    MESSAGE_ModelEditorGraph_history_cannotUndo: string
    MESSAGE_ModelEditorGraph_history_cannotRedo: string

    LABEL_GraphSearcher_tableKeywords: string
    LABEL_GraphSearcher_columnKeywords: string
    LABEL_GraphSearcher_enumKeywords: string
    LABEL_GraphSearcher_indexKeywords: string
    LABEL_GraphSearcher_superTableKeywords: string
    LABEL_GraphSearcher_associationKeywords: string
    LABEL_GraphSearcher_associationType: string
    LABEL_GraphSearcher_selectAll: string

    VALIDATE_GenModel_nameCannotBeEmpty: string

    VALIDATE_ModelForm_graphDataValidationFailed: string
    VALIDATE_ModelForm_graphDataJsonConversionFailed: string

    LABEL_ModelSubGroup_name: string
    LABEL_ModelSubGroup_comment: string
    LABEL_ModelSubGroup_subPackagePath: string
    LABEL_ModelSubGroup_color: string

    LABEL_TableForm_name: string
    LABEL_TableForm_comment: string
    LABEL_TableForm_remark: string
    LABEL_TableForm_asSuperTable: string
    LABEL_TableForm_extendTables: string
    LABEL_TableForm_columns: string
    LABEL_TableForm_indexes: string
    LABEL_TableForm_columnType_pk: string
    LABEL_TableForm_columnType_autoIncrement: string
    LABEL_TableForm_columnType_businessKey: string
    LABEL_TableForm_columnType_keyGroup: string
    LABEL_TableForm_columnType_logicalDelete: string

    VALIDATE_GenTable_nameCannotBeEmpty: string;
    VALIDATE_GenTable_subGroupNotExist: (subGroupName: string) => string;
    VALIDATE_GenTable_nameCannotBeDuplicate: (tableName: string) => string;
    VALIDATE_GenTable_columnNameCannotBeEmpty: string;
    VALIDATE_GenTable_columnNameCannotBeDuplicate: (columnName: string) => string;
    VALIDATE_GenTable_columnDataSizeCannotBeNull: (columnName: string) => string;
    VALIDATE_GenTable_columnNumericPrecisionCannotBeNull: (columnName: string) => string;
    VALIDATE_GenTable_columnEnumNotFound: (columnName: string, enumName: string) => string;
    VALIDATE_GenTable_indexNameCannotBeEmpty: string;
    VALIDATE_GenTable_indexNameCannotBeDuplicate: (indexName: string) => string;
    VALIDATE_GenTable_superTableNotFound: (superTableName: string) => string;
    VALIDATE_GenTable_primaryKeyMustBeSingle: string;
    VALIDATE_GenTable_mustHavePrimaryKey: string;
    VALIDATE_GenTable_primaryKeyNotAllowed: string;
    VALIDATE_GenTable_primaryKeyMustBeNotNull: (columnName: string) => string;
    VALIDATE_GenTable_primaryKeyCannotBeEnum: (columnName: string) => string;
    VALIDATE_GenTable_primaryKeyCannotBeBusinessKey: (columnName: string) => string;
    VALIDATE_GenTable_primaryKeyCannotBeLogicalDelete: (columnName: string) => string;
    VALIDATE_GenTable_columnNameConflictWithSuperTable: (columnName: string) => string;
    VALIDATE_GenTable_columnNameConflictWithChildTable: (columnName: string) => string;
    VALIDATE_GenTable_indexColumnNotFound: (indexName: string, columnName: string) => string;
    VALIDATE_GenTable_indexColumnNameCannotBeEmpty: (indexName: string) => string;
    VALIDATE_GenTable_indexColumnNameCannotBeDuplicate: (indexName: string, columnName: string) => string;

    LABEL_TableCombineForm_superTableName: string
    LABEL_TableCombineForm_tables: string
    LABEL_TableCombineForm_tables_placeholder: string
    LABEL_TableCombineForm_tables_selectAll: string
    LABEL_TableCombineForm_columns: string
    LABEL_TableCombineForm_columns_placeholder: string
    LABEL_TableCombineForm_columns_selectAll: string

    LABEL_AssociationForm_name: string
    LABEL_AssociationForm_mappingAssociation: string
    LABEL_AssociationForm_sourceTableName_placeholder: string
    LABEL_AssociationForm_sourceTableName_selectAll: string
    LABEL_AssociationForm_targetTableName_placeholder: string
    LABEL_AssociationForm_sourceColumnName_placeholder: string
    LABEL_AssociationForm_placeSelectSourceTableFirst: string
    LABEL_AssociationForm_targetColumnName_placeholder: string
    LABEL_AssociationForm_placeSelectTargetTableFirst: string
    LABEL_AssociationForm_type: string
    LABEL_AssociationForm_fake: string
    LABEL_AssociationForm_dissociateAction: string
    LABEL_AssociationForm_updateAction: string
    LABEL_AssociationForm_deleteAction: string

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
    LABEL_GenConfigForm_defaultIdType: string
    LABEL_GenConfigForm_generatedIdAnnotation: string
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

    LABEL_ModelSubGroupSelect_placeholder: string

    LABEL_EnumSelect_placeholder: string

    LABEL_GenTableColumn_category: string,
    LABEL_GenTableColumn_name: string,
    LABEL_GenTableColumn_comment: string,
    LABEL_GenTableColumn_type: string,
    LABEL_GenTableColumn_typeNotNull: string,
    LABEL_GenTableColumn_defaultValue: string,
    LABEL_GenTableColumn_defaultKeyGroup: string,

    LABEL_GenTableIndex_name: string
    LABEL_GenTableIndex_uniqueIndex: string
    LABEL_GenTableIndex_columns: string

    LABEL_EntityBusiness_page: string
    LABEL_EntityBusiness_add: string
    LABEL_EntityBusiness_edit: string
    LABEL_EntityBusiness_detail: string
    LABEL_EntityBusiness_query: string
    LABEL_EntityBusiness_delete: string
    LABEL_EntityBusiness_shortAssociation: string
    LABEL_EntityBusiness_longAssociation: string

    LABEL_EntityBusiness_hasPage: string
    LABEL_EntityBusiness_canAdd: string
    LABEL_EntityBusiness_canEdit: string
    LABEL_EntityBusiness_canQuery: string
    LABEL_EntityBusiness_canDelete: string
    LABEL_EntityBusiness_pageCanAdd: string
    LABEL_EntityBusiness_pageCanEdit: string
    LABEL_EntityBusiness_pageCanViewDetail: string
    LABEL_EntityBusiness_pageCanQuery: string
    LABEL_EntityBusiness_pageCanDelete: string
    LABEL_EntityBusiness_queryByPage: string

    LABEL_EntityBusiness_DTO_ListView: string
    LABEL_EntityBusiness_DTO_InsertInput: string
    LABEL_EntityBusiness_DTO_UpdateInput: string
    LABEL_EntityBusiness_DTO_DetailView: string
    LABEL_EntityBusiness_DTO_Specification: string
    LABEL_EntityBusiness_DTO_OptionView: string
    LABEL_EntityBusiness_DTO_ShortView: string
    LABEL_EntityBusiness_DTO_LongView: string
    LABEL_EntityBusiness_DTO_LongInput: string

    LABEL_GenEntityProperty_name: string
    LABEL_GenEntityProperty_comment: string
    LABEL_GenEntityProperty_type: string
    LABEL_GenEntityProperty_typeNotNull: string
    LABEL_GenEntityProperty_listType: string
    LABEL_GenEntityProperty_annotation: string
    LABEL_GenEntityProperty_business: string


    LABEL_DeleteTarget_Model: string
    LABEL_DeleteTarget_DataSource: string
    LABEL_DeleteTarget_Schema: string
    LABEL_DeleteTarget_SubGroup: string
    LABEL_DeleteTarget_Table: string
    LABEL_DeleteTarget_Association: string
    LABEL_DeleteTarget_Enum: string


    LABEL_EnumForm_name: string
    LABEL_EnumForm_comment: string
    LABEL_EnumForm_packagePath: string
    LABEL_EnumForm_notNullDefaultItem: string
    LABEL_EnumForm_type: string
    LABEL_EnumForm_typeUnset: string

    VALIDATE_GenEnum_nameCannotBeEmpty: string
    VALIDATE_GenEnum_subGroupNotExist: (subGroupName: string) => string;
    VALIDATE_GenEnum_itemsCannotBeEmpty: string
    VALIDATE_GenEnum_notNullDefaultItemRequired: string
    VALIDATE_GenEnum_defaultItemUnique: string
    VALIDATE_GenEnum_itemNameCannotBeEmpty: string
    VALIDATE_GenEnum_itemNameCannotBeDuplicate: (itemName: string) => string
    VALIDATE_GenEnum_ordinalValueMustBeInteger: string
    VALIDATE_GenEnum_itemValueCannotBeEmpty: string
    VALIDATE_GenEnum_itemValueCannotBeDuplicate: (itemValue: string) => string
    VALIDATE_GenEnum_nameCannotBeDuplicate: (enumName: string) => string

    LABEL_GenEnumItem_name: string
    LABEL_GenEnumItem_value: string
    LABEL_GenEnumItem_comment: string

    LABEL_ColumnTypeForm_jdbcType: string
    LABEL_ColumnTypeForm_overwriteByRaw: string
    LABEL_ColumnTypeForm_rawType: string
    LABEL_ColumnTypeForm_sizeAndPrecision: string
    LABEL_ColumnTypeForm_mappedEnum: string

    LABEL_EntityConfigForm_name: string
    LABEL_EntityConfigForm_comment: string
    LABEL_EntityConfigForm_remark: string
    LABEL_EntityConfigForm_overwriteName: string
    LABEL_EntityConfigForm_overwriteComment: string
    LABEL_EntityConfigForm_properties: string
    LABEL_EntityConfigForm_businessConfig: string

    LABEL_EntityConfigForm_property_generatedId: string
    LABEL_EntityConfigForm_property_generatedIdAnnotation: string
    LABEL_EntityConfigForm_property_logicalDeletedAnnotation: string
    LABEL_EntityConfigForm_property_otherAnnotation: string
    LABEL_EntityConfigForm_property_name: string
    LABEL_EntityConfigForm_property_overwriteName: string
    LABEL_EntityConfigForm_property_comment: string
    LABEL_EntityConfigForm_property_overwriteComment: string
    LABEL_EntityConfigForm_property_remark: string
    LABEL_EntityConfigForm_property_type: string
    LABEL_EntityConfigForm_property_listType: string
    LABEL_EntityConfigForm_property_typeNotNull: string
    LABEL_EntityConfigForm_property_longAssociation: string
    LABEL_EntityConfigForm_property_body: string
    LABEL_EntityConfigForm_property_specialFormType: string

    VALIDATE_Entity_nameCannotBeEmpty: string
    VALIDATE_Entity_nameCannotBeDuplicate: (entityName: string) => string
    VALIDATE_Entity_otherAnnotation_importLineCannotBeEmpty: (entityName: string) => string
    VALIDATE_Entity_otherAnnotation_importLineCannotBeDuplicate: (entityName: string, importLine: string) => string
    VALIDATE_Entity_otherAnnotation_annotationCannotBeEmpty: (entityName: string) => string
    VALIDATE_Entity_otherAnnotation_annotationCannotBeDuplicate: (entityName: string, annotation: string) => string
    VALIDATE_Entity_propertyNameCannotBeEmpty: string
    VALIDATE_Entity_propertyTypeCannotBeEmpty: (propertyName: string) => string
    VALIDATE_Entity_propertyNameCannotBeDuplicate: (propertyName: string) => string
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeEmpty: (propertyName: string) => string
    VALIDATE_Entity_propertyAnnotation_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => string
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeEmpty: (propertyName: string) => string
    VALIDATE_Entity_propertyAnnotation_annotationCannotBeDuplicate: (propertyName: string, annotation: string) => string
    VALIDATE_Entity_propertyBody_importLineCannotBeEmpty: (propertyName: string) => string
    VALIDATE_Entity_propertyBody_importLineCannotBeDuplicate: (propertyName: string, importLine: string) => string

    VALIDATE_ModelSubGroup_nameCannotBeEmpty: string
    VALIDATE_ModelSubGroup_nameCannotBeDuplicate: (modelSubGroupName: string) => string

    MESSAGE_GenerateFileMenu_clickSubGroupNotFoundInCurrentModel: (idName: IdName) => string
    MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel: (idName: IdName) => string
    MESSAGE_GenerateFileMenu_clickEntityNotFound: (idName: IdName) => string
    MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel: (idName: IdName) => string
    MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel: (idName: IdName) => string
}

type LocaleKey<
    Locale = MainLocale
> =
    keyof Locale

type LocaleKeyWithArgs<
    Locale = MainLocale,
    K extends keyof Locale = keyof Locale,
    V extends Locale[K] = Locale[K]
> =
    { key: K, args: V extends (...args: infer A) => string ? A : [] }

type LocalKeyParam<
    Locale extends MainLocale
> =
    LocaleKey<Locale> | LocaleKeyWithArgs<Locale>

export type MainLocaleKeyParam = LocalKeyParam<MainLocale>

export type ProjectLocale = MainLocale & {
    VALIDATE_GenModel_subGroupValidError: (subGroupName: string, subMessage: MainLocaleKeyParam) => string
    VALIDATE_GenModel_tableValidError: (tableName: string, subMessage: MainLocaleKeyParam) => string
    VALIDATE_GenModel_associationValidError: (associationName: string, subMessage: MainLocaleKeyParam) => string
    VALIDATE_GenModel_enumValidError: (enumName: string, subMessage: MainLocaleKeyParam) => string
}

export type ProjectLocaleKeyParam = LocalKeyParam<ProjectLocale>
