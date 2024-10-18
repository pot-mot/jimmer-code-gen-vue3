import {GenModelView, Pair} from "@/api/__generated/model/static";
import JSZip from "jszip";
import {api} from "@/api";
import {saveAs} from "file-saver";
import {jsonPrettyFormat, jsonStrPrettyFormat} from "@/utils/json.ts";
import {validateModelInputStr} from "@/shape/ModelInput.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {getModelAllCopyData} from "@/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts";
import {GenerateType} from "@/api/__generated/model/enums";

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

export const previewModelCode = async (id: number, types: Array<GenerateType> = ['ALL']) => {
    return await api.generateService.generateModel({id, types})
}

export const downloadModelCode = async (model: GenModelView, types: Array<GenerateType> = ['ALL']) => {
    const res = await api.generateService.generateModel({id: model.id, types})
    const file = await createZip(res)
    saveAs(file, `[${model.name}]-entities.zip`)
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
    const codes = await api.generateService.generateModel({id: model.id, types: ['ALL']})

    const copyData = getModelAllCopyData(model)

    const {id, ...other} = model
    const modelFiles = [
        {first: "model/model.json", second: jsonPrettyFormat(other)},
        {first: "model/graph-data.json", second: jsonStrPrettyFormat(model.graphData)},
        {first: "model/pure-data.json", second: jsonPrettyFormat(copyData)}
    ]

    const file = await createZip([...modelFiles, ...codes])
    saveAs(file, `model-[${model.name}].zip`)
}
