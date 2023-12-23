import {MenuEventBusProps} from "@/components/global/menu/MenuEventBusProps.ts";

export type ModelMenuEvents = {
    clickModel: {
        id: number
    },

    clickTable: {
        id: number
    },

    clickAssociation: {
        id: number
    },

    clickColumn: {
        id: number
    }
}

export interface ModelMenuEventsProps extends MenuEventBusProps<ModelMenuEvents> {}
