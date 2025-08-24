import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";

export const isSymbol = (arg: any): arg is symbol => {
    return typeof arg === 'symbol';
}

export const isString = (arg: any): arg is string => {
    return typeof arg === 'string';
}

export const isFunction = (arg: any): arg is Function => {
    return typeof arg === 'function';
}

export const getKeys = <T extends object>(data: T): (keyof T)[] => {
    return Object.keys(data) as (keyof T)[]
}

import Ajv, {type ErrorObject} from "ajv";
const ajv = new Ajv({ allErrors: true }); // 启用所有错误信息

export type SchemaValidatorErrorHandler = (errors: ErrorObject[] | null | undefined) => void

export const createSchemaValidator = <T>(schema: JSONSchemaType<T>, baseErrorHandler?: SchemaValidatorErrorHandler) => {
    const validate = ajv.compile(schema)

    return (data: unknown, errorHandler?: SchemaValidatorErrorHandler): data is T => {
        const valid = validate(data)

        if (!valid) {
            if (errorHandler !== undefined) {
                errorHandler(validate.errors)
            } else if (baseErrorHandler !== undefined) {
                baseErrorHandler(validate.errors)
            }
            return false
        }

        return true
    }
}

export type SchemaValidator<T> = ReturnType<typeof createSchemaValidator<T>>
