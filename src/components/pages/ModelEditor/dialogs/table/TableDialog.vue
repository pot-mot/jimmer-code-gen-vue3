<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../../../business/table/TableForm.vue";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_CREATE_PREFIX, useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {createIndexName} from "@/components/business/table/createIndexName.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {type DeepReadonly, onBeforeUnmount, onMounted, ref} from "vue";

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const props = defineProps<{
    id: string,
    table: GenTableModelInput
}>()

const emits = defineEmits<{
    (event: "close"): void
}>()


// 当 enum 创建后，同步 tableForm 中的 column 的 enum 数据
const store = useTableDialogsStore()

const tableFormRef = ref<{
    onEnumCreated: (
        columnName: string,
        enumName: string,
    ) => void
}>()

onMounted(() => {
    store.onEnumCreated(props.id, (columnName, enumName) => {
        tableFormRef?.value?.onEnumCreated(columnName, enumName)
    })
})

onBeforeUnmount(() => {
    store.offEnumCreated(props.id)
})


const handleSubmit = (table: DeepReadonly<GenTableModelInput>) => {
    if (props.id.startsWith(TABLE_CREATE_PREFIX)) {
        MODEL_EDITOR.createdTable(props.id, table)
    } else {
        MODEL_EDITOR.editedTable(props.id, table)
    }
}

const getOtherTables = () => {
    return MODEL.tableNodePairs.filter(it => it.second.id !== props.id).map(it => it.first)
}

const validate = (table: DeepReadonly<GenTableModelInput>) => {
    return validateTable(
        table,
        getOtherTables(),
        MODEL.enums,
    )
}
</script>

<template>
    <DragDialog
        :model-value="true" :can-resize="true"
        :init-w="1200" :init-h="600" :init-y="100"
        @close="emits('close')"
    >
        <TableForm
            ref="tableFormRef"
            :table="table"
            :validate="validate"
            :create-index-name="createIndexName"
            @create-enum="({propertyName}) => MODEL_EDITOR.createEnum({tableDialogId: id, columnName:propertyName})"
            @edit-enum="({genEnum}) => MODEL_EDITOR.editEnum(genEnum.name, genEnum)"
            @cancel="emits('close')"
            @submit="handleSubmit"
        />
    </DragDialog>
</template>
