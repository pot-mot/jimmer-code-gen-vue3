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

type TsImport = {
    name: string
    fromPath: string
    typeOnly: boolean
}

type TsType = {
    typeExpression: string
    extraImports: TsImport[]
}

type CrossType = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    sqlType: SqlType
    jvmType: JvmType
    tsType: TsType
}

type CrossType_IdOnly = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    sqlTypeId: string
    jvmTypeId: string
    tsTypeId: string
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

type JvmMatchRule = {
    jvmSource: JvmSource
    matchRegExp: string
}

type SqlMatchRule = {
    databaseSource: DatabaseSource
    matchRegExp: string
}

type TsMatchRule = {
    matchRegExp: string
}
