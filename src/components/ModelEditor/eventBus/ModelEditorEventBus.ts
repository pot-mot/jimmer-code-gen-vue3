import mitt from 'mitt'
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenAssociationView, GenTableColumnView, GenTableInput} from "../../../api/__generated/model/static";

type ModelEditorEvents = {
    createdTable: GenTableInput,
    modifiedTable: GenTableInput,
    removeTable: string,

    createAssociation: {sourceTable: string, targetTable: string, targetColumn: string, type: AssociationType},
    modifiedAssociation: {sourceTable: string, targetTable: string, targetColumn: string, type: AssociationType},
    removeAssociations: {sourceTable: string, targetTable: string, targetColumn: string},

    saveToDataSource: {tables: GenTableColumnView[], associations: GenAssociationView[], schemaId: number}
}

export const ModelEditorEventBus = mitt<ModelEditorEvents>()