import type {ScriptsStore} from "@/modelEditor/generator/ScriptsStore.ts";
import {getArrayFromMap} from "@/utils/map/getArrayFromMap.ts";
import {entityToTable} from "@/type/script/default/entityToTable.ts";

export const modelGenerate = (
    context: DeepReadonly<ModelContext>,
    selectedIds: DeepReadonly<Partial<ModelSubIds>>,
    scriptsStore: DeepReadonly<ScriptsStore>,
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

    if (selectedIds.entityIds) {
        const entities = getArrayFromMap(context.entityMap, selectedIds.entityIds)
        const {tables, midTables} = entityToTable(entities, context)
        const allTables = [...tables, ...midTables]

        for (const script of scriptsStore.table.enabledScripts()) {
            mergeIntoFiles(script.execute(allTables, context))
        }

        for (const script of scriptsStore.entity.enabledScripts()) {
            for (const entity of entities) {
                mergeIntoFiles(script.execute(entity, context))
            }
        }
    }

    if (selectedIds.mappedSuperClassIds) {
        const mappedSuperClasses = getArrayFromMap(context.mappedSuperClassMap, selectedIds.mappedSuperClassIds)
        for (const script of scriptsStore.mappedSuperClass.enabledScripts()) {
            for (const mappedSuperClass of mappedSuperClasses) {
                mergeIntoFiles(script.execute(mappedSuperClass, context))
            }
        }
    }

    if (selectedIds.embeddableTypeIds) {
        const embeddableTypes = getArrayFromMap(context.embeddableTypeMap, selectedIds.embeddableTypeIds)
        for (const script of scriptsStore.embeddableType.enabledScripts()) {
            for (const embeddableType of embeddableTypes) {
                mergeIntoFiles(script.execute(embeddableType, context))
            }
        }
    }

    if (selectedIds.enumerationIds) {
        const enumerations = getArrayFromMap(context.enumerationMap, selectedIds.enumerationIds)
        for (const script of scriptsStore.enumeration.enabledScripts()) {
            for (const enumeration of enumerations) {
                mergeIntoFiles(script.execute(enumeration, context))
            }
        }
    }

    if (selectedIds.associationIds) {
        const associations = getArrayFromMap(context.associationMap, selectedIds.associationIds)
        for (const script of scriptsStore.association.enabledScripts()) {
            for (const association of associations) {
                mergeIntoFiles(script.execute(association, context))
            }
        }
    }

    if (selectedIds.groupIds) {
        const groups = getArrayFromMap(context.groupMap, selectedIds.groupIds)
        for (const script of scriptsStore.group.enabledScripts()) {
            for (const group of groups) {
                mergeIntoFiles(script.execute(group, context))
            }
        }
    }

    for (const script of scriptsStore.model.enabledScripts()) {
        mergeIntoFiles(script.execute(context.model, context))
    }

    return files
}