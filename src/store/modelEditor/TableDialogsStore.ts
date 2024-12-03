import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenTableModelInput} from "@/api/__generated/model/static";

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        const dialogOpenListState = useDialogOpenListState<string, GenTableModelInput>()

        type enumCreatedAction = (
            columnName: string,
            enumName: string,
        ) => void

        const enumCreatedActionMap = new Map<string, enumCreatedAction>

        return {
            ...dialogOpenListState,

            enumCreated: (
                tableDialogId: string,
                columnName: string,
                enumName: string,
            ) => {
                enumCreatedActionMap.get(tableDialogId)?.(columnName, enumName)
            },
            onEnumCreated: (
                tableDialogId: string,
                action: enumCreatedAction
            ) => {
                enumCreatedActionMap.set(tableDialogId, action)
            },
            offEnumCreated: (
                tableDialogId: string,
            ) => {
                enumCreatedActionMap.delete(tableDialogId)
            }
        }
    }
)

export const TABLE_CREATE_PREFIX = "[[TABLE_CREATE_PREFIX]]"
