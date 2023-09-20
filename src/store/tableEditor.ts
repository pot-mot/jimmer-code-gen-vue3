import {defineStore} from "pinia";
import {ref} from "vue";
import {GenAssociationCommonView, GenTableColumnsView} from "../api/__generated/model/static";
import {api} from "../api";

export const useTableEditorStore =
    defineStore(
        'tableEditor',
        () => {
            const tables = ref<GenTableColumnsView[]>([])

            const associations = ref<GenAssociationCommonView[]>([])

            const addTables = async (ids: readonly number[]) => {
                const add = await api.tableService.list({ids: ids})
                const del = removeTables(ids)
                tables.value.push(...add)
                return {add, del}
            }

            const removeTables = (ids: readonly number[]) => {
                const res: GenTableColumnsView[] = []
                tables.value = tables.value.filter(table => {
                    if (ids.includes(table.id)) {
                        res.push(table)
                        return true
                    }
                    return false
                })
                return res
            }


            const saveAssociations = (inputs: readonly GenAssociationCommonView[]) => {
                api.associationService.save({body: inputs}).then(res => {
                    console.log(res)
                })
            }

            const deleteAssociations = (ids: readonly number[]) => {
                api.associationService.delete({ids}).then(res => {
                    associations.value = associations.value.filter(association => !ids.includes(association.id))
                    alert(`移除了${res}条关联`)
                })
            }

            return {
                tables,
                addTables,
                removeTables,
                associations,
                saveAssociations,
                deleteAssociations,
            }
        },
        {
            persist: {
                storage: window.localStorage,
            }
        }
    )