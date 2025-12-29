export const getAssociationView = (association: Association | AssociationIdOnly | undefined): string => {
    if (!association) return "[NOT EXISTED]"
    if ("name" in association) {
        return association.name
    } else {
        return association.nameTemplate
    }
}