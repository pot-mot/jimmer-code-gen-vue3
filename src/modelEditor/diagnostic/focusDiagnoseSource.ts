import mitt from "mitt";

export const modelSubSelectEventBus = mitt<{
    unselectAll: void
    selectEntityProperty: {
        readonly entityId: string
        readonly propertyId: string
    }
    selectMappedSuperClassProperty: {
        readonly mappedSuperClassId: string
        readonly propertyId: string
    }
    selectEmbeddableTypeProperty: {
        readonly embeddableTypeId: string
        readonly propertyId: string
    }
    selectEnumerationItem: {
        readonly enumerationId: string
        readonly itemId: string
    }
    selectMappedProperty: {
        readonly associationId: string
    }
}>()