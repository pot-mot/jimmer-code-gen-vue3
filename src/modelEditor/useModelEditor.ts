import {createStore} from "@/utils/store/createStore.ts";
import {createTsScript, type TsScript} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import {reactive, ref} from "vue";
import ModelContext from "@/type/__generated/typeDeclare/items/ModelContext.ts";

type TableEntityConvertor = {
    tableToEntityScript: TsScript<"TableToEntity">
    entityToTableScript: TsScript<"EntityToTable">
}

type ModelGenerateScripts = {
    tableGenerators: TsScript<"TableGenerator">[]
    tableDiffGenerators: TsScript<"TableDiffGenerator">[]

    entityGenerators: TsScript<"EntityGenerator">[]
    mappedSuperClassGenerators: TsScript<"MappedSuperClassGenerator">[]
    embeddableTypeGenerators: TsScript<"EmbeddableTypeGenerator">[]
    enumerationGenerators: TsScript<"EnumerationGenerator">[]

    associationGenerators: TsScript<"AssociationGenerator">[]

    groupGenerators: TsScript<"GroupGenerator">[]

    modelGenerators: TsScript<"ModelGenerator">[]
}

type ModelIdMaps = Omit<ModelContext, "model">

export const useModelEditor = createStore(() => {
    const model = ref<Model>()

    const modelIdMaps = reactive<ModelIdMaps>({
        groupIdMap: new Map<string, Group>(),
        entityIdMap: new Map<string, Entity>(),
        mappedSuperClassIdMap: new Map<string, MappedSuperClass>(),
        embeddableTypeIdMap: new Map<string, EmbeddableType>(),
        enumerationIdMap: new Map<string, Enumeration>(),
        associationIdMap: new Map<string, Association>(),
    })

    // TODO
    const tableEntityConvertor = reactive<TableEntityConvertor>({
        tableToEntityScript: createTsScript("TableToEntity", "") as any as TsScript<"TableToEntity">,
        entityToTableScript: createTsScript("EntityToTable", "") as any as TsScript<"EntityToTable">
    })

    // TODO
    const modelGenerateScripts = reactive<ModelGenerateScripts>({
        tableGenerators: [],
        tableDiffGenerators: [],

        entityGenerators: [],
        mappedSuperClassGenerators: [],
        embeddableTypeGenerators: [],
        enumerationGenerators: [],

        associationGenerators: [],

        groupGenerators: [],

        modelGenerators: [],
    })

    const setModel = (modelContext: ModelContext) => {

    }

    const getModel = () => {
        if (!model.value) throw new Error("Model not load")
        return model.value
    }

    const resetGenerateScripts = () => {

    }

    const addGenerateScripts = () => {

    }

    const generate = () => {
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

        const model = getModel()
        const context: ModelContext = {
            model,
            ...modelIdMaps,
        }

        const entities = [...modelIdMaps.entityIdMap.values()]
        const tables = entities.map(it => tableEntityConvertor.entityToTableScript.execute(it, context))

        for (const script of modelGenerateScripts.tableGenerators) {
            for (const table of tables) {
                mergeIntoFiles(script.execute(table, context))
            }
        }

        for (const script of modelGenerateScripts.entityGenerators) {
            for (const entity of entities) {
                mergeIntoFiles(script.execute(entity, context))
            }
        }

        for (const script of modelGenerateScripts.mappedSuperClassGenerators) {
            for (const mappedSuperClass of context.mappedSuperClassIdMap.values()) {
                mergeIntoFiles(script.execute(mappedSuperClass, context))
            }
        }

        for (const script of modelGenerateScripts.embeddableTypeGenerators) {
            for (const embeddableType of context.embeddableTypeIdMap.values()) {
                mergeIntoFiles(script.execute(embeddableType, context))
            }
        }

        for (const script of modelGenerateScripts.enumerationGenerators) {
            for (const enumeration of context.enumerationIdMap.values()) {
                mergeIntoFiles(script.execute(enumeration, context))
            }
        }

        for (const script of modelGenerateScripts.associationGenerators) {
            for (const association of context.associationIdMap.values()) {
                mergeIntoFiles(script.execute(association, context))
            }
        }

        for (const script of modelGenerateScripts.groupGenerators) {
            for (const group of context.groupIdMap.values()) {
                mergeIntoFiles(script.execute(group, context))
            }
        }

        for (const script of modelGenerateScripts.modelGenerators) {
            mergeIntoFiles(script.execute(model, context))
        }

        return files
    }

    return {
        resetGenerateScripts,
        addGenerateScripts,
        generate,
    }
})