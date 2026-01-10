import {typeIds} from "./typeIds.ts";

export const initCrossTypes: {
    id: string;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
    nullable?: boolean;
}[] = [
    {
        id: typeIds.CROSS_STRING_TEXT.value,
        jvmTypeId: typeIds.JVM_STRING_ID.value,
        sqlTypeId: typeIds.SQL_TEXT_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_STRING_VARCHAR255.value,
        jvmTypeId: typeIds.JVM_STRING_ID.value,
        sqlTypeId: typeIds.SQL_VARCHAR255_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_STRING_CHAR255.value,
        jvmTypeId: typeIds.JVM_STRING_ID.value,
        sqlTypeId: typeIds.SQL_CHAR255_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_INT_PRIMITIVE.value,
        jvmTypeId: typeIds.JAVA_INT_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_INTEGER_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_INTEGER_OBJECT.value,
        jvmTypeId: typeIds.JAVA_INTEGER_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_INTEGER_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_INT.value,
        jvmTypeId: typeIds.KT_INT_ID.value,
        sqlTypeId: typeIds.SQL_INTEGER_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_LONG_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_LONG_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_BIGINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_LONG_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_LONG_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_BIGINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_LONG_ID.value,
        jvmTypeId: typeIds.KT_LONG_ID.value,
        sqlTypeId: typeIds.SQL_BIGINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_SHORT_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_SHORT_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_SMALLINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_SHORT_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_SHORT_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_SMALLINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_SHORT_ID.value,
        jvmTypeId: typeIds.KT_SHORT_ID.value,
        sqlTypeId: typeIds.SQL_SMALLINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_FLOAT_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_FLOAT_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_REAL_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_FLOAT_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_FLOAT_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_REAL_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_FLOAT_ID.value,
        jvmTypeId: typeIds.KT_FLOAT_ID.value,
        sqlTypeId: typeIds.SQL_REAL_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_DOUBLE_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_DOUBLE_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_DOUBLE_PRECISION_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_DOUBLE_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_DOUBLE_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_DOUBLE_PRECISION_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_DOUBLE_ID.value,
        jvmTypeId: typeIds.KT_DOUBLE_ID.value,
        sqlTypeId: typeIds.SQL_DOUBLE_PRECISION_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_BOOLEAN_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_BOOLEAN_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_BOOLEAN_ID.value,
        tsTypeId: typeIds.TS_BOOLEAN_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_BOOLEAN_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_BOOLEAN_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_BOOLEAN_ID.value,
        tsTypeId: typeIds.TS_BOOLEAN_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_BOOLEAN_ID.value,
        jvmTypeId: typeIds.KT_BOOLEAN_ID.value,
        sqlTypeId: typeIds.SQL_BOOLEAN_ID.value,
        tsTypeId: typeIds.TS_BOOLEAN_ID.value,
    },
    {
        id: typeIds.CROSS_JAVA_BYTE_PRIMITIVE_ID.value,
        jvmTypeId: typeIds.JAVA_BYTE_PRIMITIVE_ID.value,
        sqlTypeId: typeIds.SQL_TINYINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: false
    },
    {
        id: typeIds.CROSS_JAVA_BYTE_OBJECT_ID.value,
        jvmTypeId: typeIds.JAVA_BYTE_OBJECT_ID.value,
        sqlTypeId: typeIds.SQL_TINYINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
        nullable: true
    },
    {
        id: typeIds.CROSS_KT_BYTE_ID.value,
        jvmTypeId: typeIds.KT_BYTE_ID.value,
        sqlTypeId: typeIds.SQL_TINYINT_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_BIG_DECIMAL_ID.value,
        jvmTypeId: typeIds.JVM_BIG_DECIMAL_ID.value,
        sqlTypeId: typeIds.SQL_DECIMAL_11_2_ID.value,
        tsTypeId: typeIds.TS_NUMBER_ID.value,
    },
    {
        id: typeIds.CROSS_LOCAL_DATE_TIME_ID.value,
        jvmTypeId: typeIds.JVM_LOCAL_DATE_TIME_ID.value,
        sqlTypeId: typeIds.SQL_TIMESTAMP_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_LOCAL_DATE_ID.value,
        jvmTypeId: typeIds.JVM_LOCAL_DATE_ID.value,
        sqlTypeId: typeIds.SQL_DATE_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_LOCAL_TIME_ID.value,
        jvmTypeId: typeIds.JVM_LOCAL_TIME_ID.value,
        sqlTypeId: typeIds.SQL_TIME_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    },
    {
        id: typeIds.CROSS_ZONED_DATE_TIME_ID.value,
        jvmTypeId: typeIds.JVM_ZONED_DATE_TIME_ID.value,
        sqlTypeId: typeIds.SQL_TIMESTAMP_TZ_ID.value,
        tsTypeId: typeIds.TS_STRING_ID.value,
    }
];
