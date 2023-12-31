import mitt from 'mitt'
import {GenAssociationModelInput, GenTableModelInput,} from "@/api/__generated/model/static";

type ModelEditorEvents = {
    createTable: undefined | { x: number, y: number },
    createdTable: { table: GenTableModelInput, x?: number, y?: number },
    modifyTable: { id: string, table: GenTableModelInput },
    modifiedTable: { id: string, table: GenTableModelInput },
    removeTable: string,

    createAssociation: undefined,
    createdAssociation: GenAssociationModelInput,
    modifyAssociation: { id: string, association: GenAssociationModelInput },
    modifiedAssociation: { id: string, association: GenAssociationModelInput },
    removeAssociation: string,

    loadSchema: { id: number },
    loadTable: { id: number },

    saveToDataSource: { tables: GenTableModelInput[], associations: GenAssociationModelInput[], schemaId: number }
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()
