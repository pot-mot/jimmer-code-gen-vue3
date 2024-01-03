import type {DataSourceType, GenLanguage} from '../enums/';
import type {GenModelView_TargetOf_enums} from './';

export interface GenModelView {
    /**
     * ID
     */
    id: number;
    /**
     * 创建事件
     */
    createdTime: string;
    /**
     * 修改时间
     */
    modifiedTime: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 名称
     */
    name: string;
    /**
     * Graph 数据
     */
    graphData: string;
    /**
     * 语言
     */
    language: GenLanguage;
    /**
     * 数据源类型
     */
    dataSourceType: DataSourceType;
    /**
     * 包路径
     */
    packagePath: string;
    /**
     * 同步转换实体
     */
    syncConvertEntity: boolean;
    /**
     * 枚举
     */
    enums: Array<GenModelView_TargetOf_enums>;
}
