import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";

const GraphDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,

        "AssociationEdge": {
            "type": "object",
            "required": ["shape", "data"],
            "properties": {
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
            "required": ["shape", "data"],
            "properties": {
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
                                    { "$ref": "#/definitions/TableNode" },
                                    { "$ref": "#/definitions/AssociationEdge" }
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

export interface GraphData {
    json: {
        cells: []
    },
    zoom: string,
    transform: number | undefined,
}

export const {validate: validateGraphData} =
    useShapeValidate<GraphData>(
        "GraphData",
        GraphDataShapeJsonSchema
    )
