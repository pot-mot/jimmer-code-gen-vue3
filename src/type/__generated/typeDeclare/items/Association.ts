export default Object.freeze({
    fileName: 'Association.d.ts',
    content: `type Association = {
    id: string
    name: string
    type: AssociationType
    sourceEntityId: string
    targetEntityId: string
    sourcePropertyId: string
    targetPropertyId: string
} & ({
    joinColumn: JoinColumn
} | {
    joinColumns: JoinColumn[]
} | {
    joinTable: JoinTable
})`,
})
