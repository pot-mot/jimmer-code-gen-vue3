import {describe, it} from "vitest";
import {kotlinEnumerationGenerator} from "@/modelEditor/script/default/EnumerationGenerator/kotlinEnumerationGenerator.ts";
import {testData} from "@/modelEditor/__tests__/case/testData.ts";

describe("kotlinEnumerationGenerator", () => {
    const context = testData.CONTEXT_KOTLIN

    it("base", () => {
        for (const enumeration of context.enumerationMap.values()) {
            const files = kotlinEnumerationGenerator(enumeration, context)
            for (const filePath in files) {
                console.log(filePath)
                console.log(files[filePath])
            }
        }
    })
})
