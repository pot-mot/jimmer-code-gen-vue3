import type {DatabaseTypeOrAny, JvmLanguageOrAny, ScriptType} from '../enums/';

export interface GenerateScriptUpdateInput {
    name: string;
    type: ScriptType;
    enabled: boolean;
    databaseType: DatabaseTypeOrAny;
    jvmLanguage: JvmLanguageOrAny;
    scriptContent: string;
    id: string;
}
