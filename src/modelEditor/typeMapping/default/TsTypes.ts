import {typeIds} from "./typeIds.ts";

export const initTsTypes: {
    id: string;
    typeExpression: string;
    extraImports: Array<TsImport>;
    jvmMatchRules: Array< {
        id: string;
        jvmSource: JvmLanguage | 'ANY';
        matchRegExp: string;
    }>;
    sqlMatchRules: Array<{
        id: string;
        databaseSource: DatabaseType | 'ANY';
        matchRegExp: string;
    }>;
}[] = [
    {
        id: typeIds.TS_STRING_ID.value,
        typeExpression: "string",
        extraImports: [],
        jvmMatchRules: [
            {
                id: typeIds.TS_STRING_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^String$/.toString()
            }
        ],
        sqlMatchRules: [
            {
                id: typeIds.TS_STRING_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(text|(n)?(var)?char\(\d+\)|(tiny|small|medium|long)?text|character( varying)?\(\d+\))$/i.toString()
            }
        ]
    },
    {
        id: typeIds.TS_NUMBER_ID.value,
        typeExpression: "number",
        extraImports: [],
        jvmMatchRules: [
            {
                id: typeIds.TS_NUMBER_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^(int|Integer|Int|long|Long|short|Short|float|Float|double|Double)$/i.toString()
            }
        ],
        sqlMatchRules: [
            {
                id: typeIds.TS_NUMBER_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(int(eger)?|tinyint|bigint|smallint|real|float|double( precision)?)\(\d+\)\)?$/i.toString()
            }
        ]
    },
    {
        id: typeIds.TS_BOOLEAN_ID.value,
        typeExpression: "boolean",
        extraImports: [],
        jvmMatchRules: [
            {
                id: typeIds.TS_BOOLEAN_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Bb]oolean$/i.toString()
            }
        ],
        sqlMatchRules: [
            {
                id: typeIds.TS_BOOLEAN_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^bool(ean)?$/i.toString()
            }
        ]
    }
];
