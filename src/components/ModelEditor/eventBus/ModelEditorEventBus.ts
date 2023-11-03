import mitt from 'mitt'
import {GenTableColumnsInput, GenAssociationModelInput} from "../../../api/__generated/model/static";

type ModelEditorEvents = {
    createTable: undefined,
    createdTable: GenTableColumnsInput,
    modifyTable: {id: string, table: GenTableColumnsInput},
    modifiedTable: {id: string, table: GenTableColumnsInput},
    removeTable: string,

    createAssociation: GenAssociationModelInput,
    createdAssociation: GenAssociationModelInput,
    modifyAssociation: {id: string, association: GenAssociationModelInput},
    modifiedAssociation: {id: string, association: GenAssociationModelInput},
    removeAssociation: string,

    saveToDataSource: {tables: GenTableColumnsInput[], associations: GenAssociationModelInput[], schemaId: number}
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()