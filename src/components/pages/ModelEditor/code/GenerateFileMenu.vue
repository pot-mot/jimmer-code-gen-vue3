<script setup lang="ts">
import {GenerateFile} from "@/api/__generated/model/static";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {api} from "@/api";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import {useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";

const {MODEL} = useModelEditorStore()

const tableDialogsStore = useTableDialogsStore()

const entityDialogsStore = useEntityDialogsStore()

const enumDialogsStore = useEnumDialogsStore()

const associationDialogsStore = useAssociationDialogsStore()

defineProps<{
    file: GenerateFile
}>()

const handleClickTable = (name: string) => {
    const tableNodePair = MODEL.tableNodePairs.filter(it => it.first.name === name)[0]
    if (tableNodePair === undefined) {
        // TODO 补充消息
        return
    }
    tableDialogsStore.open(tableNodePair.second.id, tableNodePair.first)
}

const handleClickEntity = async (id: number) => {
    const entity = await api.entityService.get({id})
    if (entity === undefined) {
        // TODO 补充消息
        return
    }
    entityDialogsStore.open(id, entity)
}

const handleClickEnum = (name: string) => {
    const genEnum = MODEL.enums.filter(it => it.name === name)[0]
    if (genEnum === undefined) {
        // TODO 补充消息
        return
    }
    enumDialogsStore.open(name, genEnum)
}

const handleClickAssociation = (name: string) => {
    const associationEdgePair = MODEL.associationEdgePairs.filter(it => it.first.name === name)[0]
    if (associationEdgePair === undefined) {
        // TODO 补充消息
        return
    }
    associationDialogsStore.open(associationEdgePair.second.id, associationEdgePair.first)
}
</script>

<template>
    <div v-if="file.mainTable">
        <el-button
            @click="handleClickTable(file.mainTable.name)"
        >
            {{ file.mainTable.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="table in file.tables"
            @click="handleClickTable(table.name)"
        >
            {{ table.name }}
        </el-button>
    </div>

    <div v-if="file.mainEntity">
        <el-button
            @click="handleClickEntity(file.mainEntity.id)"
        >
            {{ file.mainEntity.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="entity in file.entities"
            @click="handleClickEntity(entity.id)"
        >
            {{ entity.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="genEnum in file.enums"
            @click="handleClickEnum(genEnum.name)"
        >
            {{ genEnum.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="association in file.associations"
            @click="handleClickAssociation(association.name)"
        >
            {{ association.name }}
        </el-button>
    </div>
</template>