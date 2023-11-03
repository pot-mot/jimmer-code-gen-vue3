import mitt from 'mitt'
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenTableColumnsView, GenTableColumnsInput, GenAssociationView} from "../../../api/__generated/model/static";

type ModelEditorEvents = {
    createdTable: GenTableColumnsInput,
    modifiedTable: GenTableColumnsInput,
    removeTable: string,

    createAssociation: {sourceTable: string, targetTable: string, targetColumn: string, type: AssociationType},
    modifiedAssociation: {sourceTable: string, targetTable: string, targetColumn: string, type: AssociationType},
    removeAssociations: {sourceTable: string, targetTable: string, targetColumn: string},

    saveToDataSource: {tables: GenTableColumnsView[], associations: GenAssociationView[], schemaId: number}
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()