import {nameTool} from "@/type/context/utils/NameTool.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {firstCaseToLower} from "@/utils/name/firstCase.ts";
import {ID_VIEW_TEMPLATE} from "@/type/context/utils/AssociationTemplate.ts";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

const getDefaultStringSqlType = () => {
    return {
        type: "VARCHAR(255)",
        dataSize: 255,
        numericPrecision: undefined,
    }
}
const getDefaultIntSqlType = () => {
    return {
        type: "INT",
        dataSize: 10,
        numericPrecision: undefined,
    }
}

export const isKeyProperty = (property: DeepReadonly<Property>): property is DeepReadonly<typeof property> & KeyProperty => {
    return "key" in property && property.key
}
export const isLogicalDeleteProperty = (property: DeepReadonly<Property>): property is DeepReadonly<typeof property> & LogicalDeleteProperty => {
    return "logicalDelete" in property && property.logicalDelete
}
export const isOrderableProperty = (property: DeepReadonly<Property>): property is DeepReadonly<typeof property> & {defaultOrderDirection: OrderDirection}  => {
    return "defaultOrderDirection" in property && (property.defaultOrderDirection === "ASC" || property.defaultOrderDirection === "DESC")
}

const toBaseProperty = (property: DeepReadonly<Property>): BaseProperty => {
    return {
        id: property.id,
        name: "name" in property ? property.name : property.nameTemplate,
        comment: "comment" in property ? property.comment : property.commentTemplate,
        extraImports: Array.from(property.extraImports),
        extraAnnotations: Array.from(property.extraAnnotations),
        nullable: property.nullable,
    }
}

const createColumnInfo = (
    property: DeepReadonly<Property>,
    sqlType: DeepReadonly<CrossType["sqlType"]>,
    databaseNameStrategy = useModelEditor().contextData.value.model.databaseNameStrategy ?? 'SNAKE'
): ColumnProperty["columnInfo"] => {
    return {
        name: nameTool.convert("name" in property ? property.name : property.nameTemplate, 'LOWER_CAMEL', databaseNameStrategy),
        comment: "comment" in property ? property.comment : property.commentTemplate,
        nullable: property.nullable,
        type: sqlType.type,
        dataSize: sqlType.dataSize,
        numericPrecision: sqlType.numericPrecision,
    }
}

export const idToggleType = (
    property: DeepReadonly<IdCommonProperty | IdEmbeddableProperty>,
    typePair: DeepReadonly<CrossType>
): IdCommonProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID_COMMON",
        nullable: false,
        rawType: typePair.jvmType.fullTypeExpression,
        extraImports: [...typePair.jvmType.extraImports, ...property.extraImports],
        columnInfo: createColumnInfo(property, typePair.sqlType),
        autoSyncColumnName: true,
    }
}

export const toIdProperty = (property: DeepReadonly<Property>): IdCommonProperty | IdEmbeddableProperty => {
    if (property.category === "SCALAR_EMBEDDABLE") {
        return {
            ...toBaseProperty(property),
            category: "ID_EMBEDDABLE",
            nullable: false,
            embeddableTypeId: property.embeddableTypeId,
            columnNameOverrides: []
        }
    } else {
        return {
            ...toBaseProperty(property),
            category: "ID_COMMON",
            nullable: false,
            rawType: "rawType" in property ? property.rawType : "String",
            columnInfo: "columnInfo" in property ?
                createColumnInfo(property, property.columnInfo) :
                createColumnInfo(property, getDefaultStringSqlType()),
            autoSyncColumnName: true,
        }
    }
}

export const exitIdProperty = (property: DeepReadonly<IdCommonProperty | IdEmbeddableProperty>): ScalarCommonProperty | ScalarEmbeddableProperty => {
    if (property.category === "ID_EMBEDDABLE") {
        return {
            ...toBaseProperty(property),
            category: "SCALAR_EMBEDDABLE",
            embeddableTypeId: property.embeddableTypeId,
            columnNameOverrides: Array.from(property.columnNameOverrides),
        }
    } else {
        const scalarCommonProperty: ScalarCommonProperty = {
            ...toBaseProperty(property),
            category: "SCALAR_COMMON",
            rawType: property.rawType,
            extraImports: Array.from(property.extraImports),
            serialized: false,
            columnInfo: "columnInfo" in property ?
                createColumnInfo(property, property.columnInfo) :
                createColumnInfo(property, getDefaultStringSqlType()),
            autoSyncColumnName: true,
            typeIsArray: false,
        }
        if (isOrderableProperty(property)) {
            Object.assign(scalarCommonProperty, {
                defaultOrderDirection: property.defaultOrderDirection,
            })
        }
        return scalarCommonProperty
    }
}


type MayKeyProperty =
    | ScalarCommonProperty
    | ScalarEnumProperty
    | ManyToOneProperty
    | OneToOneSourceProperty

export const isMayKeyProperty = (property: Property): property is MayKeyProperty => {
    return property.category === "SCALAR_COMMON" ||
        property.category === "SCALAR_ENUM" ||
        property.category === "ManyToOne" ||
        property.category === "OneToOne_Source"
}

export const toggleKeyProperty = (
    property: DeepReadonly<MayKeyProperty>
) => {
    const clonedProperty = cloneDeepReadonlyRaw<MayKeyProperty>(property)
    if (isKeyProperty(clonedProperty)) {
        const {key, keyGroups, ...otherPart} = clonedProperty
        return otherPart
    } else {
        Object.assign(clonedProperty, {
            key: true,
            keyGroups: [],
        })
        return clonedProperty
    }
}

type MayLogicalDeleteProperty =
    | ScalarCommonProperty
    | ScalarEnumProperty

