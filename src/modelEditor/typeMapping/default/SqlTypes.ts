import {typeIds} from "./typeIds.ts";

export const initSqlTypes: {
    id: string;
    databaseSource: DatabaseType | 'ANY';
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
    jvmMatchRules: Array< {
        id: string;
        jvmSource: JvmLanguage | 'ANY';
        matchRegExp: string;
    }>;
    tsMatchRules: Array<{
        id: string;
        matchRegExp: string;
    }>;
}[] = [
    {
        id: typeIds.SQL_TEXT_ID.value,
        databaseSource: "ANY",
        type: "text",
        jvmMatchRules: [
            {
                id: typeIds.SQL_TEXT_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^String$/.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.SQL_TEXT_ID.getRuleId(),
                matchRegExp: /^[Ss]tring$/.toString()
            }
        ]
    },
    {
        id: typeIds.SQL_VARCHAR255_ID.value,
        databaseSource: "ANY",
        type: "varchar(255)",
        dataSize: 255,
        jvmMatchRules: [
            {
                id: typeIds.SQL_VARCHAR255_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^String$/.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.SQL_VARCHAR255_ID.getRuleId(),
                matchRegExp: /^[Ss]tring$/.toString()
            }
        ]
    },
    {
        id: typeIds.SQL_CHAR255_ID.value,
        databaseSource: "ANY",
        type: "char(255)",
        dataSize: 255,
        jvmMatchRules: [
            {
                id: typeIds.SQL_CHAR255_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^String$/.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.SQL_CHAR255_ID.getRuleId(),
                matchRegExp: /^[Ss]tring$/.toString()
            }
        ]
    },
    {
        id: typeIds.SQL_INTEGER_ID.value,
        databaseSource: "ANY",
        type: "integer",
        jvmMatchRules: [
            {
                id: typeIds.SQL_INTEGER_ID.getRuleId(),
                jvmSource: "JAVA",
                matchRegExp: /^(int|Integer)$/.toString()
            },
            {
                id: typeIds.SQL_INTEGER_ID.getRuleId(),
                jvmSource: "KOTLIN",
                matchRegExp: /^Int$/.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.SQL_INTEGER_ID.getRuleId(),
                matchRegExp: /^[Nn]umber$/.toString()
            }
        ]
    },
    {
        id: typeIds.SQL_BIGINT_ID.value,
        databaseSource: "ANY",
        type: "bigint",
        jvmMatchRules: [
            {
                id: typeIds.SQL_BIGINT_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Ll]ong$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_SMALLINT_ID.value,
        databaseSource: "ANY",
        type: "smallint",
        jvmMatchRules: [
            {
                id: typeIds.SQL_SMALLINT_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Ss]hort$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_REAL_ID.value,
        databaseSource: "ANY",
        type: "real",
        jvmMatchRules: [
            {
                id: typeIds.SQL_REAL_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Ff]loat$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_DOUBLE_PRECISION_ID.value,
        databaseSource: "ANY",
        type: "double precision",
        jvmMatchRules: [
            {
                id: typeIds.SQL_DOUBLE_PRECISION_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Dd]ouble$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_BOOLEAN_ID.value,
        databaseSource: "ANY",
        type: "boolean",
        jvmMatchRules: [
            {
                id: typeIds.SQL_BOOLEAN_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Bb]oolean$/.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.SQL_BOOLEAN_ID.getRuleId(),
                matchRegExp: /^[Bb]oolean$/.toString()
            }
        ]
    },
    {
        id: typeIds.SQL_TINYINT_ID.value,
        databaseSource: "ANY",
        type: "tinyint",
        jvmMatchRules: [
            {
                id: typeIds.SQL_TINYINT_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^[Bb]yte$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_DECIMAL_11_2_ID.value,
        databaseSource: "ANY",
        type: "decimal(11, 2)",
        dataSize: 11,
        numericPrecision: 2,
        jvmMatchRules: [
            {
                id: typeIds.SQL_DECIMAL_11_2_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^BigDecimal$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_DATE_ID.value,
        databaseSource: "ANY",
        type: "date",
        jvmMatchRules: [
            {
                id: typeIds.SQL_DATE_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^LocalDate$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_TIME_ID.value,
        databaseSource: "ANY",
        type: "time",
        jvmMatchRules: [
            {
                id: typeIds.SQL_TIME_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^LocalTime$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_TIMESTAMP_ID.value,
        databaseSource: "ANY",
        type: "timestamp",
        jvmMatchRules: [
            {
                id: typeIds.SQL_TIMESTAMP_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^LocalDateTime$/.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.SQL_TIMESTAMP_TZ_ID.value,
        databaseSource: "POSTGRESQL",
        type: "timestamptz",
        jvmMatchRules: [
            {
                id: typeIds.SQL_TIMESTAMP_TZ_ID.getRuleId(),
                jvmSource: "ANY",
                matchRegExp: /^ZonedDateTime$/.toString()
            }
        ],
        tsMatchRules: []
    }
];
