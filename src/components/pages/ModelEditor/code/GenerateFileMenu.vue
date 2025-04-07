<script setup lang="ts">
import {GenerateFile, IdName, TableEntityNotNullPair, TableEntityPair} from "@/api/__generated/model/static";
import {computed} from "vue";
import {cloneDeep} from "lodash";
import {sendI18nMessage} from "@/message/message.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {api} from "@/api";
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts";
import {useAssociationsStore} from "@/store/modelEditor/dialogs/AssociationsStore.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";
import {useEntitiesStore} from "@/store/modelEditor/dialogs/EntitiesStore.ts";

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

const otherTableEntityOptions = computed(() => {
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

const otherEnumOptions = computed(() => {
    return (
        props.file.main?.mainType === 'Enum' ?
            props.file.enums.filter(it => it.name !== props.file.main?.idName.name) :
            props.file.enums
    ).sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
})

const associationOptions = computed(() => {
    return props.file.associations
        .sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
})


const {MODEL} = useModelEditorStore()

const tableDialogs = useTablesStore()
const associationDialogs = useAssociationsStore()
const enumDialogs = useEnumsStore()
const entityDialogs = useEntitiesStore()

const editTable = (idName: IdName) => {
	const tableNodePair = cloneDeep(MODEL.tableNodePairs.filter(it => it.table.name === idName.name)[0])
	if (!tableNodePair) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickTableNotFoundInCurrentModel", args: [idName]})
		return
	}
    tableDialogs.edit(tableNodePair.node.id, tableNodePair.table)
}

const editEnum = (idName: IdName) => {
	const genEnum = cloneDeep(MODEL.enums.filter(it => it.name === idName.name)[0])
	if (!genEnum) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEnumNotFoundInCurrentModel", args: [idName]})
		return
	}
    enumDialogs.edit(idName.name, genEnum)
}

const editAssociation = (idName: IdName) => {
	const associationEdgePair = cloneDeep(MODEL.associationEdgePairs.filter(it => it.association.name === idName.name)[0])
	if (!associationEdgePair) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickAssociationNotFoundInCurrentModel", args: [idName]})
		return
	}
    associationDialogs.edit(associationEdgePair.edge.id, associationEdgePair.association)
}

const editEntity = async (idName: IdName): Promise<void> => {
	const entity = await api.entityService.get({id: idName.id})
	if (entity === undefined) {
		sendI18nMessage({key: "MESSAGE_GenerateFileMenu_clickEntityNotFound", args: [idName]})
		return
	}
    entityDialogs.edit(entity)
}
</script>

<template>
    <div v-if="file.main" class="generate-file-menu-part">
        <template v-if="file.main.mainType === 'Entity' || file.main.mainType === 'Table'">
            <el-button
                v-if="mainTableEntity?.table"
                @click="editTable(mainTableEntity.table)">
                {{ mainTableEntity.table.name }}
            </el-button>

            <el-button
                v-if="mainTableEntity?.entity"
                @click="editEntity(mainTableEntity.entity)">
                {{ mainTableEntity.entity.name }}
            </el-button>
        </template>

        <template v-else-if="file.main.mainType === 'Enum'">
            <el-button @click="editEnum(file.main.idName)">
                {{ file.main.idName.name }}
            </el-button>
        </template>
    </div>

    <div v-if="otherTableEntityOptions.length > 0" class="generate-file-menu-part">
        <div v-for="{entity, table} in otherTableEntityOptions">
            <el-button v-if="table" @click="editTable(table)">
                {{ table.name }}
            </el-button>

            <el-button v-if="entity" @click="editEntity(entity)">
                {{ entity.name }}
            </el-button>
        </div>
    </div>

    <div v-if="otherEnumOptions.length > 0" class="generate-file-menu-part">
        <div v-for="genEnum in otherEnumOptions">
            <el-button @click="editEnum(genEnum)">
                {{ genEnum.name }}
            </el-button>
        </div>
    </div>

    <div v-if="associationOptions.length > 0" class="generate-file-menu-part">
        <div v-for="association in associationOptions">
            <el-button @click="editAssociation(association)">
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
