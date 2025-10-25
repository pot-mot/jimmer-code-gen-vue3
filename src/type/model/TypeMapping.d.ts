type JvmSource = JvmLanguage | "BOTH"

type DatabaseSource = DatabaseType | "ANY"

type SqlType = {
    type: string
    dataSize?: number
    numericPrecision?: number
    defaultValue?: string
}

type JvmType = {
    typeExpression: string
    serialized: boolean
    extraImports: string[]
    extraAnnotations: string[]
}

type TsType = {
    typeExpression: string
    extraImports: {
        name: string
        fromPath: string
    }[]
}

type CrossType = {
    id: string
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    sqlType: SqlType
    jvmType: JvmType
    tsType: TsType
}

type JvmToSqlMappingRule = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    matchRegExp: string
    result: SqlType
}

type SqlToJvmMappingRule = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    matchRegExp: string
    result: JvmType
}

type JvmToTsMappingRule = {
    jvmSource: JvmSource
    matchRegExp: string
    result: TsType
}
