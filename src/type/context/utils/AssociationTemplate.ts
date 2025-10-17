import {INHERIT_ENTITY} from "@/type/context/utils/AbstractAssociationToReal.ts";

export const SOURCE_ENTITY = "[[SOURCE_ENTITY]]"
export const SOURCE_PROPERTY = "[[SOURCE_PROPERTY]]"
export const REFERENCED_ENTITY = "[[REFERENCED_ENTITY]]"
export const REFERENCED_PROPERTY = "[[REFERENCED_PROPERTY]]"

export const ASSOCIATION_FK_NAME_TEMPLATE = `fk_${SOURCE_ENTITY}_${SOURCE_PROPERTY}`
export const ASSOCIATION_FK_COMMENT_TEMPLATE = `${SOURCE_ENTITY}${SOURCE_PROPERTY}`

export const checkFkTemplate = (template: string) => {
    return template.includes(SOURCE_ENTITY) || template.includes(SOURCE_PROPERTY)
}

export const translateFkNameTemplate = (
    template: string,
    sourceEntity: {name: string},
    sourceProperty: {name: string},
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.name)
        .replace(SOURCE_PROPERTY, sourceProperty.name)
}

export const translateFkCommentTemplate = (
    template: string,
    sourceEntity: {comment: string},
    sourceProperty: {comment: string},
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.comment)
        .replace(SOURCE_PROPERTY, sourceProperty.comment)
}

export const ABSTRACT_ASSOCIATION_FK_NAME_TEMPLATE = `fk_${INHERIT_ENTITY}_${SOURCE_PROPERTY}`
export const ABSTRACT_ASSOCIATION_FK_COMMENT_TEMPLATE = `${INHERIT_ENTITY}${SOURCE_PROPERTY}`

export const translateAbstractFkNameTemplate = (
    template: string,
    sourceEntity: {name: string},
    sourceProperty: {name: string},
) => {
    return template
        .replace(INHERIT_ENTITY, sourceEntity.name)
        .replace(SOURCE_PROPERTY, sourceProperty.name)
}

export const translateAbstractFkCommentTemplate = (
    template: string,
    sourceEntity: {comment: string},
    sourceProperty: {comment: string},
) => {
    return template
        .replace(INHERIT_ENTITY, sourceEntity.comment)
        .replace(SOURCE_PROPERTY, sourceProperty.comment)
}

export const ASSOCIATION_MID_TABLE_NAME_TEMPLATE = `${SOURCE_ENTITY}_${REFERENCED_ENTITY}_mapping`
export const ASSOCIATION_MID_TABLE_COMMENT_TEMPLATE = `${SOURCE_ENTITY} - ${REFERENCED_ENTITY}`

export const checkMidTableTemplate = (template: string) => {
    return template.includes(SOURCE_ENTITY) || template.includes(REFERENCED_ENTITY)
}

export const translateMidTableNameTemplate = (
    template: string,
    sourceEntity: {name: string},
    referencedEntity: {name: string},
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.name)
        .replace(REFERENCED_ENTITY, referencedEntity.name)
}

export const translateMidTableCommentTemplate = (
    template: string,
    sourceEntity: {comment: string},
    referencedEntity: {comment: string},
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.comment)
        .replace(REFERENCED_ENTITY, referencedEntity.comment)
}
