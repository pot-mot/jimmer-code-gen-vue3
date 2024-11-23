import {ProjectLocaleKeyParam} from "@/i18n";

interface LineStyleProps {
    gap?: string,
    height?: string
}

export interface LineProps extends LineStyleProps {
    items?: { name: string, span: string }[],
}

export interface ListColumn<T extends { [key: string]: any }> {
    name: keyof T | string
    prop?: keyof T
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface PropListColumn<T extends { [key: string]: any }> {
    prop: keyof T
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface ListProps<T extends { [key: string]: any }> extends LineStyleProps {
    columns: ReadonlyArray<PropListColumn<T> | ListColumn<T>>,
    lines: T[]
    labelLine?: boolean
}

export interface EditListProps<T extends { [key: string]: any }> extends ListProps<T> {
    operation?: ListColumn<T>,
    defaultLine: T | (() => T | Promise<T>),
    jsonSchemaValidate: (json: any, onError: (e: any) => void) => boolean | Promise<T>,
    beforePaste?: (data: T[]) => void
}

