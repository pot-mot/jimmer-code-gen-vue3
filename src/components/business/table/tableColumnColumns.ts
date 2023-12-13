import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";

export const tableColumnColumns = <(PropListColumn<GenTableColumnsInput_TargetOf_columns> | ListColumn<GenTableColumnsInput_TargetOf_columns>)[]>[
    {
        name: 'icon',
        span: '1.5em'
    },
    {
        name: 'columnType',
        label: '类别',
        span: '3em',
    },
    {
        prop: 'name',
        label: '列名',
    },
    {
        prop: 'comment',
        label: '注释',
        span: '1.2fr',
    },
    {
        prop: 'type',
        label: '类型',
    },
    {
        prop: "typeNotNull",
        label: '非空',
        span: '1.5em'
    },
    {
        prop: 'defaultValue',
        label: '默认值',
    },
]
