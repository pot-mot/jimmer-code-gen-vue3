import type {DatabaseSource, JvmSource} from '../enums/';

export interface CrossTypeView {
    id: string;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
