import {defineStore} from "pinia";
import {ref} from "vue";

export const usePackageMenuStore =
    defineStore(
        'PackageMenu',
        () => {
            const dragType = ref<'Package' | 'Entity' | 'Enum' | undefined>()
            const dragId = ref<number | undefined>()
            const targetPackageId = ref<number | undefined>()

            return {
                dragType,
                dragId,
                targetPackageId
            }
        }
    )