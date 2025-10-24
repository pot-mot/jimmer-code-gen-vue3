export const createJvmFileBuilder = (
    context: DeepReadonly<ModelContext>,
    options: {
        groupId: string,
        subPackagePath: string,
    }
): JvmFileBuilder => {
    const {
        groupId,
        subPackagePath,
    } = options

    const importSet: Set<string> = new Set()

    const buildPointPath = (subPackagePaths: string[]) => {
        const parts: string[] = []
        for (const subPath of subPackagePaths) {
            const splitSubPath = subPath.split(".")
            if (splitSubPath.length > 0) {
                for (const subPath of splitSubPath) {
                    if (subPath.length > 0) parts.push(subPath)
                }
            }
        }
        return parts.join(".")
    }

    const group = context.groupMap.get(groupId)
    if (group === undefined) throw new Error(`[${groupId}] not found`)
    const packagePath = buildPointPath([group.basePackagePath, subPackagePath])

    const usedEnumerationIdMap = new Map<string, DeepReadonly<Enumeration>>()
    const requireEnumeration = (id: string) => {
        const enumeration = context.enumerationMap.get(id)
        if (enumeration === undefined) throw new Error(`[${id}] not found`)

        const existedEnumeration = usedEnumerationIdMap.get(id)
        if (existedEnumeration !== undefined) return existedEnumeration

        let enumerationPath: string
        if (enumeration.groupId !== groupId) {
            const enumerationGroup = context.groupMap.get(enumeration.groupId)
            if (enumerationGroup === undefined) throw new Error(`[${enumeration.groupId}] not found`)
            enumerationPath = buildPointPath([enumerationGroup.basePackagePath, enumeration.subPackagePath])
        } else {
            enumerationPath = buildPointPath([group.basePackagePath, enumeration.subPackagePath])
        }
        if (enumerationPath !== packagePath)
            importSet.add(buildPointPath([enumerationPath, enumeration.name]))

        usedEnumerationIdMap.set(id, enumeration)

        return enumeration
    }

    const usedEmbeddableTypeIdMap = new Map<string, DeepReadonly<EmbeddableTypeWithProperties>>()
    const requireEmbeddableType = (id: string) => {
        const embeddableType = context.embeddableTypeMap.get(id)
        if (embeddableType === undefined) throw new Error(`[${id}] not found`)

        const existedEmbeddableType = usedEmbeddableTypeIdMap.get(id)
        if (existedEmbeddableType !== undefined) return existedEmbeddableType

        let embeddableTypePath: string
        if (embeddableType.groupId !== groupId) {
            const embeddableTypeGroup = context.groupMap.get(embeddableType.groupId)
            if (embeddableTypeGroup === undefined) throw new Error(`[${embeddableType.groupId}] not found`)
            embeddableTypePath = buildPointPath([embeddableTypeGroup.basePackagePath, embeddableType.subPackagePath])
        } else {
            embeddableTypePath = buildPointPath([group.basePackagePath, embeddableType.subPackagePath])
        }
        if (embeddableTypePath !== packagePath)
            importSet.add(buildPointPath([embeddableTypePath, embeddableType.name]))

        usedEmbeddableTypeIdMap.set(id, embeddableType)

        return embeddableType
    }

    const usedEntityIdMap = new Map<string, DeepReadonly<EntityWithInheritInfo>>()
    const requireEntity = (id: string) => {
        const entity = context.entityMap.get(id)
        if (entity === undefined) throw new Error(`[${id}] not found`)

        const existedEntity = usedEntityIdMap.get(id)
        if (existedEntity !== undefined) return existedEntity

        let entityPath: string
        if (groupId !== groupId) {
            const entityGroup = context.groupMap.get(groupId)
            if (entityGroup === undefined) throw new Error(`[${groupId}] not found`)
            entityPath = buildPointPath([entityGroup.basePackagePath, entity.subPackagePath])
        } else {
            entityPath = buildPointPath([group.basePackagePath, entity.subPackagePath])
        }
        if (entityPath !== packagePath)
            importSet.add(buildPointPath([entityPath, entity.name]))

        usedEntityIdMap.set(id, entity)

        return entity
    }

    const useMappedSuperClassIdMap = new Map<string, DeepReadonly<MappedSuperClassWithInheritInfo>>()
    const requireMappedSuperClass = (id: string) => {
        const mappedSuperClass = context.mappedSuperClassMap.get(id)
        if (mappedSuperClass === undefined) throw new Error(`[${id}] not found`)

        const existedMappedSuperClass = useMappedSuperClassIdMap.get(id)
        if (existedMappedSuperClass !== undefined) return existedMappedSuperClass

        let mappedSuperClassPath: string
        if (mappedSuperClass.groupId !== groupId) {
            const mappedSuperClassGroup = context.groupMap.get(mappedSuperClass.groupId)
            if (mappedSuperClassGroup === undefined) throw new Error(`[${mappedSuperClass.groupId}] not found`)
            mappedSuperClassPath = buildPointPath([mappedSuperClassGroup.basePackagePath, mappedSuperClass.subPackagePath])
        } else {
            mappedSuperClassPath = buildPointPath([group.basePackagePath, mappedSuperClass.subPackagePath])
        }
        if (mappedSuperClassPath !== packagePath)
            importSet.add(buildPointPath([mappedSuperClassPath, mappedSuperClass.name]))

        useMappedSuperClassIdMap.set(id, mappedSuperClass)

        return mappedSuperClass
    }

    return {
        getPackagePath: () => packagePath,
        getImportSet: () => importSet,
        addImports: (imports: string | Iterable<string>) => {
            if (typeof imports === "string") {
                importSet.add(imports)
            } else {
                for (const importItem of imports)
                    importSet.add(importItem)
            }
        },
        requireEnumeration,
        requireEmbeddableType,
        requireEntity,
        requireMappedSuperClass,
    }
}