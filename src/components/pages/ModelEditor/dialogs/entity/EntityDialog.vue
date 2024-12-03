<script setup lang="ts">
import {GenEntityConfigWithNewPropertiesInput, GenEntityDetailView} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import EntityConfigForm from "@/components/business/entity/EntityConfigForm.vue";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {api} from "@/api";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";

defineProps<{
    id: number,
    entity: GenEntityDetailView
}>()

const emits = defineEmits<{
    (event: "close"): void
}>()

const codePreviewStore = useMultiCodePreviewStore()

const handleSubmit = async (entity: GenEntityConfigWithNewPropertiesInput) => {
    await api.entityService.config({body: entity})
	codePreviewStore.codeRefresh()
	emits("close")
}

const validate = (entity: DeepReadonly<GenEntityConfigWithNewPropertiesInput>): MainLocaleKeyParam[] => {
    // TODO 完成实体校验
    console.log(entity)
    return []
}
</script>

<template>
    <DragDialog
        :model-value="true" :can-resize="true"
        :init-w="800" :init-h="600" :init-y="100"
        @close="emits('close')"
    >
        <EntityConfigForm
            :entity="entity"
            :validate="validate"
            @cancel="emits('close')"
            @submit="handleSubmit"
        />
    </DragDialog>
</template>
