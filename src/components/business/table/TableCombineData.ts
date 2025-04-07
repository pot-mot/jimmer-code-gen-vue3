import {GenTableModelInput} from "@/api/__generated/model/static";
import {ColumnCombineKey} from "@/components/business/association/columnEquals.ts";
import {DeepReadonly} from "vue";
import {getDefaultColumn, getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {cloneDeep} from "lodash";
import {TableNodePair} from "@/store/modelEditor/ModelEditorStore.ts";

export type TableCombineData = {
    superTable: GenTableModelInput,
    inheritTableNodePairs: Array<TableNodePair>,
}

export const createTableCombineData = (
    name: string,
    tableNodePairs: DeepReadonly<Array<TableNodePair>>,
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

    const inheritTableNodePairs: Array<TableNodePair> = tableNodePairs.map(({table, node}) => {
        const temp = cloneDeep(table)

        return {
            table: {
                ...temp,
                columns: temp.columns
                    .filter(column => {
                        return columns.every(column2 => column.name !== column2.name)
                    }),
                superTables: [...temp.superTables, {name}]
            },
            node
        } as TableNodePair
    })

    return {
        superTable,
        inheritTableNodePairs,
    }
}
