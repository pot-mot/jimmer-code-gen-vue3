import type {AssociationType} from '../enums';

export interface GenAssociationCommonView {

    associationType: AssociationType;

    comment: string;

    createdTime: string;

    id: number;

    modifiedTime: string;

    orderKey: number;

    remark: string;

    sourceColumnId: number;

    targetColumnId: number;
}
