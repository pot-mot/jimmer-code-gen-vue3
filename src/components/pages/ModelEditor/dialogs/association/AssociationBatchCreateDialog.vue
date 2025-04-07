<script setup lang="ts">
import {useAssociationBatchCreateStore} from "@/store/modelEditor/dialogs/AssociationBatchCreateStore.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {type DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import AssociationMultiCreateForm from "@/components/business/association/AssociationBatchCreateForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";

const {MODEL} = useModelEditorStore()

const store = useAssociationBatchCreateStore()

const handleSubmit = (associations: Array<GenAssociationModelInput>) => {
    store.submit(associations)
}

const validate = (associations: DeepReadonly<Array<GenAssociationModelInput>>): MainLocaleKeyParam[] => {
	const messageList: Array<MainLocaleKeyParam> = []

	for (const association of associations) {
		messageList.push(
			...validateAssociation(
				association,
				[
					...MODEL.associationEdges.map(it => it.getData().association),
					...associations.filter(it => it !== association)
				],
				MODEL.tables,
			)
		)
	}

	return messageList
}
</script>

<template>
	<DragDialog :model-value="store.openState" :can-resize="true" :init-w="800" :init-h="380" :init-y="200"
				@close="store.close">
		<AssociationMultiCreateForm
			:validate="validate"
			:create-association-name="createAssociationName"
			:source-tables="MODEL.selectedTables"
			@submit="handleSubmit"
			@cancel="store.close"
			style="padding-top: 0.5em; padding-left: 1em;"
		/>
	</DragDialog>
</template>
