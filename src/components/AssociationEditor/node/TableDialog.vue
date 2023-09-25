<script lang="ts" setup>
import { watch, ref } from 'vue'
import { api } from '../../../api/index.ts'
import { GenAssociationView } from '../../../api/__generated/model/static'
import { GenTableColumnsView } from "../../../api/__generated/model/static";
import DragDialog from "../../common/DragDialog.vue"

interface TableDialogProps {
    table: GenTableColumnsView
}

const props = defineProps<TableDialogProps>()

interface TableDialogEmits {
    (event: "close"): void
}

const emits = defineEmits<TableDialogEmits>()

const associations = ref<GenAssociationView[]>([])

watch(() => props.table, async (table) => {
    associations.value = await api.associationService.selectByColumn({ columnIds: table.columns.map(column => column.id), selectType: "OR" })
}, { immediate: true })
</script>

<template>
    <DragDialog @close="emits('close')">
        <div>
            <details open>
                <summary>
                    {{ table.name }}
                    {{ table.comment }}
                    {{ table.type }}
                    {{ table.remark }}
                </summary>
                <table>
                    <tr v-for="column in table.columns">
                        <td>
                            {{ column.name }}
                        </td>
                        <td>
                            {{ column.comment }}
                        </td>
                        <td>
                            {{ column.autoIncrement }}
                        </td>
                    </tr>
                </table>
            </details>
        </div>
        <div>
            <details v-for="association in associations">
                <summary>
                    {{ association.comment }}
                </summary>
                <table>
                    <tr>
                        <td>
                            {{ association.sourceColumn }}
                        </td>
                        <td>
                            {{ association.targetColumn }}
                        </td>
                    </tr>
                </table>
            </details>
        </div>
        <div>
            <button>生成实体</button>
        </div>
    </DragDialog>
</template>