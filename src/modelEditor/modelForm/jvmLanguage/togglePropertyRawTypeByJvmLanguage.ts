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
        javaType: "short",
        ktType: "Short",
        nullable: false,
    },
    {
        javaType: "Short",
        ktType: "Short",
        nullable: true,
    },
    {
        javaType: "long",
        ktType: "Long",
        nullable: false,
    },
    {
        javaType: "Long",
        ktType: "Long",
        nullable: true,
    },
    {
        javaType: "boolean",
        ktType: "Boolean",
        nullable: false,
    },
    {
        javaType: "Boolean",
        ktType: "Boolean",
        nullable: true,
    },
    {
        javaType: "float",
        ktType: "Float",
        nullable: false,
    },
    {
        javaType: "Float",
        ktType: "Float",
        nullable: true,
    },
    {
        javaType: "double",
        ktType: "Double",
        nullable: false,
    },
    {
        javaType: "Double",
        ktType: "Double",
        nullable: true,
    },
    {
        javaType: "byte",
        ktType: "Byte",
        nullable: false,
    },
    {
        javaType: "Byte",
        ktType: "Byte",
        nullable: true,
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
]

const togglePropertyRawType = (
    property: Property,
    oldLanguage: JvmLanguage,
) => {
    if (!("rawType" in property)) return

    if (oldLanguage === "KOTLIN") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.ktType === property.rawType &&
                mapping.nullable === property.nullable
        })
        if (mapping !== undefined) {
            property.rawType = mapping.javaType
        }
    } else if (oldLanguage === "JAVA") {
        const mapping = javaKtTypeMapping.find(mapping => {
            return mapping.javaType === property.rawType &&
                mapping.nullable === property.nullable
        })
        if (mapping !== undefined) {
            property.rawType = mapping.ktType
        }
    }
}

export const togglePropertyRawTypeByJvmLanguage = (
    oldData: Partial<ModelGraphSubData>,
    oldLanguage: JvmLanguage,
) => {
    for (const entity of oldData.entities ?? []) {
        for (const property of entity.data.properties) {
            togglePropertyRawType(property, oldLanguage)
        }
    }
    for (const mappedSuperClass of oldData.mappedSuperClasses ?? []) {
        for (const property of mappedSuperClass.data.properties) {
            togglePropertyRawType(property, oldLanguage)
        }
    }
    for (const embeddableType of oldData.embeddableTypes ?? []) {
        for (const property of embeddableType.data.properties) {
            togglePropertyRawType(property, oldLanguage)
        }
    }
}