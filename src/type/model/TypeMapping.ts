type BackEndMappingSource = "JAVA" | "KOTLIN" | "BOTH"

type BackEndToSqlTypeMapping = {
    backEndType: BackEndMappingSource
    typeRegExp: string
    sqlTypeResult: {
        type: string
        dataSize?: number
        numericPrecision?: number
        nullable: boolean
        defaultValue?: string
    }
}

type SqlToBackEndTypeMapping = {
    backEndType: BackEndMappingSource
    typeRegExp: string
    javaTypeResult: {
        rawType: string
        extraImports: string[]
    }
}

type JavaToTypeScriptTypeMapping = {
    backEndType: BackEndMappingSource
    typeRegExp: string
    tsTypeResult: {
        rawType: string
        extraImports: {
            name: string
            fromPath: string
        }[]
    }
}

type TypeSelectPair = {
    sqlType: {
        type: string
        dataSize?: number
        numericPrecision?: number
        nullable: boolean
        defaultValue?: string
    }
    javaType: {
        rawType: string
        extraImports: string[]
    }
}
