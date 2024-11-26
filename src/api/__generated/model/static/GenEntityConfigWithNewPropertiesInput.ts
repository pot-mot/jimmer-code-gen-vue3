import type {GenEntityConfigInput, GenPropertyEntityConfigInput} from './';

export interface GenEntityConfigWithNewPropertiesInput {
    entity: GenEntityConfigInput;
    properties: Array<GenPropertyEntityConfigInput>;
}
