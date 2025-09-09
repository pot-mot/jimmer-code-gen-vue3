import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OrderDirectionJsonSchema: JSONSchemaType<OrderDirection> = {
    "enum": [
        "ASC",
        "DESC"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OrderDirection>

export const validateOrderDirection = createSchemaValidator<OrderDirection>(OrderDirectionJsonSchema)

export default {
    uri: "$innerType/OrderDirection",
    schema: OrderDirectionJsonSchema,
    validate: validateOrderDirection,
}
