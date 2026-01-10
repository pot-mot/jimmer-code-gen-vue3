import {typeIds} from "./typeIds.ts";

export const initJvmTypes: {
    id: string;
    jvmSource: JvmLanguage | 'ANY';
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
    sqlMatchRules: Array<{
        id: string;
        databaseSource: DatabaseType | 'ANY';
        matchRegExp: string;
        nullableLimit?: boolean | undefined;
    }>;
    tsMatchRules: Array<{
        id: string;
        matchRegExp: string;
    }>;
}[] = [
    {
        id: typeIds.JVM_STRING_ID.value,
        jvmSource: "ANY",
        typeExpression: "String",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_STRING_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(n)?(var)?char(acter)?(2)?( varying)?(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.JVM_STRING_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(n)?(tiny|small|medium|long)?text$/i.toString()
            },
            {
                id: typeIds.JVM_STRING_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(n)?(tiny|small|medium|long)?clob$/i.toString()
            },
        ],
        tsMatchRules: [
            {
                id: typeIds.JVM_STRING_ID.getRuleId(),
                matchRegExp: /^[Ss]tring$/.toString()
            },
        ]
    },
    {
        id: typeIds.JAVA_INT_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "int",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_INT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^(medium)?int(eger)?(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.JAVA_INT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ORACLE",
                matchRegExp: /^number(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.JAVA_INT_PRIMITIVE_ID.getRuleId(),
                matchRegExp: /^[Nn]umber$/.toString()
            }
        ]
    },
    {
        id: typeIds.JAVA_INTEGER_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Integer",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_INTEGER_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^(medium)?int(eger)?(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.JAVA_INTEGER_OBJECT_ID.getRuleId(),
                databaseSource: "ORACLE",
                matchRegExp: /^number(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.JAVA_INTEGER_OBJECT_ID.getRuleId(),
                matchRegExp: /^[Nn]umber$/.toString()
            }
        ]
    },
    {
        id: typeIds.KT_INT_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Int",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_INT_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^(medium)?int(eger)?(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.KT_INT_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ORACLE",
                matchRegExp: /^number(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.KT_INT_ID.getRuleId(),
                matchRegExp: /^[Nn]umber$/.toString()
            }
        ]
    },
    {
        id: typeIds.JAVA_LONG_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "long",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_LONG_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^bigint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_LONG_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Long",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_LONG_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^bigint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.KT_LONG_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Long",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_LONG_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^bigint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_SHORT_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "short",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_SHORT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^smallint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_SHORT_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Short",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_SHORT_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^smallint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.KT_SHORT_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Short",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_SHORT_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^smallint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_FLOAT_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "float",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_FLOAT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^real$/i.toString()
            },
            {
                id: typeIds.JAVA_FLOAT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^float$/i.toString()
            },
            {
                id: typeIds.JAVA_FLOAT_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)float$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_FLOAT_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Float",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_FLOAT_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^real$/i.toString()
            },
            {
                id: typeIds.JAVA_FLOAT_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^float$/i.toString()
            },
            {
                id: typeIds.JAVA_FLOAT_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)float$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.KT_FLOAT_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Float",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_FLOAT_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^real$/i.toString()
            },
            {
                id: typeIds.KT_FLOAT_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^float$/i.toString()
            },
            {
                id: typeIds.KT_FLOAT_ID.getRuleId(),
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)float$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_DOUBLE_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "double",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_DOUBLE_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^double( precision)?$/i.toString()
            },
            {
                id: typeIds.JAVA_DOUBLE_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)double$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_DOUBLE_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Double",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_DOUBLE_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^double( precision)?$/i.toString()
            },
            {
                id: typeIds.JAVA_DOUBLE_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)double$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.KT_DOUBLE_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Double",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_DOUBLE_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^double( precision)?$/i.toString()
            },
            {
                id: typeIds.KT_DOUBLE_ID.getRuleId(),
                databaseSource: "ORACLE",
                matchRegExp: /^(binary_)double$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_BOOLEAN_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "boolean",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_BOOLEAN_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^bool(ean)?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.JAVA_BOOLEAN_PRIMITIVE_ID.getRuleId(),
                matchRegExp: /^[Bb]oolean$/.toString()
            }
        ]
    },
    {
        id: typeIds.JAVA_BOOLEAN_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Boolean",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_BOOLEAN_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^bool(ean)?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.JAVA_BOOLEAN_OBJECT_ID.getRuleId(),
                matchRegExp: /^[Bb]oolean$/.toString()
            }
        ]
    },
    {
        id: typeIds.KT_BOOLEAN_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Boolean",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_BOOLEAN_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^bool(ean)?$/i.toString()
            }
        ],
        tsMatchRules: [
            {
                id: typeIds.KT_BOOLEAN_ID.getRuleId(),
                matchRegExp: /^[Bb]oolean$/.toString()
            }
        ]
    },
    {
        id: typeIds.JAVA_BYTE_PRIMITIVE_ID.value,
        jvmSource: "JAVA",
        typeExpression: "byte",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_BYTE_PRIMITIVE_ID.getRuleId(),
                nullableLimit: false,
                databaseSource: "ANY",
                matchRegExp: /^tinyint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JAVA_BYTE_OBJECT_ID.value,
        jvmSource: "JAVA",
        typeExpression: "Byte",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JAVA_BYTE_OBJECT_ID.getRuleId(),
                nullableLimit: true,
                databaseSource: "ANY",
                matchRegExp: /^tinyint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.KT_BYTE_ID.value,
        jvmSource: "KOTLIN",
        typeExpression: "Byte",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.KT_BYTE_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^tinyint(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JVM_BIG_DECIMAL_ID.value,
        jvmSource: "ANY",
        typeExpression: "BigDecimal",
        serialized: false,
        extraImports: ["java.math.BigDecimal"],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_BIG_DECIMAL_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^decimal(\(\d+(,\d+)?\))?$/i.toString()
            },
            {
                id: typeIds.JVM_BIG_DECIMAL_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^numeric(\(\d+(,\d+)?\))?$/i.toString()
            },
            {
                id: typeIds.JVM_BIG_DECIMAL_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^number(\(\d+(,\d+)?\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JVM_LOCAL_DATE_TIME_ID.value,
        jvmSource: "ANY",
        typeExpression: "LocalDateTime",
        serialized: false,
        extraImports: ["java.time.LocalDateTime"],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_LOCAL_DATE_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^timestamp(\(\d+\))?( without time zone)?$/i.toString()
            },
            {
                id: typeIds.JVM_LOCAL_DATE_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^datetime(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.JVM_LOCAL_DATE_TIME_ID.getRuleId(),
                databaseSource: "ORACLE",
                matchRegExp: /^datetime2(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JVM_LOCAL_DATE_ID.value,
        jvmSource: "ANY",
        typeExpression: "LocalDate",
        serialized: false,
        extraImports: ["java.time.LocalDate"],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_LOCAL_DATE_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^date( without time zone)?(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JVM_LOCAL_TIME_ID.value,
        jvmSource: "ANY",
        typeExpression: "LocalTime",
        serialized: false,
        extraImports: ["java.time.LocalTime"],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_LOCAL_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^time( without time zone)?(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    },
    {
        id: typeIds.JVM_ZONED_DATE_TIME_ID.value,
        jvmSource: "ANY",
        typeExpression: "ZonedDateTime",
        serialized: false,
        extraImports: ["java.time.ZonedDateTime"],
        extraAnnotations: [],
        sqlMatchRules: [
            {
                id: typeIds.JVM_ZONED_DATE_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^timestamptz(\(\d+\))?$/i.toString()
            },
            {
                id: typeIds.JVM_ZONED_DATE_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^timestamp(\(\d+\))? with time zone$/i.toString()
            },
            {
                id: typeIds.JVM_ZONED_DATE_TIME_ID.getRuleId(),
                databaseSource: "ANY",
                matchRegExp: /^datetimeoffset(\(\d+\))?$/i.toString()
            }
        ],
        tsMatchRules: []
    }
];
