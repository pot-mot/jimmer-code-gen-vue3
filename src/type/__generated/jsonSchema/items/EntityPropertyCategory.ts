import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityPropertyCategoryJsonSchema: JSONSchemaType<EntityPropertyCategory> = {
    "enum": [
        "ASSOCIATION_ManyToMany_Source",
        "ASSOCIATION_ManyToMany_Target",
        "ASSOCIATION_ManyToMany_View",
        "ASSOCIATION_ManyToOne",
        "ASSOCIATION_OneToMany",
        "ASSOCIATION_OneToOne_Source",
        "ASSOCIATION_OneToOne_Target",
        "ENUM",
        "FORMULA",
        "SCALAR",
        "TRANSIENT"
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
