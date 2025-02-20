import type {GenEntityExportView, GenPropertyExportView} from './';

export interface EntityExportView {
    /**
     * 表直接转换得到的实体
     */
    entity: GenEntityExportView;
    /**
     * 其余非转换属性
     */
    properties: Array<GenPropertyExportView>;
}
