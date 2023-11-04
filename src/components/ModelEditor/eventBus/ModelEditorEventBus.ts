import mitt from 'mitt'
import {
    GenTableColumnsInput,
    GenAssociationModelInput, GenModelView,
} from "../../../api/__generated/model/static";

type ModelEditorEvents = {
    chooseModel: GenModelView,
    toggleModel: GenModelView,

    createTable: undefined,
    createdTable: GenTableColumnsInput,
    modifyTable: {id: string, table: GenTableColumnsInput},
    modifiedTable: {id: string, table: GenTableColumnsInput},
    closeModifiedTable: string,
    removeTable: string,

    createAssociation: undefined,
    createdAssociation: GenAssociationModelInput,
    modifyAssociation: {id: string, association: GenAssociationModelInput},
    modifiedAssociation: {id: string, association: GenAssociationModelInput},
    removeAssociation: string,

    saveToDataSource: {tables: GenTableColumnsInput[], associations: GenAssociationModelInput[], schemaId: number}
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()