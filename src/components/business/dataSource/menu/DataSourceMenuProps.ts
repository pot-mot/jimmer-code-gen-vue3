import {GenDataSourceView, GenSchemaView, GenTableCommonView} from "@/api/__generated/model/static";
import {DataSourceMenuEventsProps} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";

export interface DataSourceItemProps extends DataSourceMenuEventsProps {
    dataSource: GenDataSourceView
}

export interface SchemaItemProps extends DataSourceMenuEventsProps {
    schema: GenSchemaView
}

export interface TableItemProps extends DataSourceMenuEventsProps {
    table: GenTableCommonView
}
