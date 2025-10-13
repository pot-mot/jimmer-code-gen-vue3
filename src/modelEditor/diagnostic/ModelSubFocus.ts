import mitt from "mitt";

export const modelSubFocusEventBus = mitt<{
    focusEntityProperty: {
        readonly entityId: string
        readonly propertyId: string
    }
    focusMappedSuperClassProperty: {
        readonly mappedSuperClassId: string
        readonly propertyId: string
    }
    focusEmbeddableTypeProperty: {
        readonly embeddableTypeId: string
        readonly propertyId: string
    }
    focusEnumerationItem: {
        readonly enumerationId: string
        readonly itemId: string
    }
    focusMappedProperty: {
        readonly associationId: string
    }
}>()