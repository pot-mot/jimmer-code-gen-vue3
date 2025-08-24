export type LazyData<T> = T | (() => T) | Promise<T> | (() => Promise<T>)

export const lazyDataParse = async <T>(
    data: LazyData<T>
): Promise<T> => {
    if (data instanceof Function) {
        const result = data();
        return result instanceof Promise ? await result : result;
    }
    return data;
}
