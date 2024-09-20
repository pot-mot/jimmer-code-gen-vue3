import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";

export const tableColumnColumns: ReadonlyArray<
    PropListColumn<GenTableModelInput_TargetOf_columns> |
    ListColumn<GenTableModelInput_TargetOf_columns>
> = [
    {
        name: 'icon',
        span: '1.5em'
    },
    {
        name: 'columnType',
        label: 'LABEL_GenTableColumn_category',
        span: '5em',
    },
    {
        prop: 'name',
        label: 'LABEL_GenTableColumn_name',
    },
    {
        prop: 'comment',
        label: 'LABEL_GenTableColumn_comment',
        span: '1.2fr',
    },
    {
        name: 'type',
        label: 'LABEL_GenTableColumn_type',
    },
    {
        prop: "typeNotNull",
        label: 'LABEL_GenTableColumn_typeNotNull',
        span: '3em'
    },
    {
        prop: 'defaultValue',
        label: 'LABEL_GenTableColumn_defaultValue',
    },
]
