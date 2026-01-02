import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";

export const MODEL: Model = {
    id: testIds.MODEL,
    name: "MODEL",
    description: "TestModel",
    createdTime: "",
    modifiedTime: "",
    databaseType: "POSTGRESQL",
    databaseNameStrategy: "LOWER_SNAKE",
    defaultForeignKeyType: "REAL",
    jvmLanguage: "KOTLIN",
    defaultEnumerationStrategy: "NAME",
}
