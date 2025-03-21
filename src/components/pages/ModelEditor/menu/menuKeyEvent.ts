import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useModelMenuClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";

export const handleMenuKeyEvent = async (e: KeyboardEvent) => {
    const {REMOVE, HISTORY} = useModelEditorStore()

    if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
            if (e.shiftKey) {
                HISTORY.redo()
            } else {
                HISTORY.undo()
            }
        }
    }

    if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        if (e.shiftKey) {
            REMOVE.removeSelectedEdges()
        } else {
            REMOVE.removeSelectedCells()
        }
    }

    const {copy, cut, paste} = useModelMenuClipBoard()
    if (e.ctrlKey || e.metaKey) {
        if (e.key === "c") {
            await copy()
        } else if (e.key === "x") {
            await cut()
        } else if (e.key === "v") {
            await paste()
        }
    }
}