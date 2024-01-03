import type {DataSourceType, GenLanguage} from '../enums/';
import type {GenModelInput_TargetOf_enums} from './';

export interface GenModelInput {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 名称
     */
    name: string;
    /**
     * 备注
     */
    remark: string;
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
     * Graph 数据
     */
    graphData?: string | undefined;
    /**
     * 枚举
     */
    enums: Array<GenModelInput_TargetOf_enums>;
}
