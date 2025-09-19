import {createId} from "@/modelEditor/useModelEditor.ts";

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

export const defaultGroup = (): Group => ({
    id: createId("Group"),
    name: "Default",
    comment: "",
    color: "",
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
