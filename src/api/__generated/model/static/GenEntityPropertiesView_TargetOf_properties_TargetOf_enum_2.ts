import type {EnumType} from '../enums/';
import type {GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3} from './';

export interface GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2 {
    /**
     * ID
     */
    id: number;
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
     * 备注
     */
    remark: string;
    /**
     * 枚举类型
     */
    enumType?: EnumType | undefined;
    /**
     * 生成枚举元素
     */
    items: Array<GenEntityPropertiesView_TargetOf_properties_TargetOf_enum_2_TargetOf_items_3>;
}
