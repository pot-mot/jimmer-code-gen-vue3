import {DataSourceFormProps} from "../form/DataSourceFormProps.ts";

export interface DataSourceDialogProps extends DataSourceFormProps {
    x?: number
    y?: number
    limitByParent?: boolean
    disableTeleport?: boolean
    to?: string
}