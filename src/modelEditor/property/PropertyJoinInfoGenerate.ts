import {nameTool} from "@/type/context/utils/NameTool.ts";
import {getEntityIdProperties} from "@/type/context/utils/EntityCategorizedProperty.ts";
import {flatEmbeddableTypeColumnNames} from "@/type/context/utils/EmbeddableTypeFlat.ts";
import {tmpl_midTableComment, tmpl_midTableName} from "@/type/context/utils/AssociationTemplate.ts";

const _generateFkJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty>,
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
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty>,
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

const translateMidTableName = (
    association: DeepReadonly<AssociationIdOnly>,
    entityMap: DeepReadonly<Map<string, Entity>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClass>>,
) => {
    if ("name" in association) {
        return association.name
    } else {
        const referencedEntity = entityMap.get(association.referencedEntityId)
        const abstractEntity = mappedSuperClassMap.get(association.sourceAbstractEntityId)
        return tmpl_midTableName(
            association.nameTemplate,
            abstractEntity ? {name: `$${abstractEntity.name}$`} : {name: "[NOT_EXISTED]"},
            referencedEntity ?? {name: "[NOT_EXISTED]"},
        )
    }
}

const translateMidTableComment = (
    association: DeepReadonly<AssociationIdOnly>,
    entityMap: DeepReadonly<Map<string, Entity>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClass>>,
) => {
    if ("comment" in association) {
        return association.comment
    } else {
        const referencedEntity = entityMap.get(association.referencedEntityId)
        const abstractEntity = mappedSuperClassMap.get(association.sourceAbstractEntityId)
        return tmpl_midTableComment(
            association.nameTemplate,
            abstractEntity ? {comment: `$${abstractEntity.comment}$`} : {comment: "[NOT_EXISTED]"},
            referencedEntity ?? {comment: "[NOT_EXISTED]"},
        )
    }
}

const _generateJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    entity: DeepReadonly<EntityWithProperties>,
    entityMap: DeepReadonly<Map<string, EntityWithProperties>>,
    mappedSuperClassMap: DeepReadonly<Map<string, MappedSuperClassWithProperties>>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    databaseNameStrategy: NameStrategy,
): JoinInfo => {
    const referencedEntity = entityMap.get(property.referencedEntityId)
    if (!referencedEntity) throw new Error(`[${property.referencedEntityId}] not found`)
    const referencedIdProperties = getEntityIdProperties(referencedEntity, mappedSuperClassMap)
    if (referencedIdProperties.length === 0) throw new Error(`[${referencedEntity.id}] has no id property`)
    if (referencedIdProperties.length > 1) throw new Error(`[${referencedEntity.id}] has more than one id properties`)
    const referencedIdProperty = referencedIdProperties[0]
    if (referencedIdProperty === undefined) throw new Error(`[${referencedEntity.id}] has no id property`)

    if (property.joinInfo.type === "SingleColumn" || property.joinInfo.type === "MultiColumn") {
        if ("embeddableTypeId" in referencedIdProperty) {
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
    } else {
        const sourceIdProperties = getEntityIdProperties(entity, mappedSuperClassMap)
        if (sourceIdProperties.length === 0) throw new Error(`[${entity.id}] has no id property`)
        if (sourceIdProperties.length > 1) throw new Error(`[${entity.id}] has more than one id properties`)
        const sourceIdProperty = sourceIdProperties[0]
        if (sourceIdProperty === undefined) throw new Error(`[${entity.id}] has no id property`)

        if (!("embeddableTypeId" in sourceIdProperty) && !("embeddableTypeId" in referencedIdProperty)) {
            return {
                type: "SingleColumnMidTable",
                tableName: translateMidTableName(association, entityMap, mappedSuperClassMap),
                tableComment: translateMidTableComment(association, entityMap, mappedSuperClassMap),
                sourceColumnName: nameTool.convert(entity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                targetColumnName: nameTool.convert(referencedEntity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
                sourceForeignKeyType: association.foreignKeyType,
                targetForeignKeyType: association.foreignKeyType,
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
                    foreignKeyType: association.foreignKeyType,
                }
            } else {
                sourceJoinInfo = {
                    type: "SingleColumn",
                    columnName: nameTool.convert(entity.name + "Id", "UPPER_CAMEL", databaseNameStrategy),
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
                type: "MultiColumnMidTable",
                sourceJoinInfo,
                targetJoinInfo,
                tableName: translateMidTableName(association, entityMap, mappedSuperClassMap),
                tableComment: translateMidTableComment(association, entityMap, mappedSuperClassMap),
            }
        }
    }
}

export const generateJoinInfo = (
    property: DeepReadonly<OneToOneSourceProperty | ManyToOneProperty | ManyToManySourceProperty>,
    association: DeepReadonly<AssociationIdOnly>,
    entity: DeepReadonly<EntityWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
) => {
    return _generateJoinInfo(
        property,
        association,
        entity,
        contextData.entityMap,
        contextData.mappedSuperClassMap,
        contextData.embeddableTypeMap,
        contextData.model.databaseNameStrategy,
    )
}
