type AssociationType = 'ONE TO ONE' | 'ONE TO MANY' | 'MANY TO ONE' | 'MANY TO MANY'

type AssociationDeclare = {
    id: string
    type: AssociationType
    sourceEntityId: string
    targetEntityId: string
    sourcePropertyId: string
    targetPropertyId: string
}
