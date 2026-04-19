import {createStore} from '@/utils/store/createStore.ts';
import {useDialogOpenState} from '@/components/dialog/DialogOpenState.ts';
import {computed, readonly, ref} from 'vue';
import type {
    CrossTypeInput,
    CrossTypeView,
    CrossTypeUpdateInput,
    CrossTypeOrderInput,
    JvmTypeInput,
    JvmTypeView,
    JvmTypeUpdateInput,
    JvmTypeOrderInput,
    SqlTypeInput,
    SqlTypeView,
    SqlTypeUpdateInput,
    SqlTypeOrderInput,
    TsTypeInput,
    TsTypeView,
    TsTypeUpdateInput,
    TsTypeOrderInput,
} from '@/api/__generated/model/static';
import {api} from '@/api';
import {withLoading} from '@/components/loading/loadingApi.ts';
import type {Ref} from '@vue/reactivity';
import {cloneDeepReadonlyRaw} from '@/utils/type/cloneDeepReadonly.ts';
import {initJvmTypes} from '@/modelEditor/typeMapping/default/JvmTypes.ts';
import {initSqlTypes} from '@/modelEditor/typeMapping/default/SqlTypes.ts';
import {initTsTypes} from '@/modelEditor/typeMapping/default/TsTypes.ts';
import {initCrossTypes} from '@/modelEditor/typeMapping/default/CrossTypes.ts';
import {sendConfirm} from '@/components/confirm/confirmApi.ts';
import {translate} from '@/store/i18nStore.ts';

// 泛型类型操作接口
interface TypeOperations<TInput, TUpdate, TOrder> {
    save: (inputs: TInput[]) => Promise<void>;
    refresh: () => Promise<void>;
    update: (inputs: TUpdate[]) => Promise<void>;
    updateOrder: (inputs: TOrder[]) => Promise<void>;
    delete: (ids: string[]) => Promise<void>;
}

// 创建泛型类型操作
const createTypeOperations = <TView, TInput, TUpdate, TOrder>(
    types: Ref<TView[]>,
    loadingName: string,
    saveMethod: (options: {body: TInput[]}) => Promise<TView[]>,
    listMethod: () => Promise<TView[]>,
    updateMethod: (options: {body: TUpdate[]}) => Promise<void>,
    updateOrderMethod: (options: {body: TOrder[]}) => Promise<void>,
    deleteMethod: (options: {body: string[]}) => Promise<void>,
): TypeOperations<TInput, TUpdate, TOrder> => {
    return {
        save: async (inputs: TInput[]) => {
            await withLoading(`save ${loadingName}`, async () => {
                types.value = await saveMethod({body: inputs});
            });
        },
        refresh: async () => {
            await withLoading(`refresh ${loadingName}`, async () => {
                types.value = await listMethod();
            });
        },
        update: async (inputs: TUpdate[]) => {
            await withLoading(`update ${loadingName}`, async () => {
                await updateMethod({body: inputs});
                types.value = await listMethod();
            });
        },
        updateOrder: async (inputs: TOrder[]) => {
            await withLoading(`update ${loadingName} order`, async () => {
                await updateOrderMethod({body: inputs});
                types.value = await listMethod();
            });
        },
        delete: async (ids: string[]) => {
            await withLoading(`delete ${loadingName}`, async () => {
                await deleteMethod({body: ids});
                types.value = await listMethod();
            });
        },
    };
};

const jvmTypes = ref<JvmTypeView[]>([]);
const jvmTypeOps = createTypeOperations<
    JvmTypeView,
    JvmTypeInput,
    JvmTypeUpdateInput,
    JvmTypeOrderInput
>(
    jvmTypes,
    'jvm type',
    api.typeMappingService.saveJvmType.bind(api.typeMappingService),
    api.typeMappingService.listJvmType.bind(api.typeMappingService),
    api.typeMappingService.updateJvmType.bind(api.typeMappingService),
    api.typeMappingService.updateJvmTypeOrder.bind(api.typeMappingService),
    api.typeMappingService.deleteJvmType.bind(api.typeMappingService),
);

const sqlTypes = ref<SqlTypeView[]>([]);
const sqlTypeOps = createTypeOperations<
    SqlTypeView,
    SqlTypeInput,
    SqlTypeUpdateInput,
    SqlTypeOrderInput
