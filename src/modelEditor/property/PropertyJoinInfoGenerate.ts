import {nameTool} from "@/type/context/utils/NameTool.ts";
import {getEntityIdProperty} from "@/type/context/utils/EntityIdProperty.ts";
import {flatEmbeddableTypeColumnNames} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {firstCaseToUpper} from "@/utils/name/firstCase.ts";
import {
    MID_TABLE_COMMENT_TEMPLATE,
    MID_TABLE_NAME_TEMPLATE,
} from "@/type/context/utils/AssociationTemplate.ts";

const _generateFkJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty>,
    foreignKeyType: ForeignKeyType,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
): FkJoinInfo => {
    const referencedEntity = entityMap.get(property.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
    const referencedIdProperty = getEntityIdProperty(referencedEntity, mappedSuperClassMap)
    if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

    if ("embeddableTypeId" in referencedIdProperty) {
        const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
        return {
            type: "MultiColumn",
            embeddableTypeId: referencedIdProperty.embeddableTypeId,
            columnRefs: columnNames.map(columnName => ({
                columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                referencedColumnName: columnName,
            })),
            foreignKeyType,
        }
    } else {
        return {
            type: "SingleColumn",
            columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
            foreignKeyType,
        }
    }
}

export const generateFkJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty>,
    foreignKeyType: ForeignKeyType,
    contextData: DeepReadonly<ModelContextData>,
) => {
    return _generateFkJoinInfo(
        property,
        foreignKeyType,
        contextData.entityMap,
        contextData.mappedSuperClassMap,
        contextData.embeddableTypeMap,
        contextData.model.databaseNameStrategy,
    )
}

const _generateJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    foreignKeyType: ForeignKeyType,
    entity: DeepReadonly<EntityWithProperties>,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
): JoinInfo => {
    const referencedEntity = entityMap.get(property.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
    const referencedIdProperty = getEntityIdProperty(referencedEntity, mappedSuperClassMap)
    if (!referencedIdProperty) throw new Error(`[${referencedEntity.id}] has no id property`)

    if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
        if ("embeddableTypeId" in referencedIdProperty) {
            const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
            return {
                type: "MultiColumn",
                embeddableTypeId: referencedIdProperty.embeddableTypeId,
                columnRefs: columnNames.map(columnName => ({
                    columnName: nameTool.convert(referencedEntity.name + firstCaseToUpper(columnName), 'UPPER_CAMEL', databaseNameStrategy),
                    referencedColumnName: columnName,
                })),
                foreignKeyType,
            }
        } else {
            return {
                type: "SingleColumn",
                columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
                foreignKeyType,
            }
        }
    } else {
        const sourceIdProperty = getEntityIdProperty(entity, mappedSuperClassMap)
        if (!sourceIdProperty) throw new Error(`[${entity.id}] has no id property`)

        if (!("embeddableTypeId" in sourceIdProperty) && !("embeddableTypeId" in referencedIdProperty)) {
            return {
                type: "SingleColumnMidTable",
                tableName: MID_TABLE_NAME_TEMPLATE,
                tableComment: MID_TABLE_COMMENT_TEMPLATE,
                sourceColumnName: nameTool.convert(entity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                targetColumnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                sourceForeignKeyType: foreignKeyType,
                targetForeignKeyType: foreignKeyType,
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
                        columnName: nameTool.convert(entity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                        referencedColumnName: columnName,
                    })),
                    foreignKeyType,
                }
            } else {
                sourceJoinInfo = {
                    type: "SingleColumn",
                    columnName: nameTool.convert(entity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    foreignKeyType,
                }
            }

            if ("embeddableTypeId" in referencedIdProperty) {
                const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
                targetJoinInfo = {
                    type: "MultiColumn",
                    embeddableTypeId: referencedIdProperty.embeddableTypeId,
                    columnRefs: targetColumnNames.map(columnName => ({
                        columnName: nameTool.convert(entity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                        referencedColumnName: columnName,
                    })),
                    foreignKeyType,
                }
            } else {
                targetJoinInfo = {
                    type: "SingleColumn",
                    columnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    foreignKeyType,
                }
            }

            return {
                type: "MultiColumnMidTable",
                sourceJoinInfo,
                targetJoinInfo,
                tableName: MID_TABLE_NAME_TEMPLATE,
                tableComment: MID_TABLE_COMMENT_TEMPLATE,
            }
        }
    }
}

export const generateJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    foreignKeyType: ForeignKeyType,
    entity: DeepReadonly<EntityWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
) => {
    return _generateJoinInfo(
        property,
        foreignKeyType,
        entity,
        contextData.entityMap,
        contextData.mappedSuperClassMap,
        contextData.embeddableTypeMap,
        contextData.model.databaseNameStrategy,
    )
}
