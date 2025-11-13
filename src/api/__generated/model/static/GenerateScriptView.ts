import type {DatabaseTypeOrAny, JvmLanguageOrAny, ScriptType} from '../enums/';

export interface GenerateScriptView {
    id: string;
    name: string;
    type: ScriptType;
    enabled: boolean;
    databaseType: DatabaseTypeOrAny;
    jvmLanguage: JvmLanguageOrAny;
    scriptContent: string;
}
