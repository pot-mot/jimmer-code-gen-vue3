import type {GenEntityModelView, GenPropertyModelView} from './';

/**
 * 实体 - 用于模型业务配置的输出
 * 同时也将在 JSON 保存时作为输入对象，此时将被被转换为 EntityModelBusinessInput
 */
export interface EntityModelBusinessView {
    /**
     * 表直接转换得到的实体
     */
    tableConvertedEntity: GenEntityModelView;
    /**
     * 其余非转换属性
     */
    otherProperties: Array<GenPropertyModelView>;
}
