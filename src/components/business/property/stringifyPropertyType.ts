import type {GenEntityDetailView_TargetOf_properties} from "@/api/__generated/model/static";

export const stringifyPropertyType = (property: GenEntityDetailView_TargetOf_properties): string => {
    let rawType = property.type
    if (property.enum !== undefined) {
        rawType = property.enum.name
    }
    if (property.typeEntity !== undefined) {
        rawType = property.typeEntity.name
    }

    if (property.listType) {
        return `List<${rawType}>`
    } else if (!property.typeNotNull) {
        return `${rawType}?`
    } else {
        return rawType
    }
}