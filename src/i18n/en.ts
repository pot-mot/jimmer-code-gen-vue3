import type {MainLocale} from "@/i18n/index.ts";

export const localeEn: MainLocale = {
    copy: "Copy",
    cut: "Cut",
    paste: "Paste",

    edit: "Edit",
    submit: "Submit",
    delete: "Delete",
    clear: "Clear",
    save: "Save",
    confirm: "Confirm",
    cancel: "Cancel",
    load: "Load",
    export: "Export",
    test: "Test",

    delete_confirm_title: (deleteTarget: string) => `${deleteTarget} Delete Confirm`,
    delete_confirm_content: (deleteTarget: string) => `Are you sure to delete ${deleteTarget}?`,

    name: "Name",
    comment: "Comment",
    createdTime: "Created At",
    modifiedTime: "Modified At",

    model: "Model",
    group: "Group",
    entity: "Entity",
    mappedSuperClass: "Abstract Entity",
    enumeration: "Enum",
    embeddableType: "Embeddable Type",
    association: "Association",

    model_create_button: "创建模型",
    group_create_button: "创建分组",

    database: "Database",
    table: "Table",
    column: "Column",
    index: "Index",
    primaryKey: "Primary Key",
    foreignKey: "Foreign Key",
    check: "Check",
}
