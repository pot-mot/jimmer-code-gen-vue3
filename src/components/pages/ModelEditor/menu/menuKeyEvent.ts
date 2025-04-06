import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useModelClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";

const {REMOVE, HISTORY, SELECT} = useModelEditorStore()

const {copy, cut, paste} = useModelClipBoard()

export const handleMenuKeyEvent = async (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
            if (e.shiftKey) {
                HISTORY.redo()
            } else {
                HISTORY.undo()
            }
        } else if (e.key === "c") {
            await copy()
        } else if (e.key === "x") {
            await cut()
        } else if (e.key === "v") {
            await paste()
        } else if (e.key === "a") {
            e.preventDefault()
            SELECT.selectAll()
        }
    }

    if (e.key === "Delete") {
        e.preventDefault()
        REMOVE.removeSelectedCells()
    }
}