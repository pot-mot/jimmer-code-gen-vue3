<script setup lang="ts">
import type {ScriptInfo, ScriptsStore} from "@/modelEditor/script/ScriptsStore.ts";
import {translate} from "@/store/i18nStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import IconAdd from "@/components/icons/IconAdd.vue";
import {computed, ref, watch} from "vue";
import JvmLanguageNullableSelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageNullableSelect.vue";
import DatabaseTypeNullableSelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeNullableSelect.vue";
import SelectableTree from "@/components/tree/SelectableTree.vue";
import type {TreeNode} from "@/components/tree/TreeNode.ts";
import IconDelete from "@/components/icons/IconDelete.vue";

const props = defineProps<{
    scriptStore: ScriptsStore,
    currentId?: string,
    databaseType?: DatabaseType,
    jvmLanguage?: JvmLanguage,
}>()

const emits = defineEmits<{
    (event: 'select', scriptInfo: DeepReadonly<ScriptInfo<any>>): void
    (event: 'start-add', type: ScriptTypeName): void
    (event: 'remove', ids: string[]): void
}>()

const filterDatabaseType = ref<DatabaseType | undefined>(props.databaseType)
const filterJvmLanguage = ref<JvmLanguage | undefined>(props.jvmLanguage)

type ScriptTreeNode = TreeNode<{
    type: "Script",
    script: DeepReadonly<ScriptInfo<any>>
} | {
    type: "ScriptType",
    scriptType: string
}>

const filterableTree = computed<ScriptTreeNode[]>(() => {
    return Object.entries(props.scriptStore.getScriptInfos({
        databaseType: filterDatabaseType.value,
        jvmLanguage: filterJvmLanguage.value
    })).map(([scriptType, scripts]) => {
        return {
            id: scriptType,
            data: {
                type: "ScriptType",
                scriptType
            },
            children: scripts.map(scriptInfo => {
                return {
                    id: scriptInfo.id,
                    data: {
                        type: "Script",
                        script: scriptInfo
                    }
                }
            }) as ScriptTreeNode[]
        }
    })
})

const selectScript = (id: string) => {
    const scriptInfo = props.scriptStore.scriptInfoMap.get(id)
    if (scriptInfo === undefined) return
    emits('select', scriptInfo)
}

const selectedIdSet = ref<Set<string>>(new Set())
watch(() => props.currentId, (currentId) => {
    selectedIdSet.value = new Set([currentId])
}, {immediate: true})

const selectedScriptIds = computed(() => {
    return [...selectedIdSet.value].filter(it => props.scriptStore.scriptInfoMap.has(it))
})

const removeScripts = () => {
    if (selectedScriptIds.value.length === 0) return
    emits('remove', selectedScriptIds.value)
}
</script>

<template>
    <div class="scripts-menu">
        <DatabaseTypeNullableSelect v-model="filterDatabaseType"/>
        <JvmLanguageNullableSelect v-model="filterJvmLanguage"/>
        <div>
            <button @click="removeScripts" class="delete-button" :class="{disabled: selectedScriptIds.length === 0}">
                <IconDelete/>
                {{ translate('delete') }}
                {{ translate('selected') }}
            </button>
        </div>
        <SelectableTree
            class="script-items-wrapper"
            :data="filterableTree"
            v-model:selected-id-set="selectedIdSet"
            @item-click="(node: ScriptTreeNode, e: MouseEvent) => {
                if (e.ctrlKey) return
                if (node.data.type === 'Script') selectScript(node.id)
            }"
        >
            <template #default="{data}">
                <div
                    v-if="data.type === 'ScriptType'"
                    class="script-type-label"
                >
                    {{ translate(data.scriptType as ScriptTypeName) }}
                    <button
                        class="script-add-button"
                        @click.stop="emits('start-add', data.scriptType as ScriptTypeName)"
                    >
                        <IconAdd/>
                    </button>
                </div>
                <div
                    v-else-if="data.type === 'Script'"
                    class="script-label"
                >
                    {{ data.script.name }}
                </div>
            </template>
        </SelectableTree>
    </div>
</template>

<style scoped>
.scripts-menu {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-rows: auto auto auto 1fr;
    padding: 0.5rem;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

.script-type-label {
    font-size: 0.8rem;
    line-height: 1.6rem;
    height: 1.6rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
}

.script-add-button {
    border-radius: 0.25rem;
}

.script-items-wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
    overflow-x: auto;
}

.script-label {
    font-size: 0.8rem;
    line-height: 1.6rem;
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    cursor: default;
}

.delete-button {
    border-radius: 0.25rem;
}

.delete-button.disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
