import {AssociationType, AssociationType_CONSTANTS} from "@/api/__generated/model/enums";

export const AssociationPart_CONSTANTS = ["SOURCE", "TARGET"] as const;
export type AssociationPart = typeof AssociationPart_CONSTANTS[number]
export const SingleAssociationType_CONSTANTS = ['ONE', 'MANY'] as const;
export type SingleAssociationType = typeof SingleAssociationType_CONSTANTS[number]

export interface AssociationPair {
    source: SingleAssociationType,
    target: SingleAssociationType,
}

export const getAssociationSourceType = (associationType: AssociationType): SingleAssociationType => {
    if ( associationType == "ONE_TO_ONE" || associationType == "ONE_TO_MANY") {
        return "ONE"
    } else {
        return "MANY"
    }
}

export const getAssociationTargetType = (associationType: AssociationType): SingleAssociationType => {
    if (associationType == "ONE_TO_ONE" || associationType == "MANY_TO_ONE") {
        return "ONE"
    } else {
        return "MANY"
    }
}

export const reverseSingleAssociationType = (singleAssociationType: SingleAssociationType): SingleAssociationType => {
    if (singleAssociationType == "MANY") {
        return "ONE"
    } else {
        return "MANY"
    }
}

export const associationTypeToPair = (associationType: AssociationType): AssociationPair => {
    return {
        source: getAssociationSourceType(associationType),
        target: getAssociationTargetType(associationType)
    }
}

export const associationPairToType = (associationPair: AssociationPair): AssociationType => {
    return associationPair.source + "_TO_" + associationPair.target as AssociationType
}

export const reverseSinglePartAssociationType = (
    associationType: AssociationType,
    part: AssociationPart
): AssociationType => {
    let {source, target} = associationTypeToPair(associationType)
    if (part == "SOURCE") {
        source = reverseSingleAssociationType(source)
    } else if (part == "TARGET") {
        target = reverseSingleAssociationType(target)
    }
    return associationPairToType({source, target})
}

export const reverseAssociationType = (associationType: AssociationType): AssociationType => {
    if (associationType == "MANY_TO_ONE") {
        return "ONE_TO_MANY"
    } else if (associationType == "ONE_TO_MANY") {
        return "MANY_TO_ONE"
    }
    return associationType
}


export const toggleAssociationType = (associationType: AssociationType | undefined): AssociationType => {
    for (let i = 0; i < AssociationType_CONSTANTS.length; i++) {
        if (associationType == AssociationType_CONSTANTS[i]) {
            return AssociationType_CONSTANTS[i + 1 < AssociationType_CONSTANTS.length ? i + 1 : 0]
        }
    }

    return AssociationType_CONSTANTS[0]
}
