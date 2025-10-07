type NameStrategy = "UPPER_CAMEL" | "LOWER_CAMEL" | "SNAKE" |  "KEBAB"

type DatabaseType = "MYSQL" | "POSTGRESQL" | "ORACLE" | "SQLSERVER" | "H2" | "SQLITE"

type JvmLanguage = "JAVA" | "KOTLIN"

type Model = {
    id: string
    name: string
    description: string
    createdTime: string
    modifiedTime: string
    databaseType: DatabaseType
    databaseNameStrategy: NameStrategy
    jvmLanguage: JvmLanguage
}
