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
    label?: string
    span?: string
}

export interface PropListColumn<T extends { [key: string]: any }> {
    prop: keyof T
    label?: string
    span?: string
}

export interface ListProps<T extends { [key: string]: any }> extends LineStyleProps {
    columns: (PropListColumn<T> | ListColumn<T>)[],
    lines: T[]
    labelLine?: boolean
}

export interface EditListProps<T extends { [key: string]: any }> extends LineStyleProps {
    columns: (PropListColumn<T> | ListColumn<T>)[],
    operation?: ListColumn<T>,
    lines: T[],
    labelLine?: boolean
    defaultLine: T | (() => T | Promise<T>)
}

export interface EditListEmits<T extends { [key: string]: any }> {
    (event: "update:lines", lines: T[]): void
}