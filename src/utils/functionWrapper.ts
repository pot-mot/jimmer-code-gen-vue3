type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type WrapperFunction<F extends (...args: any) => any> = (...args: Parameters<F>) => Promise<UnwrapPromise<ReturnType<F>>>

export const functionWrapper = <F extends (...args: any) => any>(
    fn: F,
    before: (args: Parameters<F>) => any,
    after: (args: Parameters<F>, result: ReturnType<F> | undefined, error?: any, ) => any,
): WrapperFunction<F> => {
    return async (...args: Parameters<F>): Promise<UnwrapPromise<ReturnType<F>>> => {
        try {
            await before(args);
            const result = await fn(...args);
            await after(args, result);
            return result;
        } catch (error) {
            // 捕获异常并传递给 after 函数
            await after(args, undefined, error);
            // 重新抛出异常，以便调用者可以处理
            throw error;
        }
    }
}
