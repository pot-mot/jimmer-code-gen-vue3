export type MainLocale = {
    BUTTON_copy: string
    BUTTON_cut: string
    BUTTON_paste: string

    BUTTON_edit: string
    BUTTON_submit: string
    BUTTON_delete: string
    BUTTON_clear: string
    BUTTON_save: string
    BUTTON_cancel: string
    BUTTON_load: string
    BUTTON_export: string
    BUTTON_test: string

    MESSAGE_delete_confirm: (deleteTarget: string) => string
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

