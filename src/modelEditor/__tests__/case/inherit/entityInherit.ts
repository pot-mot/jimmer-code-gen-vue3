import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";

export const BASE_ENTITY_1: MappedSuperClassWithProperties = {
    id: testIds.BASE_ENTITY_1,
    groupId: testIds.GROUP_COMMON,
    name: "BaseEntity1",
    comment: "",
    extendsIds: [],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.BASE_ENTITY_1,
            name: "name",
            comment: "name comment",
            serialized: false,
            extraImports: [
                "com.example.CustomPropertyAnnotationName",
            ],
            extraAnnotations: [
                "@CustomPropertyAnnotationName(name = \"name\")"
            ],
            key: true,
            keyGroups: ["name_unique"],
            category: "SCALAR_COMMON",
            nullable: false,
            rawType: "String",
            columnInfo: {
                name: "name",
                comment: "name comment",
                nullable: false,
                type: "text"
            },
            autoSyncColumnName: false,
        },
    ]
}

export const BASE_ENTITY_1_1: MappedSuperClassWithProperties = {
    id: testIds.BASE_ENTITY_1_1,
    groupId: testIds.GROUP_COMMON,
    name: "BaseEntity11",
    comment: "",
    extendsIds: [testIds.BASE_ENTITY_1],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.BASE_ENTITY_1_1,
            name: "name11",
            comment: "name11 comment",
            serialized: false,
            extraImports: [
                "com.example.CustomPropertyAnnotationName",
            ],
            extraAnnotations: [
                "@CustomPropertyAnnotationName(name = \"name11\")"
            ],
            category: "SCALAR_COMMON",
            nullable: false,
            rawType: "String",
            columnInfo: {
                name: "name11",
                comment: "name11 comment",
                nullable: false,
                type: "text"
            },
            autoSyncColumnName: false,
        },
    ]
}

export const BASE_ENTITY_1_2: MappedSuperClassWithProperties = {
    id: testIds.BASE_ENTITY_1_2,
    groupId: testIds.GROUP_COMMON,
    name: "BaseEntity12",
    comment: "",
    extendsIds: [testIds.BASE_ENTITY_1],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.BASE_ENTITY_1_2,
            name: "name12",
            comment: "name12 comment",
            serialized: false,
            extraImports: [
                "com.example.CustomPropertyAnnotationName",
            ],
            extraAnnotations: [
                "@CustomPropertyAnnotationName(name = \"name12\")"
            ],
            category: "SCALAR_COMMON",
            nullable: false,
            rawType: "String",
            columnInfo: {
                name: "name12",
                comment: "name12 comment",
                nullable: false,
                type: "text"
            },
            autoSyncColumnName: false,
        },
    ]
}

export const BASE_ENTITY_1_3: MappedSuperClassWithProperties = {
    id: testIds.BASE_ENTITY_1_3,
    groupId: testIds.GROUP_COMMON,
    name: "BaseEntity13",
    comment: "",
    extendsIds: [testIds.BASE_ENTITY_1],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.BASE_ENTITY_1_3,
            name: "name13",
            comment: "name13 comment",
            serialized: false,
            extraImports: [
                "com.example.CustomPropertyAnnotationName",
            ],
            extraAnnotations: [
                "@CustomPropertyAnnotationName(name = \"name12\")"
            ],
            category: "SCALAR_COMMON",
            nullable: true,
            rawType: "String",
            columnInfo: {
                name: "name13",
                comment: "name13 comment",
                nullable: true,
                type: "text"
            },
            autoSyncColumnName: false,
        },
    ]
}

export const ENTITY_extends_1: EntityWithProperties = {
    id: testIds.ENTITY_extends_1,
    groupId: testIds.GROUP_COMMON,
    name: "EntityExtends1",
    comment: "",
    tableName: "entity_extends_1",
    autoSyncTableName: false,
    extendsIds: [testIds.BASE_ENTITY_1],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.ENTITY_extends_1,
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
    ]
}

export const ENTITY_extends_1_1: EntityWithProperties = {
    id: testIds.ENTITY_extends_1_1,
    groupId: testIds.GROUP_COMMON,
    name: "EntityExtends11",
    comment: "",
    tableName: "entity_extends_1_1",
    autoSyncTableName: false,
    extendsIds: [testIds.BASE_ENTITY_1_1],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.ENTITY_extends_1_1,
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
    ]
}

export const ENTITY_extends_1_2__1_3: EntityWithProperties = {
    id: testIds.ENTITY_extends_1_2__1_3,
    groupId: testIds.GROUP_COMMON,
    name: "EntityExtends12_13",
    comment: "",
    tableName: "entity_extends_1_2__1_3",
    autoSyncTableName: false,
    extendsIds: [testIds.BASE_ENTITY_1_2, testIds.BASE_ENTITY_1_3],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "inherit",
    properties: [
        {
            id: testIds.ENTITY_extends_1_2__1_3,
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
    ]
}
