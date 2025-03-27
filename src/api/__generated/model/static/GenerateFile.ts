import type {GenerateTag} from '../enums/';
import type {
    IdName, 
    IdNamePackagePath, 
    MainIdName, 
    TableEntityPair
} from './';

export interface GenerateFile {
    path: string;
    content: string;
    tags: Array<GenerateTag>;
    main?: MainIdName | undefined;
    tableEntities: Array<TableEntityPair>;
    enums: Array<IdNamePackagePath>;
    associations: Array<IdName>;
    name: string;
}
