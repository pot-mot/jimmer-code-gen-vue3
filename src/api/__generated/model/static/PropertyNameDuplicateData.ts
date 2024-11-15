import type {AssociationType} from '../enums/';
import type {JoinColumnMeta, JoinTableMeta} from './';

export interface PropertyNameDuplicateData {
    columnId?: number | undefined;
    name: string;
    comment: string;
    type: string;
    listType: boolean;
    typeNotNull: boolean;
    typeTableId?: number | undefined;
    enumId?: number | undefined;
    associationType?: AssociationType | undefined;
    joinColumnMetas?: Array<JoinColumnMeta> | undefined;
    joinTableMeta?: JoinTableMeta | undefined;
    idView?: boolean | undefined;
    idViewTarget?: string | undefined;
}
