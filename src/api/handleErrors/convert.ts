import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";
import {AllErrors} from "@/api/__generated";

export const handleConvertError = (error: AllErrors & {family: "CONVERT"}) => {
    switch (error.code) {
        case "MODEL_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__MODEL_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ENTITY_MATCH_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__ENTITY_MATCH_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_CANNOT_BE_ONE_TO_MANY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__ASSOCIATION_CANNOT_BE_ONE_TO_MANY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "MULTIPLE_COLUMNS_NOT_SUPPORTED":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__MULTIPLE_COLUMNS_NOT_SUPPORTED",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "PROPERTY_NAME_DUPLICATE":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__PROPERTY_NAME_DUPLICATE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "SUPER_TABLE_SUPER_ENTITY_NOT_MATCH":
            sendI18nMessage({
                key: "ErrorCode_CONVERT__SUPER_TABLE_SUPER_ENTITY_NOT_MATCH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
