import {overrideEmbeddableTypePropertiesColumnNames} from "@/modelEditor/utils/EmbeddableTypeOverride.ts";

const scalarPropertyToColumn = (
    property: DeepReadonly<IdCommonProperty | ScalarCommonProperty | ScalarEnumProperty>
): Column => {
    return {
        ...property.columnInfo,
    }
}

export const flatEmbeddableTypeColumns = (
    embeddableTypeId: string,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    columnNameOverrides: DeepReadonly<ColumnNameOverride[]> = []
): Column[] => {
    const embeddableType = embeddableTypeMap.get(embeddableTypeId)
    if (!embeddableType) throw new Error(`[${embeddableTypeId}] not found`)

    const columns: Column[] = []

    for (const property of overrideEmbeddableTypePropertiesColumnNames(embeddableType, embeddableTypeMap, columnNameOverrides)) {
        if (property.category === "SCALAR_COMMON" || property.category === "SCALAR_ENUM") {
            columns.push(scalarPropertyToColumn(property))
        } else (
            columns.push(...flatEmbeddableTypeColumns(property.embeddableTypeId, embeddableTypeMap))
        )
    }

    return columns
}

export const flatEmbeddableTypeColumnNames = (
    embeddableTypeId: string,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>,
    columnNameOverrides: DeepReadonly<ColumnNameOverride[]> = []
): string[] => {
    const embeddableType = embeddableTypeMap.get(embeddableTypeId)
    if (!embeddableType) throw new Error(`[${embeddableTypeId}] not found`)

    const columnNames: string[] = []

    for (const property of overrideEmbeddableTypePropertiesColumnNames(embeddableType, embeddableTypeMap, columnNameOverrides)) {
        if (property.category === "SCALAR_COMMON" || property.category === "SCALAR_ENUM") {
            columnNames.push(property.columnInfo.name)
        } else (
            columnNames.push(...flatEmbeddableTypeColumnNames(property.embeddableTypeId, embeddableTypeMap))
        )
    }

    return columnNames
}