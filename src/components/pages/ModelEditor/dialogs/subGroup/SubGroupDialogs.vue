<script lang="ts" setup>
import {useSubGroupsStore} from "@/store/modelEditor/dialogs/SubGroupsStore.ts";
import SubGroupForm from "@/components/business/modelSubGroup/ModelSubGroupForm.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {DeepReadonly} from "vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {validateModelSubGroup} from "@/components/business/modelSubGroup/validateModelSubGroup.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const store = useSubGroupsStore()

const {MODEL} = useModelEditorStore()

const handleSubmit = (key: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
    store.submit(key, subGroup)
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
            :init-w="500" :init-h="250" :init-y="100"
            :modal="options?.modal"
            @close="store.close(key, false)"
        >
            <SubGroupForm
                v-model="store.items[index].value"
                :validate="(subGroup) => validate(key, subGroup)"
                @submit="(subGroup) => handleSubmit(key, subGroup)"
                @cancel="store.close(key, false)"

                style="padding-top: 1em;"
            />
        </DragDialog>
	</template>
</template>
