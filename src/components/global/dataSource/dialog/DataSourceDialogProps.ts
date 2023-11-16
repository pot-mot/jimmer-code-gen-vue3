import {DataSourceFormProps} from "../form/DataSourceFormProps.ts";

export interface DataSourceDialogProps extends DataSourceFormProps {
    initX?: number
    initY?: number
    limitByParent?: boolean
    disableTeleport?: boolean
    to?: string
}