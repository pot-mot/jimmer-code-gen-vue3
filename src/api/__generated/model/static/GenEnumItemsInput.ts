import type {EnumType} from '../enums/';
import type {GenEnumItemsInput_TargetOf_items} from './';

export interface GenEnumItemsInput {
    /**
     * ID
     */
    id?: number | undefined;
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
    /**
     * 生成枚举元素
     */
    items: Array<GenEnumItemsInput_TargetOf_items>;
}
