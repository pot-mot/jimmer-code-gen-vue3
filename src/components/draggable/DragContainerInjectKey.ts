import type { InjectionKey } from 'vue'
import type {Ref} from "@vue/reactivity";

export interface DragContext {
    dragSourceId: Readonly<Ref<string | null | undefined>>
    dragTargetId: Readonly<Ref<string | null | undefined>>
    isDragging: Readonly<Ref<boolean>>
    onDragStart: (sourceId: string, event: PointerEvent) => void
    onDragEnter: (targetId: string, event: PointerEvent) => void
    onDragLeave: (targetId: string, event: PointerEvent) => void
    dragStartTimeout: number
}

export const DragContainerKey: InjectionKey<DragContext> = Symbol('DragContainer')
