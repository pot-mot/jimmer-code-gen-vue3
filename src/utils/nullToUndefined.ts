/**
 *
 * 期望得到 undefined
 * type result1 = ConvertNullToUndefined<null>
 *
 * 期望得到 undefined
 * type result2 = ConvertNullToUndefined<undefined>
 *
 * 期望得到 { name?: string | undefined } | undefined
 * type result3 = ConvertNullToUndefined<{
 *     name?: string | undefined | null
 * } | undefined | null>
 *
 * 期望得到 Array<{ name?: string | undefined } | undefined>
 * type result4 = ConvertNullToUndefined<Array<{
 *     name?: string | undefined | null
 * } | null | undefined>>
 */

type ConvertNullToUndefined<T> = T extends null
    ? undefined
    : T extends object
        ? { [K in keyof T]: ConvertNullToUndefined<T[K]> }
        : T extends Array<infer U>
            ? Array<ConvertNullToUndefined<U>>
            : T;

export const convertNullToUndefined = <T>(obj: T): ConvertNullToUndefined<T> => {
    if (obj === null) {
        return undefined as ConvertNullToUndefined<T>;
    }

    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            return obj.map(item => convertNullToUndefined(item)) as ConvertNullToUndefined<T>;
        } else {
            const result: { [key: string]: any } = {};
            for (const key in obj) {
                result[key] = convertNullToUndefined(obj[key]);
            }
            return result as ConvertNullToUndefined<T>;
        }
    }
    return obj as ConvertNullToUndefined<T>;
}
