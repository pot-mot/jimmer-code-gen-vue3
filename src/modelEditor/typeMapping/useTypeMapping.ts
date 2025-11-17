import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {computed, readonly, ref} from "vue";
import type {
    CrossTypeInput,
    CrossTypeView, JvmTypeInput,
    JvmTypeView, SqlTypeInput,
    SqlTypeView, TsTypeInput,
    TsTypeView
} from "@/api/__generated/model/static";
import {api} from "@/api";
import {withLoading} from "@/components/loading/loadingApi.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";

const jvmTypes = ref<JvmTypeView[]>([])
const saveJvmType = async (inputs: JvmTypeInput[]) => {
    await withLoading('save jvm type', async () => {
        jvmTypes.value = await api.typeMappingService.saveJvmType({body: inputs})
    })
}
const refreshJvmTypes = async () => {
    await withLoading('refresh jvm type', async () => {
        jvmTypes.value = await api.typeMappingService.listJvmType()
    })
}

const sqlTypes = ref<SqlTypeView[]>([])
const saveSqlType = async (inputs: SqlTypeInput[]) => {
    await withLoading('save sql type', async () => {
        sqlTypes.value = await api.typeMappingService.saveSqlType({body: inputs})
    })
}
const refreshSqlTypes = async () => {
    await withLoading('refresh sql type', async () => {
        sqlTypes.value = await api.typeMappingService.listSqlType()
    })
}

const tsTypes = ref<TsTypeView[]>([])
const saveTsType = async (inputs: TsTypeInput[]) => {
    await withLoading('save ts type', async () => {
        tsTypes.value = await api.typeMappingService.saveTsType({body: inputs})
    })
}
const refreshTsTypes = async () => {
    await withLoading('refresh ts type', async () => {
        tsTypes.value = await api.typeMappingService.listTsType()
    })
}

const crossTypes = ref<CrossTypeView[]>([])
const saveCrossType = async (inputs: CrossTypeInput[]) => {
    await withLoading('save cross type', async () => {
        crossTypes.value = await api.typeMappingService.saveCrossType({body: inputs})
    })
}
const refreshCrossTypes = async () => {
    await withLoading('refresh cross type', async () => {
        crossTypes.value = await api.typeMappingService.listCrossType()
    })
}

export const initTypeMapping = async () => {
    await withLoading('init typeMapping', async () => {
        const [
            jvmTypesResult,
            sqlTypesResult,
            tsTypesResult,
            crossTypesResult,
        ] = await Promise.all([
            await api.typeMappingService.listJvmType(),
            await api.typeMappingService.listSqlType(),
            await api.typeMappingService.listTsType(),
            await api.typeMappingService.listCrossType(),
        ])

        jvmTypes.value = jvmTypesResult
        sqlTypes.value = sqlTypesResult
        tsTypes.value = tsTypesResult
        crossTypes.value = crossTypesResult
    })
}

export const useTypeMapping = createStore(() => {
    const dialogOpenState = useDialogOpenState()

    const getJvmToSqlMappingRules = (): DeepReadonly<JvmToSqlMappingRule[]> => {
        const rules: JvmToSqlMappingRule[] = []
        for (const sqlType of sqlTypes.value) {
            for (const jvmRule of sqlType.jvmMatchRules) {
                rules.push({
                    databaseSource: sqlType.databaseSource,
                    jvmSource: jvmRule.jvmSource,
                    matchRegExp: jvmRule.matchRegExp,
                    result: sqlType
                })
            }
        }
        return rules
    }
    const getJvmToTsMappingRules = (): DeepReadonly<JvmToTsMappingRule[]> => {
        const rules: JvmToTsMappingRule[] = []
        for (const tsType of tsTypes.value) {
            for (const jvmRule of tsType.jvmMatchRules) {
                rules.push({
                    jvmSource: jvmRule.jvmSource,
                    matchRegExp: jvmRule.matchRegExp,
                    result: tsType
                })
            }
        }
        return rules
    }

    const getSqlToJvmMappingRules = (): DeepReadonly<SqlToJvmMappingRule[]> => {
        const rules: SqlToJvmMappingRule[] = []
        for (const jvmType of jvmTypes.value) {
            for (const sqlRule of jvmType.sqlMatchRules) {
                rules.push({
                    jvmSource: jvmType.jvmSource,
                    databaseSource: sqlRule.databaseSource,
                    nullableLimit: sqlRule.nullableLimit,
                    matchRegExp: sqlRule.matchRegExp,
                    result: jvmType
                })
            }
        }
        return rules
    }

    const getSqlToTsMappingRules = (): DeepReadonly<SqlToTsMappingRule[]> => {
        const rules: SqlToTsMappingRule[] = []
        for (const tsType of tsTypes.value) {
            for (const sqlRule of tsType.sqlMatchRules) {
                rules.push({
                    databaseSource: sqlRule.databaseSource,
                    matchRegExp: sqlRule.matchRegExp,
                    result: tsType
                })
            }
        }
        return rules
    }

    const getTsToJvmMappingRules = (): DeepReadonly<TsToJvmMappingRule[]> => {
        const rules: TsToJvmMappingRule[] = []
        for (const jvmType of jvmTypes.value) {
            for (const tsRule of jvmType.tsMatchRules) {
                rules.push({
                    jvmSource: jvmType.jvmSource,
                    matchRegExp: tsRule.matchRegExp,
                    result: jvmType
                })
            }
        }
        return rules
    }

    const getTsToSqlMappingRules = (): DeepReadonly<TsToSqlMappingRule[]> => {
        const rules: TsToSqlMappingRule[] = []
        for (const sqlType of sqlTypes.value) {
            for (const tsRule of sqlType.tsMatchRules) {
                rules.push({
                    databaseSource: sqlType.databaseSource,
                    matchRegExp: tsRule.matchRegExp,
                    result: sqlType
                })
            }
        }
        return rules
    }

    const crossTypeOptions = computed<DeepReadonly<CrossType[]>>(() => {
        const options: CrossType[] = []
        for (const crossType of crossTypes.value) {
            const sqlType = sqlTypes.value.find(it => it.id === crossType.sqlTypeId)
            if (!sqlType) continue
            const jvmType = jvmTypes.value.find(it => it.id === crossType.jvmTypeId)
            if (!jvmType) continue
            const tsType = tsTypes.value.find(it => it.id === crossType.tsTypeId)
            if (!tsType) continue

            options.push({
                databaseSource: sqlType.databaseSource,
                sqlType,
                jvmSource: jvmType.jvmSource,
                jvmType,
                tsType,
                nullable: crossType.nullable
            })
        }
        return options
    })

    return {
        ...dialogOpenState,

        jvmTypes: readonly(jvmTypes),
        saveJvmType,
        refreshJvmTypes,
        sqlTypes: readonly(sqlTypes),
        saveSqlType,
        refreshSqlTypes,
        tsTypes: readonly(tsTypes),
        saveTsType,
        refreshTsTypes,
        crossTypes: readonly(crossTypes),
        saveCrossType,
        refreshCrossTypes,

        crossTypeOptions,

        getJvmToSqlMappingRules,
        getJvmToTsMappingRules,
        getSqlToJvmMappingRules,
        getSqlToTsMappingRules,
        getTsToJvmMappingRules,
        getTsToSqlMappingRules,
    }
})