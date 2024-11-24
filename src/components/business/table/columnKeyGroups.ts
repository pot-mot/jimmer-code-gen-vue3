import {DeepReadonly} from "vue";

export const getColumnKeyGroups = (column: DeepReadonly<{keyGroup?: string | undefined}>) => {
    if (column.keyGroup === undefined) return []

    return column.keyGroup.split(",").map(it => it.trim()).sort()
}