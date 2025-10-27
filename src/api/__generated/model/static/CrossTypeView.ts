import type {DatabaseSource, JvmSource} from '../enums/';
import type {CrossTypeView_TargetOf_jvmType, CrossTypeView_TargetOf_sqlType, CrossTypeView_TargetOf_tsType} from './';

export interface CrossTypeView {
    id: string;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    sqlType: CrossTypeView_TargetOf_sqlType;
    jvmType: CrossTypeView_TargetOf_jvmType;
    tsType: CrossTypeView_TargetOf_tsType;
}
