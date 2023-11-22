import {GenDataSourceView, GenSchemaView, GenTableCommonView} from "@/api/__generated/model/static";
import {DataSourceMenuEvents} from "@/components/global/dataSource/menu/DataSourceMenuEvents.ts";
import {Emitter} from "mitt";
import {GenSchemaDto} from "@/api/__generated/model/dto";

//
// export interface ListSlotProps<T> {
//     list: T[]
// }
//
// export interface ItemSlotProps<T> {
//     item: T
// }

interface LoadingSlotProps {
    loading: boolean
}

interface MenuEventBusSlotProps {
    eventBus: Emitter<DataSourceMenuEvents>
}

interface DataSourcesSlotProps {
    dataSources: GenDataSourceView[]
}

interface DataSourceSlotProps {
    dataSource: GenDataSourceView
}

export type DataSourceMenuSlots = {
    dataSources(props: DataSourcesSlotProps & MenuEventBusSlotProps & LoadingSlotProps): any
    dataSource(props: DataSourceSlotProps & DataSourcesSlotProps & MenuEventBusSlotProps & LoadingSlotProps): any
}

interface SchemaLoadingSlotProps {
    previewSchemaLoading: boolean
    genSchemaLoading: boolean
}

interface SchemasSlotProps {
    schemas: GenSchemaView[]
}

interface SchemaSlotProps {
    schema: GenSchemaView
}

interface PreviewSchemasSlotProps {
    previewSchemas: GenSchemaDto['DEFAULT'][]
}

interface PreviewSchemaSlotProps {
    previewSchema: GenSchemaDto['DEFAULT']
}

interface BaseDataSourceItemSlotProps extends MenuEventBusSlotProps, DataSourceSlotProps, SchemaLoadingSlotProps, PreviewSchemasSlotProps, SchemasSlotProps {}

export type DataSourceItemSlots = {
    default(props: BaseDataSourceItemSlotProps): any
    operations(props: BaseDataSourceItemSlotProps): any
    schemas(props: BaseDataSourceItemSlotProps): any
    schema(props: SchemaSlotProps & BaseDataSourceItemSlotProps): any
    previewSchemas(props: BaseDataSourceItemSlotProps): any
    previewSchema(props: PreviewSchemaSlotProps & BaseDataSourceItemSlotProps): any
}

interface TablesSlotProps {
    tables: GenTableCommonView[]
}

interface TableSlotProps {
    table: GenTableCommonView
}

interface BaseSchemaItemSlotProps extends MenuEventBusSlotProps, SchemaSlotProps, TablesSlotProps {}

export type SchemaItemSlots = {
    default(props: BaseSchemaItemSlotProps): any
    operations(props: BaseSchemaItemSlotProps): any
    tables(props: BaseSchemaItemSlotProps): any
    table(props: TableSlotProps & BaseSchemaItemSlotProps): any
}