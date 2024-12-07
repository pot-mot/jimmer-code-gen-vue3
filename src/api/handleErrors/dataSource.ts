import {sendI18nMessage} from "@/message/message.ts";
import {EXPECT_ERROR} from "@/api/handleError.ts";
import {AllErrors} from "@/api/__generated";

export const handleDataSourceError = (error: AllErrors & { family: "DATA_SOURCE" }) => {
    switch (error.code) {
        case "CONNECT_FAIL":
            sendI18nMessage({
                key: "ErrorCode_DATA_SOURCE__CONNECT_FAIL",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "H2__INIT_FAIL":
            sendI18nMessage({
                key: "ErrorCode_DATA_SOURCE__H2__INIT_FAIL",
                args: [error]
            }, "error", error);
            throw EXPECT_ERROR;

        case "SQL_EXECUTE_FAIL":
            sendI18nMessage({
                key: "ErrorCode_DATA_SOURCE__SQL_EXECUTE_FAIL",
                args: [error]
            }, "error", error);
            throw EXPECT_ERROR;

        case "DATA_SOURCE_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_DATA_SOURCE__DATA_SOURCE_NOT_FOUND",
                args: [error]
            }, "error", error);
            throw EXPECT_ERROR;
    }
}
