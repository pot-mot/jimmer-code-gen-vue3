export const getConcreteAssociationNameComment = (association: DeepReadonly<ConcreteAssociationIdOnly>) => {
    return {
        id: association.id,
        name: association.name,
        comment: association.comment,
    }
}