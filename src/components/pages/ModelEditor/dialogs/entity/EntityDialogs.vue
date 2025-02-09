<script setup lang="ts">
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import EntityConfigForm from "@/components/business/entity/EntityConfigForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {EntityModelBusinessInput} from "@/api/__generated/model/static";
import {api} from "@/api";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {validateEntityWithProperties} from "@/components/business/entity/validateEntityWithProperties.ts";
import {useEditSaveAndRefresh} from "@/components/pages/ModelEditor/save/editSaveAndRefresh.ts";

const store = useEntityDialogsStore()

const {MODEL} = useModelEditorStore()

const {
    editEnum,
    editEntity
} = useEditSaveAndRefresh()

const handleSubmit = async (
    entity: EntityModelBusinessInput
) => {
    await api.entityService.config({body: entity})
    store.close(entity.entity.id, true)
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
    <template v-for="({key, options}, index) in store.items" :key="key">
        <DragDialog
            :ref="(el: any) => store.setDialogRef(key, el)"
            :model-value="true" :can-resize="true"
            :init-w="800" :init-h="600" :init-y="100"
            :modal="options?.modal"
            @close="store.close(key, false)"
        >
            <EntityConfigForm
                v-model="store.items[index].value"
                :validate="validate"
                @submit="handleSubmit"
                @cancel="store.close(key, false)"
                @click-entity="editEntity"
                @click-enum="editEnum"
            />
        </DragDialog>
    </template>
</template>