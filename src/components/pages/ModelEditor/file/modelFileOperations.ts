import {GenModelView, Pair} from "@/api/__generated/model/static";
import JSZip from "jszip";
import {api} from "@/api";
import {saveAs} from "file-saver";
import {jsonPrettyFormat, jsonStrPrettyFormat} from "@/utils/json.ts";
import {validateModelInputStr} from "@/shape/ModelInput.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {getModelAllCopyData} from "@/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts";

const createZip = async (files: Array<Pair<string, string>>): Promise<Blob> => {
    const zip = new JSZip()

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

export const convertModel = async (id: number) => {
    return await api.convertService.convertModel({id})
}

export const previewModelSql = async (id: number) => {
    return await api.generateService.generateModelSql({id})
}

export const previewModelEntity = async (id: number) => {
    return await api.generateService.generateModelEntity({id})
}

export const downloadModelEntity = async (model: GenModelView) => {
    const res = await api.generateService.generateModelEntity({id: model.id, withPath: true})
    const file = await createZip(res)
    saveAs(file, `[${model.name}]-entities.zip`)
}

export const downloadModelSql = async (model: GenModelView) => {
    const res = await api.generateService.generateModelSql({id: model.id})
    const file = await createZip(res)
    saveAs(file, `[${model.name}]-tables.zip`)
}


export const importModelJSON = async (modelInputJsonStr: string): Promise<number | undefined> => {
    let validateErrors
    if (validateModelInputStr(modelInputJsonStr, e => validateErrors = e)) {
        const modelInput = JSON.parse(modelInputJsonStr)
        modelInput.id = undefined
        return await api.modelService.save({body: modelInput})
    } else {
        sendI18nMessage('MESSAGE_modelFileOperations_importModel_validateFail', 'error', validateErrors)
    }
}

export const exportModelJson = async (model: GenModelView) => {
    const {id, ...other} = model
    const modelJsonBlob = new Blob(
        [jsonPrettyFormat(other)],
        {type: "application/json"}
    )
    saveAs(modelJsonBlob, `model-[${model.name}].json`)
}

export const downloadModelZip = async (model: GenModelView) => {
    let entityCodes = await api.generateService.generateModelEntity({id: model.id, withPath: true})
    entityCodes = entityCodes.map(({first, second}) => {
        return {first: `${model.language.toLowerCase()}/${first}`, second}
    })

    let sqlFiles = await api.generateService.generateModelSql({id: model.id})
    sqlFiles = sqlFiles.map(({first, second}) => {
        return {first: `${model.dataSourceType.toLowerCase()}/${first}`, second}
    })

    const copyData = getModelAllCopyData(model)

    const {id, ...other} = model
    const modelFiles = [
        {first: "model/model.json", second: jsonPrettyFormat(other)},
        {first: "model/graph-data.json", second: jsonStrPrettyFormat(model.graphData)},
        {first: "model/pure-data.json", second: jsonPrettyFormat(copyData)}
    ]

    const file = await createZip([...modelFiles, ...entityCodes, ...sqlFiles])
    saveAs(file, `model-[${model.name}].zip`)
}
