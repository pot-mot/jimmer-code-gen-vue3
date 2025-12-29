import {computed} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {
    tmp_abstractMidTableName,
    tmpl_abstractFkName,
    tmpl_fkComment,
    tmpl_midTableComment,
} from "@/modelEditor/utils/AssociationTemplate.ts";

const getAbstractNameComment = (association: DeepReadonly<AbstractAssociation>) => {
    const sourceAbstractEntity = association.sourceAbstractEntity
    const sourceProperty = association.sourceProperty

    let name: string
    let comment: string
    if (association.type === "ManyToMany_Abstract" || sourceProperty.joinInfo.type === "MidTable") {
        const referencedEntity = association.referencedEntity

        name = tmp_abstractMidTableName(
            association.nameTemplate,
            {name: sourceAbstractEntity.name},
            {name: referencedEntity.name}
        )
        comment = tmpl_midTableComment(
            association.commentTemplate,
            {comment: `$${sourceAbstractEntity.comment}$`},
            {comment: referencedEntity.comment}
        )
    } else {
        name = tmpl_abstractFkName(
            association.nameTemplate,
            {name: sourceAbstractEntity.name},
            {name: sourceProperty.name}
        )
        comment = tmpl_fkComment(
            association.commentTemplate,
            {comment: `$${sourceAbstractEntity.comment}$`},
            {comment: sourceProperty.comment}
        )
    }

    return {
        id: association.id,
        name,
        comment,
    }
}

const getAbstractIdOnlyNameComment = (association: DeepReadonly<AbstractAssociationIdOnly>) => {
    const {contextData} = useModelEditor()
    const sourceAbstractEntity = contextData.mappedSuperClassMap.get(association.sourceAbstractEntityId)
    const sourceProperty = sourceAbstractEntity?.properties.find(it => it.id === association?.sourcePropertyId)

    let name: string
    let comment: string
    if (
        association.type === "ManyToMany_Abstract" ||
        (sourceProperty !== undefined && "joinInfo" in sourceProperty && sourceProperty.joinInfo.type === "MidTable")
    ) {
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (!referencedEntity) return

        name = tmp_abstractMidTableName(
            association.nameTemplate,
            {name: sourceAbstractEntity ? sourceAbstractEntity.name : '[NOT_EXISTED]'},
            {name: referencedEntity ? referencedEntity.name : '[NOT_EXISTED]'}
        )
        comment = tmpl_midTableComment(
            association.commentTemplate,
            {comment: sourceAbstractEntity ? `$${sourceAbstractEntity.comment}$` : '[NOT_EXISTED]'},
            {comment: referencedEntity ? referencedEntity.comment : '[NOT_EXISTED]'}
        )
    } else {
        name = tmpl_abstractFkName(
            association.nameTemplate,
            {name: sourceAbstractEntity ? sourceAbstractEntity.name : '[NOT_EXISTED]'},
            {name: sourceProperty ? sourceProperty.name : '[NOT_EXISTED]'}
        )
        comment = tmpl_fkComment(
            association.commentTemplate,
            {comment: sourceAbstractEntity ? `$${sourceAbstractEntity.comment}$` : '[NOT_EXISTED]'},
            {comment: sourceProperty ? sourceProperty.comment : '[NOT_EXISTED]'}
        )
    }

    return {
        id: association.id,
        name,
        comment,
    }
}

export const useIdViewNameComment = (associationGetter: () => DeepReadonly<AssociationIdOnly> | undefined) => {
    return computed(() => {
        const association = associationGetter()
        if (!association) return
        if (association.type === "ManyToOne_Abstract" || association.type === "OneToOne_Abstract" || association.type === "ManyToMany_Abstract") {
            return getAbstractIdOnlyNameComment(association)
        } else {
            return {
                id: association.id,
                name: association.name,
                comment: association.comment,
            }
        }
    })
}

export const useNameComment = (associationGetter: () => DeepReadonly<Association> | undefined) => {
    return computed(() => {
        const association = associationGetter()
        if (!association) return
        if (association.type === "ManyToOne_Abstract" || association.type === "OneToOne_Abstract" || association.type === "ManyToMany_Abstract") {
            return getAbstractNameComment(association)
        } else {
            return {
                id: association.id,
                name: association.name,
                comment: association.comment,
            }
        }
    })
}
