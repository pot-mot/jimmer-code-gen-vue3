import type {InheritInfo} from "@/modelEditor/utils/InheritInfo.ts";
import type {CommandHistory} from "@/history/commandHistory.ts";
import {type ModelEditorHistoryCommands} from "@/modelEditor/history/ModelEditorHistory.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {computed, reactive, readonly} from "vue";
import {entityDiagnose, type EntityDiagnoseResult} from "@/modelEditor/diagnostic/entityDiagnose.ts";
import {enumerationDiagnose, type EnumerationDiagnoseResult} from "@/modelEditor/diagnostic/enumerationDiagnose.ts";
import {embeddableTypeDiagnose, type EmbeddableTypeDiagnose} from "@/modelEditor/diagnostic/embeddableTypeDiagnose.ts";
import {
    mappedSuperClassDiagnose,
    type MappedSuperClassDiagnose
} from "@/modelEditor/diagnostic/mappedSuperClassDiagnose.ts";
import {groupDiagnose, type GroupDiagnose} from "@/modelEditor/diagnostic/groupDiagnose.ts";
import {type AssociationDiagnose, associationDiagnose} from "@/modelEditor/diagnostic/associationDiagnose.ts";
import {defaultModelSubIdSets} from "@/modelEditor/utils/ModelSubIds.ts";

export type DiagnoseType = "warning" | "error" | "info"

export type DiagnoseMessage = {
    content: string
    type: DiagnoseType
}

export type ModelDiagnoseInfo = {
    readonly groupMap: Map<string, GroupDiagnose>
    readonly groupTotal: number
    readonly entityMap: Map<string, EntityDiagnoseResult>
    readonly entityTotal: number
    readonly enumerationMap: Map<string, EnumerationDiagnoseResult>
    readonly enumerationTotal: number
    readonly embeddableTypeMap: Map<string, EmbeddableTypeDiagnose>
    readonly embeddableTypeTotal: number
    readonly mappedSuperClassMap: Map<string, MappedSuperClassDiagnose>
    readonly mappedSuperClassTotal: number
    readonly associationMap: Map<string, AssociationDiagnose>
    readonly associationTotal: number

    readonly total: number
}

export const useModelDiagnoseInfo = (
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ReadonlyModelNameSets>,
    history: CommandHistory<ModelEditorHistoryCommands>,
) => {
    const modelDiagnoseInfo: ModelDiagnoseInfo = reactive({
        groupMap: new Map(),
        groupTotal: computed(() => {
            let total = 0
            for (const group of modelDiagnoseInfo.groupMap.values()) {
                total += group.size
            }
            return total
        }),
        entityMap: new Map(),
        entityTotal: computed(() => {
            let total = 0
            for (const entity of modelDiagnoseInfo.entityMap.values()) {
                total += entity.size
            }
            return total
        }),
        enumerationMap: new Map(),
        enumerationTotal: computed(() => {
            let total = 0
            for (const enumeration of modelDiagnoseInfo.enumerationMap.values()) {
                total += enumeration.size
            }
            return total
        }),
        embeddableTypeMap: new Map(),
        embeddableTypeTotal: computed(() => {
            let total = 0
            for (const embeddableType of modelDiagnoseInfo.embeddableTypeMap.values()) {
                total += embeddableType.size
            }
            return total
        }),
        mappedSuperClassMap: new Map(),
        mappedSuperClassTotal: computed(() => {
            let total = 0
            for (const mappedSuperClass of modelDiagnoseInfo.mappedSuperClassMap.values()) {
                total += mappedSuperClass.size
            }
            return total
        }),
        associationMap: new Map(),
        associationTotal: computed(() => {
            let total = 0
            for (const association of modelDiagnoseInfo.associationMap.values()) {
                total += association.size
            }
            return total
        }),

        total: computed(() => {
            let total = 0
            total += modelDiagnoseInfo.groupTotal
            total += modelDiagnoseInfo.entityTotal
            total += modelDiagnoseInfo.enumerationTotal
            total += modelDiagnoseInfo.embeddableTypeTotal
            total += modelDiagnoseInfo.mappedSuperClassTotal
            total += modelDiagnoseInfo.associationTotal
            return total
        })
    })

    const setGroupDiagnose = (group: DeepReadonly<Group>) => {
        modelDiagnoseInfo.groupMap.set(group.id, groupDiagnose(group, contextData, inheritInfo, nameSets))
    }
    const removeGroupDiagnose = (id: string) => {
        modelDiagnoseInfo.groupMap.delete(id)
    }

    const setEntityDiagnose = (entity: DeepReadonly<EntityWithProperties>) => {
        modelDiagnoseInfo.entityMap.set(entity.id, entityDiagnose(entity, contextData, inheritInfo, nameSets))
    }
    const removeEntityDiagnose = (id: string) => {
        modelDiagnoseInfo.entityMap.delete(id)
    }

    const setMappedSuperClassDiagnose = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        modelDiagnoseInfo.mappedSuperClassMap.set(mappedSuperClass.id, mappedSuperClassDiagnose(mappedSuperClass, contextData, inheritInfo, nameSets))
    }
    const removeMappedSuperClassDiagnose = (id: string) => {
        modelDiagnoseInfo.mappedSuperClassMap.delete(id)
    }

    const setEmbeddableTypeDiagnose = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        modelDiagnoseInfo.embeddableTypeMap.set(embeddableType.id, embeddableTypeDiagnose(embeddableType, contextData, inheritInfo, nameSets))
    }
    const removeEmbeddableTypeDiagnose = (id: string) => {
        modelDiagnoseInfo.embeddableTypeMap.delete(id)
    }

    const setEnumerationDiagnose = (enumeration: DeepReadonly<Enumeration>) => {
        modelDiagnoseInfo.enumerationMap.set(enumeration.id, enumerationDiagnose(enumeration, contextData, inheritInfo, nameSets))
    }
    const removeEnumerationDiagnose = (id: string) => {
        modelDiagnoseInfo.enumerationMap.delete(id)
    }

    const setAssociationDiagnose = (association: DeepReadonly<AssociationIdOnly>) => {
        modelDiagnoseInfo.associationMap.set(association.id, associationDiagnose(association, contextData, inheritInfo, nameSets))
    }
    const removeAssociationDiagnose = (id: string) => {
        modelDiagnoseInfo.associationMap.delete(id)
    }

    const syncDiagnoseByIdSets = (idSets: DeepReadonly<ModelSubIdSets>) => {
        for (const id of idSets.entityIdSet) {
            const entity = contextData.entityMap.get(id)
            if (entity) setEntityDiagnose(entity)
        }
        for (const id of idSets.mappedSuperClassIdSet) {
            const mappedSuperClass = contextData.mappedSuperClassMap.get(id)
            if (mappedSuperClass) setMappedSuperClassDiagnose(mappedSuperClass)
        }
        for (const id of idSets.embeddableTypeIdSet) {
            const embeddableType = contextData.embeddableTypeMap.get(id)
            if (embeddableType) setEmbeddableTypeDiagnose(embeddableType)
        }
        for (const id of idSets.enumerationIdSet) {
            const enumeration = contextData.enumerationMap.get(id)
            if (enumeration) setEnumerationDiagnose(enumeration)
        }
        for (const id of idSets.associationIdSet) {
            const edgedAssociation = contextData.associationMap.get(id)
            if (edgedAssociation) setAssociationDiagnose(edgedAssociation.association)
        }
        for (const id of idSets.groupIdSet) {
            const group = contextData.groupMap.get(id)
            if (group) setGroupDiagnose(group)
        }
    }

    const addSameNameGroup = (
        name: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const group of contextData.groupMap.values()) {
            if (group.name === name) subIdSets.groupIdSet.add(group.id)
        }
        return subIdSets
    }

    const addSameNameGroupItems = (
        name: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const entity of contextData.entityMap.values()) {
            if (entity.name === name) subIdSets.entityIdSet.add(entity.id)
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            if (mappedSuperClass.name === name) subIdSets.mappedSuperClassIdSet.add(mappedSuperClass.id)
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            if (embeddableType.name === name) subIdSets.embeddableTypeIdSet.add(embeddableType.id)
        }
        for (const enumeration of contextData.enumerationMap.values()) {
            if (enumeration.name === name) subIdSets.enumerationIdSet.add(enumeration.id)
        }
        return subIdSets
    }

    const addSameNameAssociation = (
        name: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const {association} of contextData.associationMap.values()) {
            if ("name" in association && association.name === name) subIdSets.associationIdSet.add(association.id)
        }
        return subIdSets
    }

    const collectEntityReferences = (
        entityId: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("referencedEntityId" in property && property.referencedEntityId === entityId) {
                    subIdSets.entityIdSet.add(entity.id)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("referencedEntityId" in property && property.referencedEntityId === entityId) {
                    subIdSets.mappedSuperClassIdSet.add(mappedSuperClass.id)
                    break
                }
            }
        }
        for (const {association} of contextData.associationMap.values()) {
            if ("sourceEntityId" in association && association.sourceEntityId === entityId) {
                subIdSets.associationIdSet.add(association.id)
            } else if (association.referencedEntityId === entityId) {
                subIdSets.associationIdSet.add(association.id)
            }
        }

        return subIdSets
    }

    const collectMappedSuperClassReferences = (
        mappedSuperClassId: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets(),
        unvisitedIdSet: Set<string> = new Set<string>()
    ): ModelSubIdSets => {
        for (const {association} of contextData.associationMap.values()) {
            if ("sourceAbstractEntityId" in association && association.sourceAbstractEntityId === mappedSuperClassId) {
                subIdSets.associationIdSet.add(association.id)
            }
        }

        const inheritItem = inheritInfo.abstractInheritInfoMap.get(mappedSuperClassId)
        if (inheritItem !== undefined) {
            for (const childId of inheritItem.concreteChildIdSet) {
                if (!unvisitedIdSet.has(childId)) {
                    unvisitedIdSet.add(childId)
                    const child = contextData.entityMap.get(childId)
                    if (child !== undefined) collectEntityNeedDiagnose(child, undefined, subIdSets)
                }
            }
            for (const childId of inheritItem.abstractChildIdSet) {
                if (!unvisitedIdSet.has(childId)) {
                    unvisitedIdSet.add(childId)
                    const child  = contextData.mappedSuperClassMap.get(childId)
                    if (child !== undefined) collectMappedSuperClassNeedDiagnose(child,  undefined, subIdSets, unvisitedIdSet)
                }
            }
        }

        return subIdSets
    }

    const collectMissingMapperSuperClassChildren = (
        mappedSuperClassId: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets(),
        unvisitedIdSet: Set<string> = new Set<string>()
    ): ModelSubIdSets => {
        for (const [missingId, missingDependency] of inheritInfo.missingDependencies) {
            if (missingDependency.has(mappedSuperClassId)) {
                if (contextData.entityMap.has(missingId)) {
                    if (!unvisitedIdSet.has(missingId)) {
                        unvisitedIdSet.add(missingId)
                        const child = contextData.entityMap.get(missingId)
                        if (child !== undefined) collectEntityNeedDiagnose(child, undefined, subIdSets)
                    }
                } else if (contextData.mappedSuperClassMap.has(missingId)) {
                    if (!unvisitedIdSet.has(missingId)) {
                        unvisitedIdSet.add(missingId)
                        const child = contextData.mappedSuperClassMap.get(missingId)
                        if (child !== undefined) collectMappedSuperClassNeedDiagnose(child, undefined, subIdSets, unvisitedIdSet)
                    }
                }
            }
        }

        return subIdSets
    }

    const collectEmbeddableTypeReferences = (
        embeddableTypeId: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    subIdSets.entityIdSet.add(entity.id)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    subIdSets.mappedSuperClassIdSet.add(mappedSuperClass.id)
                    break
                }
            }
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            for (const property of embeddableType.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    subIdSets.embeddableTypeIdSet.add(embeddableType.id)
                    break
                }
            }
        }

        return subIdSets
    }

    const collectEnumerationReferences = (
        enumerationId: string,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    subIdSets.entityIdSet.add(entity.id)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    subIdSets.mappedSuperClassIdSet.add(mappedSuperClass.id)
                    break
                }
            }
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            for (const property of embeddableType.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    subIdSets.embeddableTypeIdSet.add(embeddableType.id)
                    break
                }
            }
        }

        return subIdSets
    }

    const collectGroupNeedDiagnose = (
        group: DeepReadonly<Group>,
        oldGroup?: DeepReadonly<Group>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        if (oldGroup !== undefined && oldGroup.name !== group.name) {
            addSameNameGroup(oldGroup.name, subIdSets)
        }
        addSameNameGroup(group.name, subIdSets)
        return subIdSets
    }

    const collectEntityNeedDiagnose = (
        entity: DeepReadonly<EntityWithProperties>,
        oldEntity?: DeepReadonly<EntityWithProperties>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        if (oldEntity !== undefined && oldEntity.name !== entity.name) {
            addSameNameGroupItems(oldEntity.name, subIdSets)
        }
        addSameNameGroupItems(entity.name, subIdSets)
        collectEntityReferences(entity.id, subIdSets)
        return subIdSets
    }

    const collectMappedSuperClassNeedDiagnose = (
        mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>,
        oldMappedSuperClass?: DeepReadonly<MappedSuperClassWithProperties>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets(),
        unvisitedIdSet: Set<string> = new Set<string>()
    ): ModelSubIdSets => {
        if (oldMappedSuperClass !== undefined && oldMappedSuperClass.name !== mappedSuperClass.name) {
            addSameNameGroupItems(oldMappedSuperClass.name, subIdSets)
        }
        addSameNameGroupItems(mappedSuperClass.name, subIdSets)
        collectMappedSuperClassReferences(mappedSuperClass.id, subIdSets, unvisitedIdSet)
        collectMissingMapperSuperClassChildren(mappedSuperClass.id, subIdSets, unvisitedIdSet)
        return subIdSets
    }

    const collectEmbeddableTypeNeedDiagnose = (
        embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
        oldEmbeddableType?: DeepReadonly<EmbeddableTypeWithProperties>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        if (oldEmbeddableType !== undefined && oldEmbeddableType.name !== embeddableType.name) {
            addSameNameGroupItems(oldEmbeddableType.name, subIdSets)
        }
        addSameNameGroupItems(embeddableType.name, subIdSets)
        collectEmbeddableTypeReferences(embeddableType.id, subIdSets)
        return subIdSets
    }

    const collectEnumerationNeedDiagnose = (
        enumeration: DeepReadonly<Enumeration>,
        oldEnumeration?: DeepReadonly<Enumeration>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        if (oldEnumeration !== undefined && oldEnumeration.name !== enumeration.name) {
            addSameNameGroupItems(oldEnumeration.name, subIdSets)
        }
        addSameNameGroupItems(enumeration.name, subIdSets)
        collectEnumerationReferences(enumeration.id, subIdSets)
        return subIdSets
    }

    const collectAssociationNeedDiagnose = (
        association: DeepReadonly<AssociationIdOnly>,
        oldAssociation?: DeepReadonly<AssociationIdOnly>,
        subIdSets: ModelSubIdSets = defaultModelSubIdSets()
    ): ModelSubIdSets => {
        if (oldAssociation !== undefined) {
            if (
                "name" in oldAssociation &&
                (
                    ("name" in association && oldAssociation.name !== association.name) ||
                    (!("name" in association))
                )
            ) {
                addSameNameAssociation(oldAssociation.name, subIdSets)
            }
        }
        if ("name" in association) {
            addSameNameAssociation(association.name, subIdSets)
        } else {
            subIdSets.associationIdSet.add(association.id)
        }
        subIdSets.entityIdSet.add(association.referencedEntityId)
        for (const other of contextData.associationMap.values()) {
            if (other.association.referencedEntityId === association.referencedEntityId) subIdSets.associationIdSet.add(other.association.id)
        }
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("associationId" in property) {
                    if (property.associationId === association.id) {
                        subIdSets.entityIdSet.add(entity.id)
                    }
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("associationId" in property) {
                    if (property.associationId === association.id) {
                        subIdSets.mappedSuperClassIdSet.add(mappedSuperClass.id)
                    }
                }
            }
        }

        return subIdSets
    }

    const syncGroup = (
        group: DeepReadonly<Group>,
        oldGroup?: DeepReadonly<Group>
    ) => {
        const subIdSets = collectGroupNeedDiagnose(group, oldGroup)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeGroup = (group: DeepReadonly<Group>) => {
        const subIdSets = collectGroupNeedDiagnose(group)
        syncDiagnoseByIdSets(subIdSets)
        removeGroupDiagnose(group.id)
    }

    const syncEntity = (
        entity: DeepReadonly<EntityWithProperties>,
        oldEntity?: DeepReadonly<EntityWithProperties>
    ) => {
        const subIdSets = collectEntityNeedDiagnose(entity, oldEntity)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeEntity = (entity: DeepReadonly<EntityWithProperties>) => {
        const subIdSets = collectEntityNeedDiagnose(entity)
        syncDiagnoseByIdSets(subIdSets)
        removeEntityDiagnose(entity.id)
    }

    const syncMappedSuperClass = (
        mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>,
        oldMappedSuperClass?: DeepReadonly<MappedSuperClassWithProperties>
    ) => {
        const subIdSets = collectMappedSuperClassNeedDiagnose(mappedSuperClass, oldMappedSuperClass)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        const subIdSets = collectMappedSuperClassNeedDiagnose(mappedSuperClass)
        syncDiagnoseByIdSets(subIdSets)
        removeMappedSuperClassDiagnose(mappedSuperClass.id)
    }

    const syncEmbeddableType = (
        embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
        oldEmbeddableType?: DeepReadonly<EmbeddableTypeWithProperties>
    ) => {
        const subIdSets = collectEmbeddableTypeNeedDiagnose(embeddableType, oldEmbeddableType)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeEmbeddableType = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        const subIdSets = collectEmbeddableTypeNeedDiagnose(embeddableType)
        syncDiagnoseByIdSets(subIdSets)
        removeEmbeddableTypeDiagnose(embeddableType.id)
    }

    const syncEnumeration = (
        enumeration: DeepReadonly<Enumeration>,
        oldEnumeration?: DeepReadonly<Enumeration>
    ) => {
        const subIdSets = collectEnumerationNeedDiagnose(enumeration, oldEnumeration)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        const subIdSets = collectEnumerationNeedDiagnose(enumeration)
        syncDiagnoseByIdSets(subIdSets)
        removeEnumerationDiagnose(enumeration.id)
    }

    const syncAssociation = (
        association: DeepReadonly<AssociationIdOnly>,
        oldAssociation?: DeepReadonly<AssociationIdOnly>
    ) => {
        const subIdSets = collectAssociationNeedDiagnose(association, oldAssociation)
        syncDiagnoseByIdSets(subIdSets)
    }
    const removeAssociation = (association: DeepReadonly<AssociationIdOnly>) => {
        const subIdSets = collectAssociationNeedDiagnose(association)
        syncDiagnoseByIdSets(subIdSets)
        removeAssociationDiagnose(association.id)
    }

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
        } else if (data.key === "association:add") {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id))
            else if (data.type === "revert") removeAssociation(data.options.association)
        }

        // 修改
        else if (data.key === "group:change") {
            if (data.type === "apply") syncGroup(getGroup(data.options.group.id), data.revertOptions.group)
            else if (data.type === "revert") syncGroup(getGroup(data.revertOptions.group.id), data.options.group)
        } else if (data.key === "entity:change") {
            if (data.type === "apply") syncEntity(getEntity(data.options.entity.id), data.revertOptions.entity)
            else if (data.type === "revert") syncEntity(getEntity(data.revertOptions.entity.id), data.options.entity)
        } else if (data.key === "mapped-super-class:change") {
            if (data.type === "apply") syncMappedSuperClass(getMappedSuperClass(data.options.mappedSuperClass.id), data.revertOptions.mappedSuperClass)
            else if (data.type === "revert") syncMappedSuperClass(getMappedSuperClass(data.revertOptions.mappedSuperClass.id), data.options.mappedSuperClass)
        } else if (data.key === "embeddable-type:change") {
            if (data.type === "apply") syncEmbeddableType(getEmbeddableType(data.options.embeddableType.id), data.revertOptions.embeddableType)
            else if (data.type === "revert") syncEmbeddableType(getEmbeddableType(data.revertOptions.embeddableType.id), data.options.embeddableType)
        } else if (data.key === "enumeration:change") {
            if (data.type === "apply") syncEnumeration(getEnumeration(data.options.enumeration.id), data.revertOptions.enumeration)
            else if (data.type === "revert") syncEnumeration(getEnumeration(data.revertOptions.enumeration.id), data.options.enumeration)
        } else if (data.key === "association:change") {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id), data.revertOptions.association)
            else if (data.type === "revert") syncAssociation(getAssociation(data.revertOptions.association.id), data.options.association)
        }

        // 导入
        else if (data.key === "import") {
            if (data.type === "apply") {
                const subIdSets = defaultModelSubIdSets()
                for (const group of data.options.data.groups) collectGroupNeedDiagnose(group, undefined, subIdSets)
                for (const {data: enumeration} of data.options.data.enumerations) collectEnumerationNeedDiagnose(enumeration, undefined, subIdSets)
                for (const {data: embeddableType} of data.options.data.embeddableTypes) collectEmbeddableTypeNeedDiagnose(embeddableType, undefined, subIdSets)
                for (const {data: mappedSuperClass} of data.options.data.mappedSuperClasses) collectMappedSuperClassNeedDiagnose(mappedSuperClass, undefined, subIdSets)
                for (const {data: entity} of data.options.data.entities) collectEntityNeedDiagnose(entity, undefined, subIdSets)
                for (const {data: association} of data.options.data.associations) collectAssociationNeedDiagnose(association, undefined, subIdSets)
                syncDiagnoseByIdSets(subIdSets)
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
                const subIdSets = defaultModelSubIdSets()
                for (const group of data.revertOptions.groups) collectGroupNeedDiagnose(group, undefined, subIdSets)
                for (const {data: enumeration} of data.revertOptions.enumerations) collectEnumerationNeedDiagnose(enumeration, undefined, subIdSets)
                for (const {data: embeddableType} of data.revertOptions.embeddableTypes) collectEmbeddableTypeNeedDiagnose(embeddableType, undefined, subIdSets)
                for (const {data: mappedSuperClass} of data.revertOptions.mappedSuperClasses) collectMappedSuperClassNeedDiagnose(mappedSuperClass, undefined, subIdSets)
                for (const {data: entity} of data.revertOptions.entities) collectEntityNeedDiagnose(entity, undefined, subIdSets)
                for (const {data: association} of data.revertOptions.associations) collectAssociationNeedDiagnose(association, undefined, subIdSets)
                syncDiagnoseByIdSets(subIdSets)
            }
        }
    })

    const diagnose = () => {
        for (const group of contextData.groupMap.values()) setGroupDiagnose(group)
        for (const enumeration of contextData.enumerationMap.values()) setEnumerationDiagnose(enumeration)
        for (const embeddableType of contextData.embeddableTypeMap.values()) setEmbeddableTypeDiagnose(embeddableType)
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) setMappedSuperClassDiagnose(mappedSuperClass)
        for (const entity of contextData.entityMap.values()) setEntityDiagnose(entity)
        for (const {association} of contextData.associationMap.values()) setAssociationDiagnose(association)
    }
    diagnose()

    return {
        modelDiagnoseInfo: readonly(modelDiagnoseInfo),
        diagnose,
    }
}
