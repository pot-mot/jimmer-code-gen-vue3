import {Api} from "./__generated";
import {sendMessage} from "../utils/message.ts";

const BASE_URL = "/api";

export const api = new Api(async ({uri, method, body}) => {
    const response = await fetch(`${BASE_URL}${uri}`, {
        method,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    });
    if (response.status != 200) {
        const result = await response.json()
        sendMessage(JSON.stringify(result), "error", result)
        throw result
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
        return null
    } else if (contentType.includes("application/json")) {
        return await response.json()
    } else  if (contentType.includes("application/octet-stream")) {
        return await response.blob()
    } else {
        // 其他类型的响应内容
        console.log(contentType)
        return response.body
    }

})
