type AssociationType = 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'MANY_TO_MANY'

type Association = {
    id: string
    name: string
    type: AssociationType
    sourceEntityId: string
    targetEntityId: string
    sourcePropertyId: string
    targetPropertyId: string
}
