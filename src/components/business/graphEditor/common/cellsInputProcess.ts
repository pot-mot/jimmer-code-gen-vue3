import {Cell, Graph} from "@antv/x6";
import {tableIdToNodeId} from "@/components/pages/AssociationEditor/graph/tableNode.ts";

export type CellInput = Cell | string | number

export type CellProperty = Cell | string

export const processCell = (cell: CellInput): CellProperty => {
    if (typeof cell == 'number') {
        return tableIdToNodeId(cell)
    } else {
        return cell
    }
}

export const getFirst = (input: CellInput | CellInput[]): CellProperty | undefined => {
    if (Array.isArray(input)) {
        if (input.length > 0) {
            return processCell(input[0])
        }
    } else {
        return processCell(input)
    }
}

export const processCells = (cells: CellInput[]): CellProperty[] => {
    if (Array.isArray(cells)) {
        return cells.map(processCell)
    } else {
        return cells
    }
}

export const process = (input: CellInput | CellInput[]): CellProperty | CellProperty[] => {
    if (Array.isArray(input)) {
        return processCells(input);
    } else {
        return processCell(input);
    }
}

export const getCell = (graph: Graph, input: CellInput): Cell => {
    const temp = processCell(input)
    if (typeof temp == 'string') {
        return graph.getCellById(temp)
    } else {
        return temp
    }
}
