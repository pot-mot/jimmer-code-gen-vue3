export const getPropertyView = (property: Property | undefined): string => {
    if (!property) return "[NOT EXISTED]"
    if ("name" in property) {
        return property.name
    } else {
        return property.nameTemplate
    }
}
