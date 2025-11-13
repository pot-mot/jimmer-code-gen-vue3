import type {DatabaseTypeOrAny, JvmLanguageOrAny} from '../enums/';

export interface CrossTypeInput {
    id?: string | undefined;
    jvmSource: JvmLanguageOrAny;
    databaseSource: DatabaseTypeOrAny;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
