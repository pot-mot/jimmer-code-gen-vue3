<script lang="ts" setup>
import {TABLE_CREATE_PREFIX, useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts"
import {createIndexName} from "@/components/business/table/createIndexName.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "@/components/business/table/TableForm.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {validateTable} from "@/components/business/table/validateTable.ts";

const store = useTableDialogsStore()

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const handleSubmit = (key: string, table: DeepReadonly<GenTableModelInput>) => {
    if (key.startsWith(TABLE_CREATE_PREFIX)) {
        MODEL_EDITOR.createdTable(key, table)
    } else {
        MODEL_EDITOR.editedTable(key, table)
    }
}

const validate = (key: string, table: DeepReadonly<GenTableModelInput>) => {
    return validateTable(
        table,
        MODEL.tableNodePairs.filter(it => it.second.id !== key).map(it => it.first),
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
                :create-index-name="createIndexName"
                @create-enum="({propertyName}) => MODEL_EDITOR.createEnum({tableKey: key, columnName:propertyName})"
                @edit-enum="({genEnum}) => MODEL_EDITOR.editEnum(genEnum.name, genEnum)"
                @submit="(table) => handleSubmit(key, table)"
                @cancel="store.close(key, false)"
            />
        </DragDialog>
	</template>
</template>
