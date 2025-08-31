import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddableTypeJsonSchema: JSONSchemaType<EmbeddableType> = {
    "type": "object",
    "properties": {
        "package": {
            "type": "string"
        },
        "name": {
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
        "properties": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"enum\";enumName:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&{logicalDelete:false;}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&{logicalDelete:false;}&ColumnProperty)"
            }
        }
    },
    "required": [
        "extraAnnotations",
        "extraImports",
        "name",
        "package",
        "properties"
    ],
    "definitions": {
        "({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&ColumnProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&ColumnProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"scalar\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"enum\";enumName:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:true;keyGroups:string[];}&{logicalDelete:false;}&{logicalDelete:false;}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:false;}&{logicalDelete:true;logicalDeleteType:\"enum\";enumName:string;logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&ColumnProperty)|({category:\"enum\";enumName:string;}&BaseProperty&{key:false;}&{logicalDelete:false;}&{logicalDelete:false;}&ColumnProperty)": {
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
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateEmbeddableType = createSchemaValidator<EmbeddableType>(EmbeddableTypeJsonSchema)

export default {
    uri: "$innerType/EmbeddableType",
    schema: EmbeddableTypeJsonSchema,
    validate: validateEmbeddableType,
}
