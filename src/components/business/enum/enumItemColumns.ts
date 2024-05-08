import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenModelInput_TargetOf_enums_TargetOf_items} from "@/api/__generated/model/static";

export const enumItemColumns =
    <ReadonlyArray<PropListColumn<GenModelInput_TargetOf_enums_TargetOf_items>>>[
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
