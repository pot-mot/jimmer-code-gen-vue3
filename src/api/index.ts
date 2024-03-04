import {Api} from "./__generated";
import {sendMessage} from "../message/message.ts";
import {handleError} from "@/api/handleError.ts";

const BASE_URL = "/api";

export const api = new Api(async ({uri, method, body}) => {
    try {
        const fetchUrl = `${BASE_URL}${uri}`

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
            sendMessage(`请求 ${fetchUrl} 时出现问题，错误为 ${JSON.stringify(result)}`, "error", result)
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
            const content = await response.text()
            sendMessage(`接收到了未设置的响应类型: ${contentType}，来源是 ${fetchUrl}`, 'info', content)
            return response.body
        }
    } catch (e) {
        sendMessage(`请求 [${method}] ${BASE_URL}${uri} 时出现预期外异常，请前往 git 仓库提出 issue 并提供问题复现素材`, 'error', e)
        throw e
    }
})
