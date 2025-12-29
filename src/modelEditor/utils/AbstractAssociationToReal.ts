import {createId} from "@/modelEditor/useModelEditor.ts";
import type {
    ManyToManyAbstractMappedPropertyInfo,
    OneToManyAbstractMappedPropertyInfo,
    OneToOneAbstractMappedPropertyInfo
} from "@/modelEditor/utils/MappedPropertyInfo.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {
    tmpl_fkComment,
    tmpl_fkName,
    tmpl_mappedPropertyComment,
    tmpl_idView,
    tmpl_mappedPropertyName,
    tmpl_midTableComment,
    tmpl_midTableName
} from "@/modelEditor/utils/AssociationTemplate.ts";

export const oneToOneAbstractToReal = (
    abstractPropertyInfo: DeepReadonly<OneToOneAbstractMappedPropertyInfo>,
    inheritSourceEntity: DeepReadonly<{id: string, name: string, comment: string}>,
    referencedEntity: DeepReadonly<{id: string, name: string, comment: string}>,
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

    let sourceProperty: OneToOneSourceProperty
    if (abstractSourceProperty.joinInfo.type === "SingleColumn" || abstractSourceProperty.joinInfo.type === "MultiColumn" || abstractSourceProperty.joinInfo.type === "Unknown") {
        sourceProperty = {
            id: newSourcePropertyId,
            associationId: newAssociationId,
            category: "OneToOne_Source",
            typeIsList: false,
            name: abstractSourceProperty.name,
            comment: abstractSourceProperty.comment,
            idViewName: abstractSourceProperty.idViewName,
            idViewNameTemplate: abstractSourceProperty.idViewNameTemplate,
            useIdViewNameTemplate: abstractSourceProperty.useIdViewNameTemplate,
            extraAnnotations: [...abstractSourceProperty.extraAnnotations],
            extraImports: [...abstractSourceProperty.extraImports],
            nullable: abstractSourceProperty.nullable,
            referencedEntityId: abstractSourceProperty.referencedEntityId,
            onDissociateAction: abstractSourceProperty.onDissociateAction,
            joinInfo: cloneDeepReadonlyRaw<FkJoinInfo>(abstractSourceProperty.joinInfo),
            autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
        }
    } else {
        sourceProperty = {
            id: newSourcePropertyId,
            associationId: newAssociationId,
            category: "OneToOne_Source",
            typeIsList: false,
            name: abstractSourceProperty.name,
            comment: abstractSourceProperty.comment,
            idViewName: abstractSourceProperty.idViewName,
            idViewNameTemplate: abstractSourceProperty.idViewNameTemplate,
            useIdViewNameTemplate: abstractSourceProperty.useIdViewNameTemplate,
            extraAnnotations: [...abstractSourceProperty.extraAnnotations],
            extraImports: [...abstractSourceProperty.extraImports],
            nullable: true,
            referencedEntityId: abstractSourceProperty.referencedEntityId,
            onDissociateAction: abstractSourceProperty.onDissociateAction,
            joinInfo: cloneDeepReadonlyRaw<MidTableJoinInfo>(abstractSourceProperty.joinInfo),
            autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
        }
    }

    const associationIsFk = sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn"
    const mappedPropertyName = tmpl_mappedPropertyName(abstractMappedProperty.nameTemplate, inheritSourceEntity, sourceProperty)
    const mappedProperty: OneToOneMappedProperty = {
        id: newMappedPropertyId,
        associationId: newAssociationId,
        category: "OneToOne_Mapped",
        name: mappedPropertyName,
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: tmpl_mappedPropertyComment(abstractMappedProperty.commentTemplate, inheritSourceEntity, sourceProperty),
        commentTemplate: abstractMappedProperty.commentTemplate,
        useCommentTemplate: true,
        idViewName: tmpl_idView(abstractMappedProperty.idViewNameTemplate, {name: mappedPropertyName}),
        idViewNameTemplate: abstractMappedProperty.idViewNameTemplate,
        useIdViewNameTemplate: true,
        extraAnnotations: [...abstractMappedProperty.extraAnnotations],
        extraImports: [...abstractMappedProperty.extraImports],
        mappedById: newSourcePropertyId,
        typeIsList: abstractMappedProperty.typeIsList,
        nullable: abstractMappedProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
    }
    const association: OneToOneAssociationIdOnly = {
        id: newAssociationId,
        type: "OneToOne",
        name: associationIsFk ?
            tmpl_fkName(abstractAssociation.nameTemplate, inheritSourceEntity, sourceProperty) :
            tmpl_midTableName(abstractAssociation.nameTemplate, inheritSourceEntity, referencedEntity),
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: associationIsFk ?
            tmpl_fkComment(abstractAssociation.commentTemplate, inheritSourceEntity, sourceProperty) :
            tmpl_midTableComment(abstractAssociation.commentTemplate, inheritSourceEntity, referencedEntity),
        commentTemplate: abstractAssociation.commentTemplate,
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
    referencedEntity: DeepReadonly<{id: string, name: string, comment: string}>,
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

    let sourceProperty: ManyToOneProperty
    if (abstractSourceProperty.joinInfo.type === "SingleColumn" || abstractSourceProperty.joinInfo.type === "MultiColumn" || abstractSourceProperty.joinInfo.type === "Unknown") {
        sourceProperty = {
            id: newSourcePropertyId,
            associationId: newAssociationId,
            category: "ManyToOne",
            typeIsList: false,
            name: abstractSourceProperty.name,
            comment: abstractSourceProperty.comment,
            idViewName: abstractSourceProperty.idViewName,
            idViewNameTemplate: abstractSourceProperty.idViewNameTemplate,
            useIdViewNameTemplate: abstractSourceProperty.useIdViewNameTemplate,
            extraAnnotations: [...abstractSourceProperty.extraAnnotations],
            extraImports: [...abstractSourceProperty.extraImports],
            nullable: abstractSourceProperty.nullable,
            referencedEntityId: abstractSourceProperty.referencedEntityId,
            onDissociateAction: abstractSourceProperty.onDissociateAction,
            joinInfo: cloneDeepReadonlyRaw<FkJoinInfo>(abstractSourceProperty.joinInfo),
            autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
        }
    } else {
        sourceProperty = {
            id: newSourcePropertyId,
            associationId: newAssociationId,
            category: "ManyToOne",
            typeIsList: false,
            name: abstractSourceProperty.name,
            comment: abstractSourceProperty.comment,
            idViewName: abstractSourceProperty.idViewName,
            idViewNameTemplate: abstractSourceProperty.idViewNameTemplate,
            useIdViewNameTemplate: abstractSourceProperty.useIdViewNameTemplate,
            extraAnnotations: [...abstractSourceProperty.extraAnnotations],
            extraImports: [...abstractSourceProperty.extraImports],
            nullable: true,
            referencedEntityId: abstractSourceProperty.referencedEntityId,
            onDissociateAction: abstractSourceProperty.onDissociateAction,
            joinInfo: cloneDeepReadonlyRaw<MidTableJoinInfo>(abstractSourceProperty.joinInfo),
            autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
        }
    }

    const associationIsFk = sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn"
    const mappedPropertyName = tmpl_mappedPropertyName(abstractMappedProperty.nameTemplate, inheritSourceEntity, sourceProperty)
    const mappedProperty: OneToManyProperty = {
        id: newMappedPropertyId,
        associationId: newAssociationId,
        category: "OneToMany",
        name: mappedPropertyName,
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: tmpl_mappedPropertyComment(abstractMappedProperty.commentTemplate, inheritSourceEntity, sourceProperty),
        commentTemplate: abstractMappedProperty.commentTemplate,
        useCommentTemplate: true,
        idViewName: tmpl_idView(abstractMappedProperty.idViewNameTemplate, {name: mappedPropertyName}),
        idViewNameTemplate: abstractMappedProperty.idViewNameTemplate,
        useIdViewNameTemplate: true,
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
        name: associationIsFk ?
            tmpl_fkName(abstractAssociation.nameTemplate, inheritSourceEntity, sourceProperty) :
            tmpl_midTableName(abstractAssociation.nameTemplate, inheritSourceEntity, referencedEntity),
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: associationIsFk ?
            tmpl_fkComment(abstractAssociation.commentTemplate, inheritSourceEntity, sourceProperty) :
            tmpl_midTableComment(abstractAssociation.commentTemplate, inheritSourceEntity, referencedEntity),
        commentTemplate: abstractAssociation.commentTemplate,
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

export const manyToManyAbstractToReal = (
    abstractPropertyInfo: DeepReadonly<ManyToManyAbstractMappedPropertyInfo>,
    inheritSourceEntity: DeepReadonly<{id: string, name: string, comment: string}>,
    referencedEntity: DeepReadonly<{id: string, name: string, comment: string}>,
): {
    association: ManyToManyAssociationIdOnly
    sourceProperty: ManyToManySourceProperty
    mappedProperty: ManyToManyMappedProperty
} => {
    const {
        association: abstractAssociation,
        sourceProperty: abstractSourceProperty,
        mappedProperty: abstractMappedProperty,
    } = abstractPropertyInfo

    const newAssociationId = createId("Association")
    const newSourcePropertyId = createId("Property")
    const newMappedPropertyId = createId("Property")

    const sourceProperty: ManyToManySourceProperty = {
        id: newSourcePropertyId,
        associationId: newAssociationId,
        category: "ManyToMany_Source",
        typeIsList: true,
        name: abstractSourceProperty.name,
        comment: abstractSourceProperty.comment,
        idViewName: abstractSourceProperty.idViewName,
        idViewNameTemplate: abstractSourceProperty.idViewNameTemplate,
        useIdViewNameTemplate: abstractSourceProperty.useIdViewNameTemplate,
        extraAnnotations: [...abstractSourceProperty.extraAnnotations],
        extraImports: [...abstractSourceProperty.extraImports],
        nullable: abstractSourceProperty.nullable,
        referencedEntityId: abstractSourceProperty.referencedEntityId,
        joinInfo: cloneDeepReadonlyRaw<MidTableJoinInfo>(abstractSourceProperty.joinInfo),
        autoGenerateJoinInfo: abstractSourceProperty.autoGenerateJoinInfo,
    }

    const mappedPropertyName = tmpl_mappedPropertyName(abstractMappedProperty.nameTemplate, inheritSourceEntity, sourceProperty)
    const mappedProperty: ManyToManyMappedProperty = {
        id: newMappedPropertyId,
        associationId: newAssociationId,
        category: "ManyToMany_Mapped",
        name: mappedPropertyName,
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: tmpl_mappedPropertyComment(abstractMappedProperty.commentTemplate, inheritSourceEntity, sourceProperty),
        commentTemplate: abstractMappedProperty.commentTemplate,
        useCommentTemplate: true,
        idViewName: tmpl_idView(abstractMappedProperty.idViewNameTemplate, {name: mappedPropertyName}),
        idViewNameTemplate: abstractMappedProperty.idViewNameTemplate,
        useIdViewNameTemplate: true,
        extraAnnotations: [...abstractMappedProperty.extraAnnotations],
        extraImports: [...abstractMappedProperty.extraImports],
        mappedById: newSourcePropertyId,
        typeIsList: abstractMappedProperty.typeIsList,
        nullable: abstractMappedProperty.nullable,
        referencedEntityId: inheritSourceEntity.id,
    }

    const association: ManyToManyAssociationIdOnly = {
        id: newAssociationId,
        type: "ManyToMany",
        name: tmpl_midTableName(abstractAssociation.nameTemplate, inheritSourceEntity, referencedEntity),
        nameTemplate: abstractAssociation.nameTemplate,
        useNameTemplate: true,
        comment: tmpl_midTableComment(abstractAssociation.commentTemplate, inheritSourceEntity, referencedEntity),
        commentTemplate: abstractAssociation.commentTemplate,
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
