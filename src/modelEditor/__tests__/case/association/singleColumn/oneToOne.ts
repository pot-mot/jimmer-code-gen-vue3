import {testIds} from "@/modelEditor/__tests__/case/testIds.ts";
import {
    FK_COMMENT_TEMPLATE,
    FK_NAME_TEMPLATE,
    ID_VIEW_TEMPLATE,
    MAPPED_PROPERTY_COMMENT_TEMPLATE,
    MAPPED_PROPERTY_NAME_TEMPLATE, MID_TABLE_COMMENT_TEMPLATE, MID_TABLE_NAME_TEMPLATE
} from "@/modelEditor/utils/AssociationTemplate.ts";

export const ASSOCIATION_OneToOne: OneToOneAssociationIdOnly = {
    id: testIds.ASSOCIATION_OneToOne,
    name: "fk_one_to_one",
    nameTemplate: FK_NAME_TEMPLATE,
    useNameTemplate: false,
    comment: "OneToOne Association",
    commentTemplate: FK_COMMENT_TEMPLATE,
    useCommentTemplate: false,
    type: 'OneToOne',
    sourceEntityId: testIds.ENTITY_OneToOne_source,
    sourcePropertyId: testIds.PROPERTY_OneToOne_source,
    referencedEntityId: testIds.ENTITY_target,
    withMappedProperty: true,
    mappedProperty: {
        id: testIds.ASSOCIATION_OneToOne,
        associationId: testIds.ASSOCIATION_OneToOne,
        referencedEntityId: testIds.ENTITY_OneToOne_source,
        category: "OneToOne_Mapped",
        typeIsList: false,
        mappedById: testIds.PROPERTY_OneToOne_source,
        nullable: true,
        name: "source",
        nameTemplate: MAPPED_PROPERTY_NAME_TEMPLATE,
        useNameTemplate: false,
        comment: "Mapped",
        commentTemplate: MAPPED_PROPERTY_COMMENT_TEMPLATE,
        useCommentTemplate: false,
        idViewName: "sourceId",
        idViewNameTemplate: ID_VIEW_TEMPLATE,
        useIdViewNameTemplate: false,
        extraImports: [],
        extraAnnotations: [],
    },
    foreignKeyType: "REAL"
}

export const PROPERTY_OneToOne_source: OneToOneSourceProperty = {
    id: testIds.PROPERTY_OneToOne_source,
    name: "target",
    comment: "OneToOne Source",
    extraImports: [],
    extraAnnotations: [],
    category: "OneToOne_Source",
    typeIsList: false,
    joinInfo: {
        type: "Unknown",
        foreignKeyType: "REAL",
    },
    autoGenerateJoinInfo: true,
    onDissociateAction: "NONE",
    associationId: testIds.ASSOCIATION_OneToOne,
    referencedEntityId: testIds.ENTITY_target,
    idViewName: "targetId",
    idViewNameTemplate: ID_VIEW_TEMPLATE,
    useIdViewNameTemplate: false,
    nullable: true
}

export const ENTITY_OneToOne_source: EntityWithProperties = {
    id: testIds.ENTITY_OneToOne_source,
    groupId: testIds.GROUP_ASSOCIATION,
    name: "OneToOneSource",
    comment: "OneToOne Source",
    tableName: "one_to_one_source",
    autoSyncTableName: false,
    extendsIds: [],
    extraAnnotations: [],
    extraImports: [],
    subPackagePath: "",
    properties: [
        {
            id: testIds.ENTITY_OneToOne_source,
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
        PROPERTY_OneToOne_source,
    ]
}

export const ASSOCIATION_OneToOne_midTable: OneToOneAssociationIdOnly = {
    ...ASSOCIATION_OneToOne,
    id: testIds.ASSOCIATION_OneToOne_midTable,
    name: "one_to_one_mapping",
    comment: "OneToOne MidTable",
    sourceEntityId: testIds.ENTITY_OneToOne_source_midTable,
    sourcePropertyId: testIds.PROPERTY_OneToOne_source_midTable,
    referencedEntityId: testIds.ENTITY_target,
    mappedProperty: {
        ...ASSOCIATION_OneToOne.mappedProperty,
        id: testIds.PROPERTY_OneToOne_source_midTable,
        associationId: testIds.ASSOCIATION_OneToOne_midTable,
    }
}

export const PROPERTY_OneToOne_source_midTable: OneToOneSourceProperty = {
    ...PROPERTY_OneToOne_source,
    id: testIds.PROPERTY_OneToOne_source_midTable,
    associationId: testIds.ASSOCIATION_OneToOne_midTable,
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
    nullable: true,
}

export const ENTITY_OneToOne_source_midTable: EntityWithProperties = {
    ...ENTITY_OneToOne_source,
    id: testIds.ENTITY_OneToOne_source_midTable,
    name: "OneToOneSource_midTable",
    tableName: "one_to_one_source__mid_table",
    autoSyncTableName: false,
    properties: [
        {
            ...ENTITY_OneToOne_source.properties[0]!!,
            id: testIds.ENTITY_OneToOne_source_midTable,
        },
        PROPERTY_OneToOne_source_midTable,
    ]
}
