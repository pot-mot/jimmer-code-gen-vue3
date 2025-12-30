import {computed, type ComputedRef} from "vue";
import type {JsonSchemaKey} from "@/type/__generated/jsonSchema";

export const usePropertyJsonType = (propertyGetter: () => Property): ComputedRef<JsonSchemaKey> => {
    return computed(() => {
        switch (propertyGetter().category) {
            case "ID_COMMON": return "IdCommonProperty"
            case "ID_EMBEDDABLE": return "IdEmbeddableProperty"
            case "VERSION": return "VersionProperty"
            case "SCALAR_COMMON": return "ScalarCommonProperty"
            case "SCALAR_ENUM": return "ScalarEnumProperty"
            case "SCALAR_EMBEDDABLE": return "ScalarEmbeddableProperty"
            case "OneToOne_Source": return "OneToOneSourceProperty"
            case "OneToOne_Mapped": return "OneToOneMappedProperty"
            case "OneToOne_Mapped_Abstract": return "OneToOneMappedAbstractProperty"
            case "ManyToOne": return "ManyToOneProperty"
            case "OneToMany": return "OneToManyProperty"
            case "OneToMany_Abstract": return "OneToManyAbstractProperty"
            case "ManyToMany_Source": return "ManyToManySourceProperty"
            case "ManyToMany_Mapped": return "ManyToManyMappedProperty"
            case "ManyToMany_Mapped_Abstract": return "ManyToManyMappedAbstractProperty"
            case "ManyToMany_View": return "ManyToManyViewProperty"
            case "FORMULA_GETTER": return "GetterFormulaProperty"
            case "FORMULA_SQL": return "SqlFormulaProperty"
            case "TRANSIENT": return "TransientProperty"
        }
    })
}