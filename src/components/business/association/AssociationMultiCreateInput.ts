import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {DeepReadonly} from "vue";
import {cloneDeep} from "lodash";

export type AssociationMultiCreateInput = Omit<GenAssociationModelInput, "sourceTableName" | "targetTableName" | "name"> & {
    sourceTables: GenTableModelInput[],
    targetTable: GenTableModelInput,
}

export type AssociationMultiCreateInputModelValue = Omit<AssociationMultiCreateInput, "targetTable"> & {
    targetTable?: GenTableModelInput | undefined,
}

export const createAssociationMultiCreateInput = (): AssociationMultiCreateInputModelValue => {
    const {sourceTableName, targetTableName, name, ...defaultAssociation} = getDefaultAssociation()

    return {
        ...defaultAssociation,
        sourceTables: [],
        targetTable: undefined,
    }
}

export const extractMultiCreateInput = (
    multiCreateInput: DeepReadonly<AssociationMultiCreateInput>
): Array<GenAssociationModelInput> => {
    const {
        sourceTables,
        targetTable,
        ...optionalMultiCreateInput
    } = multiCreateInput

    const result: Array<GenAssociationModelInput> = []

    for (const sourceTable of sourceTables) {
        const temp: Omit<GenAssociationModelInput, 'name'> = {
            sourceTableName: sourceTable.name,
            targetTableName: targetTable.name,
            ...cloneDeep(optionalMultiCreateInput) as AssociationMultiCreateInput,
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
