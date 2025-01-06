<script setup lang="ts">
import {GenerateFile, IdName, TableEntityNotNullPair, TableEntityPair} from "@/api/__generated/model/static";
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
    file: GenerateFile,
    tableIdMap: Map<number, TableEntityNotNullPair>,
    entityIdMap: Map<number, TableEntityNotNullPair>,
}>()

const mainTableEntity = computed<TableEntityPair | undefined>(() => {
    if (!props.file.main) return

    const {mainType, idName} = props.file.main

    if (mainType === 'Table') {
        return props.tableIdMap.get(idName.id) ?? {table: idName}
    } else if (mainType === 'Entity') {
        return props.entityIdMap.get(idName.id) ?? {entity: idName}
    }
    return undefined
})

const translateTableEntity = (tableEntity: TableEntityPair): TableEntityPair | undefined => {
    const {table, entity} = tableEntity
    if (table && entity) {
        return tableEntity
    } else if (table && !entity) {
        return props.tableIdMap.get(table.id) ?? tableEntity
    } else if (!table && entity) {
        return props.entityIdMap.get(entity.id) ?? tableEntity
    } else {
        return undefined
    }
}

const otherTableEntities = computed(() => {
    const tableEntities = props.file.tableEntities

    let filterCondition: ((it: TableEntityPair) => boolean) | undefined

    if (props.file.main) {
        const {mainType, idName} = props.file.main

        if (mainType === 'Table') {
            filterCondition = (it: TableEntityPair) => it.table?.name !== idName.name
        } else if (mainType === 'Entity') {
            filterCondition = (it: TableEntityPair) => it.entity?.id !== idName.id
        }
    }

    return (filterCondition ? tableEntities.filter(filterCondition) : tableEntities)
        .map(translateTableEntity)
        .filter(it => it !== undefined)
        .sort((a, b) => {
            if (a.table && b.table) {
                return a.table.name.localeCompare(b.table.name)
            } else if (a.entity && b.entity) {
                return a.entity.name.localeCompare(b.entity.name)
            } else {
                return 0
            }
        })
})

const otherEnums = computed(() => {
    return (
        props.file.main?.mainType === 'Enum' ?
            props.file.enums.filter(it => it.name !== props.file.main?.idName.name) :
            props.file.enums
    ).sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
})

const associations = computed(() => {
    return props.file.associations
        .sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
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
    <div v-if="file.main" class="generate-file-menu-part">
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

    <div v-if="otherTableEntities.length > 0" class="generate-file-menu-part">
        <div v-for="{entity, table} in otherTableEntities">
            <el-button v-if="table" @click="handleClickTable(table)">
                {{ table.name }}
            </el-button>

            <el-button v-if="entity" @click="handleClickEntity(entity)">
                {{ entity.name }}
            </el-button>
        </div>
    </div>

    <div v-if="otherEnums.length > 0" class="generate-file-menu-part">
        <div v-for="genEnum in otherEnums">
            <el-button @click="handleClickEnum(genEnum)">
                {{ genEnum.name }}
            </el-button>
        </div>
    </div>

    <div v-if="associations.length > 0" class="generate-file-menu-part">
        <div v-for="association in associations">
            <el-button @click="handleClickAssociation(association)">
                {{ association.name }}
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.generate-file-menu-part + .generate-file-menu-part {
    width: 100%;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: var(--el-border-color-darker) solid 2px;
}

.generate-file-menu-part > div {
    padding-bottom: 0.2em;
}
</style>