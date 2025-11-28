import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManySourcePropertyJsonSchema: JSONSchemaType<ManyToManySourceProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ManyToMany_Source"
                },
                "typeIsList": {
                    "type": "boolean",
                    "const": true
                },
                "joinInfo": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "MidTable"
                        },
                        "sourceJoinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "targetJoinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "midTableExtraInfo": {
                            "type": "object",
                            "properties": {
                                "readonly": {
                                    "type": "boolean"
                                },
                                "preventDeletionBySource": {
                                    "type": "boolean"
                                },
                                "preventDeletionByTarget": {
                                    "type": "boolean"
                                },
                                "cascadeDeletedBySource": {
                                    "type": "boolean"
                                },
                                "cascadeDeletedByTarget": {
                                    "type": "boolean"
                                },
                                "deletedWhenEndpointIsLogicallyDeleted": {
                                    "type": "boolean"
                                },
                                "filter": {
                                    "type": "object",
                                    "properties": {
                                        "columnName": {
                                            "type": "string"
                                        },
                                        "type": {
                                            "type": "string"
                                        },
                                        "value": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "required": [
                                        "columnName",
                                        "type",
                                        "value"
                                    ]
                                },
                                "logicalDeleteFilter": {
                                    "type": "object",
                                    "properties": {
                                        "columnName": {
                                            "type": "string"
                                        },
                                        "type": {
                                            "type": "string"
                                        },
                                        "nullable": {
                                            "type": "boolean"
                                        },
                                        "value": {
                                            "type": "string"
                                        },
                                        "generatorType": {
                                            "type": "string"
                                        },
                                        "generatorRef": {
                                            "type": "string"
                                        },
                                        "initializedValue": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "columnName",
                                        "generatorRef",
                                        "generatorType",
                                        "initializedValue",
                                        "nullable",
                                        "type",
                                        "value"
                                    ]
                                }
                            }
                        }
                    },
                    "required": [
                        "midTableExtraInfo",
                        "sourceJoinInfo",
                        "targetJoinInfo",
                        "type"
                    ]
                },
                "autoGenerateJoinInfo": {
                    "type": "boolean"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
                }
            },
            "required": [
                "autoGenerateJoinInfo",
                "category",
                "joinInfo",
                "nullable",
                "typeIsList"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
            "type": "object",
            "properties": {
                "associationId": {
                    "type": "string"
                },
                "referencedEntityId": {
                    "type": "string"
                },
                "idViewName": {
                    "type": "string"
                },
                "idViewNameTemplate": {
                    "type": "string"
                },
                "useIdViewNameTemplate": {
                    "type": "boolean"
                }
            },
            "required": [
                "associationId",
                "idViewName",
                "idViewNameTemplate",
                "referencedEntityId",
                "useIdViewNameTemplate"
            ]
        }
    ],
    "definitions": {
        "FkJoinInfo": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "Unknown"
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "foreignKeyType",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "SingleColumn"
                        },
                        "columnName": {
                            "type": "string"
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "columnName",
                        "foreignKeyType",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "MultiColumn"
                        },
                        "embeddableTypeId": {
                            "type": "string"
                        },
                        "columnRefs": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "columnName": {
                                        "type": "string"
                                    },
                                    "referencedColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "columnName",
                                    "referencedColumnName"
                                ]
                            }
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "columnRefs",
                        "embeddableTypeId",
                        "foreignKeyType",
                        "type"
                    ]
                }
            ]
        },
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
        },
        "Omit<BaseProperty,\"nullable\">": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "comment": {
                    "type": "string"
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
                "extraAnnotations",
                "extraImports",
                "id",
                "name"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ManyToManySourceProperty>

export const validateManyToManySourceProperty = createSchemaValidator<ManyToManySourceProperty>(ManyToManySourcePropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManySourceProperty",
    schema: ManyToManySourcePropertyJsonSchema,
    validate: validateManyToManySourceProperty,
}
