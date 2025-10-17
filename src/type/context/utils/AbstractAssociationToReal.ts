import {firstCaseToLower, firstCaseToUpper} from "@/utils/name/firstCase.ts";
import {createId} from "@/modelEditor/useModelEditor.ts";
import type {
    OneToManyAbstractMappedPropertyInfo,
    OneToOneAbstractMappedPropertyInfo
} from "@/type/context/utils/MappedPropertyInfo.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

export const INHERIT_ENTITY = "[[INHERIT_ENTITY]]"

export const oneToOneAbstractToReal = (
    abstractPropertyInfo: DeepReadonly<OneToOneAbstractMappedPropertyInfo>,
    inheritSourceEntity: DeepReadonly<{id: string, name: string, comment: string}>,
): {
    association: OneToOneAssociationIdOnly
    sourceProperty: OneToOneSourceProperty
    mappedProperty: OneToOneMappedProperty
} => {
    const {
        mappedProperty: abstractMappedProperty,
        association: abstractAssociation,
        sourceProperty: abstractSourceProperty,
    } = abstractPropertyInfo

    const newAssociationId = createId("Association")
    const newSourcePropertyId = createId("Property")
    const newMappedPropertyId = createId("Property")
    const inheritEntityFirstLowerName = firstCaseToLower(inheritSourceEntity.name)

    const sourceProperty: OneToOneSourceProperty = {
        id: newSourcePropertyId,
        associationId: newAssociationId,
        category: "OneToOne_Source",
        typeIsList: false,
        name: abstractSourceProperty.name,
        comment: abstractSourceProperty.comment,
        idViewName: abstractSourceProperty.idViewName,
        autoSyncIdViewName: abstractSourceProperty.autoSyncIdViewName,
        extraAnnotations: [...abstractSourceProperty.extraAnnotations],
        extraImports: [...abstractSourceProperty.extraImports],
        nullable: abstractSourceProperty.nullable,
        referencedEntityId: abstractSourceProperty.referencedEntityId,
        onDissociateAction: abstractSourceProperty.onDissociateAction,
        joinInfo: cloneDeepReadonlyRaw<JoinInfo>(abstractSourceProperty.joinInfo), // TODO sync JoinInfo columnName
        autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
    }
    const mappedProperty: OneToOneMappedProperty = {
        id: newMappedPropertyId,
        associationId: newAssociationId,
        category: "OneToOne_Mapped",
        typeIsList: abstractMappedProperty.typeIsList,
        name: abstractMappedProperty.name.replace(INHERIT_ENTITY, inheritEntityFirstLowerName) + `For${firstCaseToUpper(abstractSourceProperty.name)}`,
        comment: abstractMappedProperty.comment.replace(INHERIT_ENTITY, inheritSourceEntity.comment),
        idViewName: abstractMappedProperty.idViewName.replace(INHERIT_ENTITY, inheritEntityFirstLowerName),
        autoSyncIdViewName: true,
        extraAnnotations: [...abstractMappedProperty.extraAnnotations],
        extraImports: [...abstractMappedProperty.extraImports],
        mappedById: newSourcePropertyId,
        nullable: abstractMappedProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
    }
    const association: OneToOneAssociationIdOnly = {
        id: newAssociationId,
        type: "OneToOne",
        name: abstractAssociation.nameTemplate.replace(INHERIT_ENTITY, inheritSourceEntity.name),
        useNameTemplate: true,
        comment: abstractAssociation.commentTemplate.replace(INHERIT_ENTITY, inheritSourceEntity.comment),
        useCommentTemplate: true,
        sourceEntityId: inheritSourceEntity.id,
        sourcePropertyId: newSourcePropertyId,
        referencedEntityId: abstractSourceProperty.referencedEntityId,
        withMappedProperty: abstractAssociation.withMappedProperty,
        mappedProperty,
        foreignKeyType: abstractAssociation.foreignKeyType,
    }

    return {
        association,
        sourceProperty,
        mappedProperty,
    }
}

export const oneToManyAbstractToReal = (
    abstractPropertyInfo: DeepReadonly<OneToManyAbstractMappedPropertyInfo>,
    inheritSourceEntity: DeepReadonly<{id: string, name: string, comment: string}>,
): {
    association: ManyToOneAssociationIdOnly
    sourceProperty: ManyToOneProperty
    mappedProperty: OneToManyProperty
} => {
    const {
        mappedProperty: abstractMappedProperty,
        association: abstractAssociation,
        sourceProperty: abstractSourceProperty,
    } = abstractPropertyInfo

    const newAssociationId = createId("Association")
    const newSourcePropertyId = createId("Property")
    const newMappedPropertyId = createId("Property")
    const inheritEntityFirstLowerName = firstCaseToLower(inheritSourceEntity.name)

    const sourceProperty: ManyToOneProperty = {
        id: newSourcePropertyId,
        associationId: newAssociationId,
        category: "ManyToOne",
        typeIsList: false,
        name: abstractSourceProperty.name,
        comment: abstractSourceProperty.comment,
        idViewName: abstractSourceProperty.idViewName,
        autoSyncIdViewName: abstractSourceProperty.autoSyncIdViewName,
        extraAnnotations: [...abstractSourceProperty.extraAnnotations],
        extraImports: [...abstractSourceProperty.extraImports],
        nullable: abstractSourceProperty.nullable,
        referencedEntityId: abstractSourceProperty.referencedEntityId,
        onDissociateAction: abstractSourceProperty.onDissociateAction,
        joinInfo: cloneDeepReadonlyRaw<JoinInfo>(abstractSourceProperty.joinInfo), // TODO sync JoinInfo columnName
        autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
    }
    const mappedProperty: OneToManyProperty = {
        id: newMappedPropertyId,
        associationId: newAssociationId,
        category: "OneToMany",
        name: abstractMappedProperty.name.replace(INHERIT_ENTITY, inheritEntityFirstLowerName) + `For${firstCaseToUpper(abstractSourceProperty.name)}`,
        comment: abstractMappedProperty.comment.replace(INHERIT_ENTITY, inheritSourceEntity.comment),
        idViewName: abstractMappedProperty.idViewName.replace(INHERIT_ENTITY, inheritEntityFirstLowerName),
        autoSyncIdViewName: true,
        extraAnnotations: [...abstractMappedProperty.extraAnnotations],
        extraImports: [...abstractMappedProperty.extraImports],
        mappedById: newSourcePropertyId,
        nullable: abstractMappedProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
        typeIsList: abstractMappedProperty.typeIsList,
    }
    const association: ManyToOneAssociationIdOnly = {
        id: newAssociationId,
        type: "ManyToOne",
        name: abstractAssociation.nameTemplate.replace(INHERIT_ENTITY, inheritSourceEntity.name),
        useNameTemplate: true,
        comment: abstractAssociation.commentTemplate.replace(INHERIT_ENTITY, inheritSourceEntity.comment),
        useCommentTemplate: true,
        sourceEntityId: inheritSourceEntity.id,
        sourcePropertyId: newSourcePropertyId,
        referencedEntityId: abstractSourceProperty.referencedEntityId,
        withMappedProperty:  abstractAssociation.withMappedProperty,
        mappedProperty,
        foreignKeyType: abstractAssociation.foreignKeyType,
    }

    return {
        association,
        sourceProperty,
        mappedProperty,
    }
}