export default Object.freeze({
    fileName: 'SqlFormulaProperty.d.ts',
    content: `type SqlFormulaProperty = {
    category: "FORMULA_SQL"
    sql: string
    rawType: string
    defaultOrderDirection?: OrderDirection
} & BaseProperty`,
})
