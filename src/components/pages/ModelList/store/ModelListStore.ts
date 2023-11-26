import {defineStore} from "pinia";
import {ref} from "vue";
import {GenModelView} from "@/api/__generated/model/static";

export const useModelListStore =
    defineStore(
        'ModelList',
        () => {
            const currentModel = ref<GenModelView>()

            const isNew = ref(false)

            return {
                currentModel,
                isNew,
            }
        }
    )