import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityPropertyCategoryJsonSchema: JSONSchemaType<EntityPropertyCategory> = {
    "enum": [
        "Formula",
        "ManyToMany_Source",
        "ManyToMany_Target",
        "ManyToMany_View",
        "ManyToOne",
        "OneToMany",
        "OneToOne_Source",
        "OneToOne_Target",
        "Transient",
        "enum",
        "scalar"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EntityPropertyCategory>

export const validateEntityPropertyCategory = createSchemaValidator<EntityPropertyCategory>(EntityPropertyCategoryJsonSchema)

export default {
    uri: "$innerType/EntityPropertyCategory",
    schema: EntityPropertyCategoryJsonSchema,
    validate: validateEntityPropertyCategory,
}
