import MyTypeGeneratorDeclare from "./MyTypeGenerator.ts";

export const scriptTypeDeclares = Object.freeze({
    MyTypeGenerator: MyTypeGeneratorDeclare,
})

export type ScriptTypeName = keyof typeof scriptTypeDeclares
