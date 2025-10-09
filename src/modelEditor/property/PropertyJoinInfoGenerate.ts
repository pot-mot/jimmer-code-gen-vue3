import {nameTool} from "@/type/context/utils/NameTool.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {getEntityIdProperty} from "@/type/context/utils/EntityId.ts";
import {flatEmbeddableTypeColumnNames} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {firstCaseToUpper} from "@/utils/name/firstCase.ts";
import {
    ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
    ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
} from "@/type/context/utils/AssociationTemplate.ts";

export const GENERATED_JOIN_INFO = "[[GENERATED_JOIN_INFO]]"

export const generatePropertyFkJoinInfo = (
    property: MappedSuperClassProperty,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
) => {
    if ("joinInfo" in property && property.autoGenerateJoinInfo) {
        const referencedEntity = entityMap.get(property.referencedEntityId)
        if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
        const referencedIdProperty = getEntityIdProperty(referencedEntity, mappedSuperClassMap)
        if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

        if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
            if ("embeddableTypeId" in referencedIdProperty) {
                const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
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


export const generatePropertyJoinInfo = (
    property: Property,
    entity: EntityWithProperties,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
) => {
    if ("joinInfo" in property && property.autoGenerateJoinInfo) {
        const referencedEntity = entityMap.get(property.referencedEntityId)
        if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
        const referencedIdProperty = getEntityIdProperty(referencedEntity, mappedSuperClassMap)
        if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

        if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
            if ("embeddableTypeId" in referencedIdProperty) {
                const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
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
            const sourceIdProperty = getEntityIdProperty(entity, mappedSuperClassMap)
            if (!sourceIdProperty) throw new Error(`[${entity.id}] has no id property`)

            if (!("embeddableTypeId" in sourceIdProperty) && !("embeddableTypeId" in referencedIdProperty)) {
                property.joinInfo = {
                    type: "SingleColumnMidTable",
                    sourceColumnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
                    targetColumnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            } else {
                let sourceJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
                let targetJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo

                if ("embeddableTypeId" in sourceIdProperty) {
                    const sourceColumnNames = flatEmbeddableTypeColumnNames(sourceIdProperty.embeddableTypeId, embeddableTypeMap, sourceIdProperty.columnNameOverrides)
                    sourceJoinInfo = {
                        type: "MultiColumn",
                        embeddableTypeId: sourceIdProperty.embeddableTypeId,
                        columnRefs: sourceColumnNames.map(columnName => ({
                            columnName: nameTool.convert(entity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    }
                } else {
                    sourceJoinInfo = {
                        type: "SingleColumn",
                        columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
                    }
                }

                if ("embeddableTypeId" in referencedIdProperty) {
                    const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                    targetJoinInfo = {
                        type: "MultiColumn",
                        embeddableTypeId: referencedIdProperty.embeddableTypeId,
                        columnRefs: targetColumnNames.map(columnName => ({
                            columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                            referencedColumnName: columnName,
                        }))
                    }
                } else {
                    targetJoinInfo =  {
                        type: "SingleColumn",
                        columnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    }
                }

                property.joinInfo = {
                    type: "MultiColumnMidTable",
                    sourceJoinInfo,
                    targetJoinInfo,
                    tableName: ASSOCIATION_MID_TABLE_NAME_TEMPLATE,
                    tableComment: ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE,
                }
            }
        }
    }
}
