export default Object.freeze({
    fileName: 'ScalarLogicalDeleteProperty.d.ts',
    content: `type ScalarLogicalDeleteProperty = {
    logicalDelete: true
} & ({
    logicalDeleteType: 'boolean'
    logicalDeleteDefaultValue: boolean
} | {
    logicalDeleteType: 'int'
} | {
    logicalDeleteType: 'long'
} | {
    logicalDeleteType: 'uuid'
} | {
    logicalDeleteType: 'time'
    logicalDeleteDeletedValue: 'now' | 'null'
    nullable: true
})`,
})
