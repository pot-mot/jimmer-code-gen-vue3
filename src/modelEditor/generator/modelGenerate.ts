import type {ScriptsStore} from "@/modelEditor/script/ScriptsStore.ts";
import {getArrayFromMap} from "@/utils/map/getArrayFromMap.ts";
import {entityToTable} from "@/modelEditor/TableEntityConvert/entityToTable.ts";

export const modelGenerate = (
    context: DeepReadonly<ModelContext>,
    scriptsStore: DeepReadonly<ScriptsStore>,
    selectedIds?: DeepReadonly<Partial<ModelSubIds>> | undefined,
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

    let entities: DeepReadonly<EntityWithInheritInfo>[] | undefined
    let mappedSuperClasses: DeepReadonly<MappedSuperClassWithInheritInfo>[] | undefined
    let embeddableTypes: DeepReadonly<EmbeddableTypeWithOverrideProperties>[] | undefined
    let enumerations: DeepReadonly<Enumeration>[] | undefined
    let associations: DeepReadonly<Association>[] | undefined
    let groups: DeepReadonly<GroupWithInheritInfoMap>[] | undefined

    if (selectedIds === undefined) {
        entities = Array.from(context.entityMap.values())
        mappedSuperClasses = Array.from(context.mappedSuperClassMap.values())
        embeddableTypes = Array.from(context.embeddableTypeMap.values())
        enumerations = Array.from(context.enumerationMap.values())
        associations = Array.from(context.associationMap.values())
        groups = Array.from(context.groupMap.values())
    } else {
        if (selectedIds.entityIds) entities = getArrayFromMap(context.entityMap, selectedIds.entityIds)
        if (selectedIds.mappedSuperClassIds) mappedSuperClasses = getArrayFromMap(context.mappedSuperClassMap, selectedIds.mappedSuperClassIds)
        if (selectedIds.embeddableTypeIds) embeddableTypes = getArrayFromMap(context.embeddableTypeMap, selectedIds.embeddableTypeIds)
        if (selectedIds.enumerationIds) enumerations = getArrayFromMap(context.enumerationMap, selectedIds.enumerationIds)
        if (selectedIds.associationIds) associations = getArrayFromMap(context.associationMap, selectedIds.associationIds)
        if (selectedIds.groupIds) groups = getArrayFromMap(context.groupMap, selectedIds.groupIds)
    }

    if (entities) {
        const {tables, midTables} = entityToTable(entities, Array.from(context.entityMap.values()), context)
        const allTables = [...tables, ...midTables]

        for (const {script} of scriptInfos["TableGenerator"]) {
            mergeIntoFiles(script.execute(allTables, context))
        }

        for (const {script} of scriptInfos["EntityGenerator"]) {
            for (const entity of entities) {
                mergeIntoFiles(script.execute(entity, context))
            }
        }
    }

    if (mappedSuperClasses) {
        for (const {script} of scriptInfos["MappedSuperClassGenerator"]) {
            for (const mappedSuperClass of mappedSuperClasses) {
                mergeIntoFiles(script.execute(mappedSuperClass, context))
            }
        }
    }

    if (embeddableTypes) {
        for (const {script} of scriptInfos["EmbeddableTypeGenerator"]) {
            for (const embeddableType of embeddableTypes) {
                mergeIntoFiles(script.execute(embeddableType, context))
            }
        }
    }

    if (enumerations) {
        for (const {script} of scriptInfos["EnumerationGenerator"]) {
            for (const enumeration of enumerations) {
                mergeIntoFiles(script.execute(enumeration, context))
            }
        }
    }

    if (associations) {
        for (const {script} of scriptInfos["AssociationGenerator"]) {
            for (const association of associations) {
                mergeIntoFiles(script.execute(association, context))
            }
        }
    }

    if (groups) {
        for (const {script} of scriptInfos["GroupGenerator"]) {
            for (const group of groups) {
                mergeIntoFiles(script.execute(group, context))
            }
        }
    }

    for (const {script} of scriptInfos["ModelGenerator"]) {
        mergeIntoFiles(script.execute(context.model, context))
    }

    return files
}