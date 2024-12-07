<script setup lang="ts">
import {GenerateFile, IdName, TableEntityPair} from "@/api/__generated/model/static";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {api} from "@/api";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import {useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";
import {computed} from "vue";
import {sendI18nMessage} from "@/message/message.ts";

const {MODEL} = useModelEditorStore()

const tableDialogsStore = useTableDialogsStore()

const entityDialogsStore = useEntityDialogsStore()

const enumDialogsStore = useEnumDialogsStore()

const associationDialogsStore = useAssociationDialogsStore()

const props = defineProps<{
    file: GenerateFile
}>()

const mainTableEntity = computed<TableEntityPair | undefined>(() => {
    if (props.file.main?.mainType === 'Table') {
        return props.file.tableEntities.filter(it => it.table?.name === props.file.main?.idName.name)[0]
    } else if (props.file.main?.mainType === 'Entity') {
        return props.file.tableEntities.filter(it => it.entity?.id === props.file.main?.idName.id)[0]
    }
    return undefined
})

const otherTableEntities = computed(() => {
    if (props.file.main?.mainType === 'Table') {
        return props.file.tableEntities.filter(it => it.table?.name !== props.file.main?.idName.name)
    } else if (props.file.main?.mainType === 'Entity') {
        return props.file.tableEntities.filter(it => it.entity?.id !== props.file.main?.idName.id)
    }
    return props.file.tableEntities
})

const otherEnums = computed(() => {
    return props.file.main?.mainType === 'Enum' ?
        props.file.enums.filter(it => it.name !== props.file.main?.idName.name) :
        props.file.enums
})

const handleClickTable = (idName: IdName) => {
    const tableNodePair = MODEL.tableNodePairs.filter(it => it.first.name === idName.name)[0]
    if (!tableNodePair) {
        sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel", args: [idName]})
        return
    }
    tableDialogsStore.open(tableNodePair.second.id, tableNodePair.first)
}

const handleClickEntity = async (idName: IdName) => {
    const entity = await api.entityService.get({id: idName.id})
    if (entity === undefined) {
        sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEntityNotFound", args: [idName]})
        return
    }
    entityDialogsStore.open(idName.id, entity)
}

const handleClickEnum = (idName: IdName) => {
    const genEnum = MODEL.enums.filter(it => it.name === idName.name)[0]
    if (!genEnum) {
        sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel", args: [idName]})
        return
    }
    enumDialogsStore.open(idName.name, genEnum)
}

const handleClickAssociation = (idName: IdName) => {
    const associationEdgePair = MODEL.associationEdgePairs.filter(it => it.first.name === idName.name)[0]
    if (!associationEdgePair) {
        sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel", args: [idName]})
        return
    }
    associationDialogsStore.open(associationEdgePair.second.id, associationEdgePair.first)
}
</script>

<template>
    <div v-if="file.main" style="line-height: 2em;">
        <template v-if="file.main.mainType === 'Entity' || file.main.mainType === 'Table'">
            <el-button
                v-if="mainTableEntity?.table"
                @click="handleClickTable(mainTableEntity.table)">
                {{ mainTableEntity.table.name }}
            </el-button>

            <el-button
                v-if="mainTableEntity?.entity"
                @click="handleClickEntity(mainTableEntity.entity)">
                {{ mainTableEntity.entity.name }}
            </el-button>
        </template>

        <template v-else-if="file.main.mainType === 'Enum'">
            <el-button @click="handleClickEnum(file.main.idName)">
                {{ file.main.idName.name }}
            </el-button>
        </template>
    </div>

    <div v-for="{entity, table} in otherTableEntities">
        <el-button v-if="table" @click="handleClickTable(table)">
            {{ table.name }}
        </el-button>

        <el-button v-if="entity" @click="handleClickEntity(entity)">
            {{ entity.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="genEnum in otherEnums"
            @click="handleClickEnum(genEnum)"
        >
            {{ genEnum.name }}
        </el-button>
    </div>

    <div>
        <el-button
            v-for="association in file.associations"
            @click="handleClickAssociation(association)"
        >
            {{ association.name }}
        </el-button>
    </div>
</template>