// 同步实体中的枚举名
import {DeepReadonly} from "vue";
import {EntityFormType} from "@/components/business/entity/EntityFormType.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {api} from "@/api";
import {sendI18nMessage} from "@/message/message.ts";
import {GenEntityDetailView, GenEntityDetailView_TargetOf_properties} from "@/api/__generated/model/static";

// 同步实体变更
const syncEntityChanged = (entity: DeepReadonly<EntityFormType>, changedEntity: GenEntityDetailView): EntityFormType => {
    const changedPropertyIdMap = new Map<number, GenEntityDetailView_TargetOf_properties>
    changedEntity.properties.forEach(it => {
        changedPropertyIdMap.set(it.id, it)
    })

    const tempEntity = cloneDeepReadonly<EntityFormType>(entity)

    const newHasColumnProperties: GenEntityDetailView_TargetOf_properties[] = []
    const newNoColumnProperties: EntityFormType["properties"] = []

    tempEntity.name = entity.overwriteName ? entity.name : changedEntity.name
    tempEntity.comment = entity.overwriteComment ? entity.comment : changedEntity.comment

    tempEntity.properties
        .forEach(it => {
            if ("id" in it) {
                const changedProperty = changedPropertyIdMap.get(it.id)
                if (changedProperty !== undefined) {
                    newHasColumnProperties.push({
                        ...it,
                        name: it.overwriteName ? it.name : changedProperty.name,
                        comment: it.overwriteComment ? it.comment : changedProperty.comment,
                        columnId: changedProperty.columnId,
                        type: changedProperty.type,
                        listType: changedProperty.listType,
                        typeEntity: changedProperty.typeEntity,
                        typeTableId: changedProperty.typeTableId,
                        enumId: changedProperty.enumId,
                        enumName: changedProperty.enumName,
                    })
                }
            } else {
                newNoColumnProperties.push(it)
            }
        })

    const newHasColumnPropertyIds = new Set(newHasColumnProperties.map(it => it.id))

    changedEntity.properties.forEach(it => {
        if (!newHasColumnPropertyIds.has(it.id)) {
            newHasColumnProperties.push(it)
        }
    })

    tempEntity.properties = [
        ...newHasColumnProperties.sort((a, b) => a.orderKey - b.orderKey),
        ...newNoColumnProperties
    ]
    return tempEntity
}

// 判断实体是否在类型实体中出现
const judgeTypeEntityInEntity = (typeEntityId: number, entity: EntityFormType): boolean => {
    return entity.properties
        .flatMap(it => "typeEntity" in it ? it.typeEntity?.id : undefined).filter(it => it !== undefined)
        .includes(typeEntityId)
}

export const syncTypeEntityForEntities = async (typeEntityId: number) => {
    const entityDialogsStore = useEntityDialogsStore()

    for (const {key, value, options} of entityDialogsStore.items) {
        if (value && judgeTypeEntityInEntity(typeEntityId, value)) {
            const changedEntity = await api.entityService.get({id: value.id})
            if (changedEntity === undefined) {
                sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEntityNotFound", args: [value]}, "error")
                throw new Error("entity not found")
            }
            const newTable = syncEntityChanged(value, changedEntity)
            entityDialogsStore.set(key, newTable, options)
        }
    }
}