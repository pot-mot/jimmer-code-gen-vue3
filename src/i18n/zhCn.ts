import type {MainLocale} from "@/i18n/index.ts";

export const localeZhCn: MainLocale = {
    BUTTON_copy: "复制",
    BUTTON_cut: "剪切",
    BUTTON_paste: "粘贴",

    BUTTON_edit: "编辑",
    BUTTON_submit: "提交",
    BUTTON_delete: "删除",
    BUTTON_clear: "清理",
    BUTTON_save: "保存",
    BUTTON_cancel: "取消",
    BUTTON_load: "导入",
    BUTTON_export: "导出",
    BUTTON_test: "测试",

    MESSAGE_delete_confirm: (deleteTarget: string) => `确定要删除 ${deleteTarget} 吗？`
}
