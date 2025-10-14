// 继承项定义
export type InheritItem = {
    id: string              // 实体ID
    extendsIds: string[]    // 继承的父类ID列表
}

// 抽象类继承信息
export type AbstractInheritInfo = {
    parentIdSet: Set<string>              // 直接父类ID集合
    ancestorIdSet: Set<string>            // 所有祖先类ID集合
    abstractChildIdSet: Set<string>       // 直接抽象子类ID集合
    allAbstractChildIdSet: Set<string>    // 所有抽象子类ID集合
    concreteChildIdSet: Set<string>       // 直接具体子类ID集合
    allConcreteChildIdSet: Set<string>    // 所有具体子类ID集合
}

// 具体类继承信息
export type ConcreteInheritInfo = {
    parentIdSet: Set<string>     // 直接父类ID集合
    ancestorIdSet: Set<string>   // 所有祖先类ID集合
}

// 继承信息管理器
export type InheritInfos = {
    abstractInheritInfoMap: DeepReadonly<Map<string, AbstractInheritInfo>>
    concreteInheritInfoMap: DeepReadonly<Map<string, ConcreteInheritInfo>>
    missingDependencies: DeepReadonly<Map<string, Set<string>>>  // 缺失的依赖项
    circularReferences: DeepReadonly<Map<string, string[][]>>    // 循环引用路径
    syncAbstract: (inheritItem: DeepReadonly<InheritItem>) => void
    syncConcrete: (inheritItem: DeepReadonly<InheritItem>) => void
    removeAbstract: (id: string) => void
    removeConcrete: (id: string) => void
}

