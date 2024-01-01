import Ajv from 'ajv';
import {AnyValidateFunction} from "ajv/dist/types";

// https://juejin.cn/post/7166061734803963917
export const useShapeValidate = <T> (type: string, schema: any) => {
    const ajv = new Ajv({ schemas: [schema] })

    let validate: AnyValidateFunction<T> = ajv.getSchema(`#/definitions/${type}`)!

    return {
        ajv,
        validate: (data: any, showErrors: boolean = true) => {
            const result = validate(data)

            if (!result && showErrors) {
                console.error(type, data, validate.errors)
            }

            return result
        }
    }
}