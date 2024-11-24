import type {GenerateTag} from '../enums/';
import type {IdName} from './';

export interface GenerateFile {
    path: string;
    content: string;
    tags: Array<GenerateTag>;
    mainTable?: IdName | undefined;
    tables: Array<IdName>;
    mainEntity?: IdName | undefined;
    entities: Array<IdName>;
    enums: Array<IdName>;
    associations: Array<IdName>;
}
