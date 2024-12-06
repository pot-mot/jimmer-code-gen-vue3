import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";

export const tableColumnColumns: ReadonlyArray<
    PropListColumn<GenTableModelInput_TargetOf_columns> | ListColumn
> = [
    {
        name: 'icon',
        span: '2em'
    },
    {
        name: 'category',
        label: 'LABEL_GenTableColumn_category',
        span: '1.5fr',
    },
    {
        prop: 'name',
        label: 'LABEL_GenTableColumn_name',
        span: '1fr',
    },
    {
        prop: 'comment',
        label: 'LABEL_GenTableColumn_comment',
        span: '1.2fr',
    },
    {
        name: 'type',
        label: 'LABEL_GenTableColumn_type',
        span: '1fr',
    },
    {
        prop: "typeNotNull",
        label: 'LABEL_GenTableColumn_typeNotNull',
        span: '3em'
    },
    {
        prop: 'defaultValue',
        label: 'LABEL_GenTableColumn_defaultValue',
        span: '1fr',
    },
]
