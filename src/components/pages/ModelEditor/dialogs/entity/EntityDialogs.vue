<script setup lang="ts">
import {useEntitiesStore} from "@/store/modelEditor/dialogs/EntitiesStore.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import EntityForm from "@/components/business/entity/EntityForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {EntityConfigInput, IdName} from "@/api/__generated/model/static";
import {api} from "@/api";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {validateEntity} from "@/components/business/entity/validateEntity.ts";
import {cloneDeep} from "lodash";
import {sendI18nMessage} from "@/message/message.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";

const store = useEntitiesStore()

const {MODEL} = useModelEditorStore()

const enumDialogs = useEnumsStore()

const handleSubmit = (
	entity: EntityConfigInput
) => {
    store.edited(entity)
}

const validate = async (
	entity: DeepReadonly<EntityConfigInput>
): Promise<MainLocaleKeyParam[]> => {
	const otherEntities = await api.entityService.listByModelId({
		modelId: MODEL._model().id,
		excludeEntityIds: [entity.tableConvertedEntity.id]
	})

	return validateEntity(
		entity,
		otherEntities
	)
}

const handleClickEntity = async (idName: IdName) => {
	const entity = await api.entityService.get({id: idName.id})
	if (entity === undefined) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEntityNotFound", args: [idName]})
		return
	}
    store.edit(entity)
}

const handleClickEnum = (idName: IdName) => {
	const genEnum = cloneDeep(MODEL.enums.filter(it => it.name === idName.name)[0])
	if (!genEnum) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel", args: [idName]})
		return
	}
    enumDialogs.edit(idName.name, genEnum)
}
</script>

<template>
	<template v-for="({key, options}, index) in store.items" :key="key">
		<DragDialog
			:ref="(el: any) => store.setDialogRef(key, el)"
			:model-value="true" :can-resize="true"
			:init-w="800" :init-h="600" :init-y="100"
			:modal="options?.modal"
			@close="store.close(key, false)"
		>
			<EntityForm
				v-model="store.items[index].value"
				:validate="validate"
				@submit="handleSubmit"
				@cancel="store.close(key, false)"
				@click-entity="handleClickEntity"
				@click-enum="handleClickEnum"
			/>
		</DragDialog>
	</template>
</template>
