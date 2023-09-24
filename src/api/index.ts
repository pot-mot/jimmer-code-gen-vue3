import {Api} from "./__generated";


const BASE_URL = "/api";

export const api = new Api(async ({uri, method, body}) => {
    const response = await fetch(`${BASE_URL}${uri}`, {
        method,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        }
    });
    if (response.status !== 200) {
        const result = await response.json()
        alert(JSON.stringify(result))
        throw result
    }
    const text = await response.text();
    if (text.length === 0) {
        return null;
    }
    return JSON.parse(text);
});
