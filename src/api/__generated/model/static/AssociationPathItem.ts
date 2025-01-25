import type {AssociationPathItemType} from '../enums/';
import type {IdName} from './';

export interface AssociationPathItem {
    entity: IdName;
    property: IdName;
    type: AssociationPathItemType;
}
