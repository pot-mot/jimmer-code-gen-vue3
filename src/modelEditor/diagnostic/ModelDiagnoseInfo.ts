import type {MessageType} from "@/components/message/MessageItem.ts";
import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {CommandHistory} from "@/history/commandHistory.ts";
import {inferCommandInput, type ModelEditorHistoryCommands} from "@/modelEditor/history/ModelEditorHistory.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {reactive, readonly} from "vue";
import {entityDiagnose, type EntityDiagnoseResult} from "@/modelEditor/diagnostic/entityDiagnose.ts";
import {enumerationDiagnose, type EnumerationDiagnoseResult} from "@/modelEditor/diagnostic/enumerationDiagnose.ts";
import {embeddableTypeDiagnose, type EmbeddableTypeDiagnose} from "@/modelEditor/diagnostic/embeddableTypeDiagnose.ts";
import {
    mappedSuperClassDiagnose,
    type MappedSuperClassDiagnose
} from "@/modelEditor/diagnostic/mappedSuperClassDiagnose.ts";
import {groupDiagnose, type GroupDiagnose} from "@/modelEditor/diagnostic/groupDiagnose.ts";
import {type AssociationDiagnose, associationDiagnose} from "@/modelEditor/diagnostic/associationDiagnose.ts";

export type DiagnoseMessage = {
    content: string
    type: MessageType
}

export type ModelDiagnoseInfo = {
    groupMap: Map<string, GroupDiagnose>
    entityMap: Map<string, EntityDiagnoseResult>
    enumerationMap: Map<string, EnumerationDiagnoseResult>
    embeddableTypeMap: Map<string, EmbeddableTypeDiagnose>
    mappedSuperClassMap: Map<string, MappedSuperClassDiagnose>
    associationMap: Map<string, AssociationDiagnose>
}

export const useModelDiagnoseInfo = (
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ReadonlyModelNameSets>,
    history: CommandHistory<ModelEditorHistoryCommands>,
) => {
    const modelDiagnoseInfo: ModelDiagnoseInfo = reactive({
        groupMap: new Map(),
        entityMap: new Map(),
        enumerationMap: new Map(),
        embeddableTypeMap: new Map(),
        mappedSuperClassMap: new Map(),
        associationMap: new Map(),
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
            if ("name" in association && !association.useNameTemplate && association.name === name) setAssociationDiagnose(association)
        }
    }

    const syncGroup = (
        group: DeepReadonly<Group>,
        oldGroup?: DeepReadonly<Group>
    ) => {
        if (oldGroup !== undefined) {
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
        if (oldEntity !== undefined) {
            syncSameNameGroupItem(oldEntity.name)
        }
        syncSameNameGroupItem(entity.name)
        for (const {association} of contextData.associationMap.values()) {
            if (association.referencedEntityId === entity.id) {
                setAssociationDiagnose(association)
            }
        }
    }
    const removeEntity = (entity: DeepReadonly<EntityWithProperties>) => {
        removeEntityDiagnose(entity.id)
        syncSameNameGroupItem(entity.name)
    }

    const syncMappedSuperClass = (
        mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>,
        oldMappedSuperClass?: DeepReadonly<MappedSuperClassWithProperties>
    ) => {
        if (oldMappedSuperClass !== undefined) {
            syncSameNameGroupItem(oldMappedSuperClass.name)
        }
        syncSameNameGroupItem(mappedSuperClass.name)
        const inheritItem = inheritInfo.abstractInheritInfoMap.get(mappedSuperClass.id)
        if (inheritItem) {
            for (const childId of inheritItem.allConcreteChildIdSet) {
                const child = contextData.entityMap.get(childId)
                if (child) setEntityDiagnose(child)
            }
            for (const childId of inheritItem.allAbstractChildIdSet) {
                const child = contextData.mappedSuperClassMap.get(childId)
                if (child) setMappedSuperClassDiagnose(child)
            }
        }
    }
    const removeMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        removeMappedSuperClassDiagnose(mappedSuperClass.id)
        syncSameNameGroupItem(mappedSuperClass.name)
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
                        for (const childId of inheritItem.allConcreteChildIdSet) {
                            const child = contextData.entityMap.get(childId)
                            if (child) setEntityDiagnose(child)
                        }
                        for (const childId of inheritItem.allAbstractChildIdSet) {
                            const child = contextData.mappedSuperClassMap.get(childId)
                            if (child) setMappedSuperClassDiagnose(child)
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
        if (oldEmbeddableType !== undefined) {
            syncSameNameGroupItem(oldEmbeddableType.name)
        }
        syncSameNameGroupItem(embeddableType.name)
    }
    const removeEmbeddableType = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        removeEmbeddableTypeDiagnose(embeddableType.id)
        syncSameNameGroupItem(embeddableType.name)
    }

    const syncEnumeration = (
        enumeration: DeepReadonly<Enumeration>,
        oldEnumeration?: DeepReadonly<Enumeration>
    ) => {
        if (oldEnumeration !== undefined) {
            syncSameNameGroupItem(oldEnumeration.name)
        }
        syncSameNameGroupItem(enumeration.name)
    }
    const removeEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        removeEnumerationDiagnose(enumeration.id)
        syncSameNameGroupItem(enumeration.name)
    }

    const syncAssociation = (
        association: DeepReadonly<AssociationIdOnly>,
        oldAssociation?: DeepReadonly<AssociationIdOnly>
    ) => {
        if (oldAssociation !== undefined) {
            if ("name" in oldAssociation && !oldAssociation.useNameTemplate) {
                syncSameNameAssociation(oldAssociation.name)
            }
        }
        if ("name" in association && !association.useNameTemplate) {
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
        if ("name" in association && !association.useNameTemplate) {
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

    history.eventBus.on('change', (data) => {
        // 新增
        if (inferCommandInput(data, "group:add")) {
            if (data.type === "apply") syncGroup(data.options.group)
            else if (data.type === "revert") removeGroup(data.options.group)
        } else if (inferCommandInput(data, "entity:add")) {
            if (data.type === "apply") syncEntity(data.options.entity)
            else if (data.type === "revert") removeEntity(data.options.entity)
        } else if (inferCommandInput(data, "mapped-super-class:add")) {
            if (data.type === "apply") syncMappedSuperClass(data.options.mappedSuperClass)
            else if (data.type === "revert") removeMappedSuperClass(data.options.mappedSuperClass)
        } else if (inferCommandInput(data, "embeddable-type:add")) {
            if (data.type === "apply") syncEmbeddableType(data.options.embeddableType)
            else if (data.type === "revert") removeEmbeddableType(data.options.embeddableType)
        } else if (inferCommandInput(data, "enumeration:add")) {
            if (data.type === "apply") syncEnumeration(data.options.enumeration)
            else if (data.type === "revert") removeEnumeration(data.options.enumeration)
        }  else if (inferCommandInput(data, "association:add")) {
            if (data.type === "apply") syncAssociation(data.options.association)
            else if (data.type === "revert") removeAssociation(data.options.association)
        }

        // 修改
        else if (inferCommandInput(data, "group:change")) {
            if (data.type === "apply") syncGroup(data.options.group, data.revertOptions.group)
            else if (data.type === "revert") syncGroup(data.revertOptions.group, data.options.group)
        } else if (inferCommandInput(data, "entity:change")) {
            if (data.type === "apply") syncEntity(data.options.entity, data.revertOptions.entity)
            else if (data.type === "revert") syncEntity(data.revertOptions.entity, data.options.entity)
        } else if (inferCommandInput(data, "mapped-super-class:change")) {
            if (data.type === "apply") syncMappedSuperClass(data.options.mappedSuperClass, data.revertOptions.mappedSuperClass)
            else if (data.type === "revert") syncMappedSuperClass(data.revertOptions.mappedSuperClass, data.options.mappedSuperClass)
        } else if (inferCommandInput(data, "embeddable-type:change")) {
            if (data.type === "apply") syncEmbeddableType(data.options.embeddableType, data.revertOptions.embeddableType)
            else if (data.type === "revert") syncEmbeddableType(data.revertOptions.embeddableType, data.options.embeddableType)
        } else if (inferCommandInput(data, "enumeration:change")) {
            if (data.type === "apply") syncEnumeration(data.options.enumeration, data.revertOptions.enumeration)
            else if (data.type === "revert") syncEnumeration(data.revertOptions.enumeration, data.options.enumeration)
        } else if (inferCommandInput(data, "association:change")) {
            if (data.type === "apply") syncAssociation(data.options.association, data.revertOptions.association)
            else if (data.type === "revert") syncAssociation(data.revertOptions.association, data.options.association)
        }

        // 导入
        else if (inferCommandInput(data, "import")) {
            if (data.type === "apply") {
                for (const group of data.options.data.groups) syncGroup(group)
                for (const {data: enumeration} of data.options.data.enumerations) syncEnumeration(enumeration)
                for (const {data: embeddableType} of data.options.data.embeddableTypes) syncEmbeddableType(embeddableType)
                for (const {data: mappedSuperClass} of data.options.data.mappedSuperClasses) syncMappedSuperClass(mappedSuperClass)
                for (const {data: entity} of data.options.data.entities) syncEntity(entity)
                for (const {data: association} of data.options.data.associations) syncAssociation(association)
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
                for (const group of data.revertOptions.groups) syncGroup(group)
                for (const {data: enumeration} of data.revertOptions.enumerations) syncEnumeration(enumeration)
                for (const {data: embeddableType} of data.revertOptions.embeddableTypes) syncEmbeddableType(embeddableType)
                for (const {data: mappedSuperClass} of data.revertOptions.mappedSuperClasses) syncMappedSuperClass(mappedSuperClass)
                for (const {data: entity} of data.revertOptions.entities) syncEntity(entity)
                for (const {data: association} of data.revertOptions.associations) syncAssociation(association)
            }
        }
    })


    return readonly(modelDiagnoseInfo)
}
