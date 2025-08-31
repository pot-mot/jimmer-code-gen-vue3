import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationTypeJsonSchema: JSONSchemaType<AssociationType> = {
    "enum": [
        "MANY TO MANY",
        "MANY TO ONE",
        "ONE TO MANY",
        "ONE TO ONE"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateAssociationType = createSchemaValidator<AssociationType>(AssociationTypeJsonSchema)

export default {
    uri: "$innerType/AssociationType",
    schema: AssociationTypeJsonSchema,
    validate: validateAssociationType,
}
