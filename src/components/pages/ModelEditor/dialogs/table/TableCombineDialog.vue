<script setup lang="ts">
import {useTableCombineDialogStore} from "@/store/modelEditor/TableCombineDialogStore.ts";
import TableCombineForm from "@/components/business/table/TableCombineForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {DeepReadonly} from "vue";
import {TableCombineData} from "@/components/business/table/TableCombineData.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const store = useTableCombineDialogStore()

const handleSubmit = (tableCombineData: TableCombineData) => {
    MODEL_EDITOR.combinedTable(tableCombineData)
}

const getOtherTables = (name: string) => {
	return MODEL.tables.filter(table => table.name !== name)
}

const validate = (data: DeepReadonly<TableCombineData>) => {
    const messageList = validateTable(
        data.superTable,
        MODEL.tables,
        MODEL.enums,
    )

    for (const inheritTable of data.inheritTableNodePairs.map(it => it.first)) {
        messageList.push(...validateTable(
            inheritTable,
            [...getOtherTables(inheritTable.name), data.superTable],
            MODEL.enums,
        ))
    }

    return messageList
}
</script>

<template>
    <DragDialog :model-value="store.openState" :can-resize="true" :init-w="800" :init-h="380" :init-y="200"
                @close="store.close">
        <TableCombineForm
            :validate="validate"
            :table-node-pairs="MODEL.selectedTableNodePairs"
            @submit="handleSubmit"
            @cancel="store.close"
            style="padding-top: 0.5em; padding-left: 1em;"
        />
    </DragDialog>
</template>