import type {GenEntityConfigInput, GenPropertyEntityConfigInput} from './';

export interface EntityModelBusinessInput {
    entity: GenEntityConfigInput;
    properties: Array<GenPropertyEntityConfigInput>;
}
