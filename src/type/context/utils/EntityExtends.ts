export type AllExtendsResult<MAPPED_SUPER_CLASS extends MappedSuperClass> = {
    extendsSet: Set<MAPPED_SUPER_CLASS>
    unexistIdSet: Set<string>
} | {
    cyclicDependenciesPath: MappedSuperClass[]
}

export const getEntityAllExtendsResult = <MAPPED_SUPER_CLASS extends MappedSuperClass>(
    entity: Entity | MappedSuperClass,
    mappedSuperClassMap: ReadonlyMap<string, MAPPED_SUPER_CLASS>,
    superClassAllExtendsResultMap: Map<string, AllExtendsResult<MAPPED_SUPER_CLASS>> = new Map(),
    path: ReadonlyArray<MappedSuperClass> = [],
): AllExtendsResult<MAPPED_SUPER_CLASS> => {
    const currentPath = [...path, entity]

    // 如果存在循环依赖路径，直接返回
    if (path.includes(entity)) {
        return {
            cyclicDependenciesPath: currentPath
        }
    }

    // 如果在缓存中，直接返回
    if (superClassAllExtendsResultMap.has(entity.id)) {
        return superClassAllExtendsResultMap.get(entity.id)!
    }

    const extendsIds = entity.extendsIds
    const extendsSet = new Set<MAPPED_SUPER_CLASS>()
    const unexistIdSet = new Set<string>()

    if (extendsIds.length === 0) {
        return {
            extendsSet,
            unexistIdSet,
        }
    }

    // 遍历所有父类
    for (const extendId of extendsIds) {
        const superClass = mappedSuperClassMap.get(extendId)
        if (superClass) {
            // 添加直接父类
            extendsSet.add(superClass)

            let parentExtends: AllExtendsResult<MAPPED_SUPER_CLASS> | undefined
            if (superClassAllExtendsResultMap) {
                const result = superClassAllExtendsResultMap.get(superClass.id)
                if (result) {
                    parentExtends = result
                }
            }
            if (!parentExtends) {
                // 递归获取父类的所有父类
                parentExtends = getEntityAllExtendsResult(
                    superClass,
                    mappedSuperClassMap,
                    superClassAllExtendsResultMap,
                    currentPath,
                )
                superClassAllExtendsResultMap.set(superClass.id, parentExtends)
            }

            // 检查是否有循环依赖，如果有，直接返回
            if ("cyclicDependenciesPath" in parentExtends) {
                return parentExtends
            }

            // 合并所有父类
            for (const parentSuperClass of parentExtends.extendsSet) {
                extendsSet.add(parentSuperClass)
            }
            for (const parentUnexistedId of parentExtends.unexistIdSet) {
                unexistIdSet.add(parentUnexistedId)
            }
        } else {
            unexistIdSet.add(extendId)
        }
    }

    return {
        extendsSet,
        unexistIdSet,
    }
}

export const getEntityAllExtends = <MAPPED_SUPER_CLASS extends MappedSuperClass>(
    entity: Entity | MappedSuperClass,
    mappedSuperClassMap: ReadonlyMap<string, MAPPED_SUPER_CLASS>,
    superClassAllExtendsResultMap: Map<string, AllExtendsResult<MAPPED_SUPER_CLASS>> = new Map(),
    path: ReadonlyArray<MappedSuperClass> = [],
): Set<MAPPED_SUPER_CLASS> => {
    const result = getEntityAllExtendsResult(entity, mappedSuperClassMap, superClassAllExtendsResultMap, path)
    if ("cyclicDependenciesPath" in result) {
        throw new Error(`Entity ${entity.name}(${entity.id}) Cyclic Dependencies: ${result.cyclicDependenciesPath.map(mappedSuperClass => `${mappedSuperClass.name}(${mappedSuperClass.id})`).join(" -> ")}`)
    } else if (result.unexistIdSet.size > 0) {
        throw new Error(`Entity ${entity.name}(${entity.id}) Unexists MappedSuperClass Id: ${[...result.unexistIdSet].join(", ")}`)
    } else {
        return result.extendsSet
    }
}

