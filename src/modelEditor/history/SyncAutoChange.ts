import {nameTool} from "@/type/context/utils/NameTool.ts";
import {generateFkJoinInfo, generateJoinInfo} from "@/modelEditor/property/PropertyJoinInfoGenerate.ts";
import {
    tmpl_fkComment,
    tmpl_fkName,
    tmpl_idView,
    tmpl_mappedPropertyComment,
    tmpl_mappedPropertyName,
    tmpl_midTableComment,
    tmpl_midTableName
} from "@/type/context/utils/AssociationTemplate.ts";

export const syncEntityAutoChange = (
    entity: EntityWithProperties,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const databaseNameStrategy = contextData.model.databaseNameStrategy
    if (entity.autoSyncTableName) {
        entity.tableName = nameTool.convert(entity.name, "UPPER_CAMEL", databaseNameStrategy)
    }
    for (const property of entity.properties) {
        if ("columnInfo" in property) {
            property.columnInfo.nullable = property.nullable
            if ("autoSyncColumnName" in property && property.autoSyncColumnName) {
                property.columnInfo.name = nameTool.convert(property.name, "UPPER_CAMEL", databaseNameStrategy)
            }
        }
        if ("joinInfo" in property && property.autoGenerateJoinInfo) {
            const edgedAssociation = contextData.associationMap.get(property.associationId)
            if (edgedAssociation === undefined) return
            const association = edgedAssociation.association
            try {
                property.joinInfo = generateJoinInfo(property, association, entity, contextData)
            } catch (e) {
                console.warn(e)
                // 阻止生成 JoinInfo 失败导致历史记录执行失败
            }
            if (property.useIdViewNameTemplate) {
                const referenceEntity = contextData.entityMap.get(property.referencedEntityId)
                if (referenceEntity === undefined) return
                property.idViewName = tmpl_idView(property.idViewNameTemplate, property)
            }
        }
    }
}

export const syncMappedSuperClassAutoChange = (
    mappedSuperClass: MappedSuperClassWithProperties,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const databaseNameStrategy = contextData.model.databaseNameStrategy

    for (const property of mappedSuperClass.properties) {
        if ("columnInfo" in property) {
            property.columnInfo.nullable = property.nullable
            if ("autoSyncColumnName" in property && property.autoSyncColumnName) {
                property.columnInfo.name = nameTool.convert(property.name, "UPPER_CAMEL", databaseNameStrategy)
            }
        }
        if ("joinInfo" in property && property.autoGenerateJoinInfo) {
            const edgedAssociation = contextData.associationMap.get(property.associationId)
            if (edgedAssociation === undefined) return
            const association = edgedAssociation.association
            try {
                property.joinInfo = generateFkJoinInfo(property, association, contextData)
            } catch (e) {
                console.warn(e)
                // 阻止生成 JoinInfo 失败导致历史记录执行失败
            }
            if (property.useIdViewNameTemplate) {
                const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
                if (referencedEntity === undefined) return
                property.idViewName = tmpl_idView(property.idViewNameTemplate, property)
            }
        }
    }
}

export const syncEmbeddableTypeAutoChange = (
    embeddableType: EmbeddableTypeWithProperties,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const databaseNameStrategy = contextData.model.databaseNameStrategy

    for (const property of embeddableType.properties) {
        if ("columnInfo" in property) {
            property.columnInfo.nullable = property.nullable
            if ("autoSyncColumnName" in property && property.autoSyncColumnName) {
                property.columnInfo.name = nameTool.convert(property.name, "UPPER_CAMEL", databaseNameStrategy)
            }
        }
    }
}

export const syncAssociationAutoChange = (
    association: AssociationIdOnly,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const mappedProperty = association.mappedProperty

    if ("sourceEntityId" in association) {
        const sourceEntity = contextData.entityMap.get(association.sourceEntityId)
        if (!sourceEntity) return
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (!referencedEntity) return
        const sourceProperty = sourceEntity.properties.find(property => property.id === association.sourcePropertyId)
        if (!sourceProperty) return
        if (sourceProperty.category !== "OneToOne_Source" && sourceProperty.category !== "ManyToOne" && sourceProperty.category !== "ManyToMany_Source")
            return

        if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
            if ("useNameTemplate" in association && association.useNameTemplate) {
                association.name = tmpl_fkName(association.nameTemplate, sourceEntity, sourceProperty)
            }
            if ("useCommentTemplate" in association && association.useCommentTemplate) {
                association.comment = tmpl_fkComment(association.commentTemplate, sourceEntity, sourceProperty)
            }
        } else {
            if ("useNameTemplate" in association && association.useNameTemplate) {
                association.name = tmpl_midTableName(association.nameTemplate, sourceEntity, referencedEntity)
            }
            if ("useCommentTemplate" in association && association.useCommentTemplate) {
                association.comment = tmpl_midTableComment(association.commentTemplate, sourceEntity, referencedEntity)
            }
        }

        if ("useNameTemplate" in mappedProperty && mappedProperty.useNameTemplate) {
            mappedProperty.name = tmpl_mappedPropertyName(mappedProperty.nameTemplate, sourceEntity, sourceProperty)
        }
        if ("useCommentTemplate" in mappedProperty && mappedProperty.useCommentTemplate) {
            mappedProperty.comment = tmpl_mappedPropertyComment(mappedProperty.commentTemplate, sourceEntity, sourceProperty)
        }
        if ("useIdViewNameTemplate" in mappedProperty && mappedProperty.useIdViewNameTemplate) {
            mappedProperty.idViewName = tmpl_idView(mappedProperty.idViewNameTemplate, mappedProperty)
        }
    }
}
