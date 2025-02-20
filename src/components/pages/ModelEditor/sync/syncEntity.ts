import {DeepReadonly} from "vue";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {
    EntityConfigView,
    IdName
} from "@/api/__generated/model/static";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

// 同步实体变更
const syncEntityChanged = (entity: DeepReadonly<EntityConfigView>, changedTypeEntity: IdName): EntityConfigView => {
    const tempEntity = cloneDeepReadonly<EntityConfigView>(entity)

    tempEntity.tableConvertedEntity.properties.forEach(property => {
        if (property.typeEntity?.id === changedTypeEntity.id) {
            property.typeEntity = changedTypeEntity
        }
    })


    return tempEntity
}

// 判断实体是否在类型实体中出现
const judgeTypeEntityInEntity = (typeEntityId: number, entity: DeepReadonly<EntityConfigView>): boolean => {
    return entity.tableConvertedEntity.properties
        .flatMap(it => it.typeEntity?.id).filter(it => it !== undefined)
        .includes(typeEntityId)
}

export const syncTypeEntityForEntities = (typeEntity: IdName) => {
    const entityDialogsStore = useEntityDialogsStore()

    for (const {key, value, options} of entityDialogsStore.items) {
        if (value && judgeTypeEntityInEntity(typeEntity.id, value)) {
            const newTable = syncEntityChanged(value, typeEntity)
            entityDialogsStore.set(key, newTable, options)
        }
    }
}