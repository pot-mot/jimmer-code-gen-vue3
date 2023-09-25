import type {AssociationType, DissociateAction} from '../enums';

export interface GenAssociationInput {

    associationType: AssociationType;

    comment: string;

    dissociateAction?: DissociateAction;

    orderKey: number;

    remark: string;

    sourceColumnId: number;

    targetColumnId: number;
}
