import {registerTypeDeclareFile} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

export default () => {
    registerTypeDeclareFile('MyType.d.ts', `type MyType = {
    name: string
}`)
}
