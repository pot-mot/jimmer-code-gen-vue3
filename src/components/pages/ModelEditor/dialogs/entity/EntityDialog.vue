<script setup lang="ts">
import {EntityModelBusinessInput, GenEntityDetailView} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import EntityConfigForm from "@/components/business/entity/EntityConfigForm.vue";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {api} from "@/api";
import {validateEntityWithProperties} from "@/components/business/entity/validateEntityWithProperties.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

defineProps<{
    id: number,
    entity: GenEntityDetailView
}>()

const emits = defineEmits<{
    (event: "close", changed: boolean): void
}>()

const {MODEL} = useModelEditorStore()

const handleSubmit = async (entity: EntityModelBusinessInput) => {
    await api.entityService.config({body: entity})
	emits("close", true)
}

const validate = async (
	entity: DeepReadonly<EntityModelBusinessInput>
): Promise<MainLocaleKeyParam[]> => {
	const otherEntities = await api.modelService.getEntityBusinessViews({
		id: MODEL._model().id,
		excludeEntityIds: [entity.entity.id],
	})

	return validateEntityWithProperties(
		entity,
		otherEntities
	)
}
</script>

<template>
    <DragDialog
        :model-value="true" :can-resize="true"
        :init-w="800" :init-h="600" :init-y="100"
        @close="emits('close', false)"
    >
        <EntityConfigForm
            :entity="entity"
            :validate="validate"
            @cancel="emits('close', false)"
            @submit="handleSubmit"
        />
    </DragDialog>
</template>
