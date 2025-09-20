import type {Ref, InjectionKey} from "vue";

export const SelectableTreeInjectKey = Symbol() as InjectionKey<{
    selectedIdSet: Ref<Set<string>>,
    toggleSelection: (id: string, event: MouseEvent) => void,
    isDisabled: boolean,
    levelPadding: string,
}>