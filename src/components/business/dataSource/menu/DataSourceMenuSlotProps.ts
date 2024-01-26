import {Emitter} from "mitt";
import {GenDataSourceView, GenSchemaPreview, GenSchemaView, GenTableCommonView} from "@/api/__generated/model/static";
import {DataSourceMenuEvents} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";
import {Ref} from "vue";

interface LoadingSlotProps {
    loading: Ref<boolean>
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
    previewSchemaLoading: Ref<boolean>
    loadedSchemaLoading: Ref<boolean>
}

interface SchemasSlotProps {
    schemas: GenSchemaView[]
}

interface SchemaSlotProps {
    schema: GenSchemaView
}

interface PreviewSchemasSlotProps {
    previewSchemas: Array<GenSchemaPreview>
}

interface PreviewSchemaSlotProps {
    previewSchema: GenSchemaPreview
}

interface BaseDataSourceItemSlotProps extends MenuEventBusSlotProps, DataSourceSlotProps, SchemaLoadingSlotProps, PreviewSchemasSlotProps, SchemasSlotProps {}

export type DataSourceItemSlots = {
    default(props: BaseDataSourceItemSlotProps): any
    operations(props: BaseDataSourceItemSlotProps): any
    loadedSchema(props: SchemaSlotProps & BaseDataSourceItemSlotProps): any
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
