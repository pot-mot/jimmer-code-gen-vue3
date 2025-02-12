import {
    EntityModelBusinessInput,
    GenEntityDetailView,
    GenEntityDetailView_TargetOf_properties,
    GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {computed, ModelRef} from "vue";
import {validateGenPropertyEntityConfigInput} from "@/shape/GenPropertyEntityConfigInput.ts";
import {sendMessage} from "@/message/message.ts";

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

const checkPropNames: Array<keyof GenEntityDetailView_TargetOf_properties> = ["id", "columnId", "typeEntity", "typeTableId"]

const clearProperty = (data: any): GenPropertyEntityConfigInput | undefined => {
    for (const propName of checkPropNames) {
        data[propName] = undefined
    }

    if (validateGenPropertyEntityConfigInput(data, ({errors}) => {sendMessage(JSON.stringify(errors), 'warning')})) {
        const typeData = data as GenPropertyEntityConfigInput
        typeData.overwriteName = true
        typeData.overwriteComment = true
        return typeData
    }
}

export const useEntityPropertiesPartByHasColumn = (entity: ModelRef<EntityFormType>) => {
    const hasColumnProperties = computed<GenEntityDetailView_TargetOf_properties[]>({
        get(): GenEntityDetailView_TargetOf_properties[] {
            return entity.value.properties.filter(it => {
                return "columnId" in it && it["columnId"] !== undefined
            }) as GenEntityDetailView_TargetOf_properties[]
        },
        set(newValue: GenEntityDetailView_TargetOf_properties[]) {
            entity.value.properties = [
                ...newValue,
                ...entity.value.properties.filter(it => !("columnId" in it && it["columnId"] !== undefined))
            ]
        }
    })

    const noColumnProperties = computed<GenPropertyEntityConfigInput[]>({
        get(): GenPropertyEntityConfigInput[] {
            return entity.value.properties.filter(it => {
                return !("columnId" in it && it["columnId"] !== undefined)
            })
        },
        set(newValue: GenPropertyEntityConfigInput[]) {
            const clearedNewValue: GenPropertyEntityConfigInput[] = []
            for (const newItem of newValue) {
                let cleared = undefined
                for (const propName of checkPropNames) {
                    // @ts-ignore
                    if (newItem[propName] !== undefined) {
                        cleared = clearProperty(newItem)
                        break
                    }
                }
                if (cleared !== undefined) {
                    clearedNewValue.push(cleared)
                } else {
                    clearedNewValue.push(newItem)
                }
            }

            entity.value.properties = [
                ...entity.value.properties.filter(it => "columnId" in it && it["columnId"] !== undefined),
                ...clearedNewValue
            ]
        }
    })

    return {
        hasColumnProperties,
        noColumnProperties
    }
}