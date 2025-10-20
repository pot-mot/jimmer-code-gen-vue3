import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {
    tmpl_fkComment, tmpl_fkName,
    tmpl_midTableComment, tmpl_midTableName
} from "@/type/context/utils/AssociationTemplate.ts";

export const getConcreteAssociationNameComment = (association: DeepReadonly<ConcreteAssociationIdOnly>) => {
    const {contextData} = useModelEditor()
    const sourceEntity = contextData.value.entityMap.get(association.sourceEntityId)
    if (!sourceEntity) return
    const sourceProperty = sourceEntity.properties.find(it => it.id === association?.sourcePropertyId)
    if (!sourceProperty) return
    const referencedEntity = contextData.value.entityMap.get(association.referencedEntityId)
    if (!referencedEntity) return
    if (!("joinInfo" in sourceProperty)) return

    let name = association.name
    if (association.useNameTemplate) {
        if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
            name = tmpl_fkName(association.nameTemplate, sourceEntity, sourceProperty)
        } else {
            name = tmpl_midTableName(association.nameTemplate, sourceEntity, referencedEntity)
        }
    }

    let comment = association.comment
    if (association.useCommentTemplate) {
        if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
            comment = tmpl_fkComment(association.commentTemplate, sourceEntity, sourceProperty)
        } else {
            comment = tmpl_midTableComment(association.commentTemplate, sourceEntity, referencedEntity)
        }
    }

    return {
        id: association.id,
        name,
        comment,
    }
}