export const isMayLogicalDeleteProperty = (property: Property): property is MayLogicalDeleteProperty => {
    return property.category === "SCALAR_COMMON" ||
        property.category === "SCALAR_ENUM"
}

export const toggleLogicalDeleteProperty = (property: MayLogicalDeleteProperty) => {
    const clonedProperty = cloneDeepReadonlyRaw<MayLogicalDeleteProperty>(property)
    if (isLogicalDeleteProperty(clonedProperty)) {
        const {logicalDelete, ...otherPart} = clonedProperty
        return otherPart
    } else {
        Object.assign(clonedProperty, {
            logicalDelete: true,
        })
        return clonedProperty
    }
}

export const toVersionProperty = (property: DeepReadonly<Property>): VersionProperty => {
    return {
        ...toBaseProperty(property),
        category: "VERSION",
        nullable: false,
        rawType: useModelEditor().contextData.value.model.jvmLanguage === "JAVA" ? "int" : "int",
        extraImports: Array.from(property.extraImports),
        columnInfo: "columnInfo" in property ?
            createColumnInfo(property, property.columnInfo) :
            createColumnInfo(property, getDefaultIntSqlType()),
        autoSyncColumnName: true,
    }
}
export const exitVersionProperty = (property: DeepReadonly<VersionProperty>): ScalarCommonProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_COMMON",
        rawType: property.rawType,
        extraImports: Array.from(property.extraImports),
        serialized: false,
        columnInfo: "columnInfo" in property ?
            createColumnInfo(property, property.columnInfo) :
            createColumnInfo(property, getDefaultIntSqlType()),
        autoSyncColumnName: true,
    }
}

export const idToEmbeddableProperty = (
    property: DeepReadonly<IdCommonProperty | IdEmbeddableProperty>,
    embeddableType: DeepReadonly<EmbeddableType>
): IdEmbeddableProperty => {
    return {
        ...toBaseProperty(property),
        category: "ID_EMBEDDABLE",
        nullable: false,
        embeddableTypeId: embeddableType.id,
        columnNameOverrides: [],
    }
}

export const toScalarCommonProperty = (
    property: DeepReadonly<Property>,
    typePair: DeepReadonly<CrossType>
): ScalarCommonProperty => {
    const scalarCommonProperty: ScalarCommonProperty = {
        ...toBaseProperty(property),
        category: "SCALAR_COMMON",
        rawType: typePair.jvmType.fullTypeExpression,
        extraImports: Array.from(typePair.jvmType.extraImports),
        serialized: false,
        columnInfo: createColumnInfo(property, typePair.sqlType),
        autoSyncColumnName: true,
        typeIsArray: false,
    }
    if (isKeyProperty(property)) {
        Object.assign(scalarCommonProperty, {
            key: true,
            keyGroups: [...property.keyGroups],
        })
    } else if (isLogicalDeleteProperty(property)) {
        Object.assign(scalarCommonProperty, {
            logicalDelete: true,
        })
    }
    if (isOrderableProperty(property)) {
        Object.assign(scalarCommonProperty, {
            defaultOrderDirection: property.defaultOrderDirection,
        })
    }
    return scalarCommonProperty
}

export const toScalarEnumProperty = (
    property: DeepReadonly<Property>,
    enumeration: DeepReadonly<Enumeration>
): ScalarEnumProperty => {
    const scalarEnumProperty: ScalarEnumProperty = {
        ...toBaseProperty(property),
        category: "SCALAR_ENUM",
        enumId: enumeration.id,
        defaultOrderDirection: undefined,
        columnInfo:
            enumeration.strategy === "NAME" ?
                createColumnInfo(property, getDefaultStringSqlType()) :
                createColumnInfo(property, getDefaultIntSqlType()),
        autoSyncColumnName: true,
    }
    if (isKeyProperty(property)) {
        Object.assign(scalarEnumProperty, {
            key: true,
            keyGroups: [...property.keyGroups],
        })
    } else if (isLogicalDeleteProperty(property)) {
        Object.assign(scalarEnumProperty, {
            logicalDelete: true,
        })
    }
    if (isOrderableProperty(property)) {
        Object.assign(scalarEnumProperty, {
            defaultOrderDirection: property.defaultOrderDirection,
        })
    }
    return scalarEnumProperty
}

export const toScalarEmbeddableProperty = (
    property: DeepReadonly<Property>,
    embeddableType: DeepReadonly<EmbeddableType>
): ScalarEmbeddableProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_EMBEDDABLE",
        embeddableTypeId: embeddableType.id,
        columnNameOverrides: [],
    }
}

export const toManyToOneProperty = (
    property: DeepReadonly<Property>,
    referencedEntity: DeepReadonly<EntityWithProperties>,
    associationId: string,
    foreignKeyType: ForeignKeyType,
): ManyToOneProperty => {
    const manyToOneProperty: ManyToOneProperty = {
        ...toBaseProperty(property),
        category: "ManyToOne",
        typeIsList: false,
        associationId,
        referencedEntityId: referencedEntity.id,
        onDissociateAction: "NONE",
        idViewName: firstCaseToLower(referencedEntity.name) + "Id",
        idViewNameTemplate: ID_VIEW_TEMPLATE,
        useIdViewNameTemplate: true,
        joinInfo: {
            type: "SingleColumn",
            columnName: "",
            foreignKeyType,
        },
        autoGenerateJoinInfo: true,
    }
    if (isKeyProperty(property)) {
        Object.assign(manyToOneProperty, {
            key: true,
            keyGroups: [...property.keyGroups],
        })
    }
    return manyToOneProperty
}
