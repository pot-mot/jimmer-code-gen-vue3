import type {AssociationType} from '../enums';

export interface GenAssociationCommonInput {

    associationType: AssociationType;

    comment: string;

    createdTime: string;

    modifiedTime: string;

    orderKey: number;

    remark: string;

    sourceColumnId: number;

    targetColumnId: number;
}
