import type {SchemaValidator} from "@/utils/type/typeGuard.ts";
import type {ErrorObject} from "ajv";

export const readJson = <T>(jsonValidator: SchemaValidator<T>): Promise<{name: string, data: T} | undefined> => {
    return new Promise((resolve, reject) => {
        const inputElement = document.createElement('input')
        inputElement.type = 'file'
        inputElement.accept = '.json'
        inputElement.multiple = false
        inputElement.onchange = async () => {
            try {
                const file = inputElement.files?.item(0)
                if (!file) {
                    resolve(undefined)
                    return
                }

                const text = await file.text()
                const jsonData = JSON.parse(text)

                let error: ErrorObject[] | null | undefined
                if (!jsonValidator(jsonData, (e) => error = e)) {
                    reject(error)
                    return
                }

                resolve({name: file.name, data: jsonData as T})
            } catch (error) {
                reject(error)
            }
        }
        inputElement.click()
    })
}


