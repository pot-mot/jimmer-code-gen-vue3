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
export type InheritInfo = {
    innerAbstractMap: Map<string, DeepReadonly<InheritItem>>
    innerConcreteMap: Map<string, DeepReadonly<InheritItem>>
    abstractInheritInfoMap: Map<string, AbstractInheritInfo>
    concreteInheritInfoMap: Map<string, ConcreteInheritInfo>
    missingDependencies: Map<string, Set<string>>  // 缺失的依赖项
    circularReferences: Map<string, string[][]>   // 循环引用路径
}

export type InheritInfoSync = {
    syncConcrete: (inheritItem: DeepReadonly<InheritItem>) => void
    removeConcrete: (id: string) => void
    syncAbstract: (inheritItem: DeepReadonly<InheritItem>) => void
    removeAbstract: (id: string) => void
}

const deepCloneItem = (item: DeepReadonly<InheritItem>): InheritItem => {
    return {
        id: item.id,
        extendsIds: [...item.extendsIds],
    }
}

const stringifyPath = (path: string[]) => path.join(' -> ')

export const useInheritInfoSync = (inheritInfo: InheritInfo): InheritInfoSync => {
    // 辅助函数：添加缺失依赖
    const addMissingDependency = (id: string, missingId: string) => {
        const missingSet = inheritInfo.missingDependencies.get(id)
        if (missingSet === undefined) {
            inheritInfo.missingDependencies.set(id, new Set([missingId]))
        } else {
            missingSet.add(missingId)
        }
    }
    const cleanMissingDependencies = (id: string) => {
        for (const [key, missingSet] of inheritInfo.missingDependencies) {
            if (missingSet.has(id)) {
                missingSet.delete(id)
                if (missingSet.size === 0) {
                    inheritInfo.missingDependencies.delete(key)
                }
            }
        }
    }

    // 辅助函数：添加循环引用路径
    const addCircularReferencePath = (rootId: string, path: string[]) => {
        const circularReferencePaths = inheritInfo.circularReferences.get(rootId)
        const pathStr = stringifyPath(path)

        if (circularReferencePaths === undefined) {
            inheritInfo.circularReferences.set(rootId, [path])
        } else {
            if (circularReferencePaths.some(it => stringifyPath(it) === pathStr)) return
            circularReferencePaths.push(path)
        }
    }
    const cleanCircularReferencePath = (id: string) => {
        for (const [key, circularReferencePaths] of inheritInfo.circularReferences) {
            for (let i = circularReferencePaths.length - 1; i >= 0; i--) {
                if (circularReferencePaths[i]?.includes(id)) {
                    circularReferencePaths.splice(i, 1)
                }
            }
            if (circularReferencePaths.length === 0) {
                inheritInfo.circularReferences.delete(key)
            }
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
            } else if (path.includes(item.id)) {
                addCircularReferencePath(rootItem.id, path)
            } else {
                path.push(item.id)

                // 遍历所有父类
                for (const parentId of item.extendsIds) {
                    const parent = inheritInfo.innerAbstractMap.get(parentId)
                    if (parent) {
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
            const parent = inheritInfo.innerAbstractMap.get(parentId)
            if (parent) {
                // 添加到父类和祖先类集合
                parentIdSet.add(parentId)
                ancestorIdSet.add(parentId)
                // 递归收集父类的继承关系
                collectExtends(parent)
            } else {
                addMissingDependency(rootItem.id, parentId)
            }
        }

        return {
            parentIdSet,
            ancestorIdSet,
        }
    }

    /**
     * 同步具体实体继承信息
     * 当具体类的继承关系发生变化时调用
     */
    const syncConcrete = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        // 移除循环引用和缺失依赖
        inheritInfo.circularReferences.delete(id)
        inheritInfo.missingDependencies.delete(id)

        const oldInfo = inheritInfo.concreteInheritInfoMap.get(id)
        if (oldInfo) {
            for (const parentId of oldInfo.parentIdSet) {
                const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
                if (!parentInfo) continue
                parentInfo.concreteChildIdSet.delete(id)
            }
            for (const ancestorId of oldInfo.ancestorIdSet) {
                const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
                if (!ancestorInfo) continue
                ancestorInfo.allConcreteChildIdSet.delete(id)
            }
        }

        // 创建新的继承项副本
        const item = deepCloneItem(_item)
        inheritInfo.innerConcreteMap.set(item.id, item)

        // 获取父类和祖先类信息
        const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)

        // 更新父类的子类信息
        for (const parentId of parentIdSet) {
            const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
            if (parentInfo) {
                parentInfo.concreteChildIdSet.add(id)
                parentInfo.allConcreteChildIdSet.add(id)
            }
        }
        // 更新祖先类的子类信息
        for (const ancestorId of ancestorIdSet) {
            const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
            if (ancestorInfo) {
                ancestorInfo.allConcreteChildIdSet.add(id)
            }
        }

        // 存储具体类继承信息
        inheritInfo.concreteInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet
        })
    }


    /**
     * 删除具体类继承信息
     * 清理所有相关的引用关系
     */
    const removeConcrete = (id: string) => {
        const info = inheritInfo.concreteInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] inheritInfo is not existed`)

        for (const parentId of info.parentIdSet) {
            const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
            if (!parentInfo) continue
            parentInfo.concreteChildIdSet.delete(id)
        }
        for (const ancestorId of info.ancestorIdSet) {
            const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
            if (!ancestorInfo) continue
            ancestorInfo.allConcreteChildIdSet.delete(id)
        }

        // 清理所有相关映射
        inheritInfo.innerConcreteMap.delete(id)
        inheritInfo.concreteInheritInfoMap.delete(id)
        inheritInfo.circularReferences.delete(id)
        inheritInfo.missingDependencies.delete(id)
    }

    /**
     * 同步抽象实体继承信息
     * 当抽象类的继承关系发生变化时调用
     */
    const syncAbstract = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        // 移除循环引用和缺失依赖
        inheritInfo.circularReferences.delete(id)
        inheritInfo.missingDependencies.delete(id)
        cleanMissingDependencies(id)
        cleanCircularReferencePath(id)

        const oldInfo = inheritInfo.abstractInheritInfoMap.get(id)
        if (oldInfo) {
            for (const parentId of oldInfo.parentIdSet) {
                const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
                if (!parentInfo) continue
                parentInfo.abstractChildIdSet.delete(id)
            }
            for (const ancestorId of oldInfo.ancestorIdSet) {
                const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
                if (!ancestorInfo) continue
                ancestorInfo.allAbstractChildIdSet.delete(id)
            }
        }

        // 创建新的继承项副本
        const item = deepCloneItem(_item)
        inheritInfo.innerAbstractMap.set(item.id, item)

        // 获取父类和祖先类信息
        const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)

        // 更新父类的子类信息
        for (const parentId of parentIdSet) {
            const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
            if (parentInfo) {
                parentInfo.abstractChildIdSet.add(id)
                parentInfo.allAbstractChildIdSet.add(id)
            }
        }
        // 更新祖先类的子类信息
        for (const ancestorId of ancestorIdSet) {
            const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
            if (ancestorInfo) {
                ancestorInfo.allAbstractChildIdSet.add(id)
            }
        }

        // 初始化子类集合
        const abstractChildIdSet = new Set<string>()
        const concreteChildIdSet = new Set<string>()
        const allAbstractChildIdSet = new Set<string>()
        const allConcreteChildIdSet = new Set<string>()

        // 递归收集子类
        const collectAllChildren = (parentId: string, visited: Set<string> = new Set()) => {
            if (visited.has(parentId)) return
            visited.add(parentId)

            for (const [itemId, item] of inheritInfo.innerAbstractMap) {
                if (item.extendsIds.includes(parentId)) {
                    allAbstractChildIdSet.add(itemId)
                    collectAllChildren(itemId, visited)
                }
            }
            for (const [itemId, item] of inheritInfo.innerConcreteMap) {
                if (item.extendsIds.includes(parentId)) {
                    allConcreteChildIdSet.add(itemId)
                }
            }
        }

        // 收集直接子类
        for (const [itemId, item] of inheritInfo.innerAbstractMap) {
            if (item.extendsIds.includes(id)) {
                abstractChildIdSet.add(itemId)
                allAbstractChildIdSet.add(itemId)
                collectAllChildren(itemId)
            }
        }
        for (const [itemId, item] of inheritInfo.innerConcreteMap) {
            if (item.extendsIds.includes(id)) {
                concreteChildIdSet.add(itemId)
                allConcreteChildIdSet.add(itemId)
            }
        }

        for (const childId of allAbstractChildIdSet) {
            const item = inheritInfo.innerAbstractMap.get(childId)
            if (!item) continue
            const inheritItem = inheritInfo.abstractInheritInfoMap.get(childId)
            if (!inheritItem) continue
            const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)
            inheritItem.parentIdSet = parentIdSet
            inheritItem.ancestorIdSet = ancestorIdSet
        }
        for (const childId of allConcreteChildIdSet) {
            const item = inheritInfo.innerConcreteMap.get(childId)
            if (!item) continue
            const inheritItem = inheritInfo.concreteInheritInfoMap.get(childId)
            if (!inheritItem) continue
            const {parentIdSet, ancestorIdSet} = getAllExtendsIdSet(item)
            inheritItem.parentIdSet = parentIdSet
            inheritItem.ancestorIdSet = ancestorIdSet
        }

        // 存储抽象类继承信息
        inheritInfo.abstractInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet,
            abstractChildIdSet,
            allAbstractChildIdSet,
            concreteChildIdSet,
            allConcreteChildIdSet
        })
    }

    /**
     * 删除抽象类继承信息
     * 清理所有相关的引用关系
     */
    const removeAbstract = (id: string) => {
        const info = inheritInfo.abstractInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] inheritInfo is not existed`)

        for (const parentId of info.parentIdSet) {
            const parentInfo = inheritInfo.abstractInheritInfoMap.get(parentId)
            if (!parentInfo) continue
            parentInfo.abstractChildIdSet.delete(id)
        }
        for (const ancestorId of info.ancestorIdSet) {
            const ancestorInfo = inheritInfo.abstractInheritInfoMap.get(ancestorId)
            if (!ancestorInfo) continue
            ancestorInfo.allAbstractChildIdSet.delete(id)
        }

        // 更新所有抽象子类的继承关系
        for (const childId of info.allAbstractChildIdSet) {
            const childInfo = inheritInfo.abstractInheritInfoMap.get(childId)
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
            const childInfo = inheritInfo.concreteInheritInfoMap.get(childId)
            if (!childInfo) continue

            childInfo.parentIdSet.delete(id)
            childInfo.ancestorIdSet.delete(id)

            // 同时删除所有祖先节点的引用
            for (const ancestorId of info.ancestorIdSet) {
                childInfo.parentIdSet.delete(ancestorId)
                childInfo.ancestorIdSet.delete(ancestorId)
            }
        }

        // 添加 missingDependencies
        for (const childId of info.abstractChildIdSet) {
            addMissingDependency(childId, id)
        }
        for (const childId of info.concreteChildIdSet) {
            addMissingDependency(childId, id)
        }

        // 移除相关的循环引用记录
        for (const [key, circlePaths] of inheritInfo.circularReferences) {
            for (let i = circlePaths.length - 1; i >= 0; i--) {
                if (circlePaths[i]?.includes(id)) {
                    circlePaths.splice(i, 1)
                }
            }
            if (circlePaths.length === 0) {
                inheritInfo.circularReferences.delete(key)
            }
        }

        // 清理所有相关映射
        inheritInfo.innerAbstractMap.delete(id)
        inheritInfo.abstractInheritInfoMap.delete(id)
        inheritInfo.circularReferences.delete(id)
        inheritInfo.missingDependencies.delete(id)
        cleanCircularReferencePath(id)
    }

    for (const item of inheritInfo.innerAbstractMap.values()) {
        syncAbstract(item)
    }
    for (const item of inheritInfo.innerConcreteMap.values()) {
        syncConcrete(item)
    }

    return {
        syncConcrete,
        removeConcrete,
        syncAbstract,
        removeAbstract,
    }
}

export const defaultInheritInfo = (
    abstractMap: DeepReadonly<Map<string, InheritItem>>,
    concreteMap: DeepReadonly<Map<string, InheritItem>>,
): InheritInfo => {
    return {
        innerAbstractMap: new Map(abstractMap),
        innerConcreteMap: new Map(concreteMap),
        abstractInheritInfoMap: new Map<string, AbstractInheritInfo>(),
        concreteInheritInfoMap: new Map<string, ConcreteInheritInfo>(),
        missingDependencies: new Map<string, Set<string>>(),
        circularReferences: new Map<string, string[][]>(),
    }
}
