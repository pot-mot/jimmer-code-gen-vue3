import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {readonly, ref} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

export type ContextMenuTarget_Model = DeepReadonly<{
    type: "Model"
}>

export type ContextMenuTarget_Group = DeepReadonly<{
    type: "Group"
    id: string
}>

export type ContextMenuTarget_Entity = DeepReadonly<{
    type: "Entity"
    id: string
}>

export type ContextMenuTarget_MappedSuperClass = DeepReadonly<{
    type: "MappedSuperClass"
    id: string
}>

export type ContextMenuTarget_Enumeration = DeepReadonly<{
    type: "Enumeration"
    id: string
}>

export type ContextMenuTarget_EmbeddableType = DeepReadonly<{
    type: "EmbeddableType"
    id: string
}>

export type ContextMenuTarget_ConcreteAssociation = DeepReadonly<{
    type: "ConcreteAssociation"
    id: string
}>

export type ContextMenuTarget_AbstractAssociation = DeepReadonly<{
    type: "AbstractAssociation"
    id: string
}>

type ContextMenuTarget =
    | ContextMenuTarget_Model
    | ContextMenuTarget_Group
    | ContextMenuTarget_Entity
    | ContextMenuTarget_MappedSuperClass
    | ContextMenuTarget_Enumeration
    | ContextMenuTarget_EmbeddableType
    | ContextMenuTarget_ConcreteAssociation
    | ContextMenuTarget_AbstractAssociation

export const useModelContextMenu = createStore(() => {
    const {open, close, ...dialogOpenState} = useDialogOpenState()

    const innerTarget = ref<ContextMenuTarget>({type: "Model"})
    const innerPosition = ref<{ x: number, y: number }>({x: 0, y: 0})

    return {
        ...dialogOpenState,
        target: readonly(innerTarget),
        position: readonly(innerPosition),
        open: (
            target: ContextMenuTarget,
            position: { x: number, y: number }
        ) => {
            innerTarget.value = target
            innerPosition.value = position
            open()
        },
        close: () => {
            useModelEditor().focus()
            close()
        }
    }
})
