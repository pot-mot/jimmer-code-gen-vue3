export default Object.freeze({
    fileName: 'SqlType.d.ts',
    content: `type SqlType = {
    type: string
    dataSize?: number
    numericPrecision?: number
    nullable: boolean
    defaultValue?: string
}`,
})
