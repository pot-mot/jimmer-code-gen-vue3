import { useModelEditor } from "@/modelEditor/useModelEditor.ts";
import { nextTick } from "vue";
import {
    MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
    LIST_ID_VIEW_TEMPLATE,
    MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
    MID_TABLE_COMMENT_TEMPLATE,
    MID_TABLE_NAME_TEMPLATE,
} from "@/modelEditor/utils/AssociationTemplate.ts";

export const toManyToManyAbstract = async (
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
        sourceProperty.category !== "OneToOne_Source" &&
        sourceProperty.category !== "ManyToMany_Source"
    ) {
        throw new Error(`[${association.sourcePropertyId}] is not AssociationSource`)
    }

    await executeAsyncBatch(Symbol("toManyToManyAbstract"), async () => {
        const newSourceProperty: ManyToManySourceProperty = {
            id: sourceProperty.id,
            associationId: association.id,
            category: "ManyToMany_Source",
            name: sourceProperty.name,
            comment: sourceProperty.comment,
            idViewName: sourceProperty.idViewName,
            idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
            useIdViewNameTemplate: true,
            joinInfo: {
                type: "MidTable",
                sourceJoinInfo: {
                    type: "Unknown",
                    foreignKeyType: association.foreignKeyType,
                },
                targetJoinInfo: {
                    type: "Unknown",
                    foreignKeyType: association.foreignKeyType,
                },
                midTableExtraInfo: {},
            },
            autoGenerateJoinInfo: true,
            nullable: false,
            referencedEntityId: sourceProperty.referencedEntityId,
            typeIsList: true,
            extraAnnotations: [...sourceProperty.extraAnnotations],
            extraImports: [...sourceProperty.extraImports],
        }

        const newMappedProperty: ManyToManyMappedAbstractProperty = {
            id: mappedProperty.id,
            associationId: association.id,
            category: "ManyToMany_Mapped_Abstract",
            nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
            commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
            idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
            mappedById: mappedProperty.mappedById,
            referencedAbstractEntityId: mappedProperty.referencedAbstractEntityId,
            nullable: false,
            typeIsList: true,
            extraAnnotations: [...mappedProperty.extraAnnotations],
            extraImports: [...mappedProperty.extraImports],
        }

        const newAssociation: ManyToManyAbstractAssociationIdOnly = {
            id: association.id,
            nameTemplate: MID_TABLE_NAME_TEMPLATE,
            commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
            foreignKeyType: association.foreignKeyType,
            referencedEntityId: association.referencedEntityId,
            sourceAbstractEntityId: association.sourceAbstractEntityId,
            sourcePropertyId: association.sourcePropertyId,
            type: "ManyToMany_Abstract",
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
