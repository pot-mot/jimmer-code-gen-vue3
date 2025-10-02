type JvmTypeSource = "JAVA" | "KOTLIN" | "BOTH"

type SqlType = {
    type: string
    dataSize?: number
    numericPrecision?: number
    defaultValue?: string
}

type JvmType = {
    fullTypeExpression: string
    serialized: boolean
    extraImports: string[]
    extraAnnotations: string[]
}

type TsType = {
    fullTypeExpression: string
    extraImports: {
        name: string
        fromPath: string
    }[]
}

type CrossType = {
    id: string
    source: JvmTypeSource
    sqlType: SqlType
    jvmType: JvmType
    tsType: TsType
}

type JvmToSqlMappingRule = {
    source: JvmTypeSource
    matchRegExp: string
    result: SqlType
}

type SqlToJvmMappingRule = {
    source: JvmTypeSource
    matchRegExp: string
    result: JvmType
}

type JvmToTsMappingRule = {
    source: JvmTypeSource
    matchRegExp: string
    result: TsType
}
