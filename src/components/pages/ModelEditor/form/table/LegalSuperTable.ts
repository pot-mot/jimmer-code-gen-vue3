import {GenTableModelInput} from "@/api/__generated/model/static";

// 获取合法的 superTable 的名称列表
export const getLegalSuperTables = (
    table: GenTableModelInput,
    superTables: GenTableModelInput[],
): GenTableModelInput[] => {
    if (table.type != "SUPER_TABLE") {
        return superTables
    }

    const inheritMap = createInheritMap(superTables)
    const allChildren = collectAllChildren(table.name, inheritMap)

    return superTables.filter(it => it.name != table.name).filter(it => !allChildren.includes(it.name))
}

const createInheritMap = (tables: GenTableModelInput[]): Map<string, string[]> => {
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

const collectAllChildren = (root: string, inheritMap: Map<string, string[]>, visited: Set<string> = new Set): string[] => {
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
