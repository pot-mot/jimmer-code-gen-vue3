export default Object.freeze({
    fileName: 'OptionalLogicalDeleteProperty.d.ts',
    content: `type OptionalLogicalDeleteProperty = {
    logicalDelete: true
    logicalDeleteType: 'boolean'
    logicalDeleteDefaultValue: 'true' | 'false'
} | {
    logicalDelete: true
    logicalDeleteType: 'int'
} | {
    logicalDelete: true
    logicalDeleteType: 'long'
} | {
    logicalDelete: true
    logicalDeleteType: 'uuid'
} | {
    logicalDelete: true
    logicalDeleteType: 'time'
    logicalDeleteDeletedValue: 'now' | 'null'
    nullable: true
} | {
    logicalDelete: true
    logicalDeleteType: 'enum'
    logicalDeleteDefaultValue: string
    logicalDeleteDeletedValue: string
} | {
    logicalDelete: false
}`,
})
