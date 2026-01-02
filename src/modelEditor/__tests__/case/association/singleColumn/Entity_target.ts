import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";
import {v7} from "uuid";

export const ENTITY_target: EntityWithProperties = {
    id: testIds.ENTITY_target,
    groupId: testIds.GROUP_ASSOCIATION,
    name: "TargetEntity",
    comment: "",
    tableName: "entity_target",
    autoSyncTableName: false,
    extendsIds: [],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "target",
    properties: [
        {
            id: testIds.ENTITY_target,
            name: "id",
            comment: "id comment",
            extraImports: [],
            extraAnnotations: [],
            category: "ID_COMMON",
            nullable: false,
            rawType: "Int",
            columnInfo: {
                name: "id",
                comment: "id comment",
                nullable: false,
                type: "int"
            },
            autoSyncColumnName: false,
            defaultOrderDirection: "ASC"
        },
        {
            id: v7(),
            name: "name",
            comment: "name comment",
            serialized: false,
            extraImports: [],
            extraAnnotations: [],
            key: true,
            keyGroups: ["name_unique"],
            category: "SCALAR_COMMON",
            nullable: true,
            rawType: "String",
            columnInfo: {
                name: "name",
                comment: "name comment",
                nullable: true,
                type: "text"
            },
            autoSyncColumnName: false,
        },
    ]
}
