import {MenuEventBusProps} from "@/components/global/menu/MenuEventBusProps.ts";

export type DataSourceMenuEvents = {
    loadedDateSource: {
        id: number
    },
    editDataSource: {
        id: number
    },
    deleteDataSource: {
        id: number
    },

    loadSchema: {
        id: number
    },
    deleteSchema: {
        id: number
    },

    clickSchema: {
        id: number
    },

    clickTable: {
        id: number
    },
}

export interface DataSourceMenuEventsProps extends MenuEventBusProps<DataSourceMenuEvents> {
}
