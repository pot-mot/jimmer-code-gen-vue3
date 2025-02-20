import {
    EntityConfigInput,
    EntityConfigView,
    GenEntityConfigView,
    GenEntityConfigView_TargetOf_properties,
    GenPropertyConfigView
} from "@/api/__generated/model/static";
import {computed, Ref} from "vue";
import {cloneDeep} from "lodash";

export const useConfigView = (
    configView: Ref<EntityConfigView>,
) => {
    const entity = computed<GenEntityConfigView>({
        get(): GenEntityConfigView {
            return configView.value.tableConvertedEntity
        },
        set(value: GenEntityConfigView) {
            configView.value.tableConvertedEntity = value
        }
    })

    const convertedProperties = computed<GenEntityConfigView_TargetOf_properties[]>({
        get(): GenEntityConfigView_TargetOf_properties[] {
            return configView.value.tableConvertedEntity.properties
        },
        set(value: GenEntityConfigView_TargetOf_properties[]) {
            configView.value.tableConvertedEntity.properties = value
        }
    })

    const notConvertedProperties = computed<GenPropertyConfigView[]>({
        get() {
            return configView.value.notConvertedProperties
        },
        set(value: GenPropertyConfigView[]) {
            configView.value.notConvertedProperties = value
        }
    })

    const toInput = (): EntityConfigInput => {
        const data = cloneDeep(configView.value)

        let orderKey = 1
        for (const property of data.tableConvertedEntity.properties) {
            property.orderKey = orderKey++
        }
        for (const property of data.notConvertedProperties) {
            property.orderKey = orderKey++
        }

        return data
    }

    return {
        entity,
        convertedProperties,
        notConvertedProperties,
        toInput
    }
}