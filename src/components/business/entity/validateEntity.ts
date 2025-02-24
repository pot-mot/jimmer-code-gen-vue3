import {
    EntityConfigInput, EntityConfigView,
    GenEntityConfigInput,
    GenEntityConfigInput_TargetOf_properties,
    GenPropertyConfigInput
} from "@/api/__generated/model/static";
import {MainLocaleKeyParam} from "@/i18n";
import {DeepReadonly} from "vue";

const validateEntityAnnotation = (entity: DeepReadonly<GenEntityConfigInput>) => {
    const messageList: MainLocaleKeyParam[] = []

    const otherAnnotation = entity.otherAnnotation

    if (otherAnnotation !== undefined) {
        const entityOtherAnnotationImportSet = new Set<string>()
        for (const importLine of otherAnnotation.imports) {
            if (importLine.length === 0) {
                messageList.push({key: "VALIDATE_Entity_otherAnnotation_importLineCannotBeEmpty", args: [entity.name]})
                continue
            }

            if (entityOtherAnnotationImportSet.has(importLine)) {
                messageList.push({key: "VALIDATE_Entity_otherAnnotation_importLineCannotBeDuplicate", args: [entity.name, importLine]})
            } else {
                entityOtherAnnotationImportSet.add(importLine)
            }
        }

        const entityOtherAnnotationsSet = new Set<string>()
        for (const annotation of otherAnnotation.annotations) {
            if (annotation.length === 0) {
                messageList.push({key: "VALIDATE_Entity_otherAnnotation_annotationCannotBeEmpty", args: [entity.name]})
                continue
            }

            if (entityOtherAnnotationsSet.has(annotation)) {
                messageList.push({key: "VALIDATE_Entity_otherAnnotation_annotationCannotBeDuplicate", args: [entity.name, annotation]})
            } else {
                entityOtherAnnotationsSet.add(annotation)
            }
        }
    }

    return messageList
}

const validatePropertyAnnotation = (property: DeepReadonly<GenEntityConfigInput_TargetOf_properties | GenPropertyConfigInput>) => {
    const messageList: MainLocaleKeyParam[] = []


    for (const it of [
        "generatedIdAnnotation" in property ? property["generatedIdAnnotation"] : undefined,
        "logicalDeletedAnnotation" in property ? property["logicalDeletedAnnotation"] : undefined,
        property.otherAnnotation
    ]) {
        if (it === undefined) continue

        const propertyOtherAnnotationImportSet = new Set<string>()
        for (const importLine of it.imports) {
            if (importLine.length === 0) {
                messageList.push({key: "VALIDATE_Entity_propertyAnnotation_importLineCannotBeEmpty", args: [property.name]})
                continue
            }

            if (propertyOtherAnnotationImportSet.has(importLine)) {
                messageList.push({key: "VALIDATE_Entity_propertyAnnotation_importLineCannotBeDuplicate", args: [property.name, importLine]})
            } else {
                propertyOtherAnnotationImportSet.add(importLine)
            }
        }

        const propertyOtherAnnotationsSet = new Set<string>()
        for (const annotation of it.annotations) {
            if (annotation.length === 0) {
                messageList.push({key: "VALIDATE_Entity_propertyAnnotation_annotationCannotBeEmpty", args: [property.name]})
                continue
            }

            if (propertyOtherAnnotationsSet.has(annotation)) {
                messageList.push({key: "VALIDATE_Entity_propertyAnnotation_annotationCannotBeDuplicate", args: [property.name, annotation]})
            } else {
                propertyOtherAnnotationsSet.add(annotation)
            }
        }
    }

    return messageList
}

const validatePropertyBody = (property: DeepReadonly<GenPropertyConfigInput>) => {
    const messageList: MainLocaleKeyParam[] = []

    const body = property.body

    if (body !== undefined) {
        const propertyOtherAnnotationImportSet = new Set<string>()
        for (const importLine of body.imports) {
            if (importLine.length === 0) {
                messageList.push({key: "VALIDATE_Entity_propertyBody_importLineCannotBeEmpty", args: [property.name]})
                continue
            }

            if (propertyOtherAnnotationImportSet.has(importLine)) {
                messageList.push({key: "VALIDATE_Entity_propertyBody_importLineCannotBeDuplicate", args: [property.name, importLine]})
            } else {
                propertyOtherAnnotationImportSet.add(importLine)
            }
        }
    }

    return messageList
}

export const validateEntity = (
    input: DeepReadonly<EntityConfigInput>,
    otherEntities: DeepReadonly<Array<EntityConfigView>>,
): MainLocaleKeyParam[] => {
    const entity = input.tableConvertedEntity

    const messageList: MainLocaleKeyParam[] = []

    if (entity.name.length === 0) {
        messageList.push("VALIDATE_Entity_nameCannotBeEmpty")
    }

    for (const otherEntity of otherEntities) {
        if (otherEntity.tableConvertedEntity.name === entity.name) {
            messageList.push({key: "VALIDATE_Entity_nameCannotBeDuplicate", args: [entity.name]})
            break
        }
    }

    messageList.push(...validateEntityAnnotation(entity))

    const propertyNameSet = new Set<string>()
    const allProperties: DeepReadonly<Array<GenEntityConfigInput_TargetOf_properties | GenPropertyConfigInput>> = [
        ...entity.properties,
        ...input.notConvertedProperties,
    ]

    for (const property of allProperties) {
        if (!property.name || property.name.length === 0) {
            messageList.push("VALIDATE_Entity_propertyNameCannotBeEmpty")
            break
        }
    }

    for (const property of allProperties) {
        if (propertyNameSet.has(property.name)) {
            messageList.push({key: "VALIDATE_Entity_propertyNameCannotBeDuplicate", args: [property.name]})
        } else {
            propertyNameSet.add(property.name)
        }

        messageList.push(...validatePropertyAnnotation(property))
    }

    for (const property of input.notConvertedProperties) {
        if (!property.type || property.type.length === 0) {
            messageList.push({key: "VALIDATE_Entity_propertyTypeCannotBeEmpty", args: [property.name]})
        }

        messageList.push(...validatePropertyBody(property))
    }

    return messageList
}
