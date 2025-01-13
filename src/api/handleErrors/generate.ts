import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleGenerateError = (error: AllErrors & {family: "GENERATE"}) => {
    switch (error.code) {
        case "MODEL_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_GENERATE__MODEL_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ENTITY_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_GENERATE__ENTITY_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEX_COLUMN_NOT_FOUND_IN_TABLE":
            sendI18nMessage({
                key: "ErrorCode_GENERATE__INDEX_COLUMN_NOT_FOUND_IN_TABLE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "DEFAULT_IMPORT_MORE_THAN_ONE":
            sendI18nMessage({
                key: "ErrorCode_GENERATE__DEFAULT_IMPORT_MORE_THAN_ONE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_GENERATE__OUT_ASSOCIATION_CANNOT_FOUNT_SOURCE_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
