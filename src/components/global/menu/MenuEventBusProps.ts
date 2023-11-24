import {Emitter, EventType} from "mitt";

export type MenuEventBusProps<T extends Record<EventType, unknown>> = {
    eventBus: Emitter<T>
}