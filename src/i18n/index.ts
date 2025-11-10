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
    test: string
    generate: string

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
    input_placeholder: (fieldName: string) => string
    select_placeholder: (fieldName: string) => string
    not_blank_warning: (fieldName: string) => string
    json_validate_error: string
    no_option_tip: string

    name: string
    comment: string
    keywords: string
    description: string
    url: string
    username: string
    password: string
    createdTime: string
    modifiedTime: string
    generateResult: string

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
    model_enum_name: string
    model_enum_ordinal: string
    model_fk_real: string
    model_fk_fake: string
    model_db_lower_snake: string
    model_db_upper_snake: string

    model_update_title: string
    group_create_button: string

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
    script_test: string
    script_execute: string

    type_mapping_dialog_button: string
    type_mapping_dialog_title: string
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

