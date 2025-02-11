import {
    EntityModelBusinessInput,
    EntityModelBusinessView,
    GenEntityConfigInput_TargetOf_properties,
    GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {MainLocaleKeyParam} from "@/i18n";
import {DeepReadonly} from "vue";

export const validateEntityWithProperties = (
    input: DeepReadonly<EntityModelBusinessInput>,
    otherEntities: DeepReadonly<Array<EntityModelBusinessView>>,
): MainLocaleKeyParam[] => {
    // TODO 补充业务配置的校验，例如 id 自增类型校验，例如 page 相关项和业务相关项

    const entity = input.entity
    
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

    if (entity.otherAnnotation) {
        const otherAnnotation = entity.otherAnnotation
        
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

    const propertyNameSet = new Set<string>()
    const allProperties: DeepReadonly<Array<GenEntityConfigInput_TargetOf_properties | GenPropertyEntityConfigInput>> = [
        ...entity.properties,
        ...input.properties,
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

        if (property.otherAnnotation) {
            const otherAnnotation = property.otherAnnotation

            const propertyOtherAnnotationImportSet = new Set<string>()
            for (const importLine of otherAnnotation.imports) {
                if (importLine.length === 0) {
                    messageList.push({key: "VALIDATE_Entity_propertyOtherAnnotation_importLineCannotBeEmpty", args: [property.name]})
                    continue
                }

                if (propertyOtherAnnotationImportSet.has(importLine)) {
                    messageList.push({key: "VALIDATE_Entity_propertyOtherAnnotation_importLineCannotBeDuplicate", args: [property.name, importLine]})
                } else {
                    propertyOtherAnnotationImportSet.add(importLine)
                }
            }

            const propertyOtherAnnotationsSet = new Set<string>()
            for (const annotation of otherAnnotation.annotations) {
                if (annotation.length === 0) {
                    messageList.push({key: "VALIDATE_Entity_propertyOtherAnnotation_annotationCannotBeEmpty", args: [property.name]})
                    continue
                }

                if (propertyOtherAnnotationsSet.has(annotation)) {
                    messageList.push({key: "VALIDATE_Entity_propertyOtherAnnotation_annotationCannotBeDuplicate", args: [property.name, annotation]})
                } else {
                    propertyOtherAnnotationsSet.add(annotation)
                }
            }
        }
    }

    for (const property of input.properties) {
        if (!property.type || property.type.length === 0) {
            messageList.push({key: "VALIDATE_Entity_propertyTypeCannotBeEmpty", args: [property.name]})
        }

        if (property.body) {
            const body = property.body
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

            if (body.codeBlock.length === 0) {
                messageList.push({key: "VALIDATE_Entity_propertyBody_codeBlockCannotBeEmpty", args: [property.name]})
            }
        }
    }

    return messageList
}
