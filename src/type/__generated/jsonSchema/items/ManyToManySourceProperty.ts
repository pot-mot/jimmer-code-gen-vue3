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
                            "const": "ManyToMany_Source"
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
                        "associationName",
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
                            "const": "ManyToMany_Source"
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
                        "associationName",
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
        "Omit<BaseProperty,\"nullable\">": {
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
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "name"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateManyToManySourceProperty = createSchemaValidator<ManyToManySourceProperty>(ManyToManySourcePropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManySourceProperty",
    schema: ManyToManySourcePropertyJsonSchema,
    validate: validateManyToManySourceProperty,
}
