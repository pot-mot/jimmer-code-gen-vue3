import type {GenEntityConfigInput_TargetOf_properties} from './';

export interface GenEntityConfigInput {
    /**
     * ID
     */
    id?: number | undefined;
    /**
     * 包路径
     */
    packagePath: string;
    /**
     * 类名称
     */
    name: string;
    /**
     * 类注释
     */
    comment: string;
    /**
     * 作者
     */
    author: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 属性
     */
    properties: Array<GenEntityConfigInput_TargetOf_properties>;
}
