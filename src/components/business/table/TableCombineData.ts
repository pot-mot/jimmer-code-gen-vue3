import {GenTableModelInput, Pair} from "@/api/__generated/model/static";
import {ColumnCombineKey} from "@/components/business/association/columnEquals.ts";
import {DeepReadonly} from "vue";
import {getDefaultColumn, getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {cloneDeep} from "lodash";
import {type Node} from "@antv/x6";

export type TableCombineData = {
    superTable: GenTableModelInput,
    inheritTableNodePairs: Array<Pair<GenTableModelInput, Node>>,
}

export const createTableCombineData = (
    name: string,
    tableNodePairs: DeepReadonly<Array<Pair<GenTableModelInput, Node>>>,
    columns: DeepReadonly<Array<ColumnCombineKey>>,
): TableCombineData => {
    const superTable: GenTableModelInput = {
        ...getDefaultTable(),
        name,
        type: "SUPER_TABLE",
        columns: columns.map(it => {
            return {
                ...getDefaultColumn(),
                name: it.name,
                typeCode: it.typeCode,
                overwriteByRaw: it.overwriteByRaw,
                rawType: it.rawType,
            }
        })
    }

    const inheritTableNodePairs: Array<Pair<GenTableModelInput, Node>> = tableNodePairs.map(({first, second}) => {
        const temp = cloneDeep(first)

        return {
            first: {
                ...temp,
                columns: temp.columns
                    .filter(column => {
                        return columns.every(column2 => column.name !== column2.name)
                    }),
                superTables: [...temp.superTables, {name}]
            },
            second
        } as Pair<GenTableModelInput, Node>
    })

    return {
        superTable,
        inheritTableNodePairs,
    }
}