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
