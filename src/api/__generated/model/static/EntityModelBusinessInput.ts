import type {GenEntityConfigInput, GenPropertyEntityConfigInput} from './';

/**
 * 实体 - 用于模型业务配置的输入
 * 将直接被用于 save
 */
export interface EntityModelBusinessInput {
    /**
     * 实体业务配置输入，仅包含特定的业务配置项
     */
    entity: GenEntityConfigInput;
    /**
     * 属性业务配置输入，具有全标量字段，用于编辑无需考虑关联的非转换属性
     */
    properties: Array<GenPropertyEntityConfigInput>;
}
