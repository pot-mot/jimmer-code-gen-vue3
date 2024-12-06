import {ProjectLocaleKeyParam} from "@/i18n";

interface LineStyleProps {
    gap?: string,
    height?: string
}

export interface LineProps extends LineStyleProps {
    items?: { name: string, span: string }[],
}

export interface ListColumn<T> {
    name: keyof T | string
    prop?: keyof T
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface PropListColumn<T> {
    prop: keyof T
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface ListProps<T> extends LineStyleProps {
    columns?: ReadonlyArray<PropListColumn<T> | ListColumn<T>>,
    lines: T[]
    labelLine?: boolean
}

export interface EditListProps<T> extends ListProps<T> {
    operation?: ListColumn<T>,
    defaultLine: T | (() => T | Promise<T>),
    jsonSchemaValidate?: (json: any, onError: (e: any) => void) => boolean | Promise<T>,
    beforePaste?: (data: T[]) => void
}

