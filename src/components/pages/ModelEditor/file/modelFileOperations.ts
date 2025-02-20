import {GenerateFile, GenModelView} from "@/api/__generated/model/static";
import JSZip from "jszip";
import {api} from "@/api";
import {saveAs} from "file-saver";
import {jsonPrettyFormat} from "@/utils/json.ts";
import {ModelInputWithEntities, validateModelInputWithEntities} from "@/shape/ModelInput.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {getModelAllCopyData} from "@/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts";
import {GenerateType} from "@/api/__generated/model/enums";
import {DeepReadonly} from "vue";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";

const createZip = async (files: DeepReadonly<Array<Pick<GenerateFile, 'path' | 'content'>>>): Promise<Blob> => {
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

export const getModelCodes = async (
    id: number,
    types: Array<GenerateType> = ['ALL'],
) => {
    return await api.generateService.generateModel({id, types})
}

export const importModelJSON = async (modelInputJsonStr: string): Promise<number | undefined> => {
    let validateErrors

    const modelInputJson = jsonParseThenConvertNullToUndefined(modelInputJsonStr)

    if (validateModelInputWithEntities(modelInputJson, e => validateErrors = e)) {
        const modelInput = modelInputJson as ModelInputWithEntities

        modelInput.id = undefined

        const savedModelId = await api.modelService.save({body: modelInput})

        try {
            await convertModel(savedModelId)

            if (modelInput.entities) {
                try {
                    await api.modelService.configEntities({id: savedModelId, body: modelInput.entities})
                } catch (e) {
                    sendI18nMessage('MESSAGE_modelFileOperations_importModelJson_entities_saveBusinessFail', 'error')
                }
            }
        } catch (e) {
            if (modelInput.entities) {
                sendI18nMessage('MESSAGE_modelFileOperations_importModelJson_convertModelFail_entities_businessWillNotBeSaved', 'error')
            } else {
                sendI18nMessage('MESSAGE_modelFileOperations_importModelJson_convertModelFail', 'error')
            }
        }

        return savedModelId
    } else {
        sendI18nMessage('MESSAGE_modelFileOperations_importModelJson_validateFail', 'error', validateErrors)
    }
}

const getModelJson = async (model: DeepReadonly<GenModelView>): Promise<DeepReadonly<ModelInputWithEntities>> => {
    const {id, ...other} = model

    const entities = await api.modelService.exportEntities({id})

    return {
        ...other,
        entities,
    }
}

export const exportModelJson = async (model: GenModelView) => {
    const modelJson = await getModelJson(model)

    const modelJsonBlob = new Blob(
        [jsonPrettyFormat(modelJson)],
        {type: "application/json"}
    )
    saveAs(modelJsonBlob, `model-[${model.name}].json`)
}

export const downloadZip = async (generateFiles: DeepReadonly<GenerateFile[]>) => {
    const file = await createZip(generateFiles)
    saveAs(file, `codes.zip`)
}

export const downloadFile = (file: GenerateFile) => {
    const fileBlob = new Blob(
        [file.content],
        {type: "application/octet-stream"}
    )
    saveAs(fileBlob, file.name)
}

export const downloadModelZip = async (
    model: GenModelView,
    types: Array<GenerateType> = ['ALL'],
) => {
    const {files: codeFiles} = await getModelCodes(model.id, types)
    const modelJson = await getModelJson(model)
    const copyData = getModelAllCopyData(model)

    const modelFiles = [
        {path: "model.json", content: jsonPrettyFormat(modelJson)},
        {path: "data.json", content: jsonPrettyFormat(copyData)}
    ]

    const file = await createZip([...modelFiles, ...codeFiles])
    saveAs(file, `model-[${model.name}].zip`)
}
