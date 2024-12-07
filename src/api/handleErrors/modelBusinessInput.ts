import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleModelBusinessInputError = (error: AllErrors & {family: "MODEL_BUSINESS_INPUT"}) => {
    switch (error.code) {
        case "ENTITY_CANNOT_MATCH_TABLE":
            sendI18nMessage({
                key: "ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_CANNOT_MATCH_TABLE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_MODEL_BUSINESS_INPUT__ENTITY_MATCHED_TABLE_CONVERTED_ENTITY_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "PROPERTY_CANNOT_MATCH_COLUMN":
            sendI18nMessage({
                key: "ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_MATCH_COLUMN",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "PROPERTY_CANNOT_REMATCH_OLD_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_CANNOT_REMATCH_OLD_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_MODEL_BUSINESS_INPUT__PROPERTY_MATCHED_MORE_THAN_ONE_OLD_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
