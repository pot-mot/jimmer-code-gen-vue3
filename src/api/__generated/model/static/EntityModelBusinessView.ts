import type {GenEntityModelView, GenPropertyModelView} from './';

export interface EntityModelBusinessView {
    tableConvertedEntity: GenEntityModelView;
    otherProperties: Array<GenPropertyModelView>;
}
