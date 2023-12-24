import {defineStore} from "pinia";
import {DataSourceType, GenLanguage} from "@/api/__generated/model/enums";
import {ref} from "vue";

export const useGenContextStore = defineStore(
    "GenContext",
    () => {
        const dataSourceType = ref<DataSourceType>("MySQL")

        const language = ref<GenLanguage>("JAVA")

        return {
            dataSourceType,
            language
        }
    }
)
