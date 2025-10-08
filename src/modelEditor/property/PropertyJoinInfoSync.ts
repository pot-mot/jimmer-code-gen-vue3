import {nameTool} from "@/type/context/utils/NameTool.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {getEntityIdProperty} from "@/type/context/utils/EntityId.ts";
import {flatEmbeddableTypeColumnNames} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {firstCaseToUpper} from "@/utils/name/firstCase.ts";
import {
    ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
    ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
} from "@/type/context/utils/AssociationTemplate.ts";

export const syncPropertyFkJoinInfo = (
    property: MappedSuperClassProperty
) => {
    const {contextData} = useModelEditor()

    const databaseNameStrategy = contextData.value.model.databaseNameStrategy

    if ("joinInfo" in property) {
        const referencedEntity = contextData.value.entityMap.get(property.referencedEntityId)
        if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
        const referencedIdProperty = getEntityIdProperty(referencedEntity, contextData.value.mappedSuperClassMap)
        if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

        if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
            if ("embeddableTypeId" in referencedIdProperty) {
                const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                property.joinInfo = {
                    type: "MultiColumn",
                    embeddableTypeId: referencedIdProperty.embeddableTypeId,
                    columnRefs: columnNames.map(columnName => ({
                        columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                        referencedColumnName: columnName,
                    }))
                }
            } else {
                property.joinInfo = {
                    type: "SingleColumn",
                    columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy)
                }
            }
        }
    }
}


export const syncPropertyJoinInfo = (
    property: Property,
    entity: EntityWithProperties,
) => {
    const {contextData} = useModelEditor()

    const databaseNameStrategy = contextData.value.model.databaseNameStrategy

    if ("joinInfo" in property) {
        const referencedEntity = contextData.value.entityMap.get(property.referencedEntityId)
        if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
        const referencedIdProperty = getEntityIdProperty(referencedEntity, contextData.value.mappedSuperClassMap)
        if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

        if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
            if ("embeddableTypeId" in referencedIdProperty) {
                const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                property.joinInfo = {
                    type: "MultiColumn",
                    embeddableTypeId: referencedIdProperty.embeddableTypeId,
                    columnRefs: columnNames.map(columnName => ({
                        columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                        referencedColumnName: columnName,
                    }))
                }
            } else {
                property.joinInfo = {
                    type: "SingleColumn",
                    columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy)
                }
            }
        } else if (property.joinInfo.type === "SingleColumnMidTable" || property.joinInfo.type === "MultiColumnMidTable") {
            const sourceIdProperty = getEntityIdProperty(entity, contextData.value.mappedSuperClassMap)
            if (!sourceIdProperty) throw new Error(`[${entity.id}] has no id property`)

            if ("embeddableTypeId" in sourceIdProperty && "embeddableTypeId" in referencedIdProperty) {
                const sourceColumnNames = flatEmbeddableTypeColumnNames(sourceIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, sourceIdProperty.columnNameOverrides)
                const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                property.joinInfo = {
                    type: "MultiColumnMidTable",
                    sourceJoinInfo: {
                        type: "MultiColumn",
                        embeddableTypeId: sourceIdProperty.embeddableTypeId,
                        columnRefs: sourceColumnNames.map(columnName => ({
                            columnName: nameTool.convert(entity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    },
                    targetJoinInfo: {
                        type: "MultiColumn",
                        embeddableTypeId: referencedIdProperty.embeddableTypeId,
                        columnRefs: targetColumnNames.map(columnName => ({
                            columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    },
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            } else if ("embeddableTypeId" in sourceIdProperty) {
                const sourceColumnNames = flatEmbeddableTypeColumnNames(sourceIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, sourceIdProperty.columnNameOverrides)
                property.joinInfo = {
                    type: "MultiColumnMidTable",
                    sourceJoinInfo: {
                        type: "MultiColumn",
                        embeddableTypeId: sourceIdProperty.embeddableTypeId,
                        columnRefs: sourceColumnNames.map(columnName => ({
                            columnName: nameTool.convert(entity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    },
                    targetJoinInfo: {
                        type: "SingleColumn",
                        columnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    },
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            } else if ("embeddableTypeId" in referencedIdProperty) {
                const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, contextData.value.embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                property.joinInfo = {
                    type: "MultiColumnMidTable",
                    sourceJoinInfo: {
                        type: "SingleColumn",
                        columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
                    },
                    targetJoinInfo: {
                        type: "MultiColumn",
                        embeddableTypeId: referencedIdProperty.embeddableTypeId,
                        columnRefs: targetColumnNames.map(columnName => ({
                            columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    },
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            } else {
                property.joinInfo = {
                    type: "SingleColumnMidTable",
                    sourceColumnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
                    targetColumnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            }
        }
    }
}
