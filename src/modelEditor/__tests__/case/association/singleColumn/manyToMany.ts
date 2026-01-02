import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";
import {
    LIST_ID_VIEW_TEMPLATE,
    MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE, MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
    MID_TABLE_COMMENT_TEMPLATE, MID_TABLE_NAME_TEMPLATE
} from "@/modelEditor/utils/AssociationTemplate.ts";

export const ASSOCIATION_ManyToMany: ManyToManyAssociationIdOnly = {
    id: testIds.ASSOCIATION_ManyToMany,
    name: "many_to_many_mapping",
    nameTemplate: MID_TABLE_NAME_TEMPLATE,
    useNameTemplate: false,
    comment: "ManyToMany Association",
    commentTemplate: MID_TABLE_COMMENT_TEMPLATE,
    useCommentTemplate: false,
    type: 'ManyToMany',
    sourceEntityId: testIds.ENTITY_ManyToMany_source,
    sourcePropertyId: testIds.PROPERTY_ManyToMany_source,
    referencedEntityId: testIds.ENTITY_target,
    withMappedProperty: true,
    mappedProperty: {
        id: testIds.ASSOCIATION_ManyToMany,
        associationId: testIds.ASSOCIATION_ManyToMany,
        referencedEntityId: testIds.ENTITY_ManyToMany_source,
        category: "ManyToMany_Mapped",
        typeIsList: true,
        mappedById: testIds.PROPERTY_ManyToMany_source,
        nullable: false,
        name: "sourceList",
        nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
        useNameTemplate: false,
        comment: "Mapped",
        commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
        useCommentTemplate: false,
        idViewName: "sourceIds",
        idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
        useIdViewNameTemplate: false,
        extraImports: [],
        extraAnnotations: [],
    },
    foreignKeyType: "REAL"
}

export const PROPERTY_ManyToMany_source: ManyToManySourceProperty = {
    id: testIds.PROPERTY_ManyToMany_source,
    name: "targetList",
    comment: "manyToMany Source",
    extraImports: [],
    extraAnnotations: [],
    category: "ManyToMany_Source",
    typeIsList: true,
    joinInfo: {
        type: "MidTable",
        sourceJoinInfo: {
            type: "Unknown",
            foreignKeyType: "REAL",
        },
        targetJoinInfo: {
            type: "Unknown",
            foreignKeyType: "REAL",
        },
        midTableExtraInfo: {}
    },
    autoGenerateJoinInfo: true,
    associationId: testIds.ASSOCIATION_ManyToMany,
    referencedEntityId: testIds.ENTITY_target,
    idViewName: "targetIds",
    idViewNameTemplate: LIST_ID_VIEW_TEMPLATE,
    useIdViewNameTemplate: false,
    nullable: false
}

export const ENTITY_ManyToMany_source: EntityWithProperties = {
    id: testIds.ENTITY_ManyToMany_source,
    groupId: testIds.GROUP_ASSOCIATION,
    name: "ManyToManySourceEntity",
    comment: "Many to many source entity",
    tableName: "many_to_many_source",
    autoSyncTableName: false,
    extendsIds: [],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "",
    properties: [
        {
            id: testIds.ENTITY_ManyToMany_source,
            name: "id",
            comment: "id comment",
            extraImports: [],
            extraAnnotations: [],
            category: "ID_COMMON",
            nullable: false,
            rawType: "Int",
            columnInfo: {
                name: "id",
                comment: "id comment",
                nullable: false,
                type: "int"
            },
            autoSyncColumnName: false,
            defaultOrderDirection: "ASC"
        },
        PROPERTY_ManyToMany_source,
    ]
}
