import {Emitter} from "mitt";

export type DataSourceMenuEvents = {
    loadDateSource: undefined,
    editDataSource: {id: number},
    deleteDataSource: {id: number},

    loadSchema: {id: number},
    deleteSchema: {id: number},

    clickSchema: {id: number},

    clickTable: {id: number},
}

export type DataSourceMenuEventBusProps = {
    eventBus: Emitter<DataSourceMenuEvents>
}