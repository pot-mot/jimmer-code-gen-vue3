import {
    EntityModelBusinessInput,
    GenEntityDetailView,
    GenEntityDetailView_TargetOf_properties,
    GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {computed, ModelRef} from "vue";

export type EntityFormType = Omit<GenEntityDetailView, 'properties'> & {
    properties: Array<GenEntityDetailView_TargetOf_properties | GenPropertyEntityConfigInput>
}

export const entityFormTypeToBusinessInput = (entity: EntityFormType): EntityModelBusinessInput => {
    const columnProperties: Array<GenEntityDetailView_TargetOf_properties> = []
    const noColumnProperties: Array<GenPropertyEntityConfigInput> = []

    entity.properties.forEach((it) => {
        if ("columnId" in it) {
            columnProperties.push(it)
        } else {
            noColumnProperties.push(it)
        }
    })

    return {
        entity: {
            ...entity,
            properties: columnProperties
        },
        properties: noColumnProperties
    }
}

export const useEntityPropertiesPartByHasColumn = (entity: ModelRef<EntityFormType>) => {
    const hasColumnProperties = computed<GenEntityDetailView_TargetOf_properties[]>({
        get(): GenEntityDetailView_TargetOf_properties[] {
            return entity.value.properties.filter(it => {
                return "columnId" in it
            }) as GenEntityDetailView_TargetOf_properties[]
        },
        set(newValue: GenEntityDetailView_TargetOf_properties[]) {
            entity.value.properties = [
                ...newValue,
                ...entity.value.properties.filter(it => !("columnId" in it))
            ]
        }
    })

    const noColumnProperties = computed<GenPropertyEntityConfigInput[]>({
        get(): GenPropertyEntityConfigInput[] {
            return entity.value.properties.filter(it => {
                return !("columnId" in it)
            })
        },
        set(newValue: GenPropertyEntityConfigInput[]) {
            entity.value.properties = [
                ...entity.value.properties.filter(it => "columnId" in it),
                ...newValue
            ]
        }
    })

    return {
        hasColumnProperties,
        noColumnProperties
    }
}