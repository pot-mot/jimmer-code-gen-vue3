// 同步实体中的枚举名
import {DeepReadonly} from "vue";
import {EntityFormType} from "@/components/business/entity/EntityFormType.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";

// 同步实体中的类型实体名
const syncTypeEntityNameInEntity = (entity: DeepReadonly<EntityFormType>, typeEntityId: number, newTypeEntityName: string): EntityFormType => {
    const tempEntity = cloneDeepReadonly<EntityFormType>(entity)

    tempEntity.properties.forEach(property => {
        if ("typeEntity" in property && property.typeEntity && property.typeEntity.id === typeEntityId) {
            property.typeEntity.name = newTypeEntityName
        }
    })

    return tempEntity
}

// 判断实体是否在类型实体中出现
const judgeTypeEntityInEntity = (typeEntityId: number, entity: EntityFormType): boolean => {
    return entity.properties
        .flatMap(it => "typeEntity" in it ? it.typeEntity?.id : undefined).filter(it => it !== undefined)
        .includes(typeEntityId)
}

export const syncTypeEntityNameForEntities = (typeEntityId: number, newTypeEntityName: string) => {
    const entityDialogsStore = useEntityDialogsStore()

    entityDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeTypeEntityInEntity(typeEntityId, value)) {
            const newTable = syncTypeEntityNameInEntity(value, typeEntityId, newTypeEntityName)
            entityDialogsStore.set(key, newTable, options)
        }
    })
}