export const defaultCrossTypes: CrossType[] =[
    {
        jvmSource: "ANY",
        databaseSource: "ANY",
        sqlType: {
            type: "VARCHAR(255)",
            dataSize: 255,
        },
        jvmType: {
            typeExpression: "String",
            serialized: false,
            extraImports: [],
            extraAnnotations: []
        },
        tsType: {
            typeExpression: "string",
            extraImports: []
        }
    },
    {
        jvmSource: "JAVA",
        databaseSource: "ANY",
        sqlType: {
            type: "INT",
            dataSize: 10,
        },
        jvmType: {
            typeExpression: "int",
            serialized: false,
            extraImports: [],
            extraAnnotations: []
        },
        tsType: {
            typeExpression: "number",
            extraImports: []
        }
    },
    {
        jvmSource: "KOTLIN",
        databaseSource: "ANY",
        sqlType: {
            type: "INT",
            dataSize: 10,
        },
        jvmType: {
            typeExpression: "Int",
            serialized: false,
            extraImports: [],
            extraAnnotations: []
        },
        tsType: {
            typeExpression: "number",
            extraImports: []
        }
    }
]
