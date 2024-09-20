import {MainLocale} from "@/i18n/index.ts";

export const mainLocaleEn: MainLocale = {
    BUTTON_edit: "Edit",
    BUTTON_submit: "Submit",
    BUTTON_delete: "Delete",
    BUTTON_save: "Save",
    BUTTON_cancel: "Cancel",

    MESSAGE_save_success: 'Save Successful',
    MESSAGE_save_fail: 'Save Failed',
    MESSAGE_submit_success: 'Submit Successful',
    MESSAGE_submit_fail: 'Submit Failed',
    MESSAGE_edit_success: 'Edit Successful',
    MESSAGE_edit_fail: 'Edit Failed',
    MESSAGE_delete_success: 'Delete Successful',
    MESSAGE_delete_fail: 'Delete Failed',

    LABEL_OPERATION: "Operation",

    LABEL_GlobalGenConfigForm: "Edit GlobalGenConfig",
    LABEL_TypeMappingForm: "Edit TypeMapping",
    LABEL_ColumnDefaultForm: "Edit ColumnDefault",
    LABEL_DebugLog: "Debug Log",

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

    VALIDATE_GenTypeMapping_cannot_be_duplicate: 'TypeMapping cannot be duplicate',
    VALIDATE_GenTypeMapping_typeExpression_cannot_be_empty: 'TypeMapping DatabaseType Match cannot be empty',
    VALIDATE_GenTypeMapping_propertyType_cannot_be_empty: 'TypeMapping MappingType cannot be empty',


    LABEL_GenColumnDefault_dataSourceType: 'Data Source Type',
    LABEL_GenColumnDefault_typeCode: 'Jdbc Type',
    LABEL_GenColumnDefault_segment: '→',
    LABEL_GenColumnDefault_rawType: 'Raw Type',
    LABEL_GenColumnDefault_dataSize: 'Length',
    LABEL_GenColumnDefault_numericPrecision: 'Precision',
    LABEL_GenColumnDefault_defaultValue: 'Default Value',
    LABEL_GenColumnDefault_remark: 'Remark',

    VALIDATE_GenColumnDefault_cannot_be_duplicate: 'The dataSourceType and typeCode of ColumnDefault cannot be duplicate',
    VALIDATE_GenColumnDefault_rawType_cannot_be_empty: 'The Raw Type of ColumnDefault cannot be empty',
    VALIDATE_GenColumnDefault_dataSize_cannot_be_empty: 'The Length of ColumnDefault cannot be empty',
    VALIDATE_GenColumnDefault_numericPrecision_cannot_be_empty: 'The Precision of ColumnDefault cannot be empty',
}
