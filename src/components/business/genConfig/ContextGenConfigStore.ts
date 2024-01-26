import {defineStore} from "pinia";
import {ref} from 'vue';
import {GenConfig} from "@/api/__generated/model/static";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";

export const useGenConfigContextStore = defineStore(
    "ContextGenConfig",
    () => {
        const context = ref<GenConfig>(getDefaultModel())

        const merge = (properties: Partial<GenConfig>) => {
            for (let key of Object.keys(properties)) {
                (context.value as any)[key] = (properties as any)[key]
            }
        }

        return {
            context,
            merge,
        }
    }
)
