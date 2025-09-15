import {categorizeEmbeddableTypeProperties} from "@/type/context/utils/CategorizedProperties.ts"

export const flatEmbeddableTypeProperties = (
    embeddableType: EmbeddableTypeWithCategorizedProperties,
    embeddableTypeMap: Map<string, EmbeddableTypeWithCategorizedProperties>
): EmbeddableTypeWithFlatProperties => {
    const allProperties: EmbeddableTypeProperty[] = []

    // 递归处理嵌入类型属性
    const processEmbeddableProperties = (
        properties: EmbeddableTypeProperty[],
        prefix: string = "",
        overrides: {
            propertyPath: string
            overrideColumnName: string
        }[] = []
    ) => {
        for (const property of properties) {
            // 处理嵌入类型属性
            if ("embeddableTypeId" in property) {
                const embeddedType = embeddableTypeMap.get(property.embeddableTypeId)
                if (embeddedType === undefined) {
                    throw new Error(`EmbeddableType [${property.embeddableTypeId}] not existed`)
                }

                const propOverrides = property.propOverrides ?? []

                // 递归处理嵌入类型的属性
                processEmbeddableProperties(
                    embeddedType.properties,
                    prefix ? `${prefix}.${property.name}` : property.name,
                    propOverrides
                )
            } else {
                // 处理普通属性（SCALAR 或 ENUM）
                const newProperty = {...property}
                const propertyPath = prefix ? `${prefix}.${property.name}` : property.name

                // 检查是否有属性覆盖
                const override = overrides.find(override => override.propertyPath === propertyPath)
                if (override && "columnInfo" in newProperty) {
                    // 覆盖列名
                    newProperty.columnInfo = {
                        ...newProperty.columnInfo,
                        name: override.overrideColumnName
                    }
                }

                allProperties.push(newProperty)
            }
        }
    }

    processEmbeddableProperties(embeddableType.properties)

    return {
        ...embeddableType,
        allProperties,
        allCategorizedProperties: categorizeEmbeddableTypeProperties(allProperties),
    }
}