export const getEntityAllProperties = (
    entity: EntityWithProperties | MappedSuperClassWithProperties,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithProperties>,
    allExtends: Set<MappedSuperClassWithProperties> = getEntityAllExtends(entity, mappedSuperClassMap),
): Property[] => {
    const result = [...entity.properties]

    for (const mappedSuperClass of allExtends) {
        result.push(...mappedSuperClass.properties)
    }

    return result
}

/**
 * 反向映射结果，包含每个MappedSuperClass的直接和间接子类
 */
type InheritorsResult<
    ENTITY extends Entity,
    MAPPED_SUPER_CLASS extends MappedSuperClass,
> = {
    entities: Set<ENTITY>
    mappedSuperClasses: Set<MAPPED_SUPER_CLASS>
}

type InheritorsMap<
    ENTITY extends Entity,
    MAPPED_SUPER_CLASS extends MappedSuperClass,
> = Map<string, InheritorsResult<ENTITY, MAPPED_SUPER_CLASS>>

/**
 * 构建MappedSuperClass的反向继承关系映射
 */
export const buildInheritorsMap = <
    ENTITY extends Entity,
    MAPPED_SUPER_CLASS extends MappedSuperClass,
>(
    entityMap: ReadonlyMap<string, ENTITY>,
    mappedSuperClassMap: ReadonlyMap<string, MAPPED_SUPER_CLASS>
): InheritorsMap<ENTITY, MAPPED_SUPER_CLASS> => {
    const inheritorsMap: InheritorsMap<ENTITY, MAPPED_SUPER_CLASS> = new Map()

    // 初始化反向映射，为每个MappedSuperClass创建空的子类集合
    for (const mappedSuperClass of mappedSuperClassMap.values()) {
        if (!inheritorsMap.has(mappedSuperClass.id)) {
            inheritorsMap.set(mappedSuperClass.id, {entities: new Set(), mappedSuperClasses: new Set()})
        }
    }

    // 建立反向继承关系
    for (const mappedSuperClass of mappedSuperClassMap.values()) {
        for (const extendId of mappedSuperClass.extendsIds) {
            const inheritors = inheritorsMap.get(extendId)
            if (!inheritors) throw new Error(`MappedSuperClass ${extendId}) Not Found`)
            inheritors.mappedSuperClasses.add(mappedSuperClass)
        }
    }
    for (const entity of entityMap.values()) {
        for (const extendId of entity.extendsIds) {
            const inheritors = inheritorsMap.get(extendId)
            if (!inheritors) throw new Error(`MappedSuperClass ${extendId}) Not Found`)
            inheritors.entities.add(entity)
        }
    }

    return inheritorsMap
}

export const getMappedSuperClassAllInheritors = <
    ENTITY extends Entity,
    MAPPED_SUPER_CLASS extends MappedSuperClass,
>(
    mappedSuperClass: MAPPED_SUPER_CLASS,
    inheritorsMap: InheritorsMap<ENTITY, MAPPED_SUPER_CLASS>
): InheritorsResult<ENTITY, MAPPED_SUPER_CLASS> => {
    const allEntities = new Set<ENTITY>()
    const allMappedSuperClass = new Set<MAPPED_SUPER_CLASS>()

    const directInheritors = inheritorsMap.get(mappedSuperClass.id)
    if (directInheritors === undefined) throw new Error(`MappedSuperClass ${mappedSuperClass.name}(${mappedSuperClass.id}) not exists`)

    for (const item of directInheritors.mappedSuperClasses) {
        allMappedSuperClass.add(item)

        const indirectInheritors = getMappedSuperClassAllInheritors(item, inheritorsMap)
        for (const item of indirectInheritors.mappedSuperClasses) {
            allMappedSuperClass.add(item)
        }
        for (const item of indirectInheritors.entities) {
            allEntities.add(item)
        }
    }
    for (const item of directInheritors.entities) {
        allEntities.add(item)
    }

    return {
        entities: allEntities,
        mappedSuperClasses: allMappedSuperClass,
    }
}
