export default {
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
    enumName: string
    logicalDeleteDefaultValue: string
    logicalDeleteDeletedValue: string
} | {
    logicalDelete: false
}`,
}
