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

    delete_confirm_title: (deleteTarget: string) => string
    delete_confirm_content: (deleteTarget: string) => string

    name: string
    comment: string
    createdTime: string
    modifiedTime: string

    model: string
    group: string
    entity: string
    mappedSuperClass: string
    enumeration: string
    embeddableType: string
    association: string

    model_create_button: string
    group_create_button: string

    database: string
    table: string
    column: string
    index: string
    primaryKey: string
    foreignKey: string
    check: string
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

