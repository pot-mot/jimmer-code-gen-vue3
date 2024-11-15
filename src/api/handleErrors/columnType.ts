import {AllErrors} from "@/api/__generated";
import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";

export const handleColumnTypeError = (error: AllErrors & {family: "COLUMN_TYPE"}) => {
    switch (error.code) {
        case "MISS_REQUIRED_PARAM":
            sendI18nMessage({
                key: "ErrorCode_COLUMN_TYPE_MISS_REQUIRED_PARAM",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
