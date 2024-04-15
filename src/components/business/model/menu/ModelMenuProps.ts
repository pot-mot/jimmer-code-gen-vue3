import {
    GenAssociationView,
    GenColumnView,
    GenModelSimpleView,
    GenTableCommonView
} from "@/api/__generated/model/static";
import {ModelMenuEventsProps} from "@/components/business/model/menu/ModelMenuEvents.ts";

export interface ModelMenuProps extends ShowConfig {
}

export interface ModelItemProps extends ModelMenuEventsProps {
    model: GenModelSimpleView
    showConfig?: ShowConfig
}

export interface TableItemProps extends ModelMenuEventsProps {
    table: GenTableCommonView
    showConfig?: ShowConfig
}

export interface AssociationItemProps extends ModelMenuEventsProps {
    association: GenAssociationView
    showConfig?: ShowConfig
}

export interface ColumnItemProps extends ModelMenuEventsProps {
    column: GenColumnView
}

interface ShowConfig {
    showModelTables?: boolean
    showColumns?: boolean
    showAssociations?: boolean
    showAssociationTables?: boolean
}
