type BackEndMappingSource = "JAVA" | "KOTLIN" | "BOTH"

type SqlType = {
    type: string
    dataSize?: number
    numericPrecision?: number
    nullable: boolean
    defaultValue?: string
}

type BackEndType = {
    fullTypeExpression: string
    extraImports: string[]
}

type TypeScriptType = {
    fullTypeExpression: string
    extraImports: {
        name: string
        fromPath: string
    }[]
}

type CrossType = {
    id: string
    source: BackEndMappingSource
    sqlType: SqlType
    backEndType: BackEndType
    typeScriptType: TypeScriptType
}

type BackEndToSqlTypeMapping = {
    source: BackEndMappingSource
    matchRegExp: string
    result: SqlType
}

type SqlToBackEndTypeMapping = {
    source: BackEndMappingSource
    matchRegExp: string
    result: BackEndType
}

type BackEndToTypeScriptTypeMapping = {
    source: BackEndMappingSource
    matchRegExp: string
    result: TypeScriptType
}
