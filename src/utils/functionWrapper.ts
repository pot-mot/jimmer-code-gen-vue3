type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type WrapperFunction<F extends (...args: any) => any> = (...args: Parameters<F>) => Promise<UnwrapPromise<ReturnType<F>>>

export const functionWrapper = <F extends (...args: any) => any>(
    fn: F,
    before: (args: Parameters<F>) => any,
    after: (args: Parameters<F>, result: ReturnType<F>) => any,
): WrapperFunction<F> => {
    return async (...args: Parameters<F>): Promise<UnwrapPromise<ReturnType<F>>> => {
        await before(args)
        const result = await fn(...args)
        await after(args, result)
        return result;
    }
}
