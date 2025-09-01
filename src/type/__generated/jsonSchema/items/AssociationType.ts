import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationTypeJsonSchema: JSONSchemaType<AssociationType> = {
    "enum": [
        "MANY_TO_MANY",
        "MANY_TO_ONE",
        "ONE_TO_ONE"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<AssociationType>

export const validateAssociationType = createSchemaValidator<AssociationType>(AssociationTypeJsonSchema)

export default {
    uri: "$innerType/AssociationType",
    schema: AssociationTypeJsonSchema,
    validate: validateAssociationType,
}
