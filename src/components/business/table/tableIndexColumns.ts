import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenTableModelInput_TargetOf_indexes} from "@/api/__generated/model/static";

export const tableIndexColumns = <ReadonlyArray<PropListColumn<GenTableModelInput_TargetOf_indexes>>>[
    {
        prop: "name",
        label: 'LABEL_GenTableIndex_name',
        span: '12em',
    },
    {
        prop: "uniqueIndex",
        label: 'LABEL_GenTableIndex_uniqueIndex',
        span: '3em',
    },
    {
        prop: "columns",
        label: "LABEL_GenTableIndex_columns"
    }
]
