import {
    GenAssociationView,
    GenColumnCommonView,
    GenModelSimpleView,
    GenTableCommonView
} from "@/api/__generated/model/static";

export interface ModelItemProps {
    model: GenModelSimpleView
}

export interface TableItemProps {
    table: GenTableCommonView
}

export interface AssociationItemProps {
    association: GenAssociationView
}

export interface ColumnItemProps {
    column: GenColumnCommonView
}
