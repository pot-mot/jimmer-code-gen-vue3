import type {DatabaseInsertInput} from "@/api/__generated/model/static";

export const defaultDatabase = (
    databaseType: DatabaseType
): DatabaseInsertInput => {
    switch (databaseType) {
        case "MYSQL":
            return {
                type: "MYSQL",
                name: "",
                url: "jdbc:mysql://localhost:3306",
                username: "root",
                password: "",
            }

        case "POSTGRESQL":
            return {
                type: "POSTGRESQL",
                name: "",
                url: "jdbc:postgresql://localhost:5432/",
                username: "postgres",
                password: "",
            }

        case "ORACLE":
            return {
                type: "ORACLE",
                name: "",
                url: "jdbc:oracle:thin:@localhost:1521:xe",
                username: "system",
                password: "",
            }

        case "SQLSERVER":
            return {
                type: "SQLSERVER",
                name: "",
                url: "jdbc:sqlserver://localhost:1433",
                username: "sa",
                password: "",
            }

        case "H2":
            return {
                type: "H2",
                name: "",
                url: "jdbc:h2:mem:test",
                username: "sa",
                password: "",
            }

        case "SQLITE":
            return {
                type: "SQLITE",
                name: "",
                url: "jdbc:sqlite:test.db",
                username: "",
                password: "",
            }
    }
}