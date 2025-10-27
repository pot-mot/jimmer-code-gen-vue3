import type {ScriptDatabaseType, ScriptJvmLanguage, ScriptType} from '../enums/';

export interface GenerateScriptView {
    id: string;
    name: string;
    type: ScriptType;
    enabled: boolean;
    databaseType: ScriptDatabaseType;
    jvmLanguage: ScriptJvmLanguage;
    scriptContent: string;
}
