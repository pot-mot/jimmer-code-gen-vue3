<script lang="ts" setup>
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts"
import {createIndexName} from "@/components/business/table/createIndexName.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "@/components/business/table/TableForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {useSubGroupsStore} from "@/store/modelEditor/dialogs/SubGroupsStore.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";

const store = useTablesStore()

const {MODEL} = useModelEditorStore()

const subGroupDialogs = useSubGroupsStore()
const enumDialogs = useEnumsStore()

const handleSubmit = (key: string, table: DeepReadonly<GenTableModelInput>) => {
    store.submit(key, table)
}

const validate = (key: string, table: DeepReadonly<GenTableModelInput>) => {
    return validateTable(
        table,
        MODEL.tableNodePairs.filter(it => it.node.id !== key).map(it => it.table),
        MODEL.subGroups,
        MODEL.enums,
    )
}
</script>

<template>
    <template v-for="({key, options}, index) in store.items" :key="key">
        <DragDialog
            :ref="(el: any) => store.setDialogRef(key, el)"
            :model-value="true" :can-resize="true"
            :init-w="1200" :init-h="600" :init-y="100"
            :modal="options?.modal"
            @close="store.close(key, false)"
        >
            <TableForm
                ref="tableFormRef"
                v-model="store.items[index].value"
                :validate="(table) => validate(key, table)"
                @submit="(table) => handleSubmit(key, table)"
                @cancel="store.close(key, false)"

                :create-index-name="createIndexName"

                @create-enum="({propertyName}) => enumDialogs.create({tableKey: key, columnName: propertyName})"
                @edit-enum="({genEnum}) => enumDialogs.edit(genEnum.name, genEnum)"

                :sub-groups="MODEL.subGroups"
                @create-sub-group="() => subGroupDialogs.create({tableKeys: [key]})"
                @edit-sub-group="({subGroup}) => subGroupDialogs.edit(subGroup.name, subGroup)"
            />
        </DragDialog>
    </template>
</template>
