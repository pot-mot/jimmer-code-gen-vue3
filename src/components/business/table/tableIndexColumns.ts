import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenTableModelInput_TargetOf_indexes} from "@/api/__generated/model/static";

export const tableIndexColumns = <PropListColumn<GenTableModelInput_TargetOf_indexes>[]>[
    {
        prop: "name",
        label: '名称',
        span: '12em',
    },
    {
        prop: "uniqueIndex",
        label: '唯一',
        span: '2.5em',
    },
    {
        prop: "columns",
        label: "包含列"
    }
]
