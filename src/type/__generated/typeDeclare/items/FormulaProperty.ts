export default {
    fileName: 'FormulaProperty.d.ts',
    content: `type FormulaProperty = {
    category: "Formula"
    dependencies: string[]
    body: string
    rawType: string
} | {
    category: "Formula"
    sql: string
    rawType: string
} & BaseProperty`,
}
