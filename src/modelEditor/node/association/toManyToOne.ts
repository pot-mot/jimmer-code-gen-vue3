import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {nextTick} from "vue";
import {
    ASSOCIATION_FK_COMMENT_TEMPLATE,
    ASSOCIATION_FK_NAME_TEMPLATE
} from "@/type/context/utils/AssociationTemplate.ts";

export const toManyToOne = async (
    association: DeepReadonly<ConcreteAssociationIdOnly>
) => {
    const {
        executeAsyncBatch,
        waitChangeSync,
        contextData,
        changeEntity,
        changeAssociation
    } = useModelEditor()

    const mappedProperty = association.mappedProperty
    const sourceEntity = contextData.value.entityMap.get(association.sourceEntityId)
    if (!sourceEntity) {
        throw new Error(`[${association.sourceEntityId}] not found`)
    }
    const sourcePropertyIndex = sourceEntity.properties.findIndex(it => it.id === association.sourcePropertyId)
    if (sourcePropertyIndex === -1) {
        throw new Error(`[${association.sourcePropertyId}] not found`)
    }
    const sourceProperty = sourceEntity.properties[sourcePropertyIndex]
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

    await executeAsyncBatch(Symbol("toManyToOne"), async () => {
        const newSourceProperty: ManyToOneProperty = {
            id: sourceProperty.id,
            associationId: association.id,
            category: "ManyToOne",
            name: sourceProperty.name,
            comment: sourceProperty.comment,
            idViewName: sourceProperty.idViewName,
            autoSyncIdViewName: sourceProperty.autoSyncIdViewName,
            joinInfo: {
                type: "SingleColumn",
                columnName: "",
                foreignKeyType: association.foreignKeyType,
            },
            autoGenerateJoinInfo: true,
            nullable: sourceProperty.nullable,
            onDissociateAction: "onDissociateAction" in sourceProperty ? sourceProperty.onDissociateAction : "NONE",
            referencedEntityId: sourceProperty.referencedEntityId,
            typeIsList: false,
            extraAnnotations: [...sourceProperty.extraAnnotations],
            extraImports: [...sourceProperty.extraImports],
        }

        const newMappedProperty: OneToManyProperty = {
            id: mappedProperty.id,
            associationId: association.id,
            category: "OneToMany",
            name: mappedProperty.name,
            comment: mappedProperty.comment,
            idViewName: mappedProperty.idViewName,
            autoSyncIdViewName: mappedProperty.autoSyncIdViewName,
            mappedById: mappedProperty.mappedById,
            referencedEntityId: mappedProperty.referencedEntityId,
            nullable: false,
            typeIsList: true,
            extraAnnotations: [...mappedProperty.extraAnnotations],
            extraImports: [...mappedProperty.extraImports]
        }

        const newAssociation: ManyToOneAssociationIdOnly = {
            id: association.id,
            name: ASSOCIATION_FK_NAME_TEMPLATE,
            useNameTemplate: true,
            comment: ASSOCIATION_FK_COMMENT_TEMPLATE,
            useCommentTemplate: true,
            foreignKeyType: association.foreignKeyType,
            referencedEntityId: association.referencedEntityId,
            sourceEntityId: association.sourceEntityId,
            sourcePropertyId: association.sourcePropertyId,
            type: "ManyToOne",
            mappedProperty: newMappedProperty,
            withMappedProperty: association.withMappedProperty,
        }

        const properties = [...sourceEntity.properties]
        properties[sourcePropertyIndex] = newSourceProperty
        changeEntity({
            ...sourceEntity,
            properties,
        })
        changeAssociation(newAssociation)

        await nextTick()
        await waitChangeSync()
    })
}
