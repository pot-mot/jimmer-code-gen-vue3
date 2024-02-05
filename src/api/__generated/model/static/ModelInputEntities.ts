import type {GenAssociationModelInput, GenTableModelInput} from './';

export interface ModelInputEntities {
    tables: Array<GenTableModelInput>;
    associations: Array<GenAssociationModelInput>;
}
