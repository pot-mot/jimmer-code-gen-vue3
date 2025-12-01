type JavaKtTypeMapping = {
    javaType: string
    ktType: string
    nullable: boolean
}

const javaKtTypeMapping: DeepReadonly<JavaKtTypeMapping[]> = [
    {
        javaType: "Object",
        ktType: "Any",
        nullable: true,
    },
    {
        javaType: "Object",
        ktType: "Any",
        nullable: false,
    },
    {
        javaType: "int",
        ktType: "Int",
        nullable: false,
    },
    {
        javaType: "Integer",
        ktType: "Int",
        nullable: true,
    },
    {
        javaType: "Integer",
        ktType: "Int",
        nullable: false,
    },
    {
        javaType: "short",
        ktType: "Short",
        nullable: false,
    },
    {
        javaType: "long",
        ktType: "Long",
        nullable: false,
    },
    {
        javaType: "boolean",
        ktType: "Boolean",
        nullable: false,
    },
    {
        javaType: "float",
        ktType: "Float",
        nullable: false,
    },
    {
        javaType: "double",
        ktType: "Double",
        nullable: false,
    },
    {
        javaType: "byte",
        ktType: "Byte",
        nullable: false,
    },
    {
        javaType: "char",
        ktType: "Char",
        nullable: false,
    },
    {
        javaType: "Character",
        ktType: "Char",
        nullable: true,
    },
    {
        javaType: "Character",
        ktType: "Char",
        nullable: false,
    },
]

export const checkPropertyRawTypeIsFit = (
    property: DeepReadonly<Property>,
    currentLanguage: JvmLanguage,
): boolean => {
    if (!("rawType" in property)) return true

    if (currentLanguage === "JAVA") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.ktType === property.rawType &&
                property.nullable === mapping.nullable
        })
        if (mapping !== undefined) return false
    } else if (currentLanguage === "KOTLIN") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.javaType === property.rawType &&
                property.nullable === mapping.nullable
        })
        if (mapping !== undefined) return false
    }

    return true
}

const togglePropertyRawType = (
    property: Property,
    currentLanguage: JvmLanguage,
) => {
    if (!("rawType" in property)) return

    if (currentLanguage === "JAVA") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.ktType === property.rawType &&
                property.nullable === mapping.nullable
        })
        if (mapping !== undefined) {
            property.rawType = mapping.javaType
        }
    } else if (currentLanguage === "KOTLIN") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.javaType === property.rawType &&
                property.nullable === mapping.nullable
        })
        if (mapping !== undefined) {
            property.rawType = mapping.ktType
        }
    }
}

type UnfitRawTypeInfo = DeepReadonly<{
    type: "EntityProperty"
    entity: Entity
    property: { id: string, name: string, rawType: string, nullable: boolean } & Property
} | {
    type: "MappedSuperClassProperty"
    mappedSuperClass: MappedSuperClass
    property: { id: string, name: string, rawType: string, nullable: boolean } & Property
} | {
    type: "EmbeddableTypeProperty"
    embeddableType: EmbeddableType
    property: { id: string, name: string, rawType: string, nullable: boolean } & Property
}>
export const stringifyUnfitRawType = (
    unfitRawType: UnfitRawTypeInfo,
): string => {
    switch (unfitRawType.type) {
        case "EntityProperty":
            return `${unfitRawType.entity.name}.${unfitRawType.property.name}: ${unfitRawType.property.rawType}${unfitRawType.property.nullable ? "?" : ""}`
        case "MappedSuperClassProperty":
            return `${unfitRawType.mappedSuperClass.name}.${unfitRawType.property.name}: ${unfitRawType.property.rawType}${unfitRawType.property.nullable ? "?" : ""}`
        case "EmbeddableTypeProperty":
            return `${unfitRawType.embeddableType.name}.${unfitRawType.property.name}: ${unfitRawType.property.rawType}${unfitRawType.property.nullable ? "?" : ""}`
    }
}

export const getUnfitRawType = (
    oldData: DeepReadonly<Partial<ModelGraphSubData>>,
    currentLanguage: JvmLanguage,
): UnfitRawTypeInfo[] => {
    const unfitTypes: UnfitRawTypeInfo[] = []

    for (const {data: entity} of oldData.entities ?? []) {
        for (const property of entity.properties) {
            if ("rawType" in property && !checkPropertyRawTypeIsFit(property, currentLanguage)) {
                unfitTypes.push({type: "EntityProperty", entity, property})
            }
        }
    }
    for (const {data: mappedSuperClass} of oldData.mappedSuperClasses ?? []) {
        for (const property of mappedSuperClass.properties) {
            if ("rawType" in property && !checkPropertyRawTypeIsFit(property, currentLanguage)) {
                unfitTypes.push({type: "MappedSuperClassProperty", mappedSuperClass, property})
            }
        }
    }
    for (const {data: embeddableType} of oldData.embeddableTypes ?? []) {
        for (const property of embeddableType.properties) {
            if ("rawType" in property && !checkPropertyRawTypeIsFit(property, currentLanguage)) {
                unfitTypes.push({type: "EmbeddableTypeProperty", embeddableType, property})
            }
        }
    }
    return unfitTypes
}

export const fitRawTypeByJvmLanguage = (
    oldData: Partial<ModelGraphSubData>,
    currentLanguage: JvmLanguage,
) => {
    for (const entity of oldData.entities ?? []) {
        for (const property of entity.data.properties) {
            togglePropertyRawType(property, currentLanguage)
        }
    }
    for (const mappedSuperClass of oldData.mappedSuperClasses ?? []) {
        for (const property of mappedSuperClass.data.properties) {
            togglePropertyRawType(property, currentLanguage)
        }
    }
    for (const embeddableType of oldData.embeddableTypes ?? []) {
        for (const property of embeddableType.data.properties) {
            togglePropertyRawType(property, currentLanguage)
        }
    }
}