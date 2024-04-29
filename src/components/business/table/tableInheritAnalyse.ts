import {GenTableModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

// 获取合法的 superTable 列表
export const getLegalSuperTables = (
    table: DeepReadonly<GenTableModelInput>,
    superTables: DeepReadonly<Array<GenTableModelInput>>,
): DeepReadonly<Array<GenTableModelInput>> => {
    if (table.type != "SUPER_TABLE") {
        return superTables
    }

    const inheritMap = createInheritMap(superTables)
    const allChildren = new Set(collectAllChildren(table.name, inheritMap))

    return superTables.filter(it => it.name != table.name).filter(it => !allChildren.has(it.name))
}

// 获取全部子表
export const getAllChildTables = (
    table: DeepReadonly<GenTableModelInput>,
    otherTables: DeepReadonly<Array<GenTableModelInput>>,
): DeepReadonly<Array<GenTableModelInput>> => {
    if (table.type != "SUPER_TABLE") {
        return []
    }

    const inheritMap = createInheritMap(otherTables)
    const allChildren = new Set(collectAllChildren(table.name, inheritMap))

    return otherTables.filter(it => it.name != table.name).filter(it => allChildren.has(it.name))
}

const createInheritMap = (tables: DeepReadonly<Array<GenTableModelInput>>): DeepReadonly<Map<string, string[]>> => {
    const inheritMap = new Map<string, string[]>
    for (let table of tables) {
        const {name, superTables} = table
        superTables.forEach(it => {
            const value = inheritMap.get(it.name)
            if (value != undefined) {
                value.push(name)
            } else {
                inheritMap.set(it.name, [name])
            }
        })
    }
    return inheritMap
}

const collectAllChildren = (
    root: DeepReadonly<string>,
    inheritMap: DeepReadonly<Map<string, string[]>>,
    visited: Set<string> = new Set
): string[] => {
    const result: string[] = []

    const children = inheritMap.get(root)
    if (!children) return []
    for (let child of children) {
        if (!visited.has(child)) {
            result.push(child)
            visited.add(child)

            result.push(...collectAllChildren(child, inheritMap, visited))
        }
    }

    return result
}
