import {Graph} from "@antv/x6";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useModelGraphClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";

const normalMoveStep = 40
const smallMoveStep = 10

export const bindGraphKeyEvent = (graph: Graph) => {
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

    const {copy, cut, paste} = useModelGraphClipBoard()
    graph.bindKey(["ctrl+c", "command+c"], async () => {
        await copy()
    })

    graph.bindKey(["ctrl+x", "command+x"], async () => {
        await cut()
    })

    graph.bindKey(["ctrl+v", "command+v"], async () => {
        await paste()
    })


    graph.bindKey(["up"], () => {
        graph.startBatch("up")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - normalMoveStep})
        })
        graph.stopBatch("up")
    })
    graph.bindKey(["ctrl+up"], () => {
        graph.startBatch("up")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - smallMoveStep})
        })
        graph.stopBatch("up")
    })

    graph.bindKey(["down"], () => {
        graph.startBatch("down")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + normalMoveStep})
        })
        graph.stopBatch("down")
    })
    graph.bindKey(["ctrl+down"], () => {
        graph.startBatch("down")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + smallMoveStep})
        })
        graph.stopBatch("down")
    })

    graph.bindKey(["left"], () => {
        graph.startBatch("left")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x - normalMoveStep, y: node.position().y})
        })
        graph.stopBatch("left")
    })
    graph.bindKey(["ctrl+left"], () => {
        graph.startBatch("left")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x - smallMoveStep, y: node.position().y})
        })
        graph.stopBatch("left")
    })

    graph.bindKey(["right"], () => {
        graph.startBatch("right")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x + normalMoveStep, y: node.position().y})
        })
        graph.stopBatch("right")
    })
    graph.bindKey(["ctrl+right"], () => {
        graph.startBatch("right")
        GRAPH.selectedNodeMap.forEach(node => {
            node.setPosition({x: node.position().x + smallMoveStep, y: node.position().y})
        })
        graph.stopBatch("right")
    })
}
