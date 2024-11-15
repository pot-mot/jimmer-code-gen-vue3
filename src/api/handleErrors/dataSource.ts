import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";
import {AllErrors} from "@/api/__generated";

export const handleDataSourceError = (error: AllErrors & {family: "DATA_SOURCE"}) => {
    switch (error.code) {
        case "CONNECT_FAIL":
            sendI18nMessage({
                key: "ErrorCode_DATA_SOURCE_CONNECT_FAIL",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
