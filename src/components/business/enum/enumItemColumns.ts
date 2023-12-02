import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenEnumItemsView_TargetOf_items} from "@/api/__generated/model/static/GenEnumItemsView.ts";
import {GenEnumItemsInput_TargetOf_items} from "@/api/__generated/model/static/GenEnumItemsInput.ts";

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