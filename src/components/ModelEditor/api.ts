import {api} from "../../api";
import {GenModelInput} from "../../api/__generated/model/static";

export const saveModel = async (model: GenModelInput) => {
    await api.modelService.save({
        body: {
            ...model,
        }
    })
}