import {GenerateFile, GenModelView} from "@/api/__generated/model/static";
import JSZip from "jszip";
import {api} from "@/api";
import {saveAs} from "file-saver";
import {jsonPrettyFormat, jsonStrPrettyFormat} from "@/utils/json.ts";
import {validateModelInputStr} from "@/shape/ModelInput.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {getModelAllCopyData} from "@/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts";
import {GenerateType, ViewType} from "@/api/__generated/model/enums";

const createZip = async (files: Array<Pick<GenerateFile, 'path' | 'content'>>): Promise<Blob> => {
    const zip = new JSZip()

    const nameCountMap = new Map<string, number>

    files.forEach(it => {
        if (nameCountMap.has(it.path)) {
            const count = nameCountMap.get(it.path)!
            nameCountMap.set(it.path, count + 1)
            zip.file(`${it.path}(${count})`, it.content)
        } else {
            nameCountMap.set(it.path, 1)
            zip.file(it.path, it.content)
        }
    })

    return await zip.generateAsync({type: "blob"})
}

export const convertModel = async (id: number) => {
    return await api.convertService.convertModel({id})
}

export const previewModelCode = async (
    id: number,
    types: Array<GenerateType> = ['ALL'],
    viewType: ViewType = 'VUE3_ELEMENT_PLUS'
) => {
    return await api.generateService.generateModel({id, types, viewType})
}

export const downloadModelCode = async (
    model: GenModelView,
    types: Array<GenerateType> = ['ALL'],
    viewType: ViewType = 'VUE3_ELEMENT_PLUS'
) => {
    const res = await api.generateService.generateModel({id: model.id, types, viewType})
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

export const downloadModelZip = async (
    model: GenModelView,
    viewType: ViewType = 'VUE3_ELEMENT_PLUS'
) => {
    const codes = await api.generateService.generateModel({id: model.id, types: ['ALL'], viewType})

    const copyData = getModelAllCopyData(model)

    const {id, ...other} = model
    const modelFiles = [
        {path: "model/model.json", content: jsonPrettyFormat(other)},
        {path: "model/graph-data.json", content: jsonStrPrettyFormat(model.graphData)},
        {path: "model/pure-data.json", content: jsonPrettyFormat(copyData)}
    ]

    const file = await createZip([...modelFiles, ...codes])
    saveAs(file, `model-[${model.name}].zip`)
}
