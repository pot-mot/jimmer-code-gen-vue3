type SqlToJvm = (rawType: string, nullable: boolean) => JvmType
type JvmToSql = (rawType: string) => SqlType
type JvmToTs = (rawType: string) => TsType
