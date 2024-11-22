import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleLoadFromModelError = (error: AllErrors & { family: "LOAD_FROM_MODEL" }) => {
    switch (error.code) {
        case "INDEX_COLUMN_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__INDEX_COLUMN_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_SOURCE_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_TARGET_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_TARGET_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_SOURCE_COLUMN_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__ASSOCIATION_SOURCE_COLUMN_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "TABLE_SUPER_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__TABLE_SUPER_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEXES_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEXES_TABLE_SUPER_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_MODEL__INDEXES_TABLE_SUPER_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
