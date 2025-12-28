import type {ScriptsStore} from "@/modelEditor/script/ScriptsStore.ts";
import {getArrayFromMap} from "@/utils/map/getArrayFromMap.ts";
import {entityToTable} from "@/modelEditor/TableEntityConvert/entityToTable.ts";

export type ModelGenerateError = {
    scriptName: string
    error: Error | any
    message: string
    target: {
        type: "Entity",
        entity: DeepReadonly<EntityWithInheritInfo>
    } | {
        type: "MappedSuperClass",
        mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>
    } | {
        type: "EmbeddableType",
        embeddableType: DeepReadonly<EmbeddableTypeWithOverrideProperties>
    } | {
        type: "Enumeration",
        enumeration: DeepReadonly<Enumeration>
    } | {
        type: "Association",
        association: DeepReadonly<Association>
    } | {
        type: "Table",
        tables: DeepReadonly<Table[]>
    } | {
        type: "Group",
        group: DeepReadonly<Group>
    } | {
        type: "Model",
        context: DeepReadonly<ModelContext>
    }
}

export type ModelGenerateResult = {
    files: Record<string, string>,
    errors: ModelGenerateError[]
}

export const modelGenerate = (
    context: DeepReadonly<ModelContext>,
    scriptsStore: DeepReadonly<ScriptsStore>,
    selectedIds?: DeepReadonly<Partial<ModelSubIds>> | undefined,
): ModelGenerateResult => {
    const files: Record<string, string> = {}
    const errors: ModelGenerateError[] = []

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

    const addError = (
        scriptName: string,
        error: Error | any,
        target: ModelGenerateError['target'],
    ) => {
        errors.push({
            scriptName,
            message: error instanceof Error ? error.message : String(error),
            error,
            target
        })
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

        // 处理 TableGenerator 脚本
        for (const {name, script} of scriptInfos["TableGenerator"]) {
            try {
                const generatedFiles = script.execute(allTables, context)
                mergeIntoFiles(generatedFiles)
            } catch (error) {
                addError(name, error, {
                    type: "Table",
                    tables: allTables
                })
            }
        }

        // 处理 EntityGenerator 脚本
        for (const {name, script} of scriptInfos["EntityGenerator"]) {
            for (const entity of entities) {
                try {
                    const generatedFiles = script.execute(entity, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "Entity",
                        entity
                    })
                }
            }
        }
    }

    if (mappedSuperClasses) {
        for (const {name, script} of scriptInfos["MappedSuperClassGenerator"]) {
            for (const mappedSuperClass of mappedSuperClasses) {
                try {
                    const generatedFiles = script.execute(mappedSuperClass, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "MappedSuperClass",
                        mappedSuperClass
                    })
                }
            }
        }
    }

    if (embeddableTypes) {
        for (const {name, script} of scriptInfos["EmbeddableTypeGenerator"]) {
            for (const embeddableType of embeddableTypes) {
                try {
                    const generatedFiles = script.execute(embeddableType, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "EmbeddableType",
                        embeddableType
                    })
                }
            }
        }
    }

    if (enumerations) {
        for (const {name, script} of scriptInfos["EnumerationGenerator"]) {
            for (const enumeration of enumerations) {
                try {
                    const generatedFiles = script.execute(enumeration, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "Enumeration",
                        enumeration
                    })
                }
            }
        }
    }

    if (associations) {
        for (const {name, script} of scriptInfos["AssociationGenerator"]) {
            for (const association of associations) {
                try {
                    const generatedFiles = script.execute(association, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "Association",
                        association
                    })
                }
            }
        }
    }

    if (groups) {
        for (const {name, script} of scriptInfos["GroupGenerator"]) {
            for (const group of groups) {
                try {
                    const generatedFiles = script.execute(group, context)
                    mergeIntoFiles(generatedFiles)
                } catch (error) {
                    addError(name, error, {
                        type: "Group",
                        group
                    })
                }
            }
        }
    }

    for (const {name, script} of scriptInfos["ModelGenerator"]) {
        try {
            const generatedFiles = script.execute(context.model, context)
            mergeIntoFiles(generatedFiles)
        } catch (error) {
            addError(name, error, {
                type: "Model",
                context,
            })
        }
    }

    return { files, errors }
}
