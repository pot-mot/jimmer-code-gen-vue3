import type {DatabaseTypeOrAny, JvmLanguageOrAny, ScriptType} from '../enums/';

export interface GenerateScriptInsertInput {
    name: string;
    type: ScriptType;
    enabled: boolean;
    databaseType: DatabaseTypeOrAny;
    jvmLanguage: JvmLanguageOrAny;
    scriptContent: string;
}
