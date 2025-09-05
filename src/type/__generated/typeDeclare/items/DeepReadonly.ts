export default Object.freeze({
    fileName: 'DeepReadonly.d.ts',
    content: `/**
 * 深度只读类型 - 将对象及其所有嵌套属性都设置为只读
 * 处理了多种特殊情况，包括数组、函数、Map、Set等
 */
type DeepReadonly<T> =
    T extends (...args: any[]) => any
        ? T // 函数类型保持不变
        : T extends ReadonlyMap<infer K, infer V>
            ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> // 处理ReadonlyMap
            : T extends Map<infer K, infer V>
                ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> // 处理Map
                : T extends ReadonlySet<infer U>
                    ? ReadonlySet<DeepReadonly<U>> // 处理ReadonlySet
                    : T extends Set<infer U>
                        ? ReadonlySet<DeepReadonly<U>> // 处理Set
                        : T extends ReadonlyArray<infer U>
                            ? T extends Record<number, infer U>
                                ? ReadonlyArray<DeepReadonly<U>> // 处理只读数组
                                : never
                            : T extends Array<infer U>
                                ? ReadonlyArray<DeepReadonly<U>> // 处理普通数组
                                : T extends object
                                    ? { readonly [K in keyof T]: DeepReadonly<T[K]> } // 处理普通对象
                                    : T;`,
})
