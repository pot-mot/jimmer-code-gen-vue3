import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {DeepReadonly} from "vue";
import {getDefaultColumn} from "@/components/business/table/defaultTable.ts";

export type AssociationMultiCreateInput =
    Omit<GenAssociationModelInput, "sourceTableName" | "targetTableName" | "name" | "columnReferences">
    & {
    sourceTables: GenTableModelInput[],
    targetTable: GenTableModelInput,
    columnReferences: {
        sourceColumn: GenTableModelInput_TargetOf_columns,
        targetColumn: GenTableModelInput_TargetOf_columns,
    }[]
}

export type AssociationMultiCreateInputModelValue = Omit<AssociationMultiCreateInput, "targetTable"> & {
    targetTable?: GenTableModelInput | undefined,
}

export const getDefaultAssociationMultiCreateInput = (): AssociationMultiCreateInputModelValue => {
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
            sourceColumn: getDefaultColumn(),
            targetColumn: getDefaultColumn(),
        }],
    }
}

export const extractMultiCreateInput = (
    multiCreateInput: DeepReadonly<AssociationMultiCreateInput>
): Array<GenAssociationModelInput> => {
    const {
        sourceTables,
        targetTable,
        columnReferences,
        ...optionalMultiCreateInput
    } = multiCreateInput

    const otherData: Omit<AssociationMultiCreateInput, "sourceTables" | "targetTable" | "columnReferences"> = optionalMultiCreateInput

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
