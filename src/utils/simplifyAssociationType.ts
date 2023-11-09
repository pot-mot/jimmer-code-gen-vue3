import {AssociationType} from "../api/__generated/model/enums";

export type simpleAssociationTypeLabel = "1:1" | "N:1" | "1:N" | "N:M"

export const mapAssociationTypeToSimpleLabel = (associationType: AssociationType): simpleAssociationTypeLabel => {
    switch (associationType) {
        case "MANY_TO_MANY":
            return "N:M"
        case "MANY_TO_ONE":
            return "N:1"
        case "ONE_TO_MANY":
            return "1:N"
        case "ONE_TO_ONE":
            return "1:1"
    }
}

export const mapSimpleLabelToAssociation = (simpleLabel: simpleAssociationTypeLabel): AssociationType => {
    switch (simpleLabel) {
        case "N:M":
            return "MANY_TO_MANY"
        case "N:1":
            return "MANY_TO_ONE"
        case "1:N":
            return "ONE_TO_MANY"
        case "1:1":
            return "ONE_TO_ONE"
    }
}

export const showAssociationType = (associationType: AssociationType): string => {
    return ` --[${mapAssociationTypeToSimpleLabel(associationType)}]--> `
}