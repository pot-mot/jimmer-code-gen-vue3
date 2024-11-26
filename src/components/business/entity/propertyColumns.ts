import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {
    GenEntityDetailView_TargetOf_properties,
} from "@/api/__generated/model/static";

export const propertyColumns: ReadonlyArray<
    PropListColumn<GenEntityDetailView_TargetOf_properties> |
    ListColumn<GenEntityDetailView_TargetOf_properties>
> = [
    {
        prop: 'name',
        label: 'LABEL_GenEntityProperty_name',
        span: '1fr',
    },
    {
        prop: 'comment',
        label: 'LABEL_GenEntityProperty_comment',
        span: '1.2fr',
    },
    {
        prop: 'type',
        label: 'LABEL_GenEntityProperty_type',
        span: '1fr',
    },
    {
        prop: "typeNotNull",
        label: 'LABEL_GenEntityProperty_typeNotNull',
        span: '3em'
    },
    {
        prop: "listType",
        label: 'LABEL_GenEntityProperty_listType',
        span: '3em'
    },
    {
        name: 'annotation',
        label: 'LABEL_GenEntityProperty_annotation',
        span: '1fr',
    },
    {
        name: 'business',
        label: 'LABEL_GenEntityProperty_business',
        span: '1.5fr',
    },
]
