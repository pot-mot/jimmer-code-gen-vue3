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
            if (!inheritors) throw new Error(`[${extendId}] Not Found`)
            inheritors.mappedSuperClasses.add(mappedSuperClass)
        }
    }
    for (const entity of entityMap.values()) {
        for (const extendId of entity.extendsIds) {
            const inheritors = inheritorsMap.get(extendId)
            if (!inheritors) throw new Error(`[${extendId}] Not Found`)
            inheritors.entities.add(entity)
        }
    }

    return inheritorsMap
}

export const getAllInheritors = <
    ENTITY extends Entity,
    MAPPED_SUPER_CLASS extends MappedSuperClass,
>(
    mappedSuperClassId: string,
    inheritorsMap: InheritorsMap<ENTITY, MAPPED_SUPER_CLASS>,
): InheritorsResult<ENTITY, MAPPED_SUPER_CLASS> => {
    const allEntities = new Set<ENTITY>()
    const allMappedSuperClass = new Set<MAPPED_SUPER_CLASS>()

    const directInheritors = inheritorsMap.get(mappedSuperClassId)
    if (directInheritors === undefined) throw new Error(`[${mappedSuperClassId}] not exists`)

    for (const item of directInheritors.mappedSuperClasses) {
        allMappedSuperClass.add(item)

        const indirectInheritors = getAllInheritors(item.id, inheritorsMap)
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

export type AllExtendsInfo<MAPPED_SUPER_CLASS extends MappedSuperClass> = {
    directExtendSet: Set<MAPPED_SUPER_CLASS>
    extendsSet: Set<MAPPED_SUPER_CLASS>
    unexistIdSet: Set<string>
} | {
    cyclicDependenciesPath: string[]
}

const getAllExtendsInfo = <MAPPED_SUPER_CLASS extends MappedSuperClass>(
    current: DeepReadonly<{
        id: string,
        extendsIds: string[]
    }>,
    mappedSuperClassMap: ReadonlyMap<string, MAPPED_SUPER_CLASS>,
    allExtendsCacheMap: Map<string, AllExtendsInfo<MAPPED_SUPER_CLASS>> = new Map(),
    path: ReadonlyArray<string> = [],
): AllExtendsInfo<MAPPED_SUPER_CLASS> => {
    const {id, extendsIds} = current

    const currentPath = [...path, id]

    // 如果存在循环依赖路径，直接返回
    if (path.includes(id)) {
        return {
            cyclicDependenciesPath: currentPath
        }
    }

    // 如果在缓存中，直接返回
    if (allExtendsCacheMap.has(id)) {
        return allExtendsCacheMap.get(id)!
    }

    const directExtendSet = new Set<MAPPED_SUPER_CLASS>()
    const extendsSet = new Set<MAPPED_SUPER_CLASS>()
    const unexistIdSet = new Set<string>()

    if (extendsIds.length === 0) {
        return {
            directExtendSet,
            extendsSet,
            unexistIdSet,
        }
    }

    // 遍历所有父类
    for (const extendId of extendsIds) {
        const superClass = mappedSuperClassMap.get(extendId)
        if (superClass) {
            // 添加直接父类
            directExtendSet.add(superClass)
            extendsSet.add(superClass)

            let parentExtends: AllExtendsInfo<MAPPED_SUPER_CLASS> | undefined
            if (allExtendsCacheMap.size > 0) {
                const result = allExtendsCacheMap.get(superClass.id)
                if (result) {
                    parentExtends = result
                }
            }
            if (!parentExtends) {
                // 递归获取父类的所有父类
                parentExtends = getAllExtendsInfo(
                    superClass,
                    mappedSuperClassMap,
                    allExtendsCacheMap,
                    currentPath,
                )
                allExtendsCacheMap.set(superClass.id, parentExtends)
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
        directExtendSet,
        extendsSet,
        unexistIdSet,
    }
}

export const getAllExtends = <MAPPED_SUPER_CLASS extends MappedSuperClass>(
    current: DeepReadonly<{
        id: string,
        extendsIds: string[]
    }>,
    mappedSuperClassMap: ReadonlyMap<string, MAPPED_SUPER_CLASS>,
    allExtendsCacheMap: Map<string, AllExtendsInfo<MAPPED_SUPER_CLASS>> = new Map(),
): {
    directExtendSet: Set<MAPPED_SUPER_CLASS>
    extendsSet: Set<MAPPED_SUPER_CLASS>
} => {
    const result = getAllExtendsInfo(current, mappedSuperClassMap, allExtendsCacheMap)
    if ("cyclicDependenciesPath" in result) {
        throw new Error(`[${current.id}] Cyclic Dependencies: ${result.cyclicDependenciesPath.map(id => `[${id}]`).join(" -> ")}`)
    } else if (result.unexistIdSet.size > 0) {
        throw new Error(`[${current.id}] Unexists MappedSuperClass Id: ${[...result.unexistIdSet].join(", ")}`)
    } else {
        return {
            directExtendSet: result.directExtendSet,
            extendsSet: result.extendsSet,
        }
    }
}

export const getAllProperties = (
    entity: EntityWithProperties | MappedSuperClassWithProperties,
    mappedSuperClassMap: ReadonlyMap<string, MappedSuperClassWithProperties>,
    allExtends: Set<MappedSuperClassWithProperties> = getAllExtends(entity, mappedSuperClassMap).extendsSet,
): Property[] => {
    const result = [...entity.properties]

    for (const mappedSuperClass of allExtends) {
        result.push(...mappedSuperClass.properties)
    }

    return result
}
