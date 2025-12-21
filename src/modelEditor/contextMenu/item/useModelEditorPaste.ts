import {onMounted, ref} from "vue";
import {readText} from "clipboard-polyfill";
import {json5Parse} from "@/utils/json/jsonParse.ts";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

export const overrideGroupProducer = (getGroupId: () => string | undefined) => {
    return (data: Partial<ModelGraphSubData>) => {
        const groupId = getGroupId()
        if (groupId === undefined) return
        data.groups = undefined
        data.entities?.map(entity => {entity.data.groupId = groupId})
        data.mappedSuperClasses?.map(entity => {entity.data.groupId = groupId})
        data.embeddableTypes?.map(embeddableType => {embeddableType.data.groupId = groupId})
        data.enumerations?.map(enumeration => {enumeration.data.groupId = groupId})
    }
}

export const useModelEditorPaste = (
    producer?: (data: Partial<ModelGraphSubData>) => void
) => {
    const canPaste = ref(false)
    let validateData: Partial<ModelGraphSubData> | undefined = undefined

    const calcCanPaste = async () => {
        try {
            const text = await readText()
            const json = json5Parse(text)
            canPaste.value = validatePartialModelGraphSubData(json)
            if (canPaste.value) {
                validateData = json
            }
        } catch (e) {
            console.warn(e)
            canPaste.value = false
        }
    }

    onMounted(async () => {
        await calcCanPaste()
    })

    const handlePaste = async () => {
        if (validateData === undefined) return
        producer?.(validateData)
        await useModelEditor().paste(validateData)
        close()
    }

    return {
        canPaste,
        validateData,
        calcCanPaste,
        handlePaste,
    }
}