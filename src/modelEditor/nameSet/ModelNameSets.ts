import {buildNameSet, type NameSet} from "@/utils/name/nameSet.ts";
import {reactive, readonly} from "vue";
import type {InheritInfo} from "@/modelEditor/utils/InheritInfo.ts";
import {type ModelEditorHistoryCommands} from "@/modelEditor/history/ModelEditorHistory.ts";
import type {CommandHistory} from "@/history/commandHistory.ts";

type ReadonlyNameSet = Omit<NameSet, 'add' | 'remove' | 'nextThenAdd'>

type ModelNameSets = {
    groupNameSet: NameSet,
    groupItemNameSet: NameSet,
    entityNameSet: NameSet,
    mappedSuperClassNameSet: NameSet,
    embeddableTypeNameSet: NameSet,
    enumerationNameSet: NameSet,
    associationNameSet: NameSet,
    entityPropertyNameSetMap: Map<string, NameSet>,
    mappedSuperClassPropertyNameSetMap: Map<string, NameSet>,
    embeddableTypePropertyNameSetMap: Map<string, NameSet>,
    enumerationItemNameSetMap: Map<string, NameSet>
}

export type ReadonlyModelNameSets = {
    readonly groupNameSet: ReadonlyNameSet,
    readonly groupItemNameSet: ReadonlyNameSet,
    readonly entityNameSet: ReadonlyNameSet,
    readonly mappedSuperClassNameSet: ReadonlyNameSet,
    readonly embeddableTypeNameSet: ReadonlyNameSet,
    readonly enumerationNameSet: ReadonlyNameSet,
    readonly associationNameSet: ReadonlyNameSet,
    readonly entityPropertyNameSetMap: ReadonlyMap<string, ReadonlyNameSet>,
    readonly mappedSuperClassPropertyNameSetMap: ReadonlyMap<string, ReadonlyNameSet>,
    readonly embeddableTypePropertyNameSetMap: ReadonlyMap<string, ReadonlyNameSet>,
    readonly enumerationItemNameSetMap: ReadonlyMap<string, ReadonlyNameSet>
}

const syncNameSetAndNameMap = (
    data: DeepReadonly<{id: string, name: string}>,
    nameSets: Iterable<NameSet>,
    nameMap: Map<string, string>
) => {
    const oldName = nameMap.get(data.id)
    if (oldName === undefined) {
        nameMap.set(data.id, data.name)
        for (const nameSet of nameSets) {
            nameSet.add(data.name)
        }
    } else if (oldName !== data.name) {
        nameMap.set(data.id, data.name)
        for (const nameSet of nameSets) {
            nameSet.remove(oldName)
            nameSet.add(data.name)
        }
    }
}

const removeFromNameSetAndNameMap = (
    data: DeepReadonly<{id: string, name: string}>,
    nameSets: Iterable<NameSet>,
    nameMap: Map<string, string>
) => {
    nameMap.delete(data.id)
    for (const nameSet of nameSets) {
        nameSet.remove(data.name)
    }
}

