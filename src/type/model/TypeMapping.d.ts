type JvmSource = JvmLanguage | "ANY"

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

type JvmToTsMappingRule = {
    jvmSource: JvmSource
    matchRegExp: string
    result: TsType
}

type SqlToJvmMappingRule = {
    databaseSource: DatabaseSource
    jvmSource: JvmSource
    matchRegExp: string
    result: JvmType
}

type SqlToTsMappingRule = {
    databaseSource: DatabaseSource
    matchRegExp: string
    result: TsType
}

type TsToJvmMappingRule = {
    jvmSource: JvmSource
    matchRegExp: string
    result: JvmType
}

type TsToSqlMappingRule = {
    databaseSource: DatabaseSource
    matchRegExp: string
    result: SqlType
}

type JvmToSqlMatchRule = {
    jvmSource: JvmSource
    matchRegExp: string
}

type JvmToTsMatchRule = {
    jvmSource: JvmSource
    matchRegExp: string
}

type SqlToJvmMatchRule = {
    databaseSource: DatabaseSource
    matchRegExp: string
}

type SqlToTsMatchRule = {
    databaseSource: DatabaseSource
    matchRegExp: string
}

type TsToJvmMatchRule = {
    matchRegExp: string
}

type TsToSqlMatchRule = {
    matchRegExp: string
}
