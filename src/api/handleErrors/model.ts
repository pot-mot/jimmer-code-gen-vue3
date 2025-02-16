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

        case "ID_PROPERTY_MORE_THAN_ONE":
            sendI18nMessage({
                key: "ErrorCode_MODEL__ID_PROPERTY_MORE_THAN_ONE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "LONG_ASSOCIATION_CIRCULAR_DEPENDENCE":
            sendI18nMessage({
                key: "ErrorCode_MODEL__LONG_ASSOCIATION_CIRCULAR_DEPENDENCE",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "SUB_ENTITY_NO_CURRENT_PATH":
            sendI18nMessage({
                key: "ErrorCode_MODEL__SUB_ENTITY_NO_CURRENT_PATH",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "INDEX_REF_PROPERTY_NOT_FOUND":
            sendI18nMessage({
                key: "ErrorCode_MODEL__INDEX_REF_PROPERTY_NOT_FOUND",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_PARENT_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR

        case "TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY":
            sendI18nMessage({
                key: "ErrorCode_MODEL__TREE_ENTITY_CANNOT_FOUND_CHILDREN_PROPERTY",
                args: [error]
            }, "error", error)
            throw EXPECT_ERROR
    }
}
