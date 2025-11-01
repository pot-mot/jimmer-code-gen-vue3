import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {
    tmpl_fkComment,
    tmpl_fkName
} from "@/type/context/utils/AssociationTemplate.ts";

export const getAbstractAssociationNameComment = (association: DeepReadonly<AbstractAssociationIdOnly>) => {
    const {contextData} = useModelEditor()
    const sourceAbstractEntity = contextData.mappedSuperClassMap.get(association.sourceAbstractEntityId)
    if (!sourceAbstractEntity) return
    const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === association?.sourcePropertyId)
    if (!sourceProperty) return

    let name = tmpl_fkName(association.nameTemplate, {name: `$${sourceAbstractEntity.name}$`}, sourceProperty)
    let comment = tmpl_fkComment(association.commentTemplate, sourceAbstractEntity, sourceProperty)

    return {
        id: association.id,
        name,
        comment,
    }
}