export default {
    fileName: 'Column.d.ts',
    content: `type Column = {
    id: string
    name: string,
    comment: string,
    type: string,
    dataSize?: number,
    numericPrecision?: number,
    nullable: boolean,
    defaultValue: string,
    partOfPrimaryKey: boolean,
    autoIncrement?: boolean,
    otherConstraints?: string[],
}`,
}
