import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OnDissociationActionJsonSchema: JSONSchemaType<OnDissociationAction> = {
    "enum": [
        "CHECK",
        "DELETE",
        "LAX",
        "NONE",
        "SET_NULL"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OnDissociationAction>

export const validateOnDissociationAction = createSchemaValidator<OnDissociationAction>(OnDissociationActionJsonSchema)

export default {
    uri: "$innerType/OnDissociationAction",
    schema: OnDissociationActionJsonSchema,
    validate: validateOnDissociationAction,
}
