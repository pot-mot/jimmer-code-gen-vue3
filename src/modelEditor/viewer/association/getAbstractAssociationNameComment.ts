import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {
    tmpl_fkComment,
    tmpl_fkName,
    tmpl_midTableComment,
    tmpl_midTableName
} from "@/type/context/utils/AssociationTemplate.ts";

export const getAbstractAssociationNameComment = (association: DeepReadonly<AbstractAssociationIdOnly>) => {
    const {contextData} = useModelEditor()
    const sourceAbstractEntity = contextData.mappedSuperClassMap.get(association.sourceAbstractEntityId)
    if (!sourceAbstractEntity) return
    const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === association?.sourcePropertyId)
    if (!sourceProperty) return

    let name: string
    let comment: string
    if ("joinInfo" in sourceProperty && sourceProperty.joinInfo.type === "MidTable") {
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (!referencedEntity) return

        name = tmpl_midTableName(association.nameTemplate, {name: `$${sourceAbstractEntity.name}$`}, referencedEntity)
        comment = tmpl_midTableComment(association.commentTemplate, sourceAbstractEntity, referencedEntity)
    } else {
        name = tmpl_fkName(association.nameTemplate, {name: `$${sourceAbstractEntity.name}$`}, sourceProperty)
        comment = tmpl_fkComment(association.commentTemplate, sourceAbstractEntity, sourceProperty)
    }

    return {
        id: association.id,
        name,
        comment,
    }
}