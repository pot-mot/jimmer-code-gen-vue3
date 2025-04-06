import {
    GenAssociationModelInput,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {DeepReadonly} from "vue";
import {ColumnCombineKey} from "@/components/business/association/columnEquals.ts";

export type AssociationBatchCreateInput =
    Omit<GenAssociationModelInput, "sourceTableName" | "targetTableName" | "name" | "columnReferences">
    & {
    sourceTables: GenTableModelInput[],
    targetTable: GenTableModelInput,
    columnReferences: {
        sourceColumn: ColumnCombineKey,
        targetColumn: ColumnCombineKey,
    }[]
}

export type AssociationBatchCreateInputModelValue = Omit<AssociationBatchCreateInput, "targetTable" | "columnReferences"> & {
    targetTable?: GenTableModelInput | undefined,
    columnReferences: {
        sourceColumn: ColumnCombineKey | undefined,
        targetColumn: ColumnCombineKey | undefined,
    }[]
}

export const getDefaultAssociationBatchCreateInput = (): AssociationBatchCreateInputModelValue => {
    const {
        sourceTableName,
        targetTableName,
        name,
        columnReferences,
        ...defaultAssociation
    } = getDefaultAssociation()

    return {
        ...defaultAssociation,
        sourceTables: [],
        targetTable: undefined,
        columnReferences: [{
            sourceColumn: undefined,
            targetColumn: undefined,
        }],
    }
}

export const extractMultiCreateInput = (
    multiCreateInput: DeepReadonly<AssociationBatchCreateInput>
): Array<GenAssociationModelInput> => {
    const {
        sourceTables,
        targetTable,
        columnReferences,
        ...optionalMultiCreateInput
    } = multiCreateInput

    const otherData: Omit<AssociationBatchCreateInput, "sourceTables" | "targetTable" | "columnReferences"> = optionalMultiCreateInput

    const result: Array<GenAssociationModelInput> = []

    for (const sourceTable of sourceTables) {

        const temp: Omit<GenAssociationModelInput, 'name'> = {
            sourceTableName: sourceTable.name,
            targetTableName: targetTable.name,
            columnReferences: columnReferences.map(it => {
                return {
                    sourceColumnName: it.sourceColumn.name,
                    targetColumnName: it.targetColumn.name
                }
            }),
            ...otherData,
        }

        const name = createAssociationName(
            temp,
            sourceTable.type === "SUPER_TABLE",
            targetTable.type === "SUPER_TABLE",
        )

        result.push({
            name,
            ...temp,
        })
    }

    return result
}
