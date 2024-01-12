import type {SelectType} from '../enums/';

export interface AssociationTableQuery {
    tableIds?: Array<number> | undefined;
    sourceTableIds?: Array<number> | undefined;
    targetTableIds?: Array<number> | undefined;
    selectType: SelectType;
}
