import MyTypeGeneratorDeclare from "./MyTypeGenerator.ts";
import {registerTypeDeclareFile} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

export const scriptTypeDeclares = Object.freeze({
    MyTypeGenerator: MyTypeGeneratorDeclare,
})

export type RegisterScriptTypeName = keyof typeof scriptTypeDeclares

export const registerScriptTypeDeclare = () => {
    for (const {fileName, content} of Object.values(scriptTypeDeclares)) {
        registerTypeDeclareFile(fileName, content)
    }
}
