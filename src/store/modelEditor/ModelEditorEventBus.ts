import mitt from 'mitt'
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {TableLoadOptions} from "@/components/pages/ModelEditor/graph/load/loadData.ts";
import {DeepReadonly} from "vue";
import {TableCombineData} from "@/components/business/table/TableCombineData.ts";

type ModelEditorEvents = {
    syncTable: { id: string },
    syncedTable: { id: string },

    createTable: { options: TableLoadOptions },
    createdTable: { createKey: string, table: DeepReadonly<GenTableModelInput> },
    editTable: { id: string, table: GenTableModelInput },
    editedTable: { id: string, table: DeepReadonly<GenTableModelInput> },
    removeTable: { id: string },

    combineTable: { options: TableLoadOptions },
    combinedTable: TableCombineData,

    createAssociation: undefined,
    createdAssociation: { createKey: string, association: GenAssociationModelInput },
    batchCreateAssociations: undefined,
    batchCreatedAssociations: { associations: GenAssociationModelInput[] },
    editAssociation: { id: string, association: GenAssociationModelInput },
    editedAssociation: { id: string, association: DeepReadonly<GenAssociationModelInput> },
    modifyAssociation: { id: string },
    modifiedAssociation: { id: string },
    removeAssociation: { id: string },

    createEnum: undefined,
    createdEnum: { id: string, genEnum: GenModelInput_TargetOf_enums },
    editEnum: { id: string, genEnum: GenModelInput_TargetOf_enums },
    editedEnum: { id: string, genEnum: GenModelInput_TargetOf_enums },
    removeEnum: { id: string },

    loadSchema: { id: number },
    loadTable: { id: number },
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()
