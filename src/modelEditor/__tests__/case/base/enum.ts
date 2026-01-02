import {v7} from "uuid";
import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";

export const ENUM_name: Enumeration = {
    id: testIds.ENUM_name,
    groupId: testIds.GROUP_COMMON,
    subPackagePath: "enum.name",
    name: "EnumByName",
    comment: "ENUM_name",
    extraImports: [
        "com.example.CustomEnumAnnotationEmpty",
        "com.example.CustomEnumAnnotationName"
    ],
    extraAnnotations: [
        "@CustomEnumAnnotationEmpty",
        "@CustomEnumAnnotationName(\n    name = \"ENUM_name\"\n)"
    ],
    strategy: "NAME",
    items: [
        {
            id: v7(),
            name: "NAME1",
            comment: "name1 comment",
            ordinal: 1,
            extraImports: [
                "com.example.CustomEnumItemAnnotationEmpty",
                "com.example.CustomEnumItemAnnotationName"
            ],
            extraAnnotations: [
                "@CustomEnumItemAnnotationEmpty",
                "@CustomEnumItemAnnotationName(\n    name = \"NAME1\"\n)"
            ],
        },
        {
            id: v7(),
            name: "NAME2",
            comment: "name2 comment",
            ordinal: 2,
            extraImports: [],
            extraAnnotations: [],
        },
    ]
}

export const ENUM_ordinal: Enumeration = {
    id: testIds.ENUM_ordinal,
    groupId: testIds.GROUP_COMMON,
    subPackagePath: "enum.ordinal",
    name: "EnumByOrdinal",
    comment: "ENUM_ordinal",
    extraImports: [
        "com.example.CustomEnumAnnotationEmpty",
        "com.example.CustomEnumAnnotationName"
    ],
    extraAnnotations: [
        "@CustomEnumAnnotationEmpty",
        "@CustomEnumAnnotationName(\n    name = \"ENUM_ordinal\"\n)"
    ],
    strategy: "ORDINAL",
    items: [
        {
            id: v7(),
            name: "NAME1",
            comment: "name1 comment",
            ordinal: 1,
            extraImports: [],
            extraAnnotations: [],
        },
        {
            id: v7(),
            name: "NAME2",
            comment: "name2 comment",
            ordinal: 2,
            extraImports: [],
            extraAnnotations: [],
        },
    ]
}
