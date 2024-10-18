import type {GenerateTag} from '../enums/';

export interface GenerateFile {
    path: string;
    content: string;
    tags: Array<GenerateTag>;
}
