import {sendI18nMessage} from "@/message/message.ts"
import {handleConvertError} from "@/api/handleErrors/convert.ts";
import {handleDataSourceError} from "@/api/handleErrors/dataSource.ts";
import {handleLoadFromDataSourceError} from "@/api/handleErrors/loadFromDataSource.ts";
import {handleLoadFromModelError} from "@/api/handleErrors/loadFromModel.ts";
import {handleModelError} from "@/api/handleErrors/model.ts";
import {handleGenerateError} from "@/api/handleErrors/generate.ts";
import {handleColumnTypeError} from "@/api/handleErrors/columnType.ts";
import {AllErrors} from "@/api/__generated";
import {IdName, IdNullableName} from "@/api/__generated/model/static";
import {handleModelBusinessInputError} from "@/api/handleErrors/modelBusinessInput.ts";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export const EXPECT_ERROR = Symbol("EXPECT_ERROR")

export type Errors = {
    [E in AllErrors as E['family']]: {
        [C in Extract<AllErrors, { family: E['family'] }> as C['code']]:
            Extract<AllErrors, { family: E['family']; code: C['code'] }>
    }
}


export const defaultPlaceholder = " --- "

export const formatIdName = (idName: IdName | IdNullableName | undefined, placeholder: string = defaultPlaceholder) => {
    if (idName !== undefined) {
        return `${idName.name === undefined ? placeholder : idName.name}(${idName.id})`
    } else {
        return placeholder
    }
}

/**
 * 处理非预期的错误
 * 弹出非预期消息，并继续抛出错误
 */
export const handleUnexpectError = (uri: string, _method: Method, response: Response, error: any) => {
    sendI18nMessage({
        key: "MESSAGE_api_fetch_unexpectedError",
        args: [uri, error]
    }, "error", {response, error})
    throw error
}

/**
 * 处理预期的错误
 * 验证输入的错误
 *  若是预期的错误，则直接抛出 EXPECT_ERROR，中断后续行为
 *  若不是预期的错误，则不进行任何操作
 */
export const handleExpectError = (_uri: string, _method: Method, _response: Response, error: any) => {
    if (typeof error === "object" && "family" in error && typeof error.family === "string") {
        switch (error.family) {
            case "DATA_SOURCE":
                handleDataSourceError(error)
                return

            case "LOAD_FROM_DATA_SOURCE":
                handleLoadFromDataSourceError(error)
                return

            case "LOAD_FROM_MODEL":
                handleLoadFromModelError(error)
                return

            case "MODEL":
                handleModelError(error)
                return

            case "COLUMN_TYPE":
                handleColumnTypeError(error)
                return

            case "CONVERT":
                handleConvertError(error)
                return

            case "GENERATE":
                handleGenerateError(error)
                return

            case "MODEL_BUSINESS_INPUT":
                handleModelBusinessInputError(error)
                return
        }
    }
}
