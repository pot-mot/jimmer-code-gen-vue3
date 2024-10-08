import {Api} from "./__generated";
import {sendI18nMessage} from "../message/message.ts";
import {handleError} from "@/api/handleError.ts";

const BASE_URL = "/api";

export const api = new Api(async ({uri, method, body}) => {
    const fetchUrl = `${BASE_URL}${uri}`

    try {
        const response = await fetch(fetchUrl, {
            method,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        })

        if (response.status === 500) {
            const error = await response.json()
            handleError(fetchUrl, error)
            return
        } else if (response.status !== 200) {
            const result = await response.json()
            sendI18nMessage({
                key: "MESSAGE_api_fetch_unexpectedResponseStatus",
                args: [fetchUrl, response.status, result]
            }, "error", result)
            return
        }

        const contentType = response.headers.get("content-type");

        if (!contentType) {
            return null
        } else if (contentType.includes("application/json")) {
            return await response.json()
        } else if (contentType.includes("text/plain")) {
            return await response.text()
        } else if (contentType.includes("application/octet-stream")) {
            return await response.blob()
        } else {
            // 其他类型的响应内容
            const result = await response.text()
            sendI18nMessage({
                key: "MESSAGE_api_fetch_unexpectedResponseType",
                args: [fetchUrl, contentType, result]
            }, "warning", result)
            return response.body
        }
    } catch (e) {
        sendI18nMessage({
            key: "MESSAGE_api_fetch_unexpectedError",
            args: [fetchUrl, e]
        }, 'error', e)
        throw e
    }
})
