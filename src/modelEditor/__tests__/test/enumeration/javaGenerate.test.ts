import {describe, it} from "vitest";
import {javaEnumerationGenerator} from "@/modelEditor/script/default/EnumerationGenerator/javaEnumerationGenerator.ts";
import {testData} from "@/modelEditor/__tests__/case/testData.ts";

describe("javaEnumerationGenerator", () => {
    const context = testData.CONTEXT_JAVA

    it("base", () => {
        for (const enumeration of context.enumerationMap.values()) {
            const files = javaEnumerationGenerator(enumeration, context)
            for (const filePath in files) {
                console.log(filePath)
                console.log(files[filePath])
            }
        }
    })
})
