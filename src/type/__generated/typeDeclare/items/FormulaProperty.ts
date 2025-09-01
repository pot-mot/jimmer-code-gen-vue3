export default {
    fileName: 'FormulaProperty.d.ts',
    content: `type FormulaProperty = {
    category: "FORMULA"
    dependencies: string[]
    body: string
    rawType: string
} | {
    category: "FORMULA"
    sql: string
    rawType: string
} & BaseProperty`,
}
