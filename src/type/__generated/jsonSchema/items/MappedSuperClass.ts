import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MappedSuperClassJsonSchema: JSONSchemaType<MappedSuperClass> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "id": {
            "type": "string"
        },
        "groupId": {
            "type": "string"
        },
        "subPackagePath": {
            "type": "string"
        },
        "comment": {
            "type": "string"
        },
        "extendsIds": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "extraImports": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "extraAnnotations": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": [
        "comment",
        "extendsIds",
        "extraAnnotations",
        "extraImports",
        "groupId",
        "id",
        "name",
        "subPackagePath"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MappedSuperClass>

export const validateMappedSuperClass = createSchemaValidator<MappedSuperClass>(MappedSuperClassJsonSchema)

export default {
    uri: "$innerType/MappedSuperClass",
    schema: MappedSuperClassJsonSchema,
    validate: validateMappedSuperClass,
}
