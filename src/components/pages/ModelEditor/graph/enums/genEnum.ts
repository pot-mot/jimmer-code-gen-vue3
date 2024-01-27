import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {sendMessage} from "@/message/message.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

export const importEnums = (enums: Array<GenModelInput_TargetOf_enums>) => {
    const store = useModelEditorStore()

    if (store.isModelLoaded) {
        // 进行枚举重复校验并导入
        enums.forEach(genEnum => {
            const sameNameEnums = store._currentModel().enums.filter(it => it.name == genEnum.name)
            if (sameNameEnums.length == 0) {
                store._currentModel().enums.push(...enums)
            } else {
                // 如果只有一个重名且内容完全一样，则无所谓
                if (sameNameEnums.length == 1 && JSON.stringify(sameNameEnums[0]) == JSON.stringify(genEnum)) {
                } else {
                    sendMessage(`枚举【${genEnum.name}】已存在`, 'warning',
                        {
                            existedEnum: sameNameEnums, newEnum: genEnum
                        })
                }
            }
        })
    } else {
        sendMessage('model 尚未加载，无法导入枚举', 'error', {enums})
    }
}
