<script setup lang="ts">
import type {ScriptInfo, ScriptsStore} from "@/modelEditor/script/ScriptsStore.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {translate} from "@/store/i18nStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import IconAdd from "@/components/icons/IconAdd.vue";
import {computed, ref} from "vue";
import JvmLanguageNullableSelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageNullableSelect.vue";
import DatabaseTypeNullableSelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeNullableSelect.vue";

const props = defineProps<{
    scriptStore: ScriptsStore,
    currentId?: string,
    databaseType?: DatabaseType,
    jvmLanguage?: JvmLanguage,
}>()

const emits = defineEmits<{
    (event: 'select', scriptInfo: DeepReadonly<ScriptInfo<any>>): void
    (event: 'start-add', type: ScriptTypeName): void
    (event: 'remove', id: string): void
}>()

const filterDatabaseType = ref<DatabaseType | undefined>(props.databaseType)
const filterJvmLanguage = ref<JvmLanguage | undefined>(props.jvmLanguage)

const filterableScripts = computed(() => {
    return Object.entries(props.scriptStore.getScriptInfos({
        databaseType: filterDatabaseType.value,
        jvmLanguage: filterJvmLanguage.value
    }))
})

const selectScript = (id: string) => {
    const scriptInfo = props.scriptStore.scriptInfoMap.get(id)
    if (scriptInfo === undefined) return
    emits('select', scriptInfo)
}
</script>

<template>
    <DatabaseTypeNullableSelect v-model="filterDatabaseType"/>
    <JvmLanguageNullableSelect v-model="filterJvmLanguage"/>
    <CollapseDetail
        v-for="[scriptInfoName, scriptInfos] in filterableScripts"
        :key="scriptInfoName"
        trigger-position="left"
        open-trigger="head"
        :disabled="scriptInfos.length === 0"
    >
        <template #head>
            <div class="script-type-label">
                {{ translate(scriptInfoName as ScriptTypeName) }}
                <button
                    class="script-add-button"
                    @click.stop="emits('start-add', scriptInfoName as ScriptTypeName)"
                >
                    <IconAdd/>
                </button>
            </div>
        </template>
        <template #body>
            <div
                v-for="scriptInfo in scriptInfos"
                class="script-info-item"
                :class="{selected: scriptInfo.id === currentId}"
                @click="selectScript(scriptInfo.id)"
            >
                {{ scriptInfo.name }}
                <button @click.stop="emits('remove', scriptInfo.id)">
                    <IconDelete/>
                </button>
            </div>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.script-info-item {
    display: flex;
    flex-wrap: nowrap;
    cursor: default;
    padding-left: 1.5rem;
}

.script-info-item.selected {
    color: var(--primary-color);
}

.script-type-label {
    font-size: 0.8rem;
    display: flex;
    gap: 0.5rem;
}

.script-add-button {
    border: none;
    height: 1rem;
    line-height: 1rem;
    border-radius: 0.25rem;
}
</style>
