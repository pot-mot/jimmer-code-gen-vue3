type BackEndMappingSource = "JAVA" | "KOTLIN" | "BOTH"

type BackEndToSqlTypeMapping = {
    source: BackEndMappingSource
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
    source: BackEndMappingSource
    typeRegExp: string
    javaTypeResult: {
        rawType: string
        extraImports: string[]
    }
}

type BackEndToTypeScriptTypeMapping = {
    source: BackEndMappingSource
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
    source: BackEndMappingSource
    sqlType: {
        type: string
        dataSize?: number
        numericPrecision?: number
        nullable: boolean
        defaultValue?: string
    }
    backEndType: {
        rawType: string
        extraImports: string[]
    }
}
