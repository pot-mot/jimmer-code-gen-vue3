<script setup lang="ts">
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useDatabaseDialog} from "@/modelEditor/database/useDatabaseDialog.ts";
import {ref} from "vue";
import type {DatabaseInsertInput, DatabaseUpdateInput, DatabaseView, TableView} from "@/api/__generated/model/static";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {api} from "@/api";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import TableViewer from "@/modelEditor/database/TableViewer.vue";
import DatabaseForm from "@/modelEditor/database/DatabaseForm.vue";
import {defaultDatabase} from "@/modelEditor/database/defaultDatabase.ts";
import {translate} from "@/store/i18nStore.ts";
import IconEdit from "@/components/icons/IconEdit.vue";
import {sendConfirm} from "@/components/confirm/confirmApi.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconDatabaseAdd from "@/components/icons/IconDatabaseAdd.vue";
import IconTypedDatabase from "@/components/icons/database/IconTypedDatabase.vue";

const {
    openState
} = useDatabaseDialog()

const databaseList = ref<DatabaseView[]>([])
const databaseTableMap = ref(new Map<string, TableView[]>())

const listDatabase = async () => {
    await withLoading("list database", async () => {
        databaseList.value = await api.databaseService.list({body: {}})
    })
}

const fetchTables = async (databaseId: string) => {
    await withLoading("list tables", async () => {
        const tables = await api.databaseService.fetchTables({databaseId})
        databaseTableMap.value.set(databaseId, tables)
    })
}

const refreshTables = async (databaseId: string) => {
    await withLoading("refresh tables", async () => {
        const tables = await api.databaseService.refreshTables({databaseId})
        databaseTableMap.value.set(databaseId, tables)
    })
}

const onDatabaseOpen = (database: DatabaseView) => {
    if (!databaseTableMap.value.has(database.id)) {
        fetchTables(database.id)
    }
}

const databaseInsertVisible = ref(false)
const databaseInsertInput = ref<DatabaseInsertInput>()

const startDatabaseInsert = () => {
    databaseInsertInput.value = defaultDatabase("POSTGRESQL")
    databaseInsertVisible.value = true
}

const stopDatabaseInsert = () => {
    databaseInsertVisible.value = false
}

const submitDatabaseInsert = async (database: DatabaseInsertInput) => {
    await withLoading("add database", async () => {
        const result = await api.databaseService.insert({body: database})
        databaseList.value.push(result)
        await refreshTables(result.id)
        databaseInsertVisible.value = false
    })
}

const databaseUpdateVisible = ref(false)
const databaseUpdateInput = ref<DatabaseUpdateInput>()

const startDatabaseUpdate = (database: DatabaseView) => {
    databaseUpdateInput.value = {
        ...database,
        username: "",
        password: "",
    }
    databaseUpdateVisible.value = true
}

const stopDatabaseUpdate = () => {
    databaseUpdateVisible.value = false
}

const submitDatabaseUpdate = async (database: DatabaseUpdateInput) => {
    await withLoading("update database", async () => {
        const result = await api.databaseService.update({body: database})
        const index = databaseList.value.findIndex(it => it.id === result.id)
        if (index >= 0) {
            databaseList.value[index] = result
        } else {
            databaseList.value.push(result)
        }
        await refreshTables(result.id)
        databaseUpdateVisible.value = false
    })
}

const deleteDatabase = async (database: DatabaseView) => {
    sendConfirm({
        title: translate({key: "delete_confirm_title", args: [translate("database")]}),
        content: translate({key: "delete_confirm_content", args: [` ${translate("database")}[${database.name}] `]}),
        onConfirm: async () => {
            await withLoading("delete model", async () => {
                await api.databaseService.delete({databaseId: database.id})
                databaseList.value = databaseList.value.filter(it => database.id !== it.id)
            })
        }
    })
}

</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        @opened="listDatabase"
        :init-w="700"
    >
        <template #title>
            {{ translate("database_dialog_title") }}
        </template>

        <button @click="startDatabaseInsert" class="database-add-button">
            <IconDatabaseAdd/>
            {{ translate('database_add_button') }}
        </button>

        <CollapseDetail
            v-for="database in databaseList"
            @update:model-value="(value) => {if (value) onDatabaseOpen(database)}"
            trigger-position="left"
        >
            <template #head>
                <div class="database-item">
                    <div>
                        <IconTypedDatabase :type="database.type"/>
                        <span class="no-drag">{{ database.name }}</span>
                    </div>
                    <div class="database-operations">
                        <button @click="refreshTables(database.id)">
                            <IconRefresh/>
                        </button>
                        <button @click="startDatabaseUpdate(database)">
                            <IconEdit/>
                        </button>
                        <button @click="deleteDatabase(database)">
                            <IconDelete/>
                        </button>
                        <slot name="database-operations"/>
                    </div>
                </div>
            </template>

            <template #body>
                <div class="database-tables">
                    <TableViewer
                        v-for="table in databaseTableMap.get(database.id)"
                        :table="table"
                    />
                </div>
            </template>
        </CollapseDetail>
    </DragResizeDialog>

    <DragResizeDialog
        :model-value="databaseInsertVisible && !!databaseInsertInput"
        @close="stopDatabaseInsert"
        :init-w="600"
        :init-h="340"
        can-resize
        modal
    >
        <template #title>
            {{ translate("database_create_title") }}
        </template>
        <DatabaseForm
            v-if="databaseInsertInput"
            v-model="databaseInsertInput"
            @submit="submitDatabaseInsert"
            @cancel="stopDatabaseInsert"
        />
    </DragResizeDialog>

    <DragResizeDialog
        :model-value="databaseUpdateVisible && !!databaseUpdateInput"
        @close="stopDatabaseUpdate"
        :init-w="600"
        :init-h="340"
        can-resize
        modal
    >
        <template #title>
            {{ translate("database_update_title") }}
        </template>
        <DatabaseForm
            v-if="databaseUpdateInput"
            v-model="databaseUpdateInput"
            @submit="submitDatabaseUpdate"
            @cancel="stopDatabaseUpdate"
        />
    </DragResizeDialog>
</template>

<style scoped>
.database-add-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    margin: 0.5rem;
}

.database-item {
    display: flex;
    justify-content: space-between;
}

.database-operations {
    display: flex;
    gap: 0.5rem;
}

.database-operations > button {
    border: none;
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.database-tables {
    margin-left: 2rem;
}
</style>
