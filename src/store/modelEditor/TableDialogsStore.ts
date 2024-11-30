import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenTableModelInput} from "@/api/__generated/model/static";
import mitt from "mitt";

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        const enumCreatedEvent = mitt<{
            enumCreated: {
                tableDialogId: string,
                columnName: string,
                enumName: string,
            }
        }>()

        type enumCreatedAction = (
            columnName: string,
            enumName: string,
        ) => void

        const enumCreatedActionMap = new Map<string, enumCreatedAction>

        enumCreatedEvent.on('enumCreated', ({tableDialogId, columnName, enumName}) => {
            enumCreatedActionMap.get(tableDialogId)?.(columnName, enumName)
        })

        return {
            ...useDialogOpenListState<string, GenTableModelInput>(),
            emitEnumCreated: (
                tableDialogId: string,
                columnName: string,
                enumName: string,
            ) => {
                enumCreatedEvent.emit('enumCreated', {tableDialogId, columnName, enumName})
            },
            onEnumCreated: (
                tableDialogId: string,
                action: enumCreatedAction
            ) => {
                enumCreatedActionMap.set(tableDialogId, action)
            },
            removeOnEnumCreated: (
                tableDialogId: string,
            ) => {
                enumCreatedActionMap.delete(tableDialogId)
            }
        }
    }
)

export const TABLE_CREATE_PREFIX = "[[TABLE_CREATE_PREFIX]]"
