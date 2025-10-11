export type InheritItem = {
    id: string
    extendsIds: string[]
}

export type AbstractInheritInfo = {
    parentIdSet: Set<string>
    ancestorIdSet: Set<string>
    abstractChildIdSet: Set<string>
    allAbstractChildIdSet: Set<string>
    concreteChildIdSet: Set<string>
    allConcreteChildIdSet: Set<string>
}

export type ConcreteInheritInfo = {
    parentIdSet: Set<string>
    ancestorIdSet: Set<string>
}

export type InheritInfoData = {
    abstractInheritInfoMap: DeepReadonly<Map<string, AbstractInheritInfo>>
    concreteInheritInfoMap: DeepReadonly<Map<string, ConcreteInheritInfo>>
    syncAbstract: (inheritItem: DeepReadonly<InheritItem>) => void
    syncConcrete: (inheritItem: DeepReadonly<InheritItem>) => void
    removeAbstract: (id: string) => void
    removeConcrete: (id: string) => void
}

export const buildInheritInfo = (
    abstractMap: DeepReadonly<Map<string, InheritItem>>,
    concreteMap: DeepReadonly<Map<string, InheritItem>>,
): InheritInfoData => {
    const innerAbstractMap = new Map<string, DeepReadonly<InheritItem>>(abstractMap)
    const innerConcreteMap = new Map<string, DeepReadonly<InheritItem>>(concreteMap)

    const abstractInheritInfoMap = new Map<string, AbstractInheritInfo>()
    const concreteInheritInfoMap = new Map<string, ConcreteInheritInfo>()

    // 递归获取所有父级ID集合
    const getAllExtendsIdSet = (
        item: DeepReadonly<InheritItem>
    ): Set<string> => {
        const allExtends = new Set<string>()
        const visited = new Set<string>()

        const collectExtends = (item: DeepReadonly<InheritItem>) => {
            if (visited.has(item.id)) return
            visited.add(item.id)

            for (const extendId of item.extendsIds) {
                allExtends.add(extendId)
                const extend = innerAbstractMap.get(extendId)
                if (!extend) throw new Error(`[${extendId}] is not existed`)
                collectExtends(extend)
            }
        }
        collectExtends(item)

        return allExtends
    }

    // 辅助函数：更新祖先节点的子类信息
    const updateAncestorsWithNewChild = (parentId: string, childId: string, isAbstract: boolean) => {
        const parentItem = innerAbstractMap.get(parentId)
        if (parentItem) {
            for (const ancestorId of parentItem.extendsIds) {
                const ancestorInfo = abstractInheritInfoMap.get(ancestorId)
                if (!ancestorInfo) throw new Error(`[${ancestorId}] is not existed`)
                if (isAbstract) {
                    ancestorInfo.allAbstractChildIdSet.add(childId)
                } else {
                    ancestorInfo.allConcreteChildIdSet.add(childId)
                }
                updateAncestorsWithNewChild(ancestorId, childId, isAbstract)
            }
        }
    }

    // 同步抽象实体继承信息
    const syncAbstract = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        const item = {id, extendsIds: [..._item.extendsIds]}
        innerAbstractMap.set(item.id, item)

        const parentIdSet = new Set(item.extendsIds)
        const ancestorIdSet = getAllExtendsIdSet(item)

        const abstractChildIdSet = new Set<string>()
        const concreteChildIdSet = new Set<string>()

        for (const parentId of item.extendsIds) {
            const parentInfo = abstractInheritInfoMap.get(parentId)
            if (!parentInfo) throw new Error(`[${parentId}] is not existed`)
            parentInfo.abstractChildIdSet.add(id)
            parentInfo.allAbstractChildIdSet.add(id)
            updateAncestorsWithNewChild(parentId, id, true)
        }

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

        const allAbstractChildIdSet = new Set<string>()
        const allConcreteChildIdSet = new Set<string>()

        const collectAllChildren = (parentId: string) => {
            for (const [itemId, item] of innerAbstractMap) {
                if (item.extendsIds.includes(parentId)) {
                    allAbstractChildIdSet.add(itemId)
                    collectAllChildren(itemId)
                }
            }

            for (const [itemId, item] of innerConcreteMap) {
                if (item.extendsIds.includes(parentId)) {
                    allConcreteChildIdSet.add(itemId)
                }
            }
        }

        collectAllChildren(id)

        abstractInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet,
            abstractChildIdSet,
            allAbstractChildIdSet,
            concreteChildIdSet,
            allConcreteChildIdSet
        })
    }

    // 同步具体实体继承信息
    const syncConcrete = (_item: DeepReadonly<InheritItem>) => {
        const id = _item.id
        const item = {id, extendsIds: [..._item.extendsIds]}
        innerAbstractMap.set(item.id, item)

        const parentIdSet = new Set(item.extendsIds)
        const ancestorIdSet = getAllExtendsIdSet(item)

        for (const parentId of item.extendsIds) {
            const parentInfo = abstractInheritInfoMap.get(parentId)
            if (!parentInfo) throw new Error(`[${parentId}] is not existed`)
            parentInfo.concreteChildIdSet.add(id)
            parentInfo.allConcreteChildIdSet.add(id)
            updateAncestorsWithNewChild(parentId, id, false)
        }

        concreteInheritInfoMap.set(id, {
            parentIdSet,
            ancestorIdSet
        })
    }

    const removeAbstract = (id: string) => {
        const item = innerAbstractMap.get(id)
        if (!item) throw new Error(`[${id}] is not existed`)
        const info = abstractInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] is not existed`)

        for (const childId of info.abstractChildIdSet) {
            removeAbstract(childId)
        }
        for (const childId of info.concreteChildIdSet) {
            removeConcrete(childId)
        }

        innerAbstractMap.delete(id)
        abstractInheritInfoMap.delete(id)

        for (const info of abstractInheritInfoMap.values()) {
            if (info.parentIdSet.has(id)) {
                info.parentIdSet.delete(id)
            }
            if (info.ancestorIdSet.has(id)) {
                info.ancestorIdSet.delete(id)
            }
            if (info.abstractChildIdSet.has(id)) {
                info.abstractChildIdSet.delete(id)
            }
            if (info.allAbstractChildIdSet.has(id)) {
                info.allAbstractChildIdSet.delete(id)
            }
            if (info.concreteChildIdSet.has(id)) {
                info.concreteChildIdSet.delete(id)
            }
            if (info.allConcreteChildIdSet.has(id)) {
                info.allConcreteChildIdSet.delete(id)
            }
        }

        for (const info of concreteInheritInfoMap.values()) {
            if (info.parentIdSet.has(id)) {
                info.parentIdSet.delete(id)
            }
            if (info.ancestorIdSet.has(id)) {
                info.ancestorIdSet.delete(id)
            }
        }
    }

    const removeConcrete = (id: string) => {
        const item = innerConcreteMap.get(id)
        if (!item) throw new Error(`[${id}] is not existed`)
        const info = concreteInheritInfoMap.get(id)
        if (!info) throw new Error(`[${id}] is not existed`)

        innerConcreteMap.delete(id)
        concreteInheritInfoMap.delete(id)

        for (const info of abstractInheritInfoMap.values()) {
            if (info.concreteChildIdSet.has(id)) {
                info.concreteChildIdSet.delete(id)
            }
            if (info.allConcreteChildIdSet.has(id)) {
                info.allConcreteChildIdSet.delete(id)
            }
        }
    }

    for (const item of abstractMap.values()) {
        syncAbstract(item)
    }
    for (const item of concreteMap.values()) {
        syncConcrete(item)
    }

    return {
        abstractInheritInfoMap,
        concreteInheritInfoMap,
        syncAbstract,
        syncConcrete,
        removeAbstract,
        removeConcrete,
    }
}
