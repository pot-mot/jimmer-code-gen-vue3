import {GenDataSourceView} from "../../../../api/__generated/model/static";

export interface DataSourceFormEmits {
    (event: "added", dataSource: GenDataSourceView): void

    (event: "updated"): void
}