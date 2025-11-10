import type {ScriptDatabaseType, ScriptJvmLanguage, ScriptType} from '../enums/';

export interface GenerateScriptSaveInput {
    name: string;
    type: ScriptType;
    enabled: boolean;
    databaseType: ScriptDatabaseType;
    jvmLanguage: ScriptJvmLanguage;
    scriptContent: string;
    id: string;
}
