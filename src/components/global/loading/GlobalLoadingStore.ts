import {defineStore} from "pinia";
import {useLoading} from "@/utils/useLoading.ts";

export const useGlobalLoadingStore =
    defineStore(
        'globalLoading',
        () => {
            return useLoading('')
        }
    )