>(
    sqlTypes,
    'sql type',
    api.typeMappingService.saveSqlType.bind(api.typeMappingService),
    api.typeMappingService.listSqlType.bind(api.typeMappingService),
    api.typeMappingService.updateSqlType.bind(api.typeMappingService),
    api.typeMappingService.updateSqlTypeOrder.bind(api.typeMappingService),
    api.typeMappingService.deleteSqlType.bind(api.typeMappingService),
);

const tsTypes = ref<TsTypeView[]>([]);
const tsTypeOps = createTypeOperations<
    TsTypeView,
    TsTypeInput,
    TsTypeUpdateInput,
    TsTypeOrderInput
>(
    tsTypes,
    'ts type',
    api.typeMappingService.saveTsType.bind(api.typeMappingService),
    api.typeMappingService.listTsType.bind(api.typeMappingService),
    api.typeMappingService.updateTsType.bind(api.typeMappingService),
    api.typeMappingService.updateTsTypeOrder.bind(api.typeMappingService),
    api.typeMappingService.deleteTsType.bind(api.typeMappingService),
);

const crossTypes = ref<CrossTypeView[]>([]);
const crossTypeOps = createTypeOperations<
    CrossTypeView,
    CrossTypeInput,
    CrossTypeUpdateInput,
    CrossTypeOrderInput
>(
    crossTypes,
    'cross type',
    api.typeMappingService.saveCrossType.bind(api.typeMappingService),
    api.typeMappingService.listCrossType.bind(api.typeMappingService),
    api.typeMappingService.updateCrossType.bind(api.typeMappingService),
    api.typeMappingService.updateCrossTypeOrder.bind(api.typeMappingService),
    api.typeMappingService.deleteCrossType.bind(api.typeMappingService),
);

export const initTypeMapping = async () => {
    await withLoading('init typeMapping', async () => {
        const [jvmTypesResult, sqlTypesResult, tsTypesResult, crossTypesResult] = await Promise.all(
            [
                await api.typeMappingService.listJvmType(),
                await api.typeMappingService.listSqlType(),
                await api.typeMappingService.listTsType(),
                await api.typeMappingService.listCrossType(),
            ],
        );

        jvmTypes.value = jvmTypesResult;
        sqlTypes.value = sqlTypesResult;
        tsTypes.value = tsTypesResult;
        crossTypes.value = crossTypesResult;
    });
};

export const resetTypeMapping = async () => {
    await sendConfirm({
        title: translate({key: 'reset_confirm_title', args: [translate('type_mapping')]}),
        content: translate({key: 'reset_confirm_content', args: [translate('type_mapping')]}),
        onConfirm: async () => {
            // TODO create single backend api
            await withLoading('reset typeMapping', async () => {
                await api.typeMappingService.deleteCrossType({
                    body: crossTypes.value.map((it) => it.id),
                });
                await Promise.all([
                    api.typeMappingService.deleteJvmType({body: jvmTypes.value.map((it) => it.id)}),
                    api.typeMappingService.deleteSqlType({body: sqlTypes.value.map((it) => it.id)}),
                    api.typeMappingService.deleteTsType({body: tsTypes.value.map((it) => it.id)}),
                ]);
                await Promise.all([
                    api.typeMappingService.saveJvmType({body: initJvmTypes}),
                    api.typeMappingService.saveSqlType({body: initSqlTypes}),
                    api.typeMappingService.saveTsType({body: initTsTypes}),
                ]);
                await api.typeMappingService.saveCrossType({body: initCrossTypes});

                jvmTypes.value = cloneDeepReadonlyRaw(initJvmTypes);
                sqlTypes.value = cloneDeepReadonlyRaw(initSqlTypes);
                tsTypes.value = cloneDeepReadonlyRaw(initTsTypes);
                crossTypes.value = cloneDeepReadonlyRaw(initCrossTypes);
            });
        },
    });
};

