import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleModelError = (error: AllErrors & {family: "MODEL"}) => {
    switch (error.code) {
        case "DEFAULT_ITEM_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_MODEL__DEFAULT_ITEM_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "ID_PROPERTY_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_MODEL__ID_PROPERTY_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEX_REF_PROPERTY_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_MODEL__INDEX_REF_PROPERTY_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
