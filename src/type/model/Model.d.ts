type DatabaseType = "MYSQL" | "POSTGRESQL" | "ORACLE" | "SQLSERVER" | "H2" | "SQLITE"

type BackEndLanguage = "JAVA" | "KOTLIN"

type Model = {
    id: string
    name: string
    description: string
    createdTime: string
    modifiedTime: string
    database: DatabaseType
    language: BackEndLanguage
}
