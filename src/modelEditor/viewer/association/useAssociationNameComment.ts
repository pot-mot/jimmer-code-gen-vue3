import {computed} from "vue";
import {getAbstractAssociationNameComment} from "@/modelEditor/viewer/association/getAbstractAssociationNameComment.ts";
import {getConcreteAssociationNameComment} from "@/modelEditor/viewer/association/getConcreteAssociationNameComment.ts";

export const useAssociationNameComment = (associationGetter: () => DeepReadonly<AssociationIdOnly> | undefined) => {
    return computed(() => {
        const association = associationGetter()
        if (!association) return
        if (association.type === "ManyToOne_Abstract" || association.type === "OneToOne_Abstract") {
            return getAbstractAssociationNameComment(association)
        } else {
            return getConcreteAssociationNameComment(association)
        }
    })
}