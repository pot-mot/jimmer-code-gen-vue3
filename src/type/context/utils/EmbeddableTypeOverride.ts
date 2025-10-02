import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";

export const getEmbeddableTypeDefaultFullPathColumnNames = (
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>
): ColumnNameOverride[] => {
    const result: ColumnNameOverride[] = []

    const processEmbeddableProperties = (
        properties: DeepReadonly<EmbeddableTypeProperty[]>,
        prefix: string = "",
        columnNameOverrides: DeepReadonly<ColumnNameOverride[]> = []
    ) => {
        for (const property of properties) {
            // 处理嵌入类型属性
            if ("embeddableTypeId" in property) {
                const embeddedType = embeddableTypeMap.get(property.embeddableTypeId)
                if (embeddedType === undefined) {
                    throw new Error(`EmbeddableType [${property.embeddableTypeId}] not existed`)
                }

                // 递归处理嵌入类型的属性
                processEmbeddableProperties(
                    embeddedType.properties,
                    prefix ? `${prefix}.${property.name}` : property.name,
                    property.columnNameOverrides
                )
            } else {
                const propertyPath = prefix ? `${prefix}.${property.name}` : property.name

                const matchedOverride = columnNameOverrides.find(override =>
                    override.propertyPath === propertyPath
                )
                result.push({
                    propertyPath,
                    overrideColumnName: matchedOverride ? matchedOverride.overrideColumnName : property.columnInfo.name
                })
            }
        }
    }

    processEmbeddableProperties(embeddableType.properties)

    return result
}

export const overrideEmbeddableTypePropertiesColumnNames = (
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    embeddableTypeMap: DeepReadonly<Map<string, EmbeddableTypeWithProperties>>
): EmbeddableTypeProperty[] => {
    const result: EmbeddableTypeProperty[] = []

    // 递归处理嵌入类型属性
    const processEmbeddableProperties = (
        properties: DeepReadonly<EmbeddableTypeProperty[]>,
        prefix: string = "",
        columnNameOverrides: DeepReadonly<ColumnNameOverride[]> = []
    ) => {
        for (const property of properties) {
            // 处理嵌入类型属性
            if ("embeddableTypeId" in property) {
                const embeddedType = embeddableTypeMap.get(property.embeddableTypeId)
                if (embeddedType === undefined) {
                    throw new Error(`EmbeddableType [${property.embeddableTypeId}] not existed`)
                }

                // 递归处理嵌入类型的属性
                processEmbeddableProperties(
                    embeddedType.properties,
                    prefix ? `${prefix}.${property.name}` : property.name,
                    property.columnNameOverrides
                )
            } else {
                const propertyPath = prefix ? `${prefix}.${property.name}` : property.name
                const newProperty = cloneDeepReadonlyRaw<EmbeddableTypeProperty>(property)

                const matchedOverride = columnNameOverrides.find(override =>
                    propertyPath.endsWith(override.propertyPath)
                )
                if (matchedOverride && "columnInfo" in newProperty) {
                    newProperty.columnInfo.name = matchedOverride.overrideColumnName
                }

                result.push(newProperty)
            }
        }
    }

    processEmbeddableProperties(embeddableType.properties)

    return result
}
