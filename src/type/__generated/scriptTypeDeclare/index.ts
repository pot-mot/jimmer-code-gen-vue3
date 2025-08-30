import TableGeneratorDeclare from "./items/TableGenerator.ts";

export const scriptTypeDeclares = Object.freeze({
    TableGenerator: TableGeneratorDeclare,
})

export type ScriptTypeName = keyof typeof scriptTypeDeclares
