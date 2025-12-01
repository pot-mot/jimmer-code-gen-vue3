export type MainLocale = {
    copy: string
    cut: string
    paste: string

    edit: string
    submit: string
    delete: string
    clear: string
    save: string
    confirm: string
    cancel: string
    load: string
    export: string
    upload: string
    download: string
    execute: string
    test: string
    generate: string
    reset: string
    refresh: string
    redo: string
    redo_fail: string
    cannot_redo: string
    undo: string
    undo_fail: string
    cannot_undo: string

    all: string
    selected: string

    reset_confirm_title: (target: string) => string
    reset_confirm_content: (target: string) => string
    delete_confirm_title: (target: string) => string
    delete_confirm_content: (target: string) => string
    get_success: (target: string) => string
    get_fail: (target: string) => string
    insert_success: (target: string) => string
    insert_fail: (target: string) => string
    update_success: (target: string) => string
    update_fail: (target: string) => string
    delete_success: (target: string) => string
    delete_fail: (target: string) => string
    export_success: (target: string) => string
    export_fail: (target: string) => string,
    download_success: (target: string) => string
    download_fail: (target: string) => string
    input_placeholder: (fieldName: string) => string
    select_placeholder: (fieldName: string) => string
    validate_fail: string
    not_blank_warning: (fieldName: string) => string
    not_existed: string
    json_validate_error: string
    no_option_tip: string
    copy_success_tip: string
    copy_fail_tip: string
    cut_success_tip: string
    cut_fail_tip: string
    paste_success_tip: string
    paste_fail_tip: string
    compile_fail: string
    no_more_questions: string

    name: string
    comment: string
    keywords: string
    description: string
    url: string
    username: string
    password: string
    createdTime: string
    modifiedTime: string
    nullable: string
    dataSize: string
    numericPrecision: string
    defaultValue: string
    generateResult: string
    code: string

    model: string
    group: string
    entity: string
    mappedSuperClass: string
    enumeration: string
    embeddableType: string
    association: string

    model_list_title: string
    model_create_button: string
    model_create_title: string
    model_load_button: string
    model_enum_name: string
    model_enum_ordinal: string
    model_fk_real: string
    model_fk_fake: string
    model_db_lower_snake: string
    model_db_upper_snake: string

    model_update_title: string
    group_create_button: string
    load_from_database_button: string

    raw_type_not_fit_language_title: string
    raw_type_not_fit_auto_toggle: string
    raw_type_not_fit_language: (currentLanguage: JvmLanguage, info: string) => string

    database: string
    table: string
    tables: string
    column: string
    columns: string
    index: string
    indexes: string
    check: string
    checks: string
    primaryKey: string
    foreignKey: string
    foreignKeys: string

    database_dialog_button: string
    database_dialog_title: string
    database_add_button: string
    database_create_title: string
    database_update_title: string

    script: string
    script_dialog_button: string
    script_dialog_title: string
    script_error: string

    script_declare_type_not_found: (scriptType: string) => string
    script_can_contains_only_one_arrow_function_and_type_declares: string
    parameter_count_mismatch: (expected: number, expectedTypes: string, actual: number) => string
    parameter_type_mismatch: (parameterName: string, expected: string, actual: string) => string
    parameter_type_need_default_or_optional: (parameterName: string) => string
    parameter_type_cannot_optional: (parameterName: string) => string
    parameter_must_specify_type: (parameterName: string) => string
    arrow_function_cannot_get_signature: string
    return_type_mismatch: (expected: string, actual: string) => string
    target_is_forbidden: (target: string) => string

    type_mapping_dialog_button: string
    type_mapping_dialog_title: string
    cross_type: string
    sql_type: string
    jvm_type: string
    ts_type: string

    database_type: string
    jvm_language: string

    AssociationGenerator: string
    EmbeddableTypeGenerator: string
    EntityGenerator: string
    EnumerationGenerator: string
    GroupGenerator: string
    MappedSuperClassGenerator: string
    ModelGenerator: string
    TableGenerator: string

    basePackagePath: string
    baseTableSchema: string

    extraImports: string
    extraAnnotations: string
    jvmMatchRules: string
    sqlMatchRules: string
    tsMatchRules: string
    typeExpression: string
    nullableLimit_true: string
    nullableLimit_false: string
    nullableLimit_undefined: string
    matchRegExp: string
    invalid_regexp: string

    diagnose_dialog_button: string
    diagnose_dialog_title: string
    generate_fail_because_of_some_checked_questions: string
}

type BaseLocale = {
    [K : string]: string | ((...args: any[]) => string)
}

type LocaleKey<
    Locale extends BaseLocale = MainLocale
> =
    keyof Locale

type LocaleKeyWithArgs<
    Locale extends BaseLocale = MainLocale,
    K extends keyof Locale = keyof Locale,
    V extends Locale[K] = Locale[K]
> =
    { key: K, args: V extends (...args: infer A) => string ? A : [] }

export type LocalKeyParam<
    Locale extends BaseLocale = MainLocale
> =
    LocaleKey<Locale> | LocaleKeyWithArgs<Locale>

