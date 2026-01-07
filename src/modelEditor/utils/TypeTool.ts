import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts"
import {parseRegExp} from "@/utils/regExp/parseRegExp.ts";
import {sendMessage} from "@/components/message/messageApi.ts";
import {translate} from "@/store/i18nStore.ts";
import {
    defaultJavaType_Object,
    defaultKotlinType_Any,
    defaultSqlType_VARCHAR255,
    defaultTsType
} from "@/modelEditor/default/modelDefaults.ts";

type JvmCompiledMappingRule = {
    jvmSource: JvmSource
    nullableLimit: boolean | undefined
    regex: RegExp
    result: DeepReadonly<JvmType>
}

export const createSqlToJvm = (
    sqlToJvmMappingRules: DeepReadonly<SqlToJvmMappingRule[]>,
    jvmLanguage: JvmLanguage,
    databaseType: DatabaseType
): SqlToJvm => {
    const cachedSqlToJvmRules: JvmCompiledMappingRule[] = []

    for (const rule of sqlToJvmMappingRules) {
        if (
            (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
            (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        ) {
            try {
                cachedSqlToJvmRules.push({
                    jvmSource: rule.jvmSource,
                    nullableLimit: rule.nullableLimit,
                    regex: parseRegExp(rule.matchRegExp),
                    result: rule.result
                })
            } catch (e) {
                console.error(`Invalid regexp: ${rule.matchRegExp}`)
                sendMessage(`${translate('invalid_regexp')}: ${rule.matchRegExp}`, {type: "warning"})
            }
        }
    }

    return (rawType: string, nullable: boolean): JvmType => {
        for (const rule of cachedSqlToJvmRules) {
            if (rule.regex.test(rawType) && (rule.nullableLimit === undefined || rule.nullableLimit === nullable)) {
                return cloneDeepReadonlyRaw<JvmType>(rule.result)
            }
        }
        return jvmLanguage === "JAVA" ? defaultJavaType_Object() : defaultKotlinType_Any()
    }
}


type SqlCompiledMappingRule = {
    databaseSource: DatabaseSource
    regex: RegExp
    result: DeepReadonly<SqlType>
}

export const createJvmToSql = (
    jvmToSqlMappingRules: DeepReadonly<JvmToSqlMappingRule[]>,
    jvmLanguage: JvmLanguage,
    databaseType: DatabaseType
): JvmToSql => {
    const cachedJvmToSqlRules: SqlCompiledMappingRule[] = []

    for (const rule of jvmToSqlMappingRules) {
        if (
            (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") &&
            (rule.databaseSource === databaseType || rule.databaseSource === "ANY")
        ) {
            try {
                cachedJvmToSqlRules.push({
                    databaseSource: rule.databaseSource,
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
        return defaultSqlType_VARCHAR255()
    }
}

type TsCompiledMappingRule = {
    regex: RegExp
    result: DeepReadonly<TsType>
}

export const createJvmToTs = (
    jvmToTsMappingRules: DeepReadonly<JvmToTsMappingRule[]>,
    jvmLanguage: JvmLanguage
): JvmToTs => {
    const cachedJvmToTsRules: TsCompiledMappingRule[] = []

    for (const rule of jvmToTsMappingRules) {
        if (rule.jvmSource === jvmLanguage || rule.jvmSource === "ANY") {
            try {
                cachedJvmToTsRules.push({
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
        return defaultTsType()
    }
}
