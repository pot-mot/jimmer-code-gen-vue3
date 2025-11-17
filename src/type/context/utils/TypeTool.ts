import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts"
import {parseRegExp} from "@/utils/regExp/parseRegExp.ts";
import {sendMessage} from "@/components/message/messageApi.ts";
import {translate} from "@/store/i18nStore.ts";

type CompiledMappingRule<T> = {
    jvmSource: JvmSource
    regex: RegExp
    result: DeepReadonly<T>
}

export const createSqlToJvm = (
    sqlToJvmMappingRules: DeepReadonly<SqlToJvmMappingRule[]>,
    jvmLanguage: JvmLanguage,
    databaseType: DatabaseType
): SqlToJvm => {
    const cachedSqlToJvmRules: CompiledMappingRule<JvmType>[] = []

    for (const rule of sqlToJvmMappingRules) {
        if (
            (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
            (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        ) {
            try {
                cachedSqlToJvmRules.push({
                    jvmSource: rule.jvmSource,
                    regex: parseRegExp(rule.matchRegExp),
                    result: rule.result
                })
            } catch (e) {
                console.error(`Invalid regexp: ${rule.matchRegExp}`)
                sendMessage(`${translate('invalid_regexp')}: ${rule.matchRegExp}`, {type: "warning"})
            }
        }
    }

    return (rawType: string): JvmType => {
        for (const rule of cachedSqlToJvmRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<JvmType>(rule.result)
            }
        }
        return jvmLanguage === "JAVA" ? {
            typeExpression: "Object",
            extraImports: [],
            extraAnnotations: [],
            serialized: false,
        } : {
            typeExpression: "Any",
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
    const cachedJvmToSqlRules: CompiledMappingRule<SqlType>[] = []

    for (const rule of jvmToSqlMappingRules) {
        if (
            (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
            (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        ) {
            try {
                cachedJvmToSqlRules.push({
                    jvmSource: rule.jvmSource,
                    regex: parseRegExp(rule.matchRegExp),
                    result: rule.result
                })
            } catch (e) {
                console.error(`Invalid regexp: ${rule.matchRegExp}`)
                sendMessage(`${translate('invalid_regexp')}: ${rule.matchRegExp}`, {type: "warning"})
            }
        }
    }

    return (rawType: string): SqlType => {
        for (const rule of cachedJvmToSqlRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<SqlType>(rule.result)
            }
        }
        return {
            type: "text",
        }
    }
}

export const createJvmToTs = (
    jvmToTsMappingRules: DeepReadonly<JvmToTsMappingRule[]>,
    jvmLanguage: JvmLanguage
): JvmToTs => {
    const cachedJvmToTsRules: CompiledMappingRule<TsType>[] = []

    for (const rule of jvmToTsMappingRules) {
        if (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") {
            try {
                cachedJvmToTsRules.push({
                    jvmSource: rule.jvmSource,
                    regex: parseRegExp(rule.matchRegExp),
                    result: rule.result
                })
            } catch (e) {
                console.error(`Invalid regexp: ${rule.matchRegExp}`)
                sendMessage(`${translate('invalid_regexp')}: ${rule.matchRegExp}`, {type: "warning"})
            }
        }
    }

    return (rawType: string): TsType => {
        for (const rule of cachedJvmToTsRules) {
            if (rule.regex.test(rawType)) {
                return cloneDeepReadonlyRaw<TsType>(rule.result)
            }
        }
        return {
            typeExpression: "any",
            extraImports: []
        }
    }
}
