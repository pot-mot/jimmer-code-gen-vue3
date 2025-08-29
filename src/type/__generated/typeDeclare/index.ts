import MyTypeDeclare from './MyType.ts'
import {registerTypeDeclareFile} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

export const typeDeclares = Object.freeze({
    MyType: MyTypeDeclare,
})

export type RegisterTypeName = keyof typeof typeDeclares

export const registerTypeDeclare = () => {
    for (const {fileName, content} of Object.values(typeDeclares)) {
        registerTypeDeclareFile(fileName, content)
    }
}