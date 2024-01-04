import {GenModelView, Pair} from "@/api/__generated/model/static";
import * as JSZip from "jszip";
import {api} from "@/api";
import {saveAs} from "file-saver";
import {jsonFormat, jsonStrFormat} from "@/utils/json.ts";
import {validateModelInputStr} from "@/shape/ModelInput.ts";

const createZip = async (files: Array<Pair<string, string>>): Promise<Blob> => {
    const zip = new JSZip

    const nameCountMap = new Map<string, number>

    files.forEach(it => {
        if (nameCountMap.has(it.first)) {
            const count = nameCountMap.get(it.first)!
            nameCountMap.set(it.first, count + 1)
            zip.file(`${it.first}(${count})`, it.second)
        } else {
            nameCountMap.set(it.first, 1)
            zip.file(it.first, it.second)
        }
    })

    return await zip.generateAsync({type: "blob"})
}

export const previewModelSql = async (id: number) => {
    return await api.previewService.previewModelSql({id})
}

export const previewModelEntity = async (id: number) => {
    return await api.previewService.previewModelEntity({id})
}

export const downloadModelEntity = async (model: GenModelView) => {
    const res = await api.previewService.previewModelEntity({id: model.id, withPath: true})
    const file = await createZip(res)
    saveAs(file, `[${model.name}]-entities.zip`)
}

export const downloadModelSql = async (model: GenModelView) => {
    const res = await api.previewService.previewModelSql({id: model.id})
    const file = await createZip(res)
    saveAs(file, `[${model.name}]-tables.zip`)
}


export const importModel = async (modelInputJsonStr: string) => {
    if (validateModelInputStr(modelInputJsonStr)) {
        const modelInput = JSON.parse(modelInputJsonStr)
        modelInput.id = undefined
        return await api.modelService.save({body: modelInput})
    }

    return undefined
}

export const exportModel = async (model: GenModelView) => {
    const modelJsonBlob = new Blob(
        [jsonFormat(model)],
        {type: "application/json"}
    )
    saveAs(modelJsonBlob, 'model.json')
}

export const downloadModel = async (model: GenModelView) => {
    let entityCodes = await api.previewService.previewModelEntity({id: model.id, withPath: true})
    entityCodes = entityCodes.map(({first, second}) => {
        return {first: `${model.language.toLowerCase()}/${first}`, second}
    })

    let sqlFiles = await api.previewService.previewModelSql({id: model.id})
    sqlFiles = sqlFiles.map(({first, second}) => {
        return {first: `${model.dataSourceType.toLowerCase()}/${first}`, second}
    })

    const modelFiles = [
        {first: "model/model.json", second: jsonFormat(model)},
        {first: "model/graphData.json", second: jsonStrFormat(model.graphData)}
    ]

    const file = await createZip([...modelFiles, ...entityCodes, ...sqlFiles])
    saveAs(file, `[${model.name}]-model.zip`)
}
