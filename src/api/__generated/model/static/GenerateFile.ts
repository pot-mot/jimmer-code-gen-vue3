import type {GenerateTag} from '../enums/';
import type {IdName, MainIdName, TableEntityPair} from './';

export interface GenerateFile {
    path: string;
    content: string;
    tags: Array<GenerateTag>;
    main?: MainIdName | undefined;
    tableEntities: Array<TableEntityPair>;
    enums: Array<IdName>;
    associations: Array<IdName>;
    name: string;
}
