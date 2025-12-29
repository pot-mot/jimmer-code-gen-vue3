import {nameTool} from "@/modelEditor/utils/NameTool.ts";
import {getEntityIdProperties} from "@/modelEditor/utils/EntityCategorizedProperty.ts";
import {flatEmbeddableTypeColumnNames} from "@/modelEditor/utils/EmbeddableTypeFlat.ts";

const _generateFkJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
): FkJoinInfo => {
    const referencedEntity = entityMap.get(property.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
    const referencedIdProperties = getEntityIdProperties(referencedEntity, mappedSuperClassMap)
    if (referencedIdProperties.length === 0) throw new Error(`[${referencedEntity.id}] has no id property`)
    if (referencedIdProperties.length > 1) throw new Error(`[${referencedEntity.id}] has more than one id properties`)
    const referencedIdProperty = referencedIdProperties[0]
    if (referencedIdProperty === undefined) throw new Error(`[${referencedEntity.id}] has no id property`)

    if (referencedIdProperty.category === "ID_EMBEDDABLE") {
        const columnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
        return {
            type: "MultiColumn",
            embeddableTypeId: referencedIdProperty.embeddableTypeId,
            columnRefs: columnNames.map(columnName => ({
                columnName: nameTool.convert(referencedEntity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                referencedColumnName: columnName,
            })),
            foreignKeyType: association.foreignKeyType,
        }
    } else {
        return {
            type: "SingleColumn",
            columnName: nameTool.convert(property.name + "Id", "LOWER_CAMEL", databaseNameStrategy),
            foreignKeyType: association.foreignKeyType,
        }
    }
}

export const generateFkJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    contextData: DeepReadonly<ModelContextData>,
) => {
    return _generateFkJoinInfo(
        property,
        association,
        contextData.entityMap,
        contextData.mappedSuperClassMap,
        contextData.embeddableTypeMap,
        contextData.model.databaseNameStrategy,
    )
}

const _generateMidTableJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
): MidTableJoinInfo => {
    const referencedEntity = entityMap.get(property.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
    const referencedIdProperties = getEntityIdProperties(referencedEntity, mappedSuperClassMap)
    if (referencedIdProperties.length === 0) throw new Error(`[${referencedEntity.id}] has no id property`)
    if (referencedIdProperties.length > 1) throw new Error(`[${referencedEntity.id}] has more than one id properties`)
    const referencedIdProperty = referencedIdProperties[0]
    if (referencedIdProperty === undefined) throw new Error(`[${referencedEntity.id}] has no id property`)

    if (association.type === "OneToOne" || association.type === "ManyToOne" || association.type === "ManyToMany") {
        const sourceEntity = entityMap.get(association.sourceEntityId)
        if (!sourceEntity) throw new Error(`[${association.sourceEntityId}] not found`)

        const sourceIdProperties = getEntityIdProperties(sourceEntity, mappedSuperClassMap)
        if (sourceIdProperties.length === 0) throw new Error(`[${sourceEntity.id}] has no id property`)
        if (sourceIdProperties.length > 1) throw new Error(`[${sourceEntity.id}] has more than one id properties`)
        const sourceIdProperty = sourceIdProperties[0]
        if (sourceIdProperty === undefined) throw new Error(`[${sourceEntity.id}] has no id property`)

        let sourceJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
        let targetJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo

        if ("embeddableTypeId" in sourceIdProperty) {
            const sourceColumnNames = flatEmbeddableTypeColumnNames(sourceIdProperty.embeddableTypeId, embeddableTypeMap, sourceIdProperty.columnNameOverrides)
            sourceJoinInfo = {
                type: "MultiColumn",
                embeddableTypeId: sourceIdProperty.embeddableTypeId,
                columnRefs: sourceColumnNames.map(columnName => ({
                    columnName: nameTool.convert(sourceEntity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                    referencedColumnName: columnName,
                })),
                foreignKeyType: association.foreignKeyType,
            }
        } else {
            sourceJoinInfo = {
                type: "SingleColumn",
                columnName: nameTool.convert(sourceEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                foreignKeyType: association.foreignKeyType,
            }
        }

        if ("embeddableTypeId" in referencedIdProperty) {
            const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
            targetJoinInfo = {
                type: "MultiColumn",
                embeddableTypeId: referencedIdProperty.embeddableTypeId,
                columnRefs: targetColumnNames.map(columnName => ({
                    columnName: nameTool.convert(referencedEntity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                    referencedColumnName: columnName,
                })),
                foreignKeyType: association.foreignKeyType,
            }
        } else {
            targetJoinInfo = {
                type: "SingleColumn",
                columnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                foreignKeyType: association.foreignKeyType,
            }
        }

        return {
            type: "MidTable",
            sourceJoinInfo,
            targetJoinInfo,
            midTableExtraInfo: {},
        }
    } else {
        const sourceAbstractEntity = mappedSuperClassMap.get(association.sourceAbstractEntityId)
        if (!sourceAbstractEntity) throw new Error(`[${association.sourceAbstractEntityId}] not found`)

        if (!("embeddableTypeId" in referencedIdProperty)) {
            return {
                type: "MidTable",
                sourceJoinInfo: {
                    type: "Unknown",
                    foreignKeyType: association.foreignKeyType,
                },
                targetJoinInfo: {
                    type: "SingleColumn",
                    columnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                    foreignKeyType: association.foreignKeyType,
                },
                midTableExtraInfo: {},
            }
        } else {
            const targetColumnNames = flatEmbeddableTypeColumnNames(referencedIdProperty.embeddableTypeId, embeddableTypeMap, referencedIdProperty.columnNameOverrides)
            return {
                type: "MidTable",
                sourceJoinInfo: {
                    type: "Unknown",
                    foreignKeyType: association.foreignKeyType,
                },
                targetJoinInfo: {
                    type: "MultiColumn",
                    embeddableTypeId: referencedIdProperty.embeddableTypeId,
                    columnRefs: targetColumnNames.map(columnName => ({
                        columnName: nameTool.convert(referencedEntity.name + nameTool.convert(columnName, databaseNameStrategy, 'UPPER_CAMEL'), 'UPPER_CAMEL', databaseNameStrategy),
                        referencedColumnName: columnName,
                    })),
                    foreignKeyType: association.foreignKeyType,
                },
                midTableExtraInfo: {},
            }
        }
    }
}

export const generateMidTableJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    contextData: DeepReadonly<ModelContextData>,
) => {
    return _generateMidTableJoinInfo(
        property,
        association,
        contextData.entityMap,
        contextData.mappedSuperClassMap,
        contextData.embeddableTypeMap,
        contextData.model.databaseNameStrategy,
    )
}
