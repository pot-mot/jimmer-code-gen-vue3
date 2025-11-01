import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {nameTool} from "@/type/context/utils/NameTool.ts";

export const PROPERTY = "[[PROPERTY]]"

export const SOURCE_ENTITY = "[[SOURCE_ENTITY]]"
export const SOURCE_PROPERTY = "[[SOURCE_PROPERTY]]"
export const REFERENCED_ENTITY = "[[REFERENCED_ENTITY]]"

export const FK_NAME_TEMPLATE = `fk_${SOURCE_ENTITY}_${SOURCE_PROPERTY}`
export const FK_COMMENT_TEMPLATE = `${SOURCE_ENTITY}${SOURCE_PROPERTY}`

const getDatabaseNameStrategy = () => {
    return useModelEditor().contextData.model.databaseNameStrategy
}

export const tmpl_fkName = (
    template: string,
    sourceEntity: { name: string },
    sourceProperty: { name: string },
) => {
    return template
        .replace(SOURCE_ENTITY, nameTool.convert(sourceEntity.name, 'UPPER_CAMEL', getDatabaseNameStrategy()))
        .replace(SOURCE_PROPERTY, nameTool.convert(sourceProperty.name, 'LOWER_CAMEL', getDatabaseNameStrategy()))
}

export const tmpl_fkComment = (
    template: string,
    sourceEntity: { comment: string },
    sourceProperty: { comment: string },
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.comment)
        .replace(SOURCE_PROPERTY, sourceProperty.comment)
}

export const MID_TABLE_NAME_TEMPLATE = `${SOURCE_ENTITY}_${REFERENCED_ENTITY}_mapping`
export const MID_TABLE_COMMENT_TEMPLATE = `${SOURCE_ENTITY}${REFERENCED_ENTITY}中间表`

export const tmpl_midTableName = (
    template: string,
    sourceEntity: { name: string },
    referencedEntity: { name: string },
) => {
    return template
        .replace(SOURCE_ENTITY, nameTool.convert(sourceEntity.name, 'UPPER_CAMEL', getDatabaseNameStrategy()))
        .replace(REFERENCED_ENTITY, nameTool.convert(referencedEntity.name, 'UPPER_CAMEL', getDatabaseNameStrategy()))
}

export const tmpl_midTableComment = (
    template: string,
    sourceEntity: { comment: string },
    referencedEntity: { comment: string },
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.comment)
        .replace(REFERENCED_ENTITY, referencedEntity.comment)
}

export const ID_VIEW_TEMPLATE = `${PROPERTY}Id`
export const LIST_ID_VIEW_TEMPLATE = `${PROPERTY}Ids`

export const tmpl_idView = (
    template: string,
    property: { name: string },
) => {
    let propertyName = property.name
    if (property.name.endsWith("List")) propertyName = propertyName.substring(0, propertyName.length - 4)

    return nameTool.convert(
        template
            .replace(PROPERTY, propertyName),
        'LOWER_CAMEL',
        'LOWER_CAMEL',
    )
}

export const MAPPED_PROPERTY_NAME_TEMPLATE = `${SOURCE_ENTITY}`
export const MAPPED_PROPERTY_COMMENT_TEMPLATE = `${SOURCE_ENTITY}`

export const MAPPED_PROPERTY_LIST_NAME_TEMPLATE = `${SOURCE_ENTITY}List`
export const MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE = `${SOURCE_ENTITY}列表`

export const tmpl_mappedPropertyName = (
    template: string,
    sourceEntity: { name: string },
    sourceProperty: { name: string },
) => {
    return nameTool.convert(
        template
            .replace(SOURCE_ENTITY, sourceEntity.name)
            .replace(SOURCE_PROPERTY, sourceProperty.name),
        'LOWER_CAMEL',
        'LOWER_CAMEL',
    )
}
export const tmpl_mappedPropertyComment = (
    template: string,
    sourceEntity: { comment: string },
    sourceProperty: { comment: string },
) => {
    return template
        .replace(SOURCE_ENTITY, sourceEntity.comment)
        .replace(SOURCE_PROPERTY, sourceProperty.comment)
}
