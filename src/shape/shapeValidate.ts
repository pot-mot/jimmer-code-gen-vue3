import Ajv from 'ajv';
import {ValidateFunction} from "ajv/dist/types";
import {ErrorObject} from "ajv/lib/types";

export type ValidateError = { errors: undefined | null | ErrorObject[], data: any }

export type OnErrorsHandler = (e: ValidateError) => void

// https://juejin.cn/post/7166061734803963917
export const useShapeValidate = <T>(
    schema: {
        "$schema": string,
        "definitions": { [key: string]: any }
    },
    type: keyof (typeof schema)["definitions"]
) => {
    const ajv = new Ajv({schemas: [schema]})

    const validate: ValidateFunction<T> = ajv.getSchema(`#/definitions/${type}`)!

    return {
        ajv,
        validate: (
            data: any,
            onErrors: OnErrorsHandler
        ) => {
            const result = validate(data)

            if (!result) {
                onErrors({errors: validate.errors, data})
                return false
            }

            return true
        }
    }
}
