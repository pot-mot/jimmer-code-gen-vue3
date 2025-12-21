import type {Ref, InjectionKey} from "vue";

export const SelectableTreeInjectKey = Symbol() as InjectionKey<{
    selectedIdSet: Ref<Set<string>>,
    toggleSelection: (id: string, event: MouseEvent | KeyboardEvent) => void,
    treeItemClick: (id: string, event: MouseEvent) => void,
    openedIdSet: Ref<Set<string>>,
    defaultOpen: boolean,
    isDisabled: boolean,
    levelPadding: string,
}>