import type {MainLocale} from "@/i18n/index.ts";

export const localeEn: MainLocale = {
    BUTTON_copy: "Copy",
    BUTTON_cut: "Cut",
    BUTTON_paste: "Paste",

    BUTTON_edit: "Edit",
    BUTTON_submit: "Submit",
    BUTTON_delete: "Delete",
    BUTTON_clear: "Clear",
    BUTTON_save: "Save",
    BUTTON_cancel: "Cancel",
    BUTTON_load: "Load",
    BUTTON_export: "Export",
    BUTTON_test: "Test",

    MESSAGE_delete_confirm: (deleteTarget: string) => `Are you sure to delete ${deleteTarget}?`
}
