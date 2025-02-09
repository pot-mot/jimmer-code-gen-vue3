<script lang="ts" setup>
import {ASSOCIATION_CREATE_PREFIX, useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import AssociationForm from "@/components/business/association/AssociationForm.vue";
import {DeepReadonly} from "vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {MainLocaleKeyParam} from "@/i18n";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const store = useAssociationDialogsStore()

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const handleSubmit = (key: string, association: DeepReadonly<GenAssociationModelInput>) => {
    if (key.startsWith(ASSOCIATION_CREATE_PREFIX)) {
        MODEL_EDITOR.createdAssociation(key, association)
    } else {
        MODEL_EDITOR.editedAssociation(key, association)
    }
}

const validate = (key: string, association: DeepReadonly<GenAssociationModelInput>): MainLocaleKeyParam[] => {
    return validateAssociation(
        association,
        MODEL.associationEdges.filter(it => it.id !== key).map(it => it.getData().association),
        MODEL.tables,
    )
}
</script>

<template>
    <template v-for="({key, options}, index) in store.items" :key="key">
        <DragDialog
            :ref="(el: any) => store.setDialogRef(key, el)"
            :model-value="true" :can-resize="true"
            :init-w="800" :init-h="380" :init-y="200"
            :modal="options?.modal"
            @close="store.close(key, false)"
        >
            <AssociationForm
                v-model="store.items[index].value"
                :edge="MODEL.associationEdges.filter(it => it.id === key)[0]"
                :validate="(association) => validate(key, association)"
                :create-association-name="createAssociationName"
                @submit="(association) => handleSubmit(key, association)"
                @cancel="store.close(key, true)"
                style="padding-top: 0.5em; padding-left: 1em;"
            />
        </DragDialog>
    </template>
</template>
