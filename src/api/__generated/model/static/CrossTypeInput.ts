import type {DatabaseSource, JvmSource} from '../enums/';

export interface CrossTypeInput {
    id?: string | undefined;
    jvmSource: JvmSource;
    databaseSource: DatabaseSource;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
