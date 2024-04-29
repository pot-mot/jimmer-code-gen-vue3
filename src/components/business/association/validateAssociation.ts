import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {compareArraysIgnoreOrder} from "@/utils/array.ts";

export const validateAssociation = (
    association: DeepReadonly<GenAssociationModelInput>,
    otherAssociations: DeepReadonly<Array<GenAssociationModelInput>>,
    tables: DeepReadonly<Array<GenTableModelInput>>
): string[] => {
    const messageList: string[] = []

    if (association.name.length === 0) {
        messageList.push('关联名不得为空')
    }

    for (let otherAssociation of otherAssociations) {
        if (otherAssociation.name === association.name) {
            messageList.push(`关联【${association.name}】存在重名`)
        }
        if (
            otherAssociation.sourceTableName === association.sourceTableName &&
            otherAssociation.targetTableName === association.targetTableName &&
            compareArraysIgnoreOrder(otherAssociation.columnReferences, association.columnReferences)
        ) {
            messageList.push(`关联【${association.name}】与关联【${otherAssociation.name}】关联信息完全相同`)
        }
    }

    const tableNameMap = new Map<string, DeepReadonly<GenTableModelInput>>
    tables.forEach((table) => {
        tableNameMap.set(table.name, table);
    })


    return messageList
}
