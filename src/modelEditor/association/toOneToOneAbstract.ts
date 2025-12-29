import { useModelEditor } from "@/modelEditor/useModelEditor.ts";
import { nextTick } from "vue";
import {
    FK_COMMENT_TEMPLATE,
    FK_NAME_TEMPLATE,
    MAPPED_PROPERTY_COMMENT_TEMPLATE,
    ID_VIEW_TEMPLATE,
    MAPPED_PROPERTY_NAME_TEMPLATE
} from "@/modelEditor/utils/AssociationTemplate.ts";
import {isKeyProperty} from "@/modelEditor/node/property/PropertyConvert.ts";

export const toOneToOneAbstract = async (
    association: DeepReadonly<AbstractAssociationIdOnly>,
) => {
    const {
        executeAsyncBatch,
        waitChangeSync,
        contextData,
        changeMappedSuperClass,
        changeAssociation
    } = useModelEditor()

    const mappedProperty = association.mappedProperty
    const sourceAbstractEntity = contextData.mappedSuperClassMap.get(association.sourceAbstractEntityId)
    if (!sourceAbstractEntity) {
        throw new Error(`[${association.sourceAbstractEntityId}] not found`)
    }
    const sourcePropertyIndex = sourceAbstractEntity.properties.findIndex(it => it.id === association.sourcePropertyId)
    if (sourcePropertyIndex === -1) {
        throw new Error(`[${association.sourcePropertyId}] not found`)
    }
    const sourceProperty = sourceAbstractEntity.properties[sourcePropertyIndex]
    if (!sourceProperty) {
        throw new Error(`[${association.sourcePropertyId}] not found`)
    }
    if (
        sourceProperty.category !== "ManyToOne" &&
        sourceProperty.category !== "OneToOne_Source"
    ) {
        throw new Error(`[${association.sourcePropertyId}] is not AssociationSource`)
    }

    await executeAsyncBatch(Symbol("toOneToOneAbstract"), async () => {
        const newSourceProperty: OneToOneSourceProperty = {
            id: sourceProperty.id,
            associationId: association.id,
            category: "OneToOne_Source",
            name: sourceProperty.name,
            comment: sourceProperty.comment,
            idViewName: sourceProperty.idViewName,
            idViewNameTemplate: ID_VIEW_TEMPLATE,
            useIdViewNameTemplate: true,
            joinInfo: {
                type: "Unknown",
                foreignKeyType: association.foreignKeyType,
            },
            autoGenerateJoinInfo: sourceProperty.autoGenerateJoinInfo,
            nullable: sourceProperty.nullable,
            onDissociateAction: sourceProperty.onDissociateAction,
            referencedEntityId: sourceProperty.referencedEntityId,
            typeIsList: false,
            extraAnnotations: [...sourceProperty.extraAnnotations],
            extraImports: [...sourceProperty.extraImports],
        }
        if (isKeyProperty(sourceProperty)) {
            Object.assign(newSourceProperty, {
                key: true,
                keyGroups: [...sourceProperty.keyGroups],
            })
        }

        const newMappedProperty: OneToOneMappedAbstractProperty = {
            id: mappedProperty.id,
            associationId: association.id,
            category: "OneToOne_Mapped_Abstract",
            nameTemplate: MAPPED_PROPERTY_NAME_TEMPLATE,
            commentTemplate: MAPPED_PROPERTY_COMMENT_TEMPLATE,
            idViewNameTemplate: ID_VIEW_TEMPLATE,
            mappedById: mappedProperty.mappedById,
            referencedAbstractEntityId: mappedProperty.referencedAbstractEntityId,
            nullable: true,
            typeIsList: false,
            extraAnnotations: [...mappedProperty.extraAnnotations],
            extraImports: [...mappedProperty.extraImports],
        }

        const newAssociation: OneToOneAbstractAssociationIdOnly = {
            id: association.id,
            nameTemplate: FK_NAME_TEMPLATE,
            commentTemplate: FK_COMMENT_TEMPLATE,
            foreignKeyType: association.foreignKeyType,
            referencedEntityId: association.referencedEntityId,
            sourceAbstractEntityId: association.sourceAbstractEntityId,
            sourcePropertyId: sourceProperty.id,
            type: "OneToOne_Abstract",
            mappedProperty: newMappedProperty,
            withMappedProperty: association.withMappedProperty,
        }

        const properties = [...sourceAbstractEntity.properties]
        properties[sourcePropertyIndex] = newSourceProperty
        changeMappedSuperClass({
            ...sourceAbstractEntity,
            properties,
        })
        changeAssociation(newAssociation)

        await nextTick()
        await waitChangeSync()
    })
}
