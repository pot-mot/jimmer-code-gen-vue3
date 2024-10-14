import {MainLocale} from "@/i18n/index.ts";
import {DeepReadonly} from "vue";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";

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

    LABEL_ModelEditorGraph_previewSql: 'Preview SQL',
    LABEL_ModelEditorGraph_previewEntity: 'Preview Entity',
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
