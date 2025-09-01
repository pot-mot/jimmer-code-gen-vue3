import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManySourcePropertyJsonSchema: JSONSchemaType<ManyToManySourceProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_ManyToMany_Source"
                        },
                        "associationId": {
                            "type": "string"
                        },
                        "idView": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "name"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "associationId",
                        "category",
                        "idView",
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinTableName": {
                            "type": "string"
                        },
                        "joinColumnName": {
                            "type": "string"
                        },
                        "inverseJoinColumnName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "inverseJoinColumnName",
                        "joinColumnName",
                        "joinTableName"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
                        }
                    },
                    "required": [
                        "columnInfo"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_ManyToMany_Source"
                        },
                        "associationId": {
                            "type": "string"
                        },
                        "idView": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "name"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "associationId",
                        "category",
                        "idView",
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinTableName": {
                            "type": "string"
                        },
                        "joinColumns": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "joinColumnName": {
                                        "type": "string"
                                    },
                                    "inverseJoinColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "inverseJoinColumnName",
                                    "joinColumnName"
                                ]
                            }
                        }
                    },
                    "required": [
                        "joinColumns",
                        "joinTableName"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "embeddableTypeId": {
                            "type": "string"
                        },
                        "propOverrides": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "propertyId": {
                                        "type": "string"
                                    },
                                    "overrideColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "overrideColumnName",
                                    "propertyId"
                                ]
                            }
                        }
                    },
                    "required": [
                        "embeddableTypeId",
                        "propOverrides"
                    ]
                }
            ]
        }
    ],
    "definitions": {
        "Omit<BaseProperty,\"nullable\">": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
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
        },
        "Omit<Column,\"id\">": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "comment": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "integer"
                },
                "numericPrecision": {
                    "type": "integer"
                },
                "defaultValue": {
                    "type": "string"
                },
                "partOfPrimaryKey": {
                    "type": "boolean"
                },
                "autoIncrement": {
                    "type": "boolean"
                },
                "otherConstraints": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "comment",
                "defaultValue",
                "name",
                "nullable",
                "partOfPrimaryKey",
                "type"
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
