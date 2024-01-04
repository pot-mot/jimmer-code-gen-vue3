import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenEnumItemsInput_TargetOf_items, GenEnumItemsView_TargetOf_items} from "@/api/__generated/model/static";

export const enumItemColumns =
    <PropListColumn<GenEnumItemsView_TargetOf_items | GenEnumItemsInput_TargetOf_items>[]>[
    {
        prop: "name",
        label: "枚举项"
    },
    {
        prop: "value",
        label: "值"
    },
    {
        prop: "comment",
        label: "注释"
    }
]
