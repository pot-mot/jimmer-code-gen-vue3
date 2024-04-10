import {Cell, Graph} from "@antv/x6";

export type CellProperty = Cell | string

export const getFirst = (input: CellProperty | CellProperty[]): CellProperty | undefined => {
    if (Array.isArray(input)) {
        if (input.length > 0) {
            return input[0]
        }
    } else {
        return input
    }
}

export const getCell = (graph: Graph, input: CellProperty): Cell => {
    if (typeof input === 'string') {
        return graph.getCellById(input)
    } else {
        return input
    }
}
