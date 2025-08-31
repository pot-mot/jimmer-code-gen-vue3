import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToOnePropertyJsonSchema: JSONSchemaType<ManyToOneProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToOne"
                        },
                        "associationName": {
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
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "associationName",
                        "category",
                        "idView",
                        "onDissociateAction"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
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
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "entityName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityName"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinColumnName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "joinColumnName"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "comment": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "dataSize": {
                                    "type": "number"
                                },
                                "numericPrecision": {
                                    "type": "number"
                                },
                                "nullable": {
                                    "type": "boolean"
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
                            "const": "ManyToOne"
                        },
                        "associationName": {
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
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "associationName",
                        "category",
                        "idView",
                        "onDissociateAction"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
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
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "entityName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityName"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinColumnNames": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "joinColumnNames"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "embeddableTypeName": {
                            "type": "string"
                        },
                        "propOverrides": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "propertyName": {
                                        "type": "string"
                                    },
                                    "overrideColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "overrideColumnName",
                                    "propertyName"
                                ]
                            }
                        }
                    },
                    "required": [
                        "embeddableTypeName",
                        "propOverrides"
                    ]
                }
            ]
        }
    ],
    "definitions": {
        "OnDissociationAction": {
            "enum": [
                "CHECK",
                "DELETE",
                "LAX",
                "NONE",
                "SET_NULL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateManyToOneProperty = createSchemaValidator<ManyToOneProperty>(ManyToOnePropertyJsonSchema)

export default {
    uri: "$innerType/ManyToOneProperty",
    schema: ManyToOnePropertyJsonSchema,
    validate: validateManyToOneProperty,
}
