import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {
    translateAbstractFkCommentTemplate,
    translateAbstractFkNameTemplate
} from "@/type/context/utils/AssociationTemplate.ts";

export const getAbstractAssociationNameComment = (association: DeepReadonly<AbstractAssociationIdOnly>) => {
    const {contextData} = useModelEditor()
    const sourceAbstractEntity = contextData.value.mappedSuperClassMap.get(association.sourceAbstractEntityId)
    if (!sourceAbstractEntity) return
    const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === association?.sourcePropertyId)
    if (!sourceProperty) return

    let name = translateAbstractFkNameTemplate(association.nameTemplate, {name: `$${sourceAbstractEntity.name}$`}, sourceProperty)
    let comment = translateAbstractFkCommentTemplate(association.commentTemplate, sourceAbstractEntity, sourceProperty)

    return {
        id: association.id,
        name,
        comment,
    }
}