export type GroupItemTypeOption = {
    type: "Entity",
    entity: DeepReadonly<EntityWithProperties>
} | {
    type: "Enumeration",
    enumeration: DeepReadonly<Enumeration>
} | {
    type: "EmbeddableType",
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>
}

export type GroupTypeOptions = {
    group: DeepReadonly<Group>,
    options: GroupItemTypeOption[]
}

export type TypeOptions = {
    crossTypes: DeepReadonly<CrossType[]>,
    groups: GroupTypeOptions[]
}

export const getGroupItemTypeOptionName = (typeOption: GroupItemTypeOption) => {
    switch (typeOption.type) {
        case "Entity":
            return typeOption.entity.name
        case "Enumeration":
            return typeOption.enumeration.name
        case "EmbeddableType":
            return typeOption.embeddableType.name
    }
}
