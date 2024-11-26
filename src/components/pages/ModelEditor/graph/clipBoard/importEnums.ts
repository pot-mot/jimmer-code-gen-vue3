import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

export const importEnums = (enums: Array<GenModelInput_TargetOf_enums>) => {
    const {MODEL} = useModelEditorStore()

    if (MODEL.isLoaded) {
        const model = MODEL._model()
        // 进行枚举重复校验并导入
        enums.forEach(genEnum => {
            const sameNameEnums = model.enums.filter(it => it.name === genEnum.name)
            if (sameNameEnums.length === 0) {
                model.enums.push(...enums)
            } else {
                // 如果只有一个重名且内容完全一样，则认为是同一枚举
                if (sameNameEnums.length === 1 && JSON.stringify(sameNameEnums[0]) === JSON.stringify(genEnum)) {
                } else {
                    sendI18nMessage(
                        {key: "VALIDATE_GenEnum_cannotBeDuplicate", args: [genEnum.name]},
                        'warning',
                        {allSameNameEnums: sameNameEnums, newEnum: genEnum},
                    )
                }
            }
        })
    } else {
        sendI18nMessage("MESSAGE_ModelEditorPage_modelLoadFail", 'error', {enums})
    }
}
