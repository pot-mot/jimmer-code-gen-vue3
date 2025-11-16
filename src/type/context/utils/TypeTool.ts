import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts"

type CompiledMappingRule<T> = {
    jvmSource: JvmSource
    regex: RegExp
    result: DeepReadonly<T>
}

const regExpMatch = /^\/(.*)\/([gimuy]*)$/

function parseRegexString(regexStr: string): RegExp {
    // 匹配 /pattern/flags 格式
    const match = regexStr.match(regExpMatch)
    if (match) {
        const [, pattern, flags] = match
        if (pattern !== undefined) return new RegExp(pattern, flags)
    }
    // 如果不是标准格式，当作普通字符串处理
    return new RegExp(regexStr)
}


export const createSqlToJvm = (
    sqlToJvmMappingRules: DeepReadonly<SqlToJvmMappingRule[]>,
    jvmLanguage: JvmLanguage,
    databaseType: DatabaseType
): SqlToJvm => {
    const cachedSqlToJvmRules: CompiledMappingRule<JvmType>[] = sqlToJvmMappingRules
        .filter(rule => {
            return (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
                (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        })
        .map(rule => ({
            jvmSource: rule.jvmSource,
            regex: parseRegexString(rule.matchRegExp),
            result: rule.result
        }))

    return (rawType: string): JvmType => {
        for (const rule of cachedSqlToJvmRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<JvmType>(rule.result)
            }
        }
        return {
            typeExpression: "String",
            extraImports: [],
            extraAnnotations: [],
            serialized: false,
        }
    }
}

export const createJvmToSql = (
    jvmToSqlMappingRules: DeepReadonly<JvmToSqlMappingRule[]>,
    jvmLanguage: JvmLanguage,
    databaseType: DatabaseType
): JvmToSql => {
    const cachedJvmToSqlRules: CompiledMappingRule<SqlType>[] = jvmToSqlMappingRules
        .filter(rule => {
            return (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
                (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        })
        .map(rule => ({
            jvmSource: rule.jvmSource,
            regex: parseRegexString(rule.matchRegExp),
            result: rule.result
        }))

    return (rawType: string): SqlType => {
        for (const rule of cachedJvmToSqlRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<SqlType>(rule.result)
            }
        }
        return {
            type: "VARCHAR(255)",
            dataSize: 255,
        }
    }
}

export const createJvmToTs = (
    jvmToTsMappingRules: DeepReadonly<JvmToTsMappingRule[]>,
    jvmLanguage: JvmLanguage
): JvmToTs => {
    const cachedJvmToTsRules: CompiledMappingRule<TsType>[] = jvmToTsMappingRules
        .filter(rule => rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY")
        .map(rule => ({
            jvmSource: rule.jvmSource,
            regex: parseRegexString(rule.matchRegExp),
            result: rule.result
        }))

    return (rawType: string): TsType => {
        for (const rule of cachedJvmToTsRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<TsType>(rule.result)
            }
        }
        return {
            typeExpression: "string",
            extraImports: []
        }
    }
}
