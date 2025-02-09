// 同步实体中的枚举名
import {DeepReadonly} from "vue";
import {EntityFormType} from "@/components/business/entity/EntityFormType.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {api} from "@/api";
import {sendI18nMessage} from "@/message/message.ts";
import {GenEntityDetailView, GenEntityDetailView_TargetOf_properties} from "@/api/__generated/model/static";

// 同步实体变更
const syncEntityChanged = (entity: DeepReadonly<EntityFormType>, changedEntity: DeepReadonly<GenEntityDetailView>): EntityFormType => {
    const changedPropertyIdMap = new Map<number, DeepReadonly<GenEntityDetailView_TargetOf_properties>>

    changedEntity.properties.forEach(it => {
        changedPropertyIdMap.set(it.id, it)
    })

    const tempEntity = cloneDeepReadonly<EntityFormType>(entity)

    tempEntity.properties = tempEntity.properties
        .map(it => {
            if ("id" in it) {
                const changedProperty = changedPropertyIdMap.get(it.id)
                if (changedProperty !== undefined) {
                    return {
                        ...changedProperty,
                        overwriteName: it.overwriteName,
                        name: it.overwriteName ? it.name : changedProperty.name,
                        overwriteComment: it.overwriteComment,
                        comment: it.overwriteComment ? it.comment : changedProperty.comment,
                        remark: it.remark,
                        otherAnnotation: it.otherAnnotation,
                    }
                } else {
                    return undefined
                }
            } else {
                return it
            }
        })
        .filter(it => it !== undefined) as EntityFormType["properties"]

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