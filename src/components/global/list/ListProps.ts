import {ProjectLocaleKeyParam} from "@/i18n";
import {OnErrorsHandler} from "@/shape/shapeValidate.ts";

export interface ListColumn {
    name: string
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface PropListColumn<T> {
    prop: keyof T
    label?: ProjectLocaleKeyParam
    span?: string
}

export interface ListProps<T> {
    gap?: string,
    height?: string,
    columns?: ReadonlyArray<PropListColumn<T> | ListColumn>,
    lines: T[]
    labelLine?: boolean
}

export interface EditListProps<T> extends Omit<ListProps<T>, 'lines'> {
    operation?: ListColumn,
    defaultLine: T | (() => T | Promise<T>),
    jsonSchemaValidate?: (json: any, onError: OnErrorsHandler) => boolean | Promise<T>,
    beforePaste?: (data: T[]) => void
}

