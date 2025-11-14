import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {PartialModelGraphSubData_JsonSchema} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import Model from "@/type/__generated/jsonSchema/items/Model.ts";
import ModelViewport from "@/type/__generated/jsonSchema/items/ModelViewport.ts";

export const PartialModelGraphData_JsonSchema: JSONSchemaType<PartialModelGraphData> = {
    type: "object",
    properties: {
        model: Model.schema,
        viewport: ModelViewport.schema,
        subData: PartialModelGraphSubData_JsonSchema,
    },
    required: ["model", "subData"],
    definitions: {
        ...PartialModelGraphSubData_JsonSchema.definitions,
        ...Model.schema.definitions,
        ...ModelViewport.schema.definitions,
    }
}

export const validatePartialModelGraphData = createSchemaValidator(PartialModelGraphData_JsonSchema)

export default {
    uri: "$innerType/PartialModelGraphData",
    schema: PartialModelGraphData_JsonSchema,
    validate: validatePartialModelGraphData,
}
