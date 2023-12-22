import {api} from "@/api";
import {saveAs} from "file-saver";

export const convertEntities = async (tableIds: number[]) => {
    return await api.generateService.convert({body: tableIds})
}

export const previewEntities = async (entityIds: number[]) => {
    return await api.generateService.preview({entityIds})
}

export const generateEntities = async (entityIds: number[]) => {
    const res = (await api.generateService.generate({body: entityIds})) as any as Blob
    const file = new File([res], "entities.zip")
    saveAs(file)
}
