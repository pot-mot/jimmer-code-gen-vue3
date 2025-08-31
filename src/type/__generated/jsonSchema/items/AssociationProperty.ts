import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationPropertyJsonSchema: JSONSchemaType<AssociationProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToOne_Source"
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
                            "const": "OneToOne_Source"
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
        },
        {
            "$ref": "#/definitions/OneToOneTargetProperty"
        },
        {
            "$ref": "#/definitions/OneToManyProperty"
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
        },
        {
            "$ref": "#/definitions/ManyToManyTargetProperty"
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
        },
        "OneToOneTargetProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToOne_Target"
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
                        "mappedBy": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "associationName",
                        "category",
                        "idView",
                        "mappedBy",
                        "nullable"
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
                }
            ]
        },
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
        },
        "OneToManyProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToMany"
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
                        "mappedBy": {
                            "type": "string"
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
                        "mappedBy",
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
                }
            ]
        },
        "ManyToManyTargetProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_Target"
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
                        "mappedBy": {
                            "type": "string"
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
                        "mappedBy",
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
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateAssociationProperty = createSchemaValidator<AssociationProperty>(AssociationPropertyJsonSchema)

export default {
    uri: "$innerType/AssociationProperty",
    schema: AssociationPropertyJsonSchema,
    validate: validateAssociationProperty,
}
