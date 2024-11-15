import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleLoadFromDataSourceError = (error: AllErrors & { family: "LOAD_FROM_DATA_SOURCE" }) => {
    switch (error.code) {
        case "ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCES_CANNOT_BE_EMPTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_SOURCE_TABLE_NOT_MATCH":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_SOURCE_TABLE_NOT_MATCH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_TARGET_TABLE_NOT_MATCH":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_TARGET_TABLE_NOT_MATCH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEX_COLUMN_TABLE_NOT_MATCH":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__INDEX_COLUMN_TABLE_NOT_MATCH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_TABLE_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_LOAD_FROM_DATA_SOURCE__ASSOCIATION_COLUMN_REFERENCE_COLUMN_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