export const buildInheritInfo = (
    abstractMap: DeepReadonly<Map<string, InheritItem>>,
    concreteMap: DeepReadonly<Map<string, InheritItem>>,
): InheritInfos => {
    // 内部映射，用于维护继承关系
    const innerAbstractMap = new Map<string, DeepReadonly<InheritItem>>(abstractMap)
    const innerConcreteMap = new Map<string, DeepReadonly<InheritItem>>(concreteMap)

    // 继承信息映射
    const abstractInheritInfoMap = new Map<string, AbstractInheritInfo>()
    const concreteInheritInfoMap = new Map<string, ConcreteInheritInfo>()

    // 缺失依赖和循环引用管理
    const missingDependencies = new Map<string, Set<string>>()
    const circularReferences = new Map<string, string[][]>()

    // 辅助函数：添加缺失依赖
    const addMissingDependency = (id: string, missingId: string) => {
        const missingSet = missingDependencies.get(id)
        if (missingSet === undefined) {
            missingDependencies.set(id, new Set([missingId]))
        } else {
            missingSet.add(missingId)
        }
    }

    const stringifyPath = (path: string[]) => path.join(' -> ')

    // 辅助函数：添加循环引用路径
    const addCircularReferencePath = (rootId: string, path: string[]) => {
        const circularReferencePaths = circularReferences.get(rootId)
        const pathStr = stringifyPath(path)

        if (circularReferencePaths === undefined) {
            circularReferences.set(rootId, [path])
        } else {
            if (circularReferencePaths.some(it => stringifyPath(it) === pathStr)) return
            circularReferencePaths.push(path)
        }
    }

    /**
     * 递归获取所有父级和祖先ID集合
     * - 检测循环引用并添加到 circularReferences
     * - 检测缺失依赖并添加到 missingDependencies
     */
    const getAllExtendsIdSet = (
        rootItem: DeepReadonly<InheritItem>
    ) => {
        const parentIdSet = new Set<string>()    // 直接父类ID集合
        const ancestorIdSet = new Set<string>()  // 所有祖先类ID集合

        // 递归收集继承关系
        const collectExtends = (item: DeepReadonly<InheritItem>, path: string[] = []) => {
            // 检测循环引用
            if (item.id === rootItem.id) {
                addCircularReferencePath(rootItem.id, [...path, rootItem.id])
            }else if (path.includes(item.id)) {
                addCircularReferencePath(rootItem.id, path)
            } else {
                path.push(item.id)

                // 遍历所有父类
                for (const parentId of item.extendsIds) {
                    const parent = innerAbstractMap.get(parentId)
                    if (!parent) {
                        // 父类不存在，记录为缺失依赖
                        addMissingDependency(item.id, parentId)
                    } else {
                        // 添加到祖先集合
                        ancestorIdSet.add(parentId)
                        // 递归处理父类的继承关系
                        collectExtends(parent, path)
                    }
                }
            }
        }

        // 处理根项的直接父类
        for (const parentId of rootItem.extendsIds) {
            const parent = innerAbstractMap.get(parentId)
            if (!parent) {
                // 父类不存在，记录为缺失依赖
                addMissingDependency(rootItem.id, parentId)
            } else {
                // 添加到父类和祖先类集合
                parentIdSet.add(parentId)
                ancestorIdSet.add(parentId)
                // 递归收集父类的继承关系
                collectExtends(parent)
            }
        }

        return {
            parentIdSet,
            ancestorIdSet,
        }
    }

    /**
     * 更新祖先节点的子类信息
     * 当添加新子类时，需要更新所有祖先节点的子类统计信息
     */
    const updateAncestorsWithNewChild = (parentId: string, childId: string, isAbstract: boolean, visited: Set<string> = new Set()) => {
        // 防止循环处理
        if (visited.has(parentId)) return
        visited.add(parentId)

        const parentItem = innerAbstractMap.get(parentId)
        if (parentItem) {
            // 遍历父类的所有父类（即当前节点的祖先）
            for (const ancestorId of parentItem.extendsIds) {
                const ancestorInfo = abstractInheritInfoMap.get(ancestorId)
                if (ancestorInfo) {
                    // 根据子类类型更新相应的集合
                    if (isAbstract) {
                        ancestorInfo.allAbstractChildIdSet.add(childId)
                    } else {
                        ancestorInfo.allConcreteChildIdSet.add(childId)
                    }
                    // 递归更新更上层的祖先
                    updateAncestorsWithNewChild(ancestorId, childId, isAbstract, visited)
                }
            }
        }
    }

    /**
     * 同步抽象实体继承信息
     * 当抽象类的继承关系发生变化时调用
     */
    const syncAbstract = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        // 如果已存在，先删除旧信息
        if (abstractInheritInfoMap.has(id)) removeAbstract(id)

        // 创建新的继承项副本
        const item = {id, extendsIds: [..._item.extendsIds]}
        innerAbstractMap.set(item.id, item)

        // 获取父类和祖先类信息
        const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)

        // 初始化子类集合
        const abstractChildIdSet = new Set<string>()
        const concreteChildIdSet = new Set<string>()

        // 更新直接父类的子类信息
        for (const parentId of parentIdSet) {
            const parentInfo = abstractInheritInfoMap.get(parentId)
            if (parentInfo) {
                parentInfo.abstractChildIdSet.add(id)
                parentInfo.allAbstractChildIdSet.add(id)
                // 更新祖先节点的子类统计
                updateAncestorsWithNewChild(parentId, id, true)
            }
        }

        // 查找所有直接子类
        for (const [itemId, item] of innerAbstractMap) {
            if (item.extendsIds.includes(id)) {
                abstractChildIdSet.add(itemId)
            }
        }
        for (const [itemId, item] of innerConcreteMap) {
            if (item.extendsIds.includes(id)) {
                concreteChildIdSet.add(itemId)
            }
        }

        // 收集所有间接子类
        const allAbstractChildIdSet = new Set<string>()
        const allConcreteChildIdSet = new Set<string>()

        const collectAllChildren = (parentId: string, visited: Set<string> = new Set()) => {
            if (visited.has(parentId)) return
            visited.add(parentId)

            for (const [itemId, item] of innerAbstractMap) {
                if (item.extendsIds.includes(parentId)) {
                    allAbstractChildIdSet.add(itemId)

                    // 重新检查并恢复循环引用和缺失依赖信息
                    getAllExtendsIdSet(item)

                    // 递归收集子类
                    collectAllChildren(itemId, visited)
                }
            }
            for (const [itemId, item] of innerConcreteMap) {
                if (item.extendsIds.includes(parentId)) {
                    allConcreteChildIdSet.add(itemId)

                    // 重新检查并恢复循环引用和缺失依赖信息
                    getAllExtendsIdSet(item)
                }
            }
        }
        collectAllChildren(id)

        // 存储抽象类继承信息
        abstractInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet,
            abstractChildIdSet,
            allAbstractChildIdSet,
            concreteChildIdSet,
            allConcreteChildIdSet
        })
    }

    /**
     * 同步具体实体继承信息
     * 当具体类的继承关系发生变化时调用
     */
    const syncConcrete = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        // 如果已存在，先删除旧信息
        if (concreteInheritInfoMap.has(id)) removeConcrete(id)

        // 创建新的继承项副本
        const item = {id, extendsIds: [..._item.extendsIds]}
        innerConcreteMap.set(item.id, item)

        // 获取父类和祖先类信息
        const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)

        // 更新父类的子类信息
        for (const parentId of parentIdSet) {
            const parentInfo = abstractInheritInfoMap.get(parentId)
            if (parentInfo) {
                parentInfo.concreteChildIdSet.add(id)
                parentInfo.allConcreteChildIdSet.add(id)
                // 更新祖先节点的子类统计
                updateAncestorsWithNewChild(parentId, id, false)
            }
        }

        // 存储具体类继承信息
        concreteInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet
        })
    }

    /**
     * 删除抽象类继承信息
     * 清理所有相关的引用关系
     */
    const removeAbstract = (id: string) => {
        const info = abstractInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] inheritInfo is not existed`)

        // 从所有祖先类中移除该类的引用
        for (const ancestorId of info.ancestorIdSet) {
            const ancestorInfo = abstractInheritInfoMap.get(ancestorId)
            if (!ancestorInfo) continue

            ancestorInfo.abstractChildIdSet.delete(id)
            ancestorInfo.allAbstractChildIdSet.delete(id)
        }

        // 更新所有抽象子类的继承关系
        for (const childId of info.allAbstractChildIdSet) {
            const childInfo = abstractInheritInfoMap.get(childId)
            if (!childInfo) continue

            childInfo.parentIdSet.delete(id)
            childInfo.ancestorIdSet.delete(id)

            // 同时删除所有祖先节点的引用
            for (const ancestorId of info.ancestorIdSet) {
                childInfo.parentIdSet.delete(ancestorId)
                childInfo.ancestorIdSet.delete(ancestorId)
            }
        }

        // 更新所有具体子类的继承关系
        for (const childId of info.allConcreteChildIdSet) {
            const childInfo = concreteInheritInfoMap.get(childId)
            if (!childInfo) continue

            childInfo.parentIdSet.delete(id)
            childInfo.ancestorIdSet.delete(id)

            // 同时删除所有祖先节点的引用
            for (const ancestorId of info.ancestorIdSet) {
                childInfo.parentIdSet.delete(ancestorId)
                childInfo.ancestorIdSet.delete(ancestorId)
            }
        }

        // 移除相关的循环引用记录
        for (const [key, circlePaths] of circularReferences) {
            for (let i = circlePaths.length - 1; i >= 0; i--) {
                if (circlePaths[i]?.includes(id)) {
                    circlePaths.splice(i, 1)
                }
            }
            if (circlePaths.length === 0) {
                circularReferences.delete(key)
            }
        }

        // 清理所有相关映射
        innerAbstractMap.delete(id)
        abstractInheritInfoMap.delete(id)
        circularReferences.delete(id)
        missingDependencies.delete(id)
    }

    /**
     * 删除具体类继承信息
     * 清理所有相关的引用关系
     */
    const removeConcrete = (id: string) => {
        const info = concreteInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] inheritInfo is not existed`)

        // 从所有祖先类中移除该类的引用
        for (const ancestorId of info.ancestorIdSet) {
            const ancestorInfo = abstractInheritInfoMap.get(ancestorId)
            if (!ancestorInfo) continue

            ancestorInfo.concreteChildIdSet.delete(id)
            ancestorInfo.allConcreteChildIdSet.delete(id)
        }

        // 清理所有相关映射
        innerConcreteMap.delete(id)
        concreteInheritInfoMap.delete(id)
        circularReferences.delete(id)
        missingDependencies.delete(id)
    }

    // 初始化所有抽象类和具体类的继承信息
    for (const item of abstractMap.values()) {
        syncAbstract(item)
    }
    for (const item of concreteMap.values()) {
        syncConcrete(item)
    }

    // 返回继承信息管理器
    return {
        abstractInheritInfoMap,
        concreteInheritInfoMap,
        missingDependencies,
        circularReferences,
        syncAbstract,
        syncConcrete,
        removeAbstract,
        removeConcrete,
    }
}
