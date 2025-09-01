import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MappedSuperClassJsonSchema: JSONSchemaType<MappedSuperClass> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "package": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
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
        "properties": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&EmbeddableProperty)|OneToOneTargetProperty|OneToManyProperty|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnNames:string[];}&EmbeddableProperty)|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumnName:string;inverseJoinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumnName:string;inverseJoinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumns:{joinColumnName:string;inverseJoinColumnName:string;}[];}&EmbeddableProperty)|ManyToManyTargetProperty|ManyToManyViewProperty|{category:\"FORMULA\";dependencies:string[];body:string;rawType:string;}|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:false;}&BaseProperty)|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&BaseProperty)|({category:\"TRANSIENT\";resolver?:string|undefined;}&BaseProperty&EntityTypeProperty)|({category:\"TRANSIENT\";resolver?:string|undefined;}&BaseProperty&{rawType:string;})"
            }
        }
    },
    "required": [
        "comment",
        "extendsIds",
        "extraAnnotations",
        "extraImports",
        "id",
        "name",
        "package",
        "properties"
    ],
    "definitions": {
        "({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:true;keyGroups:string[];}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{key:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"boolean\";logicalDeleteDefaultValue:\"false\"|\"true\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"int\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"long\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"uuid\";}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"time\";logicalDeleteDeletedValue:\"now\"|\"null\";nullable:true;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&{arrayType:true;databaseType?:string|undefined;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:false;})|({category:\"SCALAR\";rawType:string;serialized:boolean;defaultValue:string;}&BaseProperty&{logicalDelete:false;}&EmbeddableProperty&{arrayType:true;databaseType?:string|undefined;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:true;keyGroups:string[];}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{key:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:true;logicalDeleteType:\"enum\";logicalDeleteDefaultValue:string;logicalDeleteDeletedValue:string;}&{logicalDelete:true;logicalDeleteType:\"enum\";}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ENUM\";enumId:string;}&BaseProperty&{logicalDelete:false;}&{logicalDelete:false;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_OneToOne_Source\";associationId:string;idView?:{name:string;}|undefined;onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&EmbeddableProperty)|OneToOneTargetProperty|OneToManyProperty|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_ManyToOne\";associationId:string;idView:{name:string;};onDissociateAction:OnDissociationAction;}&BaseProperty&EntityTypeProperty&{joinColumnNames:string[];}&EmbeddableProperty)|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumnName:string;inverseJoinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:false;})|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumnName:string;inverseJoinColumnName:string;}&{columnInfo:Omit<Column,\"id\">;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";})|({category:\"ASSOCIATION_ManyToMany_Source\";associationId:string;idView:{name:string;};nullable:false;typeIsList:true;}&Omit<BaseProperty,\"nullable\">&EntityTypeProperty&{joinTableName:string;joinColumns:{joinColumnName:string;inverseJoinColumnName:string;}[];}&EmbeddableProperty)|ManyToManyTargetProperty|ManyToManyViewProperty|{category:\"FORMULA\";dependencies:string[];body:string;rawType:string;}|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:false;}&BaseProperty)|({category:\"FORMULA\";sql:string;rawType:string;}&{orderedProperty:true;orderDirection:\"ASC\"|\"DESC\";}&BaseProperty)|({category:\"TRANSIENT\";resolver?:string|undefined;}&BaseProperty&EntityTypeProperty)|({category:\"TRANSIENT\";resolver?:string|undefined;}&BaseProperty&{rawType:string;})": {
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "const": "ASSOCIATION_OneToOne_Source"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "const": "ASSOCIATION_OneToOne_Source"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
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
                                "columnInfo": {
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "const": "ASSOCIATION_OneToOne_Source"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
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
                                    "const": "ASSOCIATION_ManyToOne"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
                                "category",
                                "idView",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "const": "ASSOCIATION_ManyToOne"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
                                "category",
                                "idView",
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
                                    "$ref": "#/definitions/Omit<Column,\"id\">"
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
                                    "const": "ASSOCIATION_ManyToOne"
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
                                "onDissociateAction": {
                                    "$ref": "#/definitions/OnDissociationAction"
                                }
                            },
                            "required": [
                                "associationId",
                                "category",
                                "idView",
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
                                }
                            },
                            "required": [
                                "entityId"
                            ]
                        }
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
                }
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
                        "mappedBy": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "associationId",
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
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
        "OneToManyProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ASSOCIATION_OneToMany"
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
                        "associationId",
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
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
                        "associationId",
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
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
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
                    ]
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MappedSuperClass>

export const validateMappedSuperClass = createSchemaValidator<MappedSuperClass>(MappedSuperClassJsonSchema)

export default {
    uri: "$innerType/MappedSuperClass",
    schema: MappedSuperClassJsonSchema,
    validate: validateMappedSuperClass,
}
