import type {SchemaValidatorErrorHandler} from "@/utils/type/typeGuard.ts";

export interface ListProps<T> {
    lines: DeepReadonly<T[]>,
    beforeCopy?: (data: T[]) => void
}

export interface EditListProps<T> extends Omit<ListProps<T>, 'lines'> {
    defaultLine: T | (() => T | Promise<T>),
    jsonSchemaValidate?: (json: any, onError?: SchemaValidatorErrorHandler) => boolean | Promise<T>,
    beforeCopy?: (data: T[]) => void
    beforePaste?: (data: T[]) => void
    afterPaste?: () => void
}
