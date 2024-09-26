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

    MESSAGE_save_success: string
    MESSAGE_save_fail: string
    MESSAGE_submit_success: string
    MESSAGE_submit_fail: string
    MESSAGE_edit_success: string
    MESSAGE_edit_fail: string
    MESSAGE_delete_success: string
    MESSAGE_delete_fail: string

    LABEL_OPERATION: string
    LABEL_CREATE_AT: string
    LABEL_MODIFY_AT: string

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

    LABEL_ModelEditorMainMenu_loadFromDataSource: string
    LABEL_ModelEditorMainMenu_loadFromModel: string
    LABEL_ModelEditorMainMenu_createTable: string
    LABEL_ModelEditorMainMenu_createEnum: string
    LABEL_ModelEditorMainMenu_associationShow_nameOnly: string
    LABEL_ModelEditorMainMenu_associationShow_joinTable: string
    LABEL_ModelEditorMainMenu_associationShow_joinColumn: string

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

    VALIDATE_GenTypeMapping_cannot_be_duplicate: string
    VALIDATE_GenTypeMapping_typeExpression_cannot_be_empty: string
    VALIDATE_GenTypeMapping_propertyType_cannot_be_empty: string

    LABEL_GenColumnDefault_dataSourceType: string
    LABEL_GenColumnDefault_typeCode: string
    LABEL_GenColumnDefault_segment: string
    LABEL_GenColumnDefault_rawType: string
    LABEL_GenColumnDefault_dataSize: string
    LABEL_GenColumnDefault_numericPrecision: string
    LABEL_GenColumnDefault_defaultValue: string
    LABEL_GenColumnDefault_remark: string

    VALIDATE_GenColumnDefault_cannot_be_duplicate: string
    VALIDATE_GenColumnDefault_rawType_cannot_be_empty: string
    VALIDATE_GenColumnDefault_dataSize_cannot_be_empty: string
    VALIDATE_GenColumnDefault_numericPrecision_cannot_be_empty: string

    LABEL_GenTableColumn_category: string,
    LABEL_GenTableColumn_name: string,
    LABEL_GenTableColumn_comment: string,
    LABEL_GenTableColumn_type: string,
    LABEL_GenTableColumn_typeNotNull: string,
    LABEL_GenTableColumn_defaultValue: string,

    LABEL_GenTableIndex_name: string
    LABEL_GenTableIndex_uniqueIndex: string
    LABEL_GenTableIndex_columns: string

    LABEL_GenEnumItem_name: string
    LABEL_GenEnumItem_value: string
    LABEL_GenEnumItem_comment: string

}

export type MainLocaleKey = keyof MainLocale
