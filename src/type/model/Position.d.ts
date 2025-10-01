type Position = {x: number, y: number}

type LabelPosition = {
    from: 'source' | 'target'
    percentage: number,
} | {
    from: 'source' | 'target'
    fixedLength: number
}