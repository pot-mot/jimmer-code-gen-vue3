import {createId} from "@/modelEditor/useModelEditor.ts";

export const defaultColor = "rgb(80, 80, 80)"

export const presetColor = [
    defaultColor,
    'rgb(150, 60, 60)',
    'rgb(200, 100, 100)',
    'rgb(150, 100, 100)',
    'rgb(115, 90, 80)',
    'rgb(200, 120, 90)',
    'rgb(180, 150, 100)',
    'rgb(100, 100, 200)',
    'rgb(130, 85, 150)',
    'rgb(100, 120, 190)',
    'rgb(100, 100, 150)',
    'rgb(100, 150, 200)',
    'rgb(90, 140, 60)',
    'rgb(100, 150, 100)',
    'rgb(100, 150, 150)',
    'rgb(70, 140, 110)',
]

export const defaultIdProperty = (): IdCommonProperty => ({
    id: createId("Property"),
    name: "id",
    comment: "",
    category: "ID_COMMON",
    rawType: "String",
    nullable: false,
    extraImports: [],
    extraAnnotations: [],
    columnInfo: {
        name: "id",
        comment: 'id',
        nullable: false,
        type: "text",
    },
    autoSyncColumnName: true,
})

export const defaultScalarProperty = (): ScalarCommonProperty => ({
    id: createId("Property"),
    name: "property",
    comment: "",
    category: "SCALAR_COMMON",
    rawType: "String",
    nullable: false,
    serialized: false,
    extraImports: [],
    extraAnnotations: [],
    typeIsArray: false,
    columnInfo: {
        name: "property",
        comment: '',
        nullable: false,
        type: "text",
    },
    autoSyncColumnName: true,
})

export const defaultEntity = (groupId: string): EntityWithProperties => ({
    groupId,
    id: createId("Entity"),
    name: "Entity",
    comment: "",
    subPackagePath: "",
    tableName: "entity",
    autoSyncTableName: true,
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

export const defaultEnumeration = (groupId: string, strategy: EnumerationStrategy): Enumeration => ({
    groupId,
    id: createId("Enumeration"),
    name: "Enumeration",
    comment: "",
    subPackagePath: "",
    extraImports: [],
    extraAnnotations: [],
    strategy,
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
    color: defaultColor,
    basePackagePath: "",
    baseTableSchema: ""
})

export const defaultModelContextData = (): ModelContextData => ({
    model: {
        id: createId("Model"),
        name: "Model",
        description: "",
        createdTime: "",
        modifiedTime: "",
        databaseType: "POSTGRESQL",
        databaseNameStrategy: "LOWER_SNAKE",
        defaultForeignKeyType: "REAL",
        jvmLanguage: "KOTLIN",
        defaultEnumerationStrategy: "NAME",
    },
    entityMap: new Map(),
    mappedSuperClassMap: new Map(),
    embeddableTypeMap: new Map(),
    enumerationMap: new Map(),
    groupMap: new Map(),
    associationMap: new Map(),
})
