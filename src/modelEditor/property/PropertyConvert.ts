import {nameTool} from "@/type/context/utils/NameTool.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {firstCaseToLower} from "@/utils/name/firstCase.ts";
import {GENERATED_JOIN_INFO} from "@/modelEditor/property/PropertyJoinInfoGenerate.ts";

const toBaseProperty = (property: DeepReadonly<BaseProperty>): BaseProperty => {
    return {
        id: property.id,
        name: property.name,
        comment: property.comment,
        extraImports: Array.from(property.extraImports),
        extraAnnotations: Array.from(property.extraAnnotations),
        nullable: property.nullable,
    }
}

const createColumnInfo = (
    property: DeepReadonly<Property>,
    sqlType: DeepReadonly<CrossType["sqlType"]>,
    databaseNameStrategy = useModelEditor().contextData.value?.model.databaseNameStrategy ?? 'SNAKE'
): ColumnProperty["columnInfo"] => {
    return {
        name: nameTool.convert(property.name, 'LOWER_CAMEL', databaseNameStrategy),
        comment: property.comment,
        nullable: property.nullable,
        type: sqlType.type,
        dataSize: sqlType.dataSize,
        numericPrecision: sqlType.numericPrecision,
    }
}

export const idToggleType = (
    property: DeepReadonly<IdCommonProperty>,
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

export const idToEmbeddableProperty = (
    property: DeepReadonly<IdCommonProperty>,
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
    return {
        ...toBaseProperty(property),
        category: "SCALAR_COMMON",
        rawType: typePair.jvmType.fullTypeExpression,
        extraImports: Array.from(typePair.jvmType.extraImports),
        serialized: false,
        columnInfo: createColumnInfo(property, typePair.sqlType),
        autoSyncColumnName: true,
        typeIsArray: false,
    }
}

export const toScalarEnumProperty = (
    property: DeepReadonly<Property>,
    enumeration: DeepReadonly<Enumeration>
): ScalarEnumProperty => {
    return {
        ...toBaseProperty(property),
        category: "SCALAR_ENUM",
        enumId: enumeration.id,
        defaultOrderDirection: undefined,
        columnInfo:
            enumeration.strategy === "NAME" ?
                createColumnInfo(property, {
                    type: "VARCHAR(255)",
                    dataSize: 255,
                    numericPrecision: undefined,
                }) : createColumnInfo(property, {
                    type: "INT",
                    dataSize: 11,
                    numericPrecision: undefined,
                }),
        autoSyncColumnName: true,
    }
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
): ManyToOneProperty => {
    return {
        ...toBaseProperty(property),
        category: "ManyToOne",
        typeIsList: false,
        associationId,
        referencedEntityId: referencedEntity.id,
        onDissociateAction: "NONE",
        idViewName: firstCaseToLower(referencedEntity.name) + "Id",
        autoSyncIdViewName: true,
        joinInfo: {
            type: "SingleColumn",
            columnName: GENERATED_JOIN_INFO,
        },
        autoGenerateJoinInfo: true,
    }
}
