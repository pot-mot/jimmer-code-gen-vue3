import {defineStore} from "pinia";
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";
import {ref} from "vue";
import {api} from "../../../api";

export const usePackageMenuStore =
    defineStore(
        'PackageMenu',
        () => {
            const dragType = ref< 'Package' | 'Entity' | 'Enum' | undefined>()
            const dragId = ref<number | undefined>()
            const targetPackageId = ref<number | undefined>()

            PackageMenuEventBus.on('dragStart', ({id, type}) => {
                dragType.value = type
                dragId.value = id
            })

            PackageMenuEventBus.on('dragEnd', async () => {
                console.log("dragEnd")

                if (dragId.value && dragType.value && targetPackageId.value) {
                    switch (dragType.value) {
                        case 'Package':
                            await api.packageService.movePackage({packageId: targetPackageId.value, id: dragId.value})
                            break
                        case 'Entity':
                            await api.packageService.moveEntity({packageId: targetPackageId.value, id: dragId.value})
                            break
                        case 'Enum':
                            await api.packageService.moveEnum({packageId: targetPackageId.value, id: dragId.value})
                            break
                    }

                    PackageMenuEventBus.emit('updatePackage', {packageId: targetPackageId.value, id: dragId.value, type: dragType.value})

                    dragType.value = undefined
                    dragId.value = undefined
                    targetPackageId.value = undefined
                }
            })

            return {
                dragType,
                dragId,
                targetPackageId
            }
        }
    )