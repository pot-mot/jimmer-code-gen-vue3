<script setup lang="ts" generic="Name extends ScriptTypeName">
import type {ScriptInfo, ScriptsStore} from "@/modelEditor/generator/ScriptsStore.ts";
import type {ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";
import IconDelete from "@/components/icons/IconDelete.vue";

defineProps<{
    scriptOperator: ScriptsStore<Name>,
    databaseType: DatabaseType,
    jvmLanguage: JvmLanguage,
}>()

const emits = defineEmits<{
    (event: 'select', scriptInfo: ScriptInfo<Name>): void
}>()
</script>

<template>
    <div
        v-for="scriptInfo of scriptOperator.getScriptInfos({databaseType, jvmLanguage})"
        :key="scriptInfo.key"
    >
        <div class="script-info-item" @click="() => emits('select', scriptInfo)">
            <input
                type="checkbox"
                :value="scriptInfo.enabled"
                @click="() => {
                    if (scriptInfo.enabled) scriptOperator.disable(scriptInfo.key)
                    else scriptOperator.enable(scriptInfo.key)
                }"
            >
            <input
                :value="scriptInfo.name"
                @change="scriptOperator.rename(scriptInfo.key, ($event.target as HTMLInputElement).value)"
            >
            <button @click="scriptOperator.remove(scriptInfo.key)">
                <IconDelete/>
            </button>
        </div>
    </div>
</template>

<style scoped>
.script-info-item {
    display: flex;
    flex-wrap: nowrap;
}
</style>
