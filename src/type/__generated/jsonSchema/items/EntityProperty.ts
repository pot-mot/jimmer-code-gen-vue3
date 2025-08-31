import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityPropertyJsonSchema: JSONSchemaType<EntityProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "scalar"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "defaultValue",
                        "rawType",
                        "serialized"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "arrayType": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "arrayType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "enumName",
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                            "const": "enum"
                        },
                        "enumName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumName"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
        },
        {
            "$ref": "#/definitions/ManyToManyViewProperty"
        },
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "Formula"
                },
                "dependencies": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "body": {
                    "type": "string"
                },
                "rawType": {
                    "type": "string"
                }
            },
            "required": [
                "body",
                "category",
                "dependencies",
                "rawType"
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "Formula"
                        },
                        "sql": {
                            "type": "string"
                        },
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "rawType",
                        "sql"
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
                            "const": "Transient"
                        },
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category"
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
                            "const": "Transient"
                        },
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category"
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
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "rawType"
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
        },
        "ManyToManyViewProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_View"
                        },
                        "baseToManyPropertyName": {
                            "type": "string"
                        },
                        "deeperAssociationPropertyName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "baseToManyPropertyName",
                        "category",
                        "deeperAssociationPropertyName"
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
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateEntityProperty = createSchemaValidator<EntityProperty>(EntityPropertyJsonSchema)

export default {
    uri: "$innerType/EntityProperty",
    schema: EntityPropertyJsonSchema,
    validate: validateEntityProperty,
}
