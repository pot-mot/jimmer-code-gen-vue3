import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {ref} from "vue";
import {cloneDeepReadonlyRaw} from "@/utils/type/cloneDeepReadonly.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

export type PropertyWithSource =
    | { entityId: string, property: EntityProperty }
    | { mappedSuperClassId: string, property: MappedSuperClassProperty }
    | { embeddableTypeId: string, property: EmbeddableTypeProperty }

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
        submit(propertyWithSource: PropertyWithSource) {
            if (propertyWithSource) {
                if ("entityId" in propertyWithSource) {
                    const property = propertyWithSource.property
                    const entity = contextData.entityMap.get(propertyWithSource.entityId)
                    if (entity) {
                        changeEntity({
                            ...entity,
                            properties: entity.properties.map(it => {
                                if (it.id === property.id) return property
                                return it
                            })
                        })
                    }
                } else if ("mappedSuperClassId" in propertyWithSource) {
                    const property = propertyWithSource.property
                    const mappedSuperClass = contextData.mappedSuperClassMap.get(propertyWithSource.mappedSuperClassId)
                    if (mappedSuperClass) {
                        changeMappedSuperClass({
                            ...mappedSuperClass,
                            properties: mappedSuperClass.properties.map(it => {
                                if (it.id === property.id) return property as MappedSuperClassProperty
                                return it
                            })
                        })
                    }
                } else if ("embeddableTypeId" in propertyWithSource) {
                    const property = propertyWithSource.property
                    const embeddableType = contextData.embeddableTypeMap.get(propertyWithSource.embeddableTypeId)
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
