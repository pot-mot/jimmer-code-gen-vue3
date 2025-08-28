import {registerTypeDeclareFile} from "@/components/code/templateEditor/ts-script-executor.ts";

export default () => {
    registerTypeDeclareFile('MyType.d.ts', `type MyType = {
    name: string
}`)
}
