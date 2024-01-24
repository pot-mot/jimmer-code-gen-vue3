import Ajv from 'ajv';
import {ValidateFunction} from "ajv/dist/types";

// https://juejin.cn/post/7166061734803963917
export const useShapeValidate = <T>(type: string, schema: any) => {
    const ajv = new Ajv({schemas: [schema]})

    let validate: ValidateFunction<T> = ajv.getSchema(`#/definitions/${type}`)!

    return {
        ajv,
        validate: (
            data: any,
            onErrors: (e: any) => void
        ) => {
            const result = validate(data)

            if (!result) {
                onErrors({type, errors: validate.errors, data})
                return false
            }

            return true
        }
    }
}
