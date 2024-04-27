import mitt from 'mitt'
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {TableLoadOptions} from "@/components/pages/ModelEditor/graph/loadData.ts";

type ModelEditorEvents = {
    createTable: TableLoadOptions,
    createdTable: { id: string, table: GenTableModelInput },
    editTable: { id: string, table: GenTableModelInput },
    editedTable: { id: string, table: GenTableModelInput },
    tableModifySynced: { id: string },
    removeTable: string,

    editAssociation: { id: string, association: GenAssociationModelInput },
    editedAssociation: { id: string, association: GenAssociationModelInput },
    modifyAssociation: { id: string },
    modifiedAssociation: { id: string },
    removeAssociation: string,

    createEnum: undefined,
    createdEnum: GenModelInput_TargetOf_enums,
    modifyEnum: { name: string, genEnum: GenModelInput_TargetOf_enums },
    modifiedEnum: { name: string, genEnum: GenModelInput_TargetOf_enums },
    removeEnum: string,

    loadSchema: { id: number },
    loadTable: { id: number },

    saveToDataSource: { tables: GenTableModelInput[], associations: GenAssociationModelInput[], schemaId: number }
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()
