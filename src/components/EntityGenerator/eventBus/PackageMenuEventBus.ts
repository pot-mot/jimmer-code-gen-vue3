import mitt from 'mitt'

type PackageMenuEvents = {
    dragStart: {id: number, type: 'Package' | 'Entity' | 'Enum'},
    dragEnd: undefined,
    updatePackage: {packageId: number, id: number, type: 'Package' | 'Entity' | 'Enum'},
    createPackage: {path: string, parentId?: number},
    deletePackage: {id: number},
}

export const PackageMenuEventBus = mitt<PackageMenuEvents>()