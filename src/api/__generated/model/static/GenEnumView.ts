import type {EnumType} from '../enums/';

export interface GenEnumView {
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
     * 包路径
     */
    packagePath: string;
    /**
     * 枚举名
     */
    name: string;
    /**
     * 枚举注释
     */
    comment: string;
    /**
     * 枚举类型
     */
    enumType?: EnumType | undefined;
    /**
     * 自定排序
     */
    orderKey: number;
    /**
     * 模型
     */
    modelId?: number | undefined;
}
