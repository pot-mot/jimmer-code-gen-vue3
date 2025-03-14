import {defineStore} from "pinia";
import {DeepReadonly, ref} from 'vue';
import {GenConfig} from "@/api/__generated/model/static";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {cloneDeep} from "lodash";

export const useGenConfigContextStore = defineStore(
    "ContextGenConfig",
    () => {
        const context = ref<GenConfig>(getDefaultModel())

        const merge = (properties: DeepReadonly<Partial<GenConfig>>) => {
            for (const key of Object.keys(properties)) {
                if (key in context.value) {
                    (context.value as any)[key] = cloneDeep((properties  as any)[key])
                }
            }
        }

        return {
            context,
            merge,
        }
    }
)
