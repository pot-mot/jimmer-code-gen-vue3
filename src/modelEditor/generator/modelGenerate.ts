import type {ScriptsStore} from "@/modelEditor/generator/ScriptsStore.ts";
import {getArrayFromMap} from "@/utils/map/getArrayFromMap.ts";
import {entityToTable} from "@/type/script/default/TableEntityConvert/entityToTable.ts";

export const modelGenerate = (
    context: DeepReadonly<ModelContext>,
    selectedIds: DeepReadonly<Partial<ModelSubIds>>,
    scriptsStore: DeepReadonly<ScriptsStore<any>>,
): Record<string, string> => {
    const files: Record<string, string> = {}
    const mergeIntoFiles = (newFiles: Record<string, string>) => {
        for (const filePath in newFiles) {
            const newFile = newFiles[filePath]
            if (!newFile) continue

            if (files[filePath]) {
                let index = 1
                let newName = `${filePath}(${index})`
                while (files[newName]) {
                    index++
                    newName = `${filePath}(${index})`
                }
                files[newName] = newFile
            } else {
                files[filePath] = newFile
            }
        }
    }

    const databaseType = context.model.databaseType
    const jvmLanguage = context.model.jvmLanguage
    const scriptInfos = scriptsStore.getScriptInfos({
        enabled: true,
        databaseType,
        jvmLanguage,
    })

    if (selectedIds.entityIds) {
        const entities = getArrayFromMap(context.entityMap, selectedIds.entityIds)
        const {tables, midTables} = entityToTable(entities, Array.from(context.entityMap.values()), context)
        const allTables = [...tables, ...midTables]

        for (const {script} of scriptInfos.filter(it => it.type === "TableGenerator")) {
            mergeIntoFiles(script.execute(allTables, context))
        }

        for (const {script} of scriptInfos.filter(it => it.type === "EntityGenerator")) {
            for (const entity of entities) {
                mergeIntoFiles(script.execute(entity, context))
            }
        }
    }

    if (selectedIds.mappedSuperClassIds) {
        const mappedSuperClasses = getArrayFromMap(context.mappedSuperClassMap, selectedIds.mappedSuperClassIds)
        for (const {script} of scriptInfos.filter(it => it.type === "MappedSuperClassGenerator")) {
            for (const mappedSuperClass of mappedSuperClasses) {
                mergeIntoFiles(script.execute(mappedSuperClass, context))
            }
        }
    }

    if (selectedIds.embeddableTypeIds) {
        const embeddableTypes = getArrayFromMap(context.embeddableTypeMap, selectedIds.embeddableTypeIds)
        for (const {script} of scriptInfos.filter(it => it.type === "EmbeddableTypeGenerator")) {
            for (const embeddableType of embeddableTypes) {
                mergeIntoFiles(script.execute(embeddableType, context))
            }
        }
    }

    if (selectedIds.enumerationIds) {
        const enumerations = getArrayFromMap(context.enumerationMap, selectedIds.enumerationIds)
        for (const {script} of scriptInfos.filter(it => it.type === "EnumerationGenerator")) {
            for (const enumeration of enumerations) {
                mergeIntoFiles(script.execute(enumeration, context))
            }
        }
    }

    if (selectedIds.associationIds) {
        const associations = getArrayFromMap(context.associationMap, selectedIds.associationIds)
        for (const {script} of scriptInfos.filter(it => it.type === "AssociationGenerator")) {
            for (const association of associations) {
                mergeIntoFiles(script.execute(association, context))
            }
        }
    }

    if (selectedIds.groupIds) {
        const groups = getArrayFromMap(context.groupMap, selectedIds.groupIds)
        for (const {script} of scriptInfos.filter(it => it.type === "GroupGenerator")) {
            for (const group of groups) {
                mergeIntoFiles(script.execute(group, context))
            }
        }
    }

    for (const {script} of scriptInfos.filter(it => it.type === "ModelGenerator")) {
        mergeIntoFiles(script.execute(context.model, context))
    }

    return files
}