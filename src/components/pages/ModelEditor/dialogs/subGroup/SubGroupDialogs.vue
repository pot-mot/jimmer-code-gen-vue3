<script lang="ts" setup>
import {SUB_GROUP_CREATE_PREFIX, useSubGroupDialogsStore} from "@/store/modelEditor/SubGroupDialogsStore.ts";
import SubGroupForm from "@/components/business/modelSubGroup/ModelSubGroupForm.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {DeepReadonly} from "vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {validateModelSubGroup} from "@/components/business/modelSubGroup/validateModelSubGroup.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const store = useSubGroupDialogsStore()

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const handleSubmit = (key: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
    if (key.startsWith(SUB_GROUP_CREATE_PREFIX)) {
        MODEL_EDITOR.createdSubGroup(key, subGroup)
    } else {
        MODEL_EDITOR.editedSubGroup(key, subGroup)
    }
}

const validate = (key: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
    return validateModelSubGroup(
        subGroup,
        MODEL.subGroups.filter(it => it.name !== key),
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
            <SubGroupForm
                v-model="store.items[index].value"
                :validate="(subGroup) => validate(key, subGroup)"
                @submit="(subGroup) => handleSubmit(key, subGroup)"
                @cancel="store.close(key, false)"
            />
        </DragDialog>
	</template>
</template>
