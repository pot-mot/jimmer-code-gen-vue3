import type {GenEntityConfigView_TargetOf_properties} from "@/api/__generated/model/static";

export const stringifyPropertyType = (property: GenEntityConfigView_TargetOf_properties): string => {
    let rawType = property.type
    if (property.enumName !== undefined) {
        rawType = property.enumName
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