import {defineStore} from "pinia";
import {ref} from 'vue';
import {GenConfig} from "@/api/__generated/model/static";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";

export const useGenConfigContextStore = defineStore(
    "GenConfigContext",
    () => {
        const contextGenConfig = ref<GenConfig>(getDefaultModel())

        return {
            context: contextGenConfig
        }
    }
)
