import {createStore} from "@/utils/store/createStore.ts";
import type {TsScript} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

type ModelEditorScripts = {
    tableToEntityScript: TsScript<"TableToEntity">
    entityToTableScript: TsScript<"EntityToTable">

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

export const useModelEditor = createStore(() => {
    return {

    }
})