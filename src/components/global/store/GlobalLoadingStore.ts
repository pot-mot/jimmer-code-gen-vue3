import {defineStore} from "pinia";
import {useLoading} from "../../../hooks/useLoading.ts";

export const useGlobalLoadingStore =
    defineStore(
        'globalLoading',
        () => {
            const globalLoading = useLoading()

            return {
                ...globalLoading
            }
        }
    )