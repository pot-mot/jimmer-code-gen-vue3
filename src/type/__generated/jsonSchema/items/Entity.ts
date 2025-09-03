import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityJsonSchema: JSONSchemaType<Entity> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "subPackagePath": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
        },
        "tableName": {
            "type": "string"
        },
        "extendsIds": {
            "type": "array",
            "items": {
                "type": "string"
            }
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
        "idProperty": {
            "$ref": "#/definitions/IdProperty"
        },
        "properties": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|OneToOneSourceProperty|OneToOneTargetProperty|OneToManyProperty|ManyToOneProperty|ManyToManySourceProperty|ManyToManyTargetProperty|ManyToManyViewProperty|{category:\"FORMULA\";dependencies:string[];body:string;rawType:string;}|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:false;}&BaseProperty)|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&BaseProperty)|({category:\"TRANSIENT\";}&BaseProperty&{rawType:string;})|({category:\"TRANSIENT\";}&BaseProperty&{entityId:string;resolver:string;typeIsList:boolean;})"
            }
        }
    },
    "required": [
        "comment",
        "extendsIds",
        "extraAnnotations",
        "extraImports",
        "id",
        "idProperty",
        "name",
        "properties",
        "subPackagePath",
        "tableName"
    ],
    "definitions": {
        "IdProperty": {
            "anyOf": [
                {
                    "allOf": [
                        {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "const": "id"
                                },
                                "rawType": {
                                    "type": "string"
                                },
                                "nullable": {
                                    "type": "boolean",
                                    "const": false
                                },
                                "GeneratedValue": {
                                    "anyOf": [
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "IDENTITY"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "SEQUENCE"
                                                },
                                                "sequenceName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "sequenceName",
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "UUID"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "CustomerIdGenerator"
                                                },
                                                "generatorName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "generatorName",
                                                "type"
                                            ]
                                        }
                                    ]
                                }
                            },
                            "required": [
                                "GeneratedValue",
                                "category",
                                "nullable",
                                "rawType"
                            ]
                        },
                        {
                            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                        },
                        {
                            "type": "object",
                            "properties": {
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "id"
                                },
                                "rawType": {
                                    "type": "string"
                                },
                                "nullable": {
                                    "type": "boolean",
                                    "const": false
                                },
                                "GeneratedValue": {
                                    "anyOf": [
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "IDENTITY"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "SEQUENCE"
                                                },
                                                "sequenceName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "sequenceName",
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "UUID"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "CustomerIdGenerator"
                                                },
                                                "generatorName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "generatorName",
                                                "type"
                                            ]
                                        }
                                    ]
                                }
                            },
                            "required": [
                                "GeneratedValue",
                                "category",
                                "nullable",
                                "rawType"
                            ]
                        },
                        {
                            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                        },
                        {
                            "type": "object",
                            "properties": {
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "id"
                                },
                                "rawType": {
                                    "type": "string"
                                },
                                "nullable": {
                                    "type": "boolean",
                                    "const": false
                                },
                                "GeneratedValue": {
                                    "anyOf": [
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "IDENTITY"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "SEQUENCE"
                                                },
                                                "sequenceName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "sequenceName",
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "UUID"
                                                }
                                            },
                                            "required": [
                                                "type"
                                            ]
                                        },
                                        {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "const": "CustomerIdGenerator"
                                                },
                                                "generatorName": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "generatorName",
                                                "type"
                                            ]
                                        }
                                    ]
                                }
                            },
                            "required": [
                                "GeneratedValue",
                                "category",
                                "nullable",
                                "rawType"
                            ]
                        },
                        {
                            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
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
            ]
        },
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
        "Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">": {
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
                "otherConstraints": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "comment",
                "name",
                "nullable",
                "type"
            ]
        },
        "({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|OneToOneSourceProperty|OneToOneTargetProperty|OneToManyProperty|ManyToOneProperty|ManyToManySourceProperty|ManyToManyTargetProperty|ManyToManyViewProperty|{category:\"FORMULA\";dependencies:string[];body:string;rawType:string;}|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:false;}&BaseProperty)|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&BaseProperty)|({category:\"TRANSIENT\";}&BaseProperty&{rawType:string;})|({category:\"TRANSIENT\";}&BaseProperty&{entityId:string;resolver:string;typeIsList:boolean;})": {
            "anyOf": [
                {
                    "allOf": [
                        {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "logicalDelete",
                                "logicalDeleteDefaultValue",
                                "logicalDeleteDeletedValue",
                                "logicalDeleteType"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "logicalDelete",
                                "logicalDeleteDefaultValue",
                                "logicalDeleteDeletedValue",
                                "logicalDeleteType"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "SCALAR"
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                },
                                "logicalDeleteDefaultValue": {
                                    "type": "string"
                                },
                                "logicalDeleteDeletedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
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
                                    "const": "ENUM"
                                },
                                "enumId": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "category",
                                "enumId"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                                }
                            },
                            "required": [
                                "columnInfo"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
                            ]
                        }
                    ]
                },
                {
                    "$ref": "#/definitions/OneToOneSourceProperty"
                },
                {
                    "$ref": "#/definitions/OneToOneTargetProperty"
                },
                {
                    "$ref": "#/definitions/OneToManyProperty"
                },
                {
                    "$ref": "#/definitions/ManyToOneProperty"
                },
                {
                    "$ref": "#/definitions/ManyToManySourceProperty"
                },
                {
                    "$ref": "#/definitions/ManyToManyTargetProperty"
                },
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_ManyToMany_View"
                        },
                        "baseToManyPropertyId": {
                            "type": "string"
                        },
                        "deeperAssociationPropertyId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "baseToManyPropertyId",
                        "category",
                        "deeperAssociationPropertyId"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "FORMULA"
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
                                    "const": "FORMULA"
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
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": false
                                }
                            },
                            "required": [
                                "orderedProperty"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "FORMULA"
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
                                "orderedProperty": {
                                    "type": "boolean",
                                    "const": true
                                },
                                "orderDirection": {
                                    "enum": [
                                        "ASC",
                                        "DESC"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "orderDirection",
                                "orderedProperty"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                                    "const": "TRANSIENT"
                                }
                            },
                            "required": [
                                "category"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
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
                },
                {
                    "allOf": [
                        {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "const": "TRANSIENT"
                                }
                            },
                            "required": [
                                "category"
                            ]
                        },
                        {
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
                                },
                                "nullable": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "comment",
                                "extraAnnotations",
                                "extraImports",
                                "id",
                                "name",
                                "nullable"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "entityId": {
                                    "type": "string"
                                },
                                "resolver": {
                                    "type": "string"
                                },
                                "typeIsList": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "entityId",
                                "resolver",
                                "typeIsList"
                            ]
                        }
                    ]
                }
            ]
        },
        "OneToOneSourceProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_OneToOne_Source"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "category",
                        "onDissociateAction"
                    ]
                },
                {
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
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "id",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
                    ]
                }
            ]
        },
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
                            "const": "ASSOCIATION_OneToOne_Target"
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
                        "category",
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
                        "associationId": {
                            "type": "string"
                        },
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
                    ]
                }
            ]
        },
        "OneToManyProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_OneToMany"
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
                        "category",
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
                        "associationId": {
                            "type": "string"
                        },
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
                    ]
                }
            ]
        },
        "ManyToOneProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_ManyToOne"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "category",
                        "onDissociateAction"
                    ]
                },
                {
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
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "id",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
                    ]
                }
            ]
        },
        "ManyToManySourceProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_ManyToMany_Source"
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
                        "category",
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
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
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
                            "const": "ASSOCIATION_ManyToMany_Target"
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
                        "category",
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
                        "associationId": {
                            "type": "string"
                        },
                        "entityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "entityId",
                        "idViewName"
                    ]
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Entity>

export const validateEntity = createSchemaValidator<Entity>(EntityJsonSchema)

export default {
    uri: "$innerType/Entity",
    schema: EntityJsonSchema,
    validate: validateEntity,
}
