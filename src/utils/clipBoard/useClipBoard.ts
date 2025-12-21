import {type SchemaValidator} from "@/utils/type/typeGuard.ts";
import {type LazyData, lazyDataParse} from "@/utils/type/lazyDataParse.ts";
import {readText, writeText} from "clipboard-polyfill"
import {json5Parse} from "@/utils/json/jsonParse.ts";

export type ClipBoardTarget<INPUT, EXPORT> = {
    importData: (data: INPUT) => void | Promise<void>,
    exportData: LazyData<EXPORT>,
    removeData: (data: EXPORT) => void | Promise<void>,
    validateInput: SchemaValidator<INPUT>,
    stringifyData: (data: EXPORT) => string
}

export const useClipBoard = <INPUT, EXPORT>(target: ClipBoardTarget<INPUT, EXPORT>) => {
    const copy = async (lazyExport: LazyData<EXPORT> = target.exportData): Promise<EXPORT> => {
        const data = await lazyDataParse(lazyExport)
        await writeText(target.stringifyData(data))
        return data
    }

    const cut = async (lazyExport: LazyData<EXPORT> = target.exportData): Promise<EXPORT> => {
        const data = await lazyDataParse(lazyExport)
        await writeText(target.stringifyData(data))
        await target.removeData(data)
        return data
    }

    const paste = async (lazyInput?: LazyData<INPUT>): Promise<INPUT | undefined> => {
        let data
        if (lazyInput !== undefined) {
            data = await lazyDataParse(lazyInput)
        } else {
            const text = await readText()
            data = json5Parse(text)
        }
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
