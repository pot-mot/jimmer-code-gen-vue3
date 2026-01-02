import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";
import {v7} from "uuid";

const NAME_PROPERTY_ID = v7()

export const ENTITY_base: EntityWithProperties = {
    id: testIds.ENTITY_base,
    groupId: testIds.GROUP_COMMON,
    name: "EntityBase",
    comment: "ENTITY_base",
    tableName: "entity_base",
    autoSyncTableName: false,
    extendsIds: [],
    extraImports: [
        "com.example.CustomEntityAnnotationEmpty",
        "com.example.CustomEntityAnnotationName"
    ],
    extraAnnotations: [
        "@CustomEntityAnnotationEmpty",
        "@CustomEntityAnnotationName(\n    name = \"ENTITY_base\"\n)"
    ],
    subPackagePath: "base",
    properties: [
        {
            id: testIds.ENTITY_base,
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
            id: NAME_PROPERTY_ID,
            name: "name",
            comment: "name comment",
            serialized: false,
            extraImports: [
                "com.example.CustomPropertyAnnotationEmpty",
                "com.example.CustomPropertyAnnotationName",
            ],
            extraAnnotations: [
                "@CustomPropertyAnnotationEmpty",
                "@CustomPropertyAnnotationName(\n    name = \"name\"\n)"
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
        {
            id: v7(),
            name: "serializedData",
            comment: "serializedData comment",
            serialized: true,
            extraImports: [
                "com.example.serial.SerializedData",
            ],
            extraAnnotations: [],
            category: "SCALAR_COMMON",
            nullable: true,
            rawType: "SerializedData",
            columnInfo: {
                name: "serialized_data",
                comment: "serialized_data comment",
                nullable: true,
                type: "text"
            },
            autoSyncColumnName: false,
        },
        {
            id: v7(),
            name: "intArray",
            comment: "intArray comment",
            serialized: true,
            extraImports: [],
            extraAnnotations: [],
            category: "SCALAR_COMMON",
            nullable: true,
            rawType: "Int",
            typeIsArray: true,
            columnInfo: {
                name: "int_array",
                comment: "int_array comment",
                nullable: true,
                type: "int[]"
            },
            autoSyncColumnName: false,
        },
        {
            id: v7(),
            name: "enumByName",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "SCALAR_ENUM",
            nullable: true,
            enumId: testIds.ENUM_name,
            columnInfo: {
                name: "enum_by_name",
                comment: "",
                nullable: true,
                type: "text"
            },
            autoSyncColumnName: false,
        },
        {
            id: v7(),
            name: "enumByOrdinal",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "SCALAR_ENUM",
            nullable: true,
            enumId: testIds.ENUM_ordinal,
            columnInfo: {
                name: "enum_by_ordinal",
                comment: "",
                nullable: true,
                type: "smallint"
            },
            autoSyncColumnName: false,
        },
        {
            id: v7(),
            name: "upperName",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            nullable: false,
            rawType: "String",
            category: "FORMULA_GETTER",
            dependencies: [NAME_PROPERTY_ID],
            body: "return name.uppercase()"
        },
        {
            id: v7(),
            name: "lowerName",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            nullable: false,
            rawType: "String",
            category: "FORMULA_SQL",
            sql: "lower(name)",
        },
        {
            id: v7(),
            name: "transientName",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "TRANSIENT",
            nullable: false,
            rawType: "String",
        },
        {
            id: v7(),
            name: "transientBaseEntity",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "TRANSIENT",
            referencedEntityId: testIds.ENTITY_base,
            typeIsList: false,
            nullable: true,
            resolver: "com.example.transient.BaseEntityTransientResolver"
        },
        {
            id: v7(),
            name: "transientBaseEntityByRef",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "TRANSIENT",
            referencedEntityId: testIds.ENTITY_base,
            typeIsList: false,
            nullable: true,
            resolver: "com.example.transient.BaseEntityTransientResolver",
            resolverRef: "BaseEntityTransientResolver",
        },
        {
            id: v7(),
            name: "transientBaseEntityList",
            comment: "",
            extraImports: [],
            extraAnnotations: [],
            category: "TRANSIENT",
            referencedEntityId: testIds.ENTITY_base,
            typeIsList: true,
            nullable: true,
            resolver: "com.example.transient.BaseEntityTransientListResolver"
        },
    ]
}
