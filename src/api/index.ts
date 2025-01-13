import {Api} from "./__generated";
import {sendI18nMessage} from "../message/message.ts";
import {handleExpectError, handleUnexpectError} from "@/api/handleError.ts";

const BASE_URL = "/api";

export const api = new Api(async ({uri, method, body}) => {
    const fetchUrl = `${BASE_URL}${uri}`

    const response = await fetch(fetchUrl, {
        method,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    })

    if (response.status === 500) {
        let jsonError = undefined
        try {
            jsonError = await response.json()
        } catch (error) {
            handleUnexpectError(fetchUrl, method, response, error)
        }
        if (jsonError != undefined) {
            handleExpectError(fetchUrl, method, response, jsonError)
        }
        handleUnexpectError(fetchUrl, method, response, jsonError)
    } else if (response.status !== 200) {
        try {
            sendI18nMessage({
                key: "MESSAGE_api_fetch_unexpectedResponseStatus",
                args: [fetchUrl, response.status, response]
            }, "error", response)
        } catch (error) {
            handleUnexpectError(fetchUrl, method, response, error)
        }
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
        return null
    } else if (contentType.includes("application/json")) {
        const json = await response.json()
        return convertNullToUndefined(json)
    } else if (contentType.includes("text/plain")) {
        const text = await response.text()
        return convertNullToUndefined(text)
    } else if (contentType.includes("application/octet-stream")) {
        const blob = await response.blob()
        return convertNullToUndefined(blob)
    } else {
        // 其他类型的响应内容
        sendI18nMessage({
            key: "MESSAGE_api_fetch_unexpectedResponseType",
            args: [fetchUrl, contentType, response]
        }, "warning", response)
        throw response
    }
})
