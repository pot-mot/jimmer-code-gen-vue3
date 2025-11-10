import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {computed, ref} from "vue";
import type {CrossTypeInput, JvmTypeInput, SqlTypeInput, TsTypeInput} from "@/api/__generated/model/static";
import {api} from "@/api";
import {withLoading} from "@/components/loading/loadingApi.ts";
import DeepReadonly from "@/type/__generated/typeDeclare/items/DeepReadonly.ts";

const jvmTypes = ref<JvmTypeInput[]>([])
const refreshJvmTypes = async () => {
    await withLoading('refresh jvm type', async () => {
        jvmTypes.value = await api.typeMappingService.listJvmType()
    })
}

const sqlTypes = ref<SqlTypeInput[]>([])
const refreshSqlTypes = async () => {
    await withLoading('refresh sql type', async () => {
        sqlTypes.value = await api.typeMappingService.listSqlType()
    })
}

const tsTypes = ref<TsTypeInput[]>([])
const refreshTsTypes = async () => {
    await withLoading('refresh ts type', async () => {
        tsTypes.value = await api.typeMappingService.listTsType()
    })
}

const crossTypes = ref<CrossTypeInput[]>([])
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

    const getSqlToJvmMappingRules = (): DeepReadonly<SqlToJvmMappingRule[]> => {
        const rules: SqlToJvmMappingRule[] = []
        for (const jvmType of jvmTypes.value) {
            for (const sqlRule of jvmType.sqlToJvmMappingRules) {
                rules.push({
                    jvmSource: sqlRule.jvmSource,
                    databaseSource: sqlRule.databaseSource,
                    matchRegExp: sqlRule.matchRegExp,
                    result: jvmType
                })
            }
        }
        return rules
    }

    const getJvmToSqlMappingRules = (): DeepReadonly<JvmToSqlMappingRule[]> => {
        const rules: JvmToSqlMappingRule[] = []
        for (const sqlType of sqlTypes.value) {
            for (const jvmRule of sqlType.jvmToSqlMappingRule) {
                rules.push({
                    jvmSource: jvmRule.jvmSource,
                    databaseSource: jvmRule.databaseSource,
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
            for (const jvmRule of tsType.jvmToTsMappingRules) {
                rules.push({
                    jvmSource: jvmRule.jvmSource,
                    matchRegExp: jvmRule.matchRegExp,
                    result: tsType
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
                jvmSource: crossType.jvmSource,
                databaseSource: crossType.databaseSource,
                sqlType,
                jvmType,
                tsType,
            })
        }
        return options
    })

    return {
        ...dialogOpenState,

        jvmTypes,
        refreshJvmTypes,
        sqlTypes,
        refreshSqlTypes,
        tsTypes,
        refreshTsTypes,
        crossTypes,
        refreshCrossTypes,

        crossTypeOptions,

        getSqlToJvmMappingRules,
        getJvmToSqlMappingRules,
        getJvmToTsMappingRules,
    }
})