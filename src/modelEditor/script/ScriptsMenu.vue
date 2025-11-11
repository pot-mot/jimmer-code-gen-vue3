<script setup lang="ts">
import type {ScriptInfo, ScriptsStore} from "@/modelEditor/script/ScriptsStore.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {translate} from "@/store/i18nStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import IconAdd from "@/components/icons/IconAdd.vue";

const props = defineProps<{
    scriptStore: ScriptsStore,
    databaseType?: DatabaseType,
    jvmLanguage?: JvmLanguage,
}>()

const emits = defineEmits<{
    (event: 'select', scriptInfo: DeepReadonly<ScriptInfo<any>>): void
    (event: 'start-add', type: ScriptTypeName): void
    (event: 'remove', id: string): void
}>()

const selectScript = (id: string) => {
    const scriptInfo = props.scriptStore.scriptInfoMap.get(id)
    if (scriptInfo === undefined) return
    emits('select', scriptInfo)
}

const toggleScriptEnabled = (id: string) => {
    const scriptInfo = props.scriptStore.scriptInfoMap.get(id)
    if (scriptInfo === undefined) return
    if (scriptInfo.enabled) {
        props.scriptStore.disable(scriptInfo.id)
    } else {
        props.scriptStore.enable(scriptInfo.id)
    }
}
</script>

<template>
    <CollapseDetail
        v-for="[scriptInfoName, scriptInfos] in Object.entries(scriptStore.getScriptInfos({databaseType, jvmLanguage}))"
        :key="scriptInfoName"
        trigger-position="left"
        :model-value="true"
    >
        <template #head>
            <div class="script-type-label">
                {{ translate(scriptInfoName as ScriptTypeName) }}
                <button
                    class="script-add-button"
                    @click="emits('start-add', scriptInfoName as ScriptTypeName)"
                >
                    <IconAdd/>
                </button>
            </div>
        </template>
        <template #body>
            <div v-for="scriptInfo in scriptInfos" class="script-info-item" @click="selectScript(scriptInfo.id)">
                <input
                    type="checkbox"
                    :checked="scriptInfo.enabled"
                    @click.stop="toggleScriptEnabled(scriptInfo.id)"
                >
                <input
                    :value="scriptInfo.name"
                    @change="scriptStore.rename(scriptInfo.id, ($event.target as HTMLInputElement).value)"
                >
                <button @click.stop="emits('remove', scriptInfo.id)">
                    <IconDelete/>
                </button>
            </div>
            <div v-if="scriptInfos.length === 0" style="height: 0.5rem;"/>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.script-info-item {
    display: flex;
    flex-wrap: nowrap;
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