export const useModelNameSets = (
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    history: CommandHistory<ModelEditorHistoryCommands>
): ReadonlyModelNameSets => {
    const modelNameSets = reactive<ModelNameSets>({
        groupNameSet: buildNameSet([]),
        groupItemNameSet: buildNameSet([]),
        entityNameSet: buildNameSet([]),
        embeddableTypeNameSet: buildNameSet([]),
        enumerationNameSet: buildNameSet([]),
        mappedSuperClassNameSet: buildNameSet([]),
        associationNameSet: buildNameSet([]),
        entityPropertyNameSetMap: new Map<string, NameSet>(),
        embeddableTypePropertyNameSetMap: new Map<string, NameSet>(),
        enumerationItemNameSetMap: new Map<string, NameSet>(),
        mappedSuperClassPropertyNameSetMap: new Map<string, NameSet>(),
    })

    const groupNameMap = new Map<string, string>()
    const syncGroup = (group: DeepReadonly<Group>) => {
        syncNameSetAndNameMap(
            group,
            [
                modelNameSets.groupNameSet
            ],
            groupNameMap
        )
    }
    const removeGroup = (group: DeepReadonly<Group>) => {
        removeFromNameSetAndNameMap(
            group,
            [
                modelNameSets.groupNameSet
            ],
            groupNameMap
        )
    }

    const entityNameMap = new Map<string, string>
    const syncEntity = (entity: DeepReadonly<EntityWithProperties>) => {
        syncNameSetAndNameMap(
            entity,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.entityNameSet
            ],
            entityNameMap
        )

        const propertyNameSet = buildNameSet([])
        const inheritItem = inheritInfo.concreteInheritInfoMap.get(entity.id)
        if (inheritItem) {
            for (const ancestorId of inheritItem.ancestorIdSet) {
                const ancestor = contextData.mappedSuperClassMap.get(ancestorId)
                if (ancestor) {
                    for (const property of ancestor.properties) {
                        propertyNameSet.add(property.name)
                        if ("idViewName" in property) {
                            propertyNameSet.add(property.idViewName)
                        }
                    }
                }
            }
        }
        for (const property of entity.properties) {
            propertyNameSet.add(property.name)
            if ("idViewName" in property) {
                propertyNameSet.add(property.idViewName)
            }
        }
        for (const {association} of contextData.associationMap.values()) {
            if (association.referencedEntityId === entity.id) {
                if ("name" in association.mappedProperty) {
                    propertyNameSet.add(association.mappedProperty.name)
                }
                if ("idViewName" in association.mappedProperty) {
                    propertyNameSet.add(association.mappedProperty.idViewName)
                }
            }
        }
        modelNameSets.entityPropertyNameSetMap.set(entity.id, propertyNameSet)
    }
    const removeEntity = (entity: DeepReadonly<Entity>) => {
        removeFromNameSetAndNameMap(
            entity,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.entityNameSet
            ],
            entityNameMap
        )
        modelNameSets.entityPropertyNameSetMap.delete(entity.id)
    }

    const mappedSuperClassNameMap = new Map<string, string>()
    const syncMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        syncNameSetAndNameMap(
            mappedSuperClass,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.mappedSuperClassNameSet
            ],
            mappedSuperClassNameMap
        )

        const propertyNameSet = buildNameSet([])
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(mappedSuperClass.id)
        if (inheritItem) {
            for (const ancestorId of inheritItem.ancestorIdSet) {
                const ancestor = contextData.mappedSuperClassMap.get(ancestorId)
                if (ancestor) {
                    for (const property of ancestor.properties) {
                        propertyNameSet.add(property.name)
                        if ("idViewName" in property) {
                            propertyNameSet.add(property.idViewName)
                        }
                    }
                }
            }
            for (const childId of inheritItem.allConcreteChildIdSet) {
                const child = contextData.entityMap.get(childId)
                if (child) syncEntity(child)
            }
            for (const childId of inheritItem.allAbstractChildIdSet) {
                const child = contextData.mappedSuperClassMap.get(childId)
                if (child) syncMappedSuperClass(child)
            }
        }
        for (const property of mappedSuperClass.properties) {
            propertyNameSet.add(property.name)
            if ("idViewName" in property) {
                propertyNameSet.add(property.idViewName)
            }
        }
        modelNameSets.mappedSuperClassPropertyNameSetMap.set(mappedSuperClass.id, propertyNameSet)
    }
    const removeMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClass>) => {
        removeFromNameSetAndNameMap(
            mappedSuperClass,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.mappedSuperClassNameSet
            ],
            mappedSuperClassNameMap
        )
        modelNameSets.mappedSuperClassPropertyNameSetMap.delete(mappedSuperClass.id)

        for (const [missingId, missingDependency] of inheritInfo.missingDependencies) {
            if (missingDependency.has(mappedSuperClass.id)) {
                if (contextData.entityMap.has(missingId)) {
                    const child = contextData.entityMap.get(missingId)
                    if (child) syncEntity(child)
                } else if (contextData.mappedSuperClassMap.has(missingId)) {
                    const child = contextData.mappedSuperClassMap.get(missingId)
                    const inheritItem = inheritInfo.abstractInheritInfoMap.get(missingId)
                    if (child && inheritItem) {
                        syncMappedSuperClass(child)
                        for (const childId of inheritItem.allConcreteChildIdSet) {
                            const child = contextData.entityMap.get(childId)
                            if (child) syncEntity(child)
                        }
                        for (const childId of inheritItem.allAbstractChildIdSet) {
                            const child = contextData.mappedSuperClassMap.get(childId)
                            if (child) syncMappedSuperClass(child)
                        }
                    }
                }
            }
        }
    }

    const embeddableTypeNameMap = new Map<string, string>()
    const syncEmbeddableType = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        syncNameSetAndNameMap(
            embeddableType,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.embeddableTypeNameSet
            ],
            embeddableTypeNameMap
        )

        const propertyNameSet = buildNameSet([])
        for (const property of embeddableType.properties) {
            propertyNameSet.add(property.name)
        }
        modelNameSets.embeddableTypePropertyNameSetMap.set(embeddableType.id, propertyNameSet)
    }
    const removeEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
        removeFromNameSetAndNameMap(
            embeddableType,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.embeddableTypeNameSet
            ],
            embeddableTypeNameMap
        )
        modelNameSets.embeddableTypePropertyNameSetMap.delete(embeddableType.id)
    }

    const enumerationNameMap = new Map<string, string>()
    const syncEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        syncNameSetAndNameMap(
            enumeration,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.enumerationNameSet
            ],
            enumerationNameMap
        )

        const itemNameSet = buildNameSet([])
        for (const item of enumeration.items) {
            itemNameSet.add(item.name)
        }
        modelNameSets.enumerationItemNameSetMap.set(enumeration.id, itemNameSet)
    }
    const removeEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        removeFromNameSetAndNameMap(
            enumeration,
            [
                modelNameSets.groupItemNameSet,
                modelNameSets.enumerationNameSet
            ],
            enumerationNameMap
        )
        modelNameSets.enumerationItemNameSetMap.delete(enumeration.id)
    }

    const associationNameMap = new Map<string, string>()
    const syncAssociation = (association: DeepReadonly<AssociationIdOnly>) => {
        if ("name" in association) {
            syncNameSetAndNameMap(
                association,
                [
                    modelNameSets.associationNameSet
                ],
                associationNameMap
            )
        }
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (referencedEntity) syncEntity(referencedEntity)
    }
    const removeAssociation = (association: DeepReadonly<AssociationIdOnly>) => {
        if ("name" in association) {
            removeFromNameSetAndNameMap(
                association,
                [
                    modelNameSets.associationNameSet
                ],
                associationNameMap
            )
        }
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (referencedEntity) syncEntity(referencedEntity)
    }

    for (const it of contextData.groupMap.values()) syncGroup(it)
    for (const it of contextData.entityMap.values()) syncEntity(it)
    for (const it of contextData.mappedSuperClassMap.values()) syncMappedSuperClass(it)
    for (const it of contextData.embeddableTypeMap.values()) syncEmbeddableType(it)
    for (const it of contextData.enumerationMap.values()) syncEnumeration(it)
    for (const {association} of contextData.associationMap.values()) syncAssociation(association)


    const getGroup = (id: string) => {
        const group = contextData.groupMap.get(id)
        if (!group) throw new Error(`Group ${id} not found`)
        return group
    }
    const getEntity = (id: string) => {
        const entity = contextData.entityMap.get(id)
        if (!entity) throw new Error(`Entity ${id} not found`)
        return entity
    }
    const getMappedSuperClass = (id: string) => {
        const mappedSuperClass = contextData.mappedSuperClassMap.get(id)
        if (!mappedSuperClass) throw new Error(`MappedSuperClass ${id} not found`)
        return mappedSuperClass
    }
    const getEmbeddableType = (id: string) => {
        const embeddableType = contextData.embeddableTypeMap.get(id)
        if (!embeddableType) throw new Error(`EmbeddableType ${id} not found`)
        return embeddableType
    }
    const getEnumeration = (id: string) => {
        const enumeration = contextData.enumerationMap.get(id)
        if (!enumeration) throw new Error(`Enumeration ${id} not found`)
        return enumeration
    }
    const getAssociation = (id: string) => {
        const edgedAssociation = contextData.associationMap.get(id)
        if (!edgedAssociation) throw new Error(`Association ${id} not found`)
        return edgedAssociation.association
    }

    history.eventBus.on('change', (data) => {
        // 新增
        if (data.key === "group:add") {
            if (data.type === "apply") syncGroup(getGroup(data.options.group.id))
            else if (data.type === "revert") removeGroup(data.options.group)
        } else if (data.key === "entity:add") {
            if (data.type === "apply") syncEntity(getEntity(data.options.entity.id))
            else if (data.type === "revert") removeEntity(data.options.entity)
        } else if (data.key === "mapped-super-class:add") {
            if (data.type === "apply") syncMappedSuperClass(getMappedSuperClass(data.options.mappedSuperClass.id))
            else if (data.type === "revert") removeMappedSuperClass(data.options.mappedSuperClass)
        } else if (data.key === "embeddable-type:add") {
            if (data.type === "apply") syncEmbeddableType(getEmbeddableType(data.options.embeddableType.id))
            else if (data.type === "revert") removeEmbeddableType(data.options.embeddableType)
        } else if (data.key === "enumeration:add") {
            if (data.type === "apply") syncEnumeration(getEnumeration(data.options.enumeration.id))
            else if (data.type === "revert") removeEnumeration(data.options.enumeration)
        }  else if (data.key === "association:add") {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id))
            else if (data.type === "revert") removeAssociation(data.options.association)
        }

        // 修改
        else if (data.key === "group:change") {
            if (data.type === "apply") syncGroup(getGroup(data.options.group.id))
            else if (data.type === "revert") syncGroup(getGroup(data.revertOptions.group.id))
        } else if (data.key === "entity:change") {
            if (data.type === "apply") syncEntity(getEntity(data.options.entity.id))
            else if (data.type === "revert") syncEntity(getEntity(data.revertOptions.entity.id))
        } else if (data.key === "mapped-super-class:change") {
            if (data.type === "apply") syncMappedSuperClass(getMappedSuperClass(data.options.mappedSuperClass.id))
            else if (data.type === "revert") syncMappedSuperClass(getMappedSuperClass(data.revertOptions.mappedSuperClass.id))
        } else if (data.key === "embeddable-type:change") {
            if (data.type === "apply") syncEmbeddableType(getEmbeddableType(data.options.embeddableType.id))
            else if (data.type === "revert") syncEmbeddableType(getEmbeddableType(data.revertOptions.embeddableType.id))
        } else if (data.key === "enumeration:change") {
            if (data.type === "apply") syncEnumeration(getEnumeration(data.options.enumeration.id))
            else if (data.type === "revert") syncEnumeration(getEnumeration(data.revertOptions.enumeration.id))
        } else if (data.key === "association:change") {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id))
            else if (data.type === "revert") syncAssociation(getAssociation(data.revertOptions.association.id))
        }

        // 导入
        else if (data.key === "import") {
            if (data.type === "apply") {
                for (const group of data.options.data.groups) syncGroup(getGroup(group.id))
                for (const {data: enumeration} of data.options.data.enumerations) syncEnumeration(getEnumeration(enumeration.id))
                for (const {data: embeddableType} of data.options.data.embeddableTypes) syncEmbeddableType(getEmbeddableType(embeddableType.id))
                for (const {data: mappedSuperClass} of data.options.data.mappedSuperClasses) syncMappedSuperClass(getMappedSuperClass(mappedSuperClass.id))
                for (const {data: entity} of data.options.data.entities) syncEntity(getEntity(entity.id))
                for (const {data: association} of data.options.data.associations) syncAssociation(getAssociation(association.id))
            } else {
                for (const {data: association} of data.options.data.associations) removeAssociation(association)
                for (const {data: entity} of data.options.data.entities) removeEntity(entity)
                for (const {data: mappedSuperClass} of data.options.data.mappedSuperClasses) removeMappedSuperClass(mappedSuperClass)
                for (const {data: embeddableType} of data.options.data.embeddableTypes) removeEmbeddableType(embeddableType)
                for (const {data: enumeration} of data.options.data.enumerations) removeEnumeration(enumeration)
                for (const group of data.options.data.groups) removeGroup(group)
            }
        }

        // 删除
        else if (data.key === "remove") {
            if (data.type === "apply") {
                for (const {data: association} of data.revertOptions.associations) removeAssociation(association)
                for (const {data: entity} of data.revertOptions.entities) removeEntity(entity)
                for (const {data: mappedSuperClass} of data.revertOptions.mappedSuperClasses) removeMappedSuperClass(mappedSuperClass)
                for (const {data: embeddableType} of data.revertOptions.embeddableTypes) removeEmbeddableType(embeddableType)
                for (const {data: enumeration} of data.revertOptions.enumerations) removeEnumeration(enumeration)
                for (const group of data.revertOptions.groups) removeGroup(group)
            } else {
                for (const group of data.revertOptions.groups) syncGroup(getGroup(group.id))
                for (const {data: enumeration} of data.revertOptions.enumerations) syncEnumeration(getEnumeration(enumeration.id))
                for (const {data: embeddableType} of data.revertOptions.embeddableTypes) syncEmbeddableType(getEmbeddableType(embeddableType.id))
                for (const {data: mappedSuperClass} of data.revertOptions.mappedSuperClasses) syncMappedSuperClass(getMappedSuperClass(mappedSuperClass.id))
                for (const {data: entity} of data.revertOptions.entities) syncEntity(getEntity(entity.id))
                for (const {data: association} of data.revertOptions.associations) syncAssociation(getAssociation(association.id))
            }
        }
    })

    return readonly(modelNameSets)
}