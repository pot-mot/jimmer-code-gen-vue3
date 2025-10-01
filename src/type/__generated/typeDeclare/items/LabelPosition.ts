export default Object.freeze({
    fileName: 'LabelPosition.d.ts',
    content: `type LabelPosition = {
    from: 'source' | 'target'
    percentage: number,
} | {
    from: 'source' | 'target'
    fixedLength: number
}`,
})
