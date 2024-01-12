import type {SelectType} from '../enums/';

export interface AssociationColumnQuery {
    columnIds?: Array<number> | undefined;
    sourceColumnIds?: Array<number> | undefined;
    targetColumnIds?: Array<number> | undefined;
    selectType: SelectType;
}
