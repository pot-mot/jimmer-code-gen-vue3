import { useModelEditor } from "@/modelEditor/useModelEditor.ts";
import { nextTick } from "vue";

export const toManyToOneAbstract = async (
    association: DeepReadonly<AbstractAssociationIdOnly>
) => {
    const {
        executeAsyncBatch,
        waitChangeSync,
        contextData,
        changeMappedSuperClass,
        changeAssociation
    } = useModelEditor()

    const mappedProperty = association.mappedProperty
    const sourceAbstractEntity = contextData.value.mappedSuperClassMap.get(association.sourceAbstractEntityId)
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

    await executeAsyncBatch(Symbol("toManyToOneAbstract"), async () => {
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
            onDissociateAction: sourceProperty.onDissociateAction,
            referencedEntityId: sourceProperty.referencedEntityId,
            typeIsList: false,
            extraAnnotations: [...sourceProperty.extraAnnotations],
            extraImports: [...sourceProperty.extraImports],
        }

        const newMappedProperty: OneToManyAbstractProperty = {
            id: mappedProperty.id,
            associationId: association.id,
            category: "OneToMany_Abstract",
            name: mappedProperty.name,
            comment: mappedProperty.comment,
            idViewName: mappedProperty.idViewName,
            autoSyncIdViewName: mappedProperty.autoSyncIdViewName,
            mappedById: mappedProperty.mappedById,
            referencedAbstractEntityId: mappedProperty.referencedAbstractEntityId,
            nullable: false,
            typeIsList: true,
            extraAnnotations: [...mappedProperty.extraAnnotations],
            extraImports: [...mappedProperty.extraImports],
        }

        const newAssociation: ManyToOneAbstractAssociationIdOnly = {
            id: association.id,
            nameTemplate: association.nameTemplate,
            commentTemplate: association.commentTemplate,
            foreignKeyType: association.foreignKeyType,
            referencedEntityId: association.referencedEntityId,
            sourceAbstractEntityId: association.sourceAbstractEntityId,
            sourcePropertyId: association.sourcePropertyId,
            type: "ManyToOne_Abstract",
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
