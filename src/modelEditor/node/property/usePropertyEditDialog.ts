import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

export type PropertyWithSource =
    | { entityId: string, entityProperty: EntityProperty }
    | { mappedSuperClassId: string, mappedSuperClassProperty: MappedSuperClassProperty }
    | { embeddableTypeId: string, embeddableTypeProperty: EmbeddableTypeProperty }

export const usePropertyEditDialog = createStore(() => {
    const {open, close, ...dialogOpenState} = useDialogOpenState()
    const propertyState = ref<PropertyWithSource>()

    const {
        contextData,
        changeEntity,
        changeMappedSuperClass,
        changeEmbeddableType
    } = useModelEditor()

    return {
        ...dialogOpenState,
        close,
        propertyState,
        open(propertyWithSource: DeepReadonly<PropertyWithSource>) {
            propertyState.value = cloneDeepReadonlyRaw<PropertyWithSource>(propertyWithSource)
            open()
        },
        submit() {
            if (propertyState.value) {
                if ("entityId" in propertyState.value) {
                    const property = propertyState.value.entityProperty
                    const entity = contextData.entityMap.get(propertyState.value.entityId)
                    if (entity) {
                        changeEntity({
                            ...entity,
                            properties: entity.properties.map(it => {
                                if (it.id === property.id) return property
                                return it
                            })
                        })
                    }
                } else if ("mappedSuperClassId" in propertyState.value) {
                    const property = propertyState.value.mappedSuperClassProperty
                    const mappedSuperClass = contextData.mappedSuperClassMap.get(propertyState.value.mappedSuperClassId)
                    if (mappedSuperClass) {
                        changeMappedSuperClass({
                            ...mappedSuperClass,
                            properties: mappedSuperClass.properties.map(it => {
                                if (it.id === property.id) return property as MappedSuperClassProperty
                                return it
                            })
                        })
                    }
                } else if ("embeddableTypeId" in propertyState.value) {
                    const property = propertyState.value.embeddableTypeProperty
                    const embeddableType = contextData.embeddableTypeMap.get(propertyState.value.embeddableTypeId)
                    if (embeddableType) {
                        changeEmbeddableType({
                            ...embeddableType,
                            properties: embeddableType.properties.map(it => {
                                if (it.id === property.id) return property as EmbeddableTypeProperty
                                return it
                            })
                        })
                    }
                }
            }
            close()
        },
    }
})
