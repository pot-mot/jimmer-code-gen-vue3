import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";
import {AllErrors} from "@/api/__generated";

export const handleConvertError = (error: AllErrors & {family: "CONVERT"}) => {
    switch (error.code) {
        case "MODEL_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_MODEL_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_IN_ASSOCIATION_CANNOT_FOUNT_TARGET_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_CANNOT_BE_ONE_TO_MANY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_ASSOCIATION_CANNOT_BE_ONE_TO_MANY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "MULTIPLE_COLUMNS_NOT_SUPPORTED":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_MULTIPLE_COLUMNS_NOT_SUPPORTED",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_ID_VIEW_MULTIPLE_PK_NOT_SUPPORTED",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_OUT_ASSOCIATION_CANNOT_FOUND_SOURCE_BASE_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_IN_ASSOCIATION_CANNOT_FOUND_TARGET_BASE_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "PROPERTY_NAME_DUPLICATE":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_PROPERTY_NAME_DUPLICATE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "SUPER_TABLE_SUPER_ENTITY_NOT_MATCH":
            sendI18nMessage({
                key: "ErrorCode_CONVERT_SUPER_TABLE_SUPER_ENTITY_NOT_MATCH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
