import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {DeepReadonly} from "vue";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";

const GraphDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,

        "AssociationEdge": {
            "type": "object",
            "required": ["id", "shape", "data"],
            "properties": {
                "id": {
                    "type": "string",
                },
                "shape": {
                    "type": "string",
                    "enum": [ASSOCIATION_EDGE]
                },
                "data": {
                    "type": "object",
                    "required": ["association"],
                    "properties": {
                        "association": {
                            "$ref": "#/definitions/GenAssociationModelInput"
                        }
                    }
                }
            }
        },

        "TableNode": {
            "type": "object",
            "required": ["id", "shape", "data"],
            "properties": {
                "id": {
                    "type": "string",
                },
                "shape": {
                    "type": "string",
                    "enum": [TABLE_NODE]
                },
                "data": {
                    "type": "object",
                    "required": ["table"],
                    "properties": {
                        "table": {
                            "$ref": "#/definitions/GenTableModelInput"
                        }
                    }
                }
            }
        },

        "GraphData": {
            "type": "object",
            "required": ["json", "zoom"],
            "properties": {
                "json": {
                    "type": "object",
                    "required": ["cells"],
                    "properties": {
                        "cells": {
                            "type": "array",
                            "items": {
                                "anyOf": [
                                    {"$ref": "#/definitions/TableNode"},
                                    {"$ref": "#/definitions/AssociationEdge"}
                                ]
                            }
                        }
                    }
                },
                "zoom": {
                    "type": "number"
                },
                "transform": {
                    "type": ["string", "null"]
                }
            }
        }
    }
} as const

export interface TableNode {
    id: string,
    data: {
        table: GenTableModelInput
    },
    shape: typeof TABLE_NODE
}

export interface AssociationEdge {
    id: string,
    data: {
        association: GenAssociationModelInput
    },
    shape: typeof ASSOCIATION_EDGE
}

export interface ModelEditorData {
    json: {
        cells: Array<TableNode | AssociationEdge>
    },
    zoom: number,
    transform: string | undefined,
}

export const {validate: validateModelEditorData} =
    useShapeValidate<DeepReadonly<ModelEditorData>>(
        GraphDataShapeJsonSchema,
        "GraphData",
    )
