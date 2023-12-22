import mitt from 'mitt'
import {GenAssociationModelInput, GenTableColumnsInput,} from "@/api/__generated/model/static";

type ModelEditorEvents = {
    createTable: undefined | { x: number, y: number },
    createdTable: { table: GenTableColumnsInput, x?: number, y?: number },
    modifyTable: { id: string, table: GenTableColumnsInput },
    modifiedTable: { id: string, table: GenTableColumnsInput },
    removeTable: string,

    createAssociation: undefined,
    createdAssociation: GenAssociationModelInput,
    modifyAssociation: { id: string, association: GenAssociationModelInput },
    modifiedAssociation: { id: string, association: GenAssociationModelInput },
    removeAssociation: string,

    loadSchema: { id: number },
    loadTable: { id: number },

    saveToDataSource: { tables: GenTableColumnsInput[], associations: GenAssociationModelInput[], schemaId: number }
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()
