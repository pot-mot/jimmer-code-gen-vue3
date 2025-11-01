import {Api} from "./__generated";
import {handleExpectError, handleUnexpectError} from "@/api/handleError.ts";
import {sendMessage} from "@/components/message/messageApi.ts";

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
            sendMessage(`Unexpected Response Status: ${response.status}`, {type: "error"})
        } catch (error) {
            handleUnexpectError(fetchUrl, method, response, error)
        }
    }

    const contentType = response.headers.get("content-type");

    if (contentType === null) {
        return undefined
    } else if (contentType.includes("application/json")) {
        return await response.json()
    } else if (contentType.includes("text/plain")) {
        return await response.text()
    } else if (contentType.includes("application/octet-stream")) {
        return await response.blob()
    } else {
        // 其他类型的响应内容
        sendMessage(`Unexpected Response Type: ${contentType}`, {type: "warning"})
        throw response
    }
})
