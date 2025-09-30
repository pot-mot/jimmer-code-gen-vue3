type EntityPropertyItem = {
    type: "Entity"
    entity: DeepReadonly<EntityWithInheritInfo>
    property: DeepReadonly<Property>
}

type EmbeddablePropertyItem = {
    type: "EmbeddableType"
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>
    property: DeepReadonly<EmbeddableTypeProperty>
}

type CommonPropertyItem = {
    type: "COMMON"
    property: DeepReadonly<IdCommonProperty | ScalarCommonProperty | ScalarEnumProperty | VersionProperty>
}

export const parseEmbeddablePropertyPath = (
    propertyPathNames: DeepReadonly<string[]>,
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    context: DeepReadonly<ModelContext>,
): (EmbeddablePropertyItem | CommonPropertyItem)[] => {
    const path: (EmbeddablePropertyItem | CommonPropertyItem)[] = []

    if (propertyPathNames.length <= 1) {
        throw new Error(`PropertyPath is empty`)
    }

    let currentProperty = embeddableType.properties.find(it => it.name === propertyPathNames[0])
    if (!currentProperty) {
        throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[0]}] not existed`)
    }

    // 遍历除最后一个元素外的所有元素，它们总是 ToOne 关联属性或者 Embeddable 内嵌属性
    for (let i = 0; i < propertyPathNames.length - 1; i++) {
        const nextPropertyName = propertyPathNames[i + 1]

        // 检查是否是 Embeddable 内嵌属性
        if ("embeddableTypeId" in currentProperty) {
            const embeddableType = context.embeddableTypeMap.get(currentProperty.embeddableTypeId)
            if (!embeddableType) {
                throw new Error(`EmbeddableType [${currentProperty.embeddableTypeId}] is not found`)
            }
            const nextProperty = embeddableType.properties.find(it => it.name === nextPropertyName)
            if (!nextProperty) {
                throw new Error(`Property [${nextPropertyName}] is not found in EmbeddableType [${currentProperty.embeddableTypeId}]`)
            }
            path.push({
                type: "EmbeddableType",
                embeddableType,
                property: nextProperty,
            })
            currentProperty = nextProperty
        } else {
            throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[i]}] is not a EmbeddableProperty`)
        }
    }

    if (
        currentProperty.category !== "SCALAR_COMMON" &&
        currentProperty.category !== "SCALAR_ENUM"
    ) {
        throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[propertyPathNames.length - 1]}] is not a Scalar`)
    } else if (path.length === 0) {
        path.push({
            type: "COMMON",
            property: currentProperty,
        })
    }

    return path
}

export const parsePropertyPath = (
    propertyPathNames: DeepReadonly<string[]>,
    entity: DeepReadonly<EntityWithInheritInfo | MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>,
): (EntityPropertyItem | EmbeddablePropertyItem | CommonPropertyItem)[] => {
    const path: (EntityPropertyItem | EmbeddablePropertyItem | CommonPropertyItem)[] = []

    if (propertyPathNames.length <= 1) {
        throw new Error(`PropertyPath is empty`)
    }

    let currentProperty = entity.allProperties.find(it => it.name === propertyPathNames[0])
    if (!currentProperty) {
        throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[0]}] not existed`)
    }

    // 遍历除最后一个元素外的所有元素，它们总是 ToOne 关联属性或者 Embeddable 内嵌属性
    for (let i = 0; i < propertyPathNames.length - 1; i++) {
        const nextPropertyName = propertyPathNames[i + 1]

        // 检查是否是ToOne关联属性
        if (
            currentProperty.category === "OneToOne_Source" ||
            currentProperty.category === "OneToOne_Mapped" ||
            currentProperty.category === "ManyToOne"
        ) {
            // 获取下一个实体的属性信息
            const nextEntity = context.entityMap.get(currentProperty.referencedEntityId);
            if (!nextEntity) {
                throw new Error(`Entity [${currentProperty.referencedEntityId}] is not found`)
            }
            const nextProperty = nextEntity.allProperties.find(it => it.name === nextPropertyName)
            if (!nextProperty) {
                throw new Error(`Property [${nextPropertyName}] is not found in Entity [${currentProperty.referencedEntityId}]`)
            }
            path.push({
                type: "Entity",
                entity: nextEntity,
                property: nextProperty,
            })
            currentProperty = nextProperty
        }
        // 检查是否是 Embeddable 内嵌属性
        else if ("embeddableTypeId" in currentProperty) {
            const embeddableType = context.embeddableTypeMap.get(currentProperty.embeddableTypeId)
            if (!embeddableType) {
                throw new Error(`EmbeddableType [${currentProperty.embeddableTypeId}] is not found`)
            }
            const nextProperty = embeddableType.properties.find(it => it.name === nextPropertyName)
            if (!nextProperty) {
                throw new Error(`Property [${nextPropertyName}] is not found in EmbeddableType [${currentProperty.embeddableTypeId}]`)
            }
            path.push({
                type: "EmbeddableType",
                embeddableType,
                property: nextProperty,
            })
            currentProperty = nextProperty
        } else {
            throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[i]}] is not a ToOne ReferenceProperty or EmbeddableProperty`)
        }
    }

    if (
        currentProperty.category !== "ID_COMMON" &&
        currentProperty.category !== "SCALAR_COMMON" &&
        currentProperty.category !== "SCALAR_ENUM" &&
        currentProperty.category !== "VERSION"
    ) {
        throw new Error(`PropertyPath [${propertyPathNames}] is not a valid association path because Property [${propertyPathNames[propertyPathNames.length - 1]}] is not a Scalar or IdProperty`)
    } else if (path.length === 0) {
        path.push({
            type: "COMMON",
            property: currentProperty,
        })
    }

    return path
}