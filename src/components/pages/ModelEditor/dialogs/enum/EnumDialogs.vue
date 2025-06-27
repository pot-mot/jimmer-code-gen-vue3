<script lang="ts" setup>
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {DeepReadonly} from "vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {validateEnum} from "@/components/business/enum/validateEnum.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useSubGroupsStore} from "@/store/modelEditor/dialogs/SubGroupsStore.ts";

const store = useEnumsStore()

const {MODEL} = useModelEditorStore()

const subGroupDialogs = useSubGroupsStore()

const handleSubmit = (key: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
    store.submit(key, genEnum)
}

const validate = (key: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
    return validateEnum(
        genEnum,
        MODEL.enums.filter(it => it.name !== key),
        MODEL.subGroups,
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
            <EnumForm
                v-model="store.items[index].value"
                :validate="(genEnum) => validate(key, genEnum)"
                @submit="(genEnum) => handleSubmit(key, genEnum)"
                @cancel="store.close(key, false)"

                :sub-groups="MODEL.subGroups"
                @create-sub-group="() => subGroupDialogs.create({enumKeys: [key]})"
                @edit-sub-group="({subGroup}) => subGroupDialogs.edit(subGroup.name, subGroup)"

                style="padding-top: 1em;"
            />
        </DragDialog>
	</template>
</template>
