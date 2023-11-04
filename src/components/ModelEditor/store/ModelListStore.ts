import {defineStore} from "pinia";
import {ref} from "vue";
import {GenModelInput} from "../../../api/__generated/model/static";

export const useModelListStore =
    defineStore(
        'ModelListGraph',
        () => {
            const currentModel = ref<GenModelInput>()

            const isNew = ref(false)

            return {
                currentModel,
                isNew,
            }
        }
    )