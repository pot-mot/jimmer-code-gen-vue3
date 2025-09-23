import {createId} from "@/modelEditor/useModelEditor.ts";

export const presetColor = [
    'rgb(80, 80, 80)',
    'rgba(150, 60, 60)',
    'rgba(200, 100, 100)',
    'rgba(150, 100, 100)',
    'rgba(115, 90, 80)',
    'rgba(200, 120, 90)',
    'rgba(180, 150, 100)',
    'rgba(100, 100, 200)',
    'rgba(130, 85, 150)',
    'rgba(100, 120, 190)',
    'rgba(100, 100, 150)',
    'rgba(100, 150, 200)',
    'rgba(90, 140, 60)',
    'rgba(100, 150, 100)',
    'rgba(100, 150, 150)',
    'rgba(70, 140, 110)',
]

export const defaultIdProperty = (): IdProperty => ({
    id: createId("Property"),
    name: "id",
    comment: "",
    category: "ID",
    rawType: "String",
    nullable: false,
    extraImports: [],
    extraAnnotations: [],
    typeIsArray: false,
    columnInfo: {
        name: "id",
        comment: 'id',
        nullable: false,
        type: "varchar(255)",
        dataSize: 255,
    }
})

export const defaultScalarProperty = (): ScalarProperty => ({
    id: createId("Property"),
    name: "property",
    comment: "",
    category: "SCALAR",
    rawType: "String",
    nullable: false,
    serialized: false,
    extraImports: [],
    extraAnnotations: [],
    typeIsArray: false,
    columnInfo: {
        name: "column",
        comment: '',
        nullable: false,
        type: "varchar(255)",
        dataSize: 255,
    }
})

export const defaultEntity = (groupId: string): EntityWithProperties => ({
    groupId,
    id: createId("Entity"),
    name: "Entity",
    comment: "",
    subPackagePath: "",
    tableName: "",
    extendsIds: [],
    extraImports: [],
    extraAnnotations: [],
    properties: [
        defaultIdProperty(),
        defaultScalarProperty()
    ]
})

export const defaultMappedSuperClass = (groupId: string): MappedSuperClassWithProperties => ({
    groupId,
    id: createId("MappedSuperClass"),
    name: "BaseEntity",
    comment: "",
    subPackagePath: "",
    extendsIds: [],
    extraImports: [],
    extraAnnotations: [],
    properties: [
        defaultScalarProperty()
    ]
})

export const defaultEnumerationItem = (): EnumerationItem => ({
    id: createId("EnumerationItem"),
    name: "Item",
    ordinal: 1,
    comment: "",
    extraImports: [],
    extraAnnotations: [],
})

export const defaultEnumeration = (groupId: string): Enumeration => ({
    groupId,
    id: createId("Enumeration"),
    name: "Enumeration",
    comment: "",
    subPackagePath: "",
    extraImports: [],
    extraAnnotations: [],
    strategy: "DEFAULT",
    items: [
        defaultEnumerationItem()
    ]
})

export const defaultEmbeddableType = (groupId: string): EmbeddableTypeWithProperties => ({
    groupId,
    id: createId("EmbeddableType"),
    name: "EmbeddableType",
    comment: "",
    subPackagePath: "",
    extraImports: [],
    extraAnnotations: [],
    properties: [
        defaultScalarProperty()
    ]
})

export const defaultGroup = (): Group => ({
    id: createId("Group"),
    name: "Group",
    comment: "",
    color: presetColor[0],
    basePackagePath: "",
    baseTableSchema: ""
})

export const defaultModel = (): ModelContextData => ({
    model: {
        id: createId("Model"),
        name: "Model",
        description: "",
        createdTime: "",
        modifiedTime: "",
        database: "POSTGRESQL",
        language: "KOTLIN"
    },
    entityMap: new Map(),
    mappedSuperClassMap: new Map(),
    embeddableTypeMap: new Map(),
    enumerationMap: new Map(),
    groupMap: new Map(),
    associationMap: new Map(),
    types: [],
})
