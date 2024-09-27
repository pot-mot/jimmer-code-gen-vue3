import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

export type ManyToManyMidTable = {
    table: GenTableModelInput,
    sourceAssociation: GenAssociationModelInput,
    targetAssociation: GenAssociationModelInput,
}

export const findManyToManyMidTable = (
    tables: DeepReadonly<GenTableModelInput[]>,
    associations: DeepReadonly<GenAssociationModelInput[]>,
): DeepReadonly<ManyToManyMidTable>[] => {
    const sourceAssociationMap = new Map<string, DeepReadonly<GenAssociationModelInput>[]>

    const targetAssociationMap = new Map<string, DeepReadonly<GenAssociationModelInput>[]>

    for (const association of associations) {
        const {sourceTableName, targetTableName} = association

        const sourceList = sourceAssociationMap.get(sourceTableName)
        if (sourceList) {
            sourceList.push(association)
        } else {
            sourceAssociationMap.set(sourceTableName, [association])
        }

        const targetList = targetAssociationMap.get(targetTableName)
        if (targetList) {
            targetList.push(association)
        } else {
            targetAssociationMap.set(targetTableName, [association])
        }
    }

    const result: DeepReadonly<ManyToManyMidTable>[] = []

    for (const table of tables) {
        if (table.type === 'SUPER_TABLE') continue

        if (table.columns.length > 2) continue

        if (table.columns.filter(it => it.partOfPk).length <= 1) continue

        const sourceAssociations = sourceAssociationMap.get(table.name)
        if (!sourceAssociations) continue
        if (sourceAssociations.length != 1) continue
        if (sourceAssociations[0].columnReferences.length != 1) continue

        const targetAssociations = targetAssociationMap.get(table.name)
        if (!targetAssociations) continue
        if (targetAssociations.length != 1) continue
        if (targetAssociations[0].columnReferences.length != 1) continue

        if (sourceAssociations[0].columnReferences.length !== targetAssociations[0].columnReferences.length) continue

        result.push({table, sourceAssociation: sourceAssociations[0], targetAssociation: targetAssociations[0]})
    }

    return result
}

export const midTableToJoinTableAssociation = (
    midTable: DeepReadonly<ManyToManyMidTable>
): DeepReadonly<GenAssociationModelInput> => {
    const {table, sourceAssociation, targetAssociation} = midTable

    return {
        name: table.name,
        type: 'MANY_TO_MANY',
        updateAction: "",
        deleteAction: "",
        fake: sourceAssociation.fake || targetAssociation.fake,
        sourceTableName: sourceAssociation.sourceTableName,
        targetTableName: targetAssociation.targetTableName,
        columnReferences: sourceAssociation.columnReferences.map((it, index) => {
            return {
                sourceColumnName: it.sourceColumnName,
                targetColumnName: targetAssociation.columnReferences[index].targetColumnName,
            }
        }),
    }
}
