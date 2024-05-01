import {
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
    GenTableModelInput_TargetOf_indexes
} from "@/api/__generated/model/static";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";

export const getDefaultTable = (): GenTableModelInput => {
    return {
        name: "",
        comment: "",
        remark: "",
        type: "TABLE",
        superTables: [],
        columns: [],
        indexes: [],
    }
}

export const getDefaultIndex = (): GenTableModelInput_TargetOf_indexes => {
    return {
        name: "",
        uniqueIndex: false,
        remark: "",
        columns: []
    }
}

export const getDefaultColumn = (): GenTableModelInput_TargetOf_columns => {
    const columnDefaultStore = useColumnDefaultStore()

    const defaultColumn: GenTableModelInput_TargetOf_columns = {
        orderKey: -1,
        name: "",
        comment: "",
        typeCode: 12,
        overwriteByRaw: false,
        rawType: "VARCHAR",
        typeNotNull: true,
        dataSize: 0,
        numericPrecision: 0,
        defaultValue: undefined,
        partOfPk: false,
        autoIncrement: false,
        remark: "",
        logicalDelete: false,
        businessKey: false,
        enum: undefined,
    }

    const columnDefaults = columnDefaultStore.get(defaultColumn.typeCode)

    if (columnDefaults.length === 0) {
        return defaultColumn
    } else {
        const columnDefault = columnDefaults[0]
        return {
            ...defaultColumn,
            overwriteByRaw: true,
            rawType: columnDefault.rawType,
            dataSize: columnDefault.dataSize,
            numericPrecision: columnDefault.numericPrecision,
            defaultValue: columnDefault.defaultValue
        }
    }
}
