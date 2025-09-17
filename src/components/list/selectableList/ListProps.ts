import type {SchemaValidatorErrorHandler} from "@/utils/type/typeGuard.ts";

export interface ListProps<T> {
    lines: T[]
}

export interface EditListProps<T> extends Omit<ListProps<T>, 'lines'> {
    defaultLine: T | (() => T | Promise<T>),
    jsonSchemaValidate?: (json: any, onError?: SchemaValidatorErrorHandler) => boolean | Promise<T>,
    beforePaste?: (data: T[]) => void
}
