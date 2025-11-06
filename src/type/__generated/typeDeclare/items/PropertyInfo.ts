export default Object.freeze({
    fileName: 'PropertyInfo.d.ts',
    content: `type PropertyInfo = {
    raw: DeepReadonly<Property>
    name: string
    comment: string
    type: string
    annotations: string[]
    nullable: boolean
    body?: string
}`,
})
