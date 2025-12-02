import {type SchemaValidator} from "@/utils/type/typeGuard.ts";
import {type LazyData, lazyDataParse} from "@/utils/type/lazyDataParse.ts";
import {readText, writeText} from "clipboard-polyfill"

export type ClipBoardTarget<INPUT, OUTPUT> = {
    importData: (data: INPUT) => void | Promise<void>,
    exportData: LazyData<OUTPUT>,
    removeData: (data: OUTPUT) => void | Promise<void>,
    validateInput: SchemaValidator<INPUT>,
    stringifyData: (data: OUTPUT) => string
}

export const useClipBoard = <INPUT, OUTPUT>(target: ClipBoardTarget<INPUT, OUTPUT>) => {
    const copy = async (lazyData: LazyData<OUTPUT> = target.exportData): Promise<OUTPUT> => {
        const data = await lazyDataParse(lazyData)
        await writeText(target.stringifyData(data))
        return data
    }

    const cut = async (lazyData: LazyData<OUTPUT> = target.exportData): Promise<OUTPUT> => {
        const data = await lazyDataParse(lazyData)
        await writeText(target.stringifyData(data))
        await target.removeData(data)
        return data
    }

    const paste = async (): Promise<INPUT | string | undefined> => {
        const text = await readText()
        const data = JSON.parse(text)
        let errors: any
        if (target.validateInput(data, e => errors = e)) {
            await target.importData(data)
            return data
        } else {
            throw errors
        }
    }

    return {
        copy,
        cut,
        paste,
    }
}
