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
    <div class="scripts-menu">
        <DatabaseTypeNullableSelect v-model="filterDatabaseType"/>
        <JvmLanguageNullableSelect v-model="filterJvmLanguage"/>
        <div class="script-items-wrapper">
            <CollapseDetail
                v-for="[scriptInfoName, scriptInfos] in filterableScripts"
                :model-value="true"
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
                        class="script-item"
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
        </div>
    </div>
</template>

<style scoped>
.scripts-menu {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-rows: auto auto 1fr;
    padding: 0.5rem;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

.script-type-label {
    font-size: 0.8rem;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    white-space: nowrap;
}

.script-add-button {
    border: none;
    height: 1rem;
    line-height: 1rem;
    border-radius: 0.25rem;
}

.script-items-wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
    overflow-x: auto;
}

.script-item {
    font-size: 0.8rem;
    line-height: 1.6rem;
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    cursor: default;
    padding-left: 1.5rem;
}

.script-item.selected {
    color: var(--primary-color);
}
</style>
