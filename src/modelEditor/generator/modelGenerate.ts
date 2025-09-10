import type {TableEntityConvertor} from "@/modelEditor/generator/TableEntityConvertor.ts";
import type {ModelGenerateStore} from "@/modelEditor/generator/ModelGenerateStore.ts";
import {getArrayFromMap} from "@/utils/map/getArrayFromMap.ts";

export const modelGenerate = (
    context: DeepReadonly<ModelContext>,
    selectedIds: DeepReadonly<Partial<ModelSubIds>>,
    generator: DeepReadonly<ModelGenerateStore>,
    convertor: DeepReadonly<TableEntityConvertor>,
) => {
    const files: Record<string, string> = {}
    const mergeIntoFiles = (newFiles: Record<string, string>) => {
        for (const fileName in newFiles) {
            if (files[fileName]) {
                throw new Error(`File ${fileName} already exists`)
            } else {
                files[fileName] = newFiles[fileName]
            }
        }
    }

    const model = context.model

    if (selectedIds.entityIds) {
        const entities = getArrayFromMap(context.entityMap, selectedIds.entityIds)
        const tables = entities.map(it => convertor.entityToTable(it, context))

        for (const script of generator.table.scripts()) {
            mergeIntoFiles(script.execute(tables, context))
        }
        for (const script of generator.entity.scripts()) {
            for (const entity of entities) {
                mergeIntoFiles(script.execute(entity, context))
            }
        }
    }

    if (selectedIds.mappedSuperClassIds) {
        const mappedSuperClasses = getArrayFromMap(context.mappedSuperClassMap, selectedIds.mappedSuperClassIds)
        for (const script of generator.mappedSuperClass.scripts()) {
            for (const mappedSuperClass of mappedSuperClasses) {
                mergeIntoFiles(script.execute(mappedSuperClass, context))
            }
        }
    }

    if (selectedIds.embeddableTypeIds) {
        const embeddableTypes = getArrayFromMap(context.embeddableTypeMap, selectedIds.embeddableTypeIds)
        for (const script of generator.embeddableType.scripts()) {
            for (const embeddableType of embeddableTypes) {
                mergeIntoFiles(script.execute(embeddableType, context))
            }
        }
    }

    if (selectedIds.enumerationIds) {
        const enumerations = getArrayFromMap(context.enumerationMap, selectedIds.enumerationIds)
        for (const script of generator.enumeration.scripts()) {
            for (const enumeration of enumerations) {
                mergeIntoFiles(script.execute(enumeration, context))
            }
        }
    }

    if (selectedIds.associationIds) {
        const associations = getArrayFromMap(context.associationMap, selectedIds.associationIds)
        for (const script of generator.association.scripts()) {
            for (const association of associations) {
                mergeIntoFiles(script.execute(association, context))
            }
        }
    }

    if (selectedIds.groupIds) {
        const groups = getArrayFromMap(context.groupMap, selectedIds.groupIds)
        for (const script of generator.group.scripts()) {
            for (const group of groups) {
                mergeIntoFiles(script.execute(group, context))
            }
        }
    }

    for (const script of generator.model.scripts()) {
        mergeIntoFiles(script.execute(model, context))
    }

    return files
}