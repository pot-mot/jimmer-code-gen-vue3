import type {EnumType} from '../enums/';
import type {GenModelInput_TargetOf_enums_TargetOf_items, GenModelInput_TargetOf_enums_TargetOf_subGroup} from './';

/**
 * 生成枚举
 */
export interface GenModelInput_TargetOf_enums {
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
     * 备注
     */
    remark: string;
    /**
     * 子组
     */
    subGroup?: GenModelInput_TargetOf_enums_TargetOf_subGroup | undefined;
    /**
     * 生成枚举元素
     */
    items: Array<GenModelInput_TargetOf_enums_TargetOf_items>;
}
