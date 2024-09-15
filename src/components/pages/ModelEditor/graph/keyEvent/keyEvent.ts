import {Graph} from "@antv/x6";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const normalMoveStep = 40
const smallMoveStep = 10

export const handleModelEditorKeyEvent = (graph: Graph) => {
    const {GRAPH, SELECT, REMOVE, HISTORY} = useModelEditorStore()

    graph.bindKey(["ctrl+z", "command+z"], () => HISTORY.undo())

    graph.bindKey(["ctrl+shift+z", "command+shift+z"], () => HISTORY.redo())

    graph.bindKey(["ctrl+a", "command+a"], (e) => {
        e.preventDefault()
        SELECT.selectAll()
    })

    graph.bindKey(["delete", "backspace"], (e) => {
        e.preventDefault()
        REMOVE.removeSelectedCells()
    })
    graph.bindKey(["shift+delete", "shift+backspace"], (e) => {
        e.preventDefault()
        REMOVE.removeSelectedEdges()
    })

    graph.bindKey(["up"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - normalMoveStep})
        })
    })
    graph.bindKey(["ctrl+up"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - smallMoveStep})
        })
    })

    graph.bindKey(["down"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + normalMoveStep})
        })
    })
    graph.bindKey(["ctrl+down"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + smallMoveStep})
        })
    })

    graph.bindKey(["left"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x - normalMoveStep, y: node.position().y})
        })
    })
    graph.bindKey(["ctrl+left"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x - smallMoveStep, y: node.position().y})
        })
    })

    graph.bindKey(["right"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x + normalMoveStep, y: node.position().y})
        })
    })
    graph.bindKey(["ctrl+right"], () => {
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x + smallMoveStep, y: node.position().y})
        })
    })
}
