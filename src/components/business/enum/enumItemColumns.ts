import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenModelInput_TargetOf_enums_TargetOf_items} from "@/api/__generated/model/static";

export const enumItemColumns: ReadonlyArray<PropListColumn<GenModelInput_TargetOf_enums_TargetOf_items>> = [
    {
        prop: "name",
        label: "LABEL_GenEnumItem_name"
    },
    {
        prop: "mappedValue",
        label: "LABEL_GenEnumItem_value"
    },
    {
        prop: "comment",
        label: "LABEL_GenEnumItem_comment"
    }
]
