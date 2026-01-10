const typeIdCategoryMap = Object.freeze({
    JvmType: '0',
    SQLType: '1',
    TSType: '2',
    CrossType: '3'
})

type TypeIdCategory = keyof typeof typeIdCategoryMap

let category: TypeIdCategory = 'JvmType'
let index = 0

const generateTypeId = (
    options?: {
        category?: TypeIdCategory,
        index?: number,
    },
): {
    value: string,
    getRuleId: () => string,
} => {
    if (options?.category !== undefined) {
        category = options.category
        index = 0
    }
    if (options?.index !== undefined) {
        index = options.index
    }

    if (index < 0 || index > 0xFFFF) throw new Error(`Index [${index}] is out of range`)
    const indexHex = index.toString(16).padStart(4, '0')
    index++
    const prefix: string = `0003910${typeIdCategoryMap[category]}-${indexHex}-4000-a000-`

    let subIndex = 1
    const getRuleId = (): string => {
        if (subIndex < 1 || subIndex > 0xFFFF_FFFF_FFFF) throw new Error(`SubIndex [${subIndex}] is out of range`)
        const subIndexHex = subIndex.toString(16).padStart(12, '0')
        subIndex++
        return `${prefix}${subIndexHex}`
    }

    return {
        value: `${prefix}${"0".repeat(8)}`,
        getRuleId,
    }
}

export const typeIds = Object.freeze({
    // JVM type IDs
    JVM_STRING_ID: generateTypeId({category: 'JvmType'}),
    JAVA_INT_PRIMITIVE_ID: generateTypeId(),
    JAVA_INTEGER_OBJECT_ID: generateTypeId(),
    KT_INT_ID: generateTypeId(),
    JAVA_LONG_PRIMITIVE_ID: generateTypeId(),
    JAVA_LONG_OBJECT_ID: generateTypeId(),
    KT_LONG_ID: generateTypeId(),
    JAVA_SHORT_PRIMITIVE_ID: generateTypeId(),
    JAVA_SHORT_OBJECT_ID: generateTypeId(),
    KT_SHORT_ID: generateTypeId(),
    JAVA_FLOAT_PRIMITIVE_ID: generateTypeId(),
    JAVA_FLOAT_OBJECT_ID: generateTypeId(),
    KT_FLOAT_ID: generateTypeId(),
    JAVA_DOUBLE_PRIMITIVE_ID: generateTypeId(),
    JAVA_DOUBLE_OBJECT_ID: generateTypeId(),
    KT_DOUBLE_ID: generateTypeId(),
    JAVA_BOOLEAN_PRIMITIVE_ID: generateTypeId(),
    JAVA_BOOLEAN_OBJECT_ID: generateTypeId(),
    KT_BOOLEAN_ID: generateTypeId(),
    JAVA_BYTE_PRIMITIVE_ID: generateTypeId(),
    JAVA_BYTE_OBJECT_ID: generateTypeId(),
    KT_BYTE_ID: generateTypeId(),
    JVM_BIG_DECIMAL_ID: generateTypeId(),
    JVM_LOCAL_DATE_TIME_ID: generateTypeId(),
    JVM_LOCAL_DATE_ID: generateTypeId(),
    JVM_LOCAL_TIME_ID: generateTypeId(),
    JVM_ZONED_DATE_TIME_ID: generateTypeId(),

    // SQL type IDs
    SQL_TEXT_ID: generateTypeId({category: 'SQLType'}),
    SQL_VARCHAR255_ID: generateTypeId(),
    SQL_CHAR255_ID: generateTypeId(),
    SQL_INTEGER_ID: generateTypeId(),
    SQL_BIGINT_ID: generateTypeId(),
    SQL_SMALLINT_ID: generateTypeId(),
    SQL_TINYINT_ID: generateTypeId(),
    SQL_REAL_ID: generateTypeId(),
    SQL_DOUBLE_PRECISION_ID: generateTypeId(),
    SQL_BOOLEAN_ID: generateTypeId(),
    SQL_DECIMAL_11_2_ID: generateTypeId(),
    SQL_DATE_ID: generateTypeId(),
    SQL_TIME_ID: generateTypeId(),
    SQL_TIMESTAMP_ID: generateTypeId(),
    SQL_TIMESTAMP_TZ_ID: generateTypeId(),

    // TS type IDs
    TS_STRING_ID: generateTypeId({category: 'TSType'}),
    TS_NUMBER_ID: generateTypeId(),
    TS_BOOLEAN_ID: generateTypeId(),

// Cross Type Ids
    CROSS_STRING_TEXT: generateTypeId({category: 'CrossType'}),
    CROSS_STRING_VARCHAR255: generateTypeId(),
    CROSS_STRING_CHAR255: generateTypeId(),
    CROSS_JAVA_INT_PRIMITIVE: generateTypeId(),
    CROSS_JAVA_INTEGER_OBJECT: generateTypeId(),
    CROSS_KT_INT: generateTypeId(),
    CROSS_KT_LONG_ID: generateTypeId(),
    CROSS_JAVA_LONG_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_LONG_OBJECT_ID: generateTypeId(),
    CROSS_KT_SHORT_ID: generateTypeId(),
    CROSS_JAVA_SHORT_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_SHORT_OBJECT_ID: generateTypeId(),
    CROSS_KT_FLOAT_ID: generateTypeId(),
    CROSS_JAVA_FLOAT_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_FLOAT_OBJECT_ID: generateTypeId(),
    CROSS_KT_DOUBLE_ID: generateTypeId(),
    CROSS_JAVA_DOUBLE_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_DOUBLE_OBJECT_ID: generateTypeId(),
    CROSS_KT_BOOLEAN_ID: generateTypeId(),
    CROSS_JAVA_BOOLEAN_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_BOOLEAN_OBJECT_ID: generateTypeId(),
    CROSS_KT_BYTE_ID: generateTypeId(),
    CROSS_JAVA_BYTE_PRIMITIVE_ID: generateTypeId(),
    CROSS_JAVA_BYTE_OBJECT_ID: generateTypeId(),
    CROSS_BIG_DECIMAL_ID: generateTypeId(),
    CROSS_LOCAL_DATE_TIME_ID: generateTypeId(),
    CROSS_LOCAL_DATE_ID: generateTypeId(),
    CROSS_LOCAL_TIME_ID: generateTypeId(),
    CROSS_ZONED_DATE_TIME_ID: generateTypeId(),
});