export const useTypeMapping = createStore(() => {
    const dialogOpenState = useDialogOpenState();

    const getJvmToSqlMappingRules = (): DeepReadonly<JvmToSqlMappingRule[]> => {
        const rules: JvmToSqlMappingRule[] = [];
        for (const sqlType of sqlTypes.value) {
            for (const jvmRule of sqlType.jvmMatchRules) {
                rules.push({
                    databaseSource: sqlType.databaseSource,
                    jvmSource: jvmRule.jvmSource,
                    matchRegExp: jvmRule.matchRegExp,
                    result: sqlType,
                });
            }
        }
        return rules;
    };
    const getJvmToTsMappingRules = (): DeepReadonly<JvmToTsMappingRule[]> => {
        const rules: JvmToTsMappingRule[] = [];
        for (const tsType of tsTypes.value) {
            for (const jvmRule of tsType.jvmMatchRules) {
                rules.push({
                    jvmSource: jvmRule.jvmSource,
                    matchRegExp: jvmRule.matchRegExp,
                    result: tsType,
                });
            }
        }
        return rules;
    };

    const getSqlToJvmMappingRules = (): DeepReadonly<SqlToJvmMappingRule[]> => {
        const rules: SqlToJvmMappingRule[] = [];
        for (const jvmType of jvmTypes.value) {
            for (const sqlRule of jvmType.sqlMatchRules) {
                rules.push({
                    jvmSource: jvmType.jvmSource,
                    databaseSource: sqlRule.databaseSource,
                    nullableLimit: sqlRule.nullableLimit,
                    matchRegExp: sqlRule.matchRegExp,
                    result: jvmType,
                });
            }
        }
        return rules;
    };

    const getSqlToTsMappingRules = (): DeepReadonly<SqlToTsMappingRule[]> => {
        const rules: SqlToTsMappingRule[] = [];
        for (const tsType of tsTypes.value) {
            for (const sqlRule of tsType.sqlMatchRules) {
                rules.push({
                    databaseSource: sqlRule.databaseSource,
                    matchRegExp: sqlRule.matchRegExp,
                    result: tsType,
                });
            }
        }
        return rules;
    };

    const getTsToJvmMappingRules = (): DeepReadonly<TsToJvmMappingRule[]> => {
        const rules: TsToJvmMappingRule[] = [];
        for (const jvmType of jvmTypes.value) {
            for (const tsRule of jvmType.tsMatchRules) {
                rules.push({
                    jvmSource: jvmType.jvmSource,
                    matchRegExp: tsRule.matchRegExp,
                    result: jvmType,
                });
            }
        }
        return rules;
    };

    const getTsToSqlMappingRules = (): DeepReadonly<TsToSqlMappingRule[]> => {
        const rules: TsToSqlMappingRule[] = [];
        for (const sqlType of sqlTypes.value) {
            for (const tsRule of sqlType.tsMatchRules) {
                rules.push({
                    databaseSource: sqlType.databaseSource,
                    matchRegExp: tsRule.matchRegExp,
                    result: sqlType,
                });
            }
        }
        return rules;
    };

    const crossTypeOptions = computed<DeepReadonly<CrossType[]>>(() => {
        const options: CrossType[] = [];
        for (const crossType of crossTypes.value) {
            const sqlType = sqlTypes.value.find((it) => it.id === crossType.sqlTypeId);
            if (!sqlType) continue;
            const jvmType = jvmTypes.value.find((it) => it.id === crossType.jvmTypeId);
            if (!jvmType) continue;
            const tsType = tsTypes.value.find((it) => it.id === crossType.tsTypeId);
            if (!tsType) continue;

            options.push({
                databaseSource: sqlType.databaseSource,
                sqlType,
                jvmSource: jvmType.jvmSource,
                jvmType,
                tsType,
                nullable: crossType.nullable,
            });
        }
        return options;
    });

    return {
        ...dialogOpenState,

        // JVM 类型操作
        jvmTypes: readonly(jvmTypes),
        jvmTypeOps,

        // SQL 类型操作
        sqlTypes: readonly(sqlTypes),
        sqlTypeOps,

        // TypeScript 类型操作
        tsTypes: readonly(tsTypes),
        tsTypeOps,

        // 交叉类型操作
        crossTypes: readonly(crossTypes),
        crossTypeOps,

        crossTypeOptions,

        getJvmToSqlMappingRules,
        getJvmToTsMappingRules,
        getSqlToJvmMappingRules,
        getSqlToTsMappingRules,
        getTsToJvmMappingRules,
        getTsToSqlMappingRules,
    };
});
