export type AllExtendsResult = {
    extendsSet: Set<MappedSuperClassWithProperties>
    unexistIdSet: Set<string>
} | {
    cyclicDependenciesPath: MappedSuperClass[]
}

export const getEntityAllExtendsResult = (
    entity: Entity | MappedSuperClass,
    contextData: ModelContextData,
    superClassAllExtendsResultMap: Map<string, AllExtendsResult> = new Map(),
    path: ReadonlyArray<MappedSuperClass> = [],
): AllExtendsResult => {
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
    const extendsSet = new Set<MappedSuperClassWithProperties>()
    const unexistIdSet = new Set<string>()

    if (extendsIds.length === 0) {
        return {
            extendsSet,
            unexistIdSet,
        }
    }

    // 遍历所有父类
    for (const extendId of extendsIds) {
        const superClass = contextData.mappedSuperClassMap.get(extendId)
        if (superClass) {
            // 添加直接父类
            extendsSet.add(superClass)

            let parentExtends: AllExtendsResult | undefined
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
                    contextData,
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

export const getEntityAllExtends = (
    entity: Entity | MappedSuperClass,
    contextData: ModelContextData,
    superClassAllExtendsResultMap: Map<string, AllExtendsResult> = new Map(),
    path: ReadonlyArray<MappedSuperClass> = [],
): Set<MappedSuperClassWithProperties> => {
    const result = getEntityAllExtendsResult(entity, contextData, superClassAllExtendsResultMap, path)
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
    contextData: ModelContextData,
    allExtends: Set<MappedSuperClassWithProperties> = getEntityAllExtends(entity, contextData),
): Property[] => {
    const result = [...entity.properties]

    for (const mappedSuperClass of allExtends) {
        result.push(...mappedSuperClass.properties)
    }

    return result
}