import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {CommandHistory} from "@/history/commandHistory.ts";
import {inferCommandInput, type ModelEditorHistoryCommands} from "@/modelEditor/history/ModelEditorHistory.ts";
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

    const syncSameNameGroup = (name: string) => {
        for (const group of contextData.groupMap.values()) {
            if (group.name === name) setGroupDiagnose(group)
        }
    }

    const syncSameNameGroupItem = (name: string) => {
        for (const entity of contextData.entityMap.values()) {
            if (entity.name === name) setEntityDiagnose(entity)
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            if (mappedSuperClass.name === name) setMappedSuperClassDiagnose(mappedSuperClass)
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            if (embeddableType.name === name) setEmbeddableTypeDiagnose(embeddableType)
        }
        for (const enumeration of contextData.enumerationMap.values()) {
            if (enumeration.name === name) setEnumerationDiagnose(enumeration)
        }
    }

    const syncSameNameAssociation = (name: string) => {
        for (const {association} of contextData.associationMap.values()) {
            if ("name" in association && association.name === name) setAssociationDiagnose(association)
        }
    }

    const syncEntityReferences = (
        entityId: string,
    ) => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("referencedEntityId" in property && property.referencedEntityId === entityId) {
                    setEntityDiagnose(entity)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("referencedEntityId" in property && property.referencedEntityId === entityId) {
                    setMappedSuperClassDiagnose(mappedSuperClass)
                    break
                }
            }
        }
        for (const {association} of contextData.associationMap.values()) {
            if ("sourceEntityId" in association && association.sourceEntityId === entityId) {
                setAssociationDiagnose(association)
            } else if (association.referencedEntityId === entityId) {
                setAssociationDiagnose(association)
            }
        }
    }

    const syncMappedSuperClassReferences = (
        mappedSuperClassId: string,
    ) => {
        for (const {association} of contextData.associationMap.values()) {
            if ("sourceAbstractEntityId" in association && association.sourceAbstractEntityId === mappedSuperClassId) {
                setAssociationDiagnose(association)
            }
        }
    }

    const syncEmbeddableTypeReferences = (
        embeddableTypeId: string,
    ) => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    setEntityDiagnose(entity)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    setMappedSuperClassDiagnose(mappedSuperClass)
                    break
                }
            }
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            for (const property of embeddableType.properties) {
                if ("embeddableTypeId" in property && property.embeddableTypeId === embeddableTypeId) {
                    setEmbeddableTypeDiagnose(embeddableType)
                    break
                }
            }
        }
    }

    const syncEnumerationReferences = (
        enumerationId: string,
    ) => {
        for (const entity of contextData.entityMap.values()) {
            for (const property of entity.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    setEntityDiagnose(entity)
                    break
                }
            }
        }
        for (const mappedSuperClass of contextData.mappedSuperClassMap.values()) {
            for (const property of mappedSuperClass.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    setMappedSuperClassDiagnose(mappedSuperClass)
                    break
                }
            }
        }
        for (const embeddableType of contextData.embeddableTypeMap.values()) {
            for (const property of embeddableType.properties) {
                if ("enumId" in property && property.enumId === enumerationId) {
                    setEmbeddableTypeDiagnose(embeddableType)
                    break
                }
            }
        }
    }

    const syncGroup = (
        group: DeepReadonly<Group>,
        oldGroup?: DeepReadonly<Group>
    ) => {
        if (oldGroup !== undefined && oldGroup.name !== group.name) {
            syncSameNameGroup(oldGroup.name)
        }
        syncSameNameGroup(group.name)
    }
    const removeGroup = (group: DeepReadonly<Group>) => {
        removeGroupDiagnose(group.id)
        syncSameNameGroup(group.name)
    }

    const syncEntity = (
        entity: DeepReadonly<EntityWithProperties>,
        oldEntity?: DeepReadonly<EntityWithProperties>
    ) => {
        if (oldEntity !== undefined && oldEntity.name !== entity.name) {
            syncSameNameGroupItem(oldEntity.name)
        }
        syncSameNameGroupItem(entity.name)
        syncEntityReferences(entity.id)
    }
    const removeEntity = (entity: DeepReadonly<EntityWithProperties>) => {
        removeEntityDiagnose(entity.id)
        syncSameNameGroupItem(entity.name)
        syncEntityReferences(entity.id)
    }

    const syncMappedSuperClass = (
        mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>,
        oldMappedSuperClass?: DeepReadonly<MappedSuperClassWithProperties>
    ) => {
        if (oldMappedSuperClass !== undefined && oldMappedSuperClass.name !== mappedSuperClass.name) {
            syncSameNameGroupItem(oldMappedSuperClass.name)
        }
        syncSameNameGroupItem(mappedSuperClass.name)
        syncMappedSuperClassReferences(mappedSuperClass.id)
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(mappedSuperClass.id)
        if (inheritItem) {
            for (const childId of inheritItem.concreteChildIdSet) {
                const child = contextData.entityMap.get(childId)
                if (child) syncEntity(child)
            }
            for (const childId of inheritItem.abstractChildIdSet) {
                const child = contextData.mappedSuperClassMap.get(childId)
                if (child) syncMappedSuperClass(child)
            }
        }
    }
    const removeMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        removeMappedSuperClassDiagnose(mappedSuperClass.id)
        syncSameNameGroupItem(mappedSuperClass.name)
        syncMappedSuperClassReferences(mappedSuperClass.id)
        for (const [missingId, missingDependency] of inheritInfo.missingDependencies) {
            if (missingDependency.has(mappedSuperClass.id)) {
                if (contextData.entityMap.has(missingId)) {
                    const child = contextData.entityMap.get(missingId)
                    if (child) setEntityDiagnose(child)
                } else if (contextData.mappedSuperClassMap.has(missingId)) {
                    const child = contextData.mappedSuperClassMap.get(missingId)
                    const inheritItem = inheritInfo.abstractInheritInfoMap.get(missingId)
                    if (child && inheritItem) {
                        setMappedSuperClassDiagnose(child)
                        for (const childId of inheritItem.concreteChildIdSet) {
                            const child = contextData.entityMap.get(childId)
                            if (child) syncEntity(child)
                        }
                        for (const childId of inheritItem.abstractChildIdSet) {
                            const child = contextData.mappedSuperClassMap.get(childId)
                            if (child) syncMappedSuperClass(child)
                        }
                    }
                }
            }
        }
    }

    const syncEmbeddableType = (
        embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
        oldEmbeddableType?: DeepReadonly<EmbeddableTypeWithProperties>
    ) => {
        if (oldEmbeddableType !== undefined && oldEmbeddableType.name !== embeddableType.name) {
            syncSameNameGroupItem(oldEmbeddableType.name)
        }
        syncSameNameGroupItem(embeddableType.name)
        syncEmbeddableTypeReferences(embeddableType.id)
    }
    const removeEmbeddableType = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        removeEmbeddableTypeDiagnose(embeddableType.id)
        syncSameNameGroupItem(embeddableType.name)
        syncEmbeddableTypeReferences(embeddableType.id)
    }

    const syncEnumeration = (
        enumeration: DeepReadonly<Enumeration>,
        oldEnumeration?: DeepReadonly<Enumeration>
    ) => {
        if (oldEnumeration !== undefined && oldEnumeration.name !== enumeration.name) {
            syncSameNameGroupItem(oldEnumeration.name)
        }
        syncSameNameGroupItem(enumeration.name)
        syncEnumerationReferences(enumeration.id)
    }
    const removeEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        removeEnumerationDiagnose(enumeration.id)
        syncSameNameGroupItem(enumeration.name)
        syncEnumerationReferences(enumeration.id)
    }

    const syncAssociation = (
        association: DeepReadonly<AssociationIdOnly>,
        oldAssociation?: DeepReadonly<AssociationIdOnly>
    ) => {
        if (oldAssociation !== undefined) {
            if ("name" in oldAssociation && "name" in association && oldAssociation.name !== association.name) {
                syncSameNameAssociation(oldAssociation.name)
            }
        }
        if ("name" in association) {
            syncSameNameAssociation(association.name)
        } else {
            setAssociationDiagnose(association)
        }
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (referencedEntity) {
            setEntityDiagnose(referencedEntity)
            for (const {association} of contextData.associationMap.values()) {
                if (association.referencedEntityId === referencedEntity.id) setAssociationDiagnose(association)
            }
        }
    }
    const removeAssociation = (association: DeepReadonly<AssociationIdOnly>) => {
        removeAssociationDiagnose(association.id)
        if ("name" in association) {
            syncSameNameAssociation(association.name)
        }
        const referencedEntity = contextData.entityMap.get(association.referencedEntityId)
        if (referencedEntity) {
            setEntityDiagnose(referencedEntity)
            for (const {association} of contextData.associationMap.values()) {
                if (association.referencedEntityId === referencedEntity.id) setAssociationDiagnose(association)
            }
        }
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
        if (inferCommandInput(data, "group:add")) {
            if (data.type === "apply") syncGroup(getGroup(data.options.group.id))
            else if (data.type === "revert") removeGroup(data.options.group)
        } else if (inferCommandInput(data, "entity:add")) {
            if (data.type === "apply") syncEntity(getEntity(data.options.entity.id))
            else if (data.type === "revert") removeEntity(data.options.entity)
        } else if (inferCommandInput(data, "mapped-super-class:add")) {
            if (data.type === "apply") syncMappedSuperClass(getMappedSuperClass(data.options.mappedSuperClass.id))
            else if (data.type === "revert") removeMappedSuperClass(data.options.mappedSuperClass)
        } else if (inferCommandInput(data, "embeddable-type:add")) {
            if (data.type === "apply") syncEmbeddableType(getEmbeddableType(data.options.embeddableType.id))
            else if (data.type === "revert") removeEmbeddableType(data.options.embeddableType)
        } else if (inferCommandInput(data, "enumeration:add")) {
            if (data.type === "apply") syncEnumeration(getEnumeration(data.options.enumeration.id))
            else if (data.type === "revert") removeEnumeration(data.options.enumeration)
        }  else if (inferCommandInput(data, "association:add")) {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id))
            else if (data.type === "revert") removeAssociation(data.options.association)
        }

        // 修改
        else if (inferCommandInput(data, "group:change")) {
            if (data.type === "apply") syncGroup(getGroup(data.options.group.id), data.revertOptions.group)
            else if (data.type === "revert") syncGroup(getGroup(data.revertOptions.group.id), data.options.group)
        } else if (inferCommandInput(data, "entity:change")) {
            if (data.type === "apply") syncEntity(getEntity(data.options.entity.id), data.revertOptions.entity)
            else if (data.type === "revert") syncEntity(getEntity(data.revertOptions.entity.id), data.options.entity)
        } else if (inferCommandInput(data, "mapped-super-class:change")) {
            if (data.type === "apply") syncMappedSuperClass(getMappedSuperClass(data.options.mappedSuperClass.id), data.revertOptions.mappedSuperClass)
            else if (data.type === "revert") syncMappedSuperClass(getMappedSuperClass(data.revertOptions.mappedSuperClass.id), data.options.mappedSuperClass)
        } else if (inferCommandInput(data, "embeddable-type:change")) {
            if (data.type === "apply") syncEmbeddableType(getEmbeddableType(data.options.embeddableType.id), data.revertOptions.embeddableType)
            else if (data.type === "revert") syncEmbeddableType(getEmbeddableType(data.revertOptions.embeddableType.id), data.options.embeddableType)
        } else if (inferCommandInput(data, "enumeration:change")) {
            if (data.type === "apply") syncEnumeration(getEnumeration(data.options.enumeration.id), data.revertOptions.enumeration)
            else if (data.type === "revert") syncEnumeration(getEnumeration(data.revertOptions.enumeration.id), data.options.enumeration)
        } else if (inferCommandInput(data, "association:change")) {
            if (data.type === "apply") syncAssociation(getAssociation(data.options.association.id), data.revertOptions.association)
            else if (data.type === "revert") syncAssociation(getAssociation(data.revertOptions.association.id), data.options.association)
        }

        // 导入
        else if (inferCommandInput(data, "import")) {
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
        else if (inferCommandInput(data, "remove")) {
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


    return readonly(modelDiagnoseInfo)
}
