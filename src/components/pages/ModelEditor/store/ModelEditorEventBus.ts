import mitt from 'mitt'
import {GenAssociationModelInput, GenTableModelInput,} from "@/api/__generated/model/static";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static/GenModelInput.ts";

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
