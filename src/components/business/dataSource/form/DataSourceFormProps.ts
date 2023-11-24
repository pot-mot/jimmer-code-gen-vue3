import {GenDataSourceInput} from "@/api/__generated/model/static";

export interface DataSourceFormProps {
    id?: number,
    dataSource?: Partial<GenDataSourceInput>,
}