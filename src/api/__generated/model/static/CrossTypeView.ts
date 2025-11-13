import type {DatabaseTypeOrAny, JvmLanguageOrAny} from '../enums/';

export interface CrossTypeView {
    id: string;
    jvmSource: JvmLanguageOrAny;
    databaseSource: DatabaseTypeOrAny;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
