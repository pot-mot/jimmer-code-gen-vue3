import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {ref} from "vue";
import type {CrossTypeInput, JvmTypeInput, SqlTypeInput, TsTypeInput} from "@/api/__generated/model/static";
import {api} from "@/api";
import {withLoading} from "@/components/loading/loadingApi.ts";

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

    return {
        ...dialogOpenState,

        jvmTypes,
        refreshJvmType: refreshJvmTypes,
        sqlTypes,
        refreshSqlType: refreshSqlTypes,
        tsTypes,
        refreshTsType: refreshTsTypes,
        crossTypes,
        refreshCrossType: refreshCrossTypes,
    }
})