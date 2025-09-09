import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationJsonSchema: JSONSchemaType<Association> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "$ref": "#/definitions/AssociationType"
        },
        "sourceEntityId": {
            "type": "string"
        },
        "targetEntityId": {
            "type": "string"
        },
        "sourcePropertyId": {
            "type": "string"
        },
        "targetPropertyId": {
            "type": "string"
        },
        "joinInfo": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "joinColumn"
                        },
                        "joinColumn": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "referencedColumnName": {
                                    "type": "string"
                                },
                                "foreignKeyType": {
                                    "$ref": "#/definitions/ForeignKeyType"
                                }
                            },
                            "required": [
                                "foreignKeyType",
                                "name",
                                "referencedColumnName"
                            ]
                        }
                    },
                    "required": [
                        "joinColumn",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "joinColumns"
                        },
                        "joinColumns": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "referencedColumnName": {
                                        "type": "string"
                                    },
                                    "foreignKeyType": {
                                        "$ref": "#/definitions/ForeignKeyType"
                                    }
                                },
                                "required": [
                                    "foreignKeyType",
                                    "name",
                                    "referencedColumnName"
                                ]
                            }
                        }
                    },
                    "required": [
                        "joinColumns",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "joinTable"
                        },
                        "joinTable": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "joinColumns": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string"
                                            },
                                            "referencedColumnName": {
                                                "type": "string"
                                            },
                                            "foreignKeyType": {
                                                "$ref": "#/definitions/ForeignKeyType"
                                            }
                                        },
                                        "required": [
                                            "foreignKeyType",
                                            "name",
                                            "referencedColumnName"
                                        ]
                                    }
                                },
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
                            },
                            "required": [
                                "joinColumns",
                                "name"
                            ]
                        }
                    },
                    "required": [
                        "joinTable",
                        "type"
                    ]
                }
            ]
        }
    },
    "required": [
        "id",
        "joinInfo",
        "name",
        "sourceEntityId",
        "sourcePropertyId",
        "targetEntityId",
        "targetPropertyId",
        "type"
    ],
    "definitions": {
        "AssociationType": {
            "enum": [
                "MANY_TO_MANY",
                "MANY_TO_ONE",
                "ONE_TO_ONE"
            ],
            "type": "string"
        },
        "ForeignKeyType": {
            "enum": [
                "AUTO",
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Association>

export const validateAssociation = createSchemaValidator<Association>(AssociationJsonSchema)

export default {
    uri: "$innerType/Association",
    schema: AssociationJsonSchema,
    validate: validateAssociation,
}
