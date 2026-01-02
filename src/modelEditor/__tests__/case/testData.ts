import {
    ASSOCIATION_OneToOne,
    ASSOCIATION_OneToOne_midTable,
    ENTITY_OneToOne_source,
    ENTITY_OneToOne_source_midTable,
    PROPERTY_OneToOne_source,
    PROPERTY_OneToOne_source_midTable
} from "@/modelEditor/__tests__/case/association/singleColumn/oneToOne.ts";
import {ENTITY_target} from "@/modelEditor/__tests__/case/association/singleColumn/Entity_target.ts";
import {
    ASSOCIATION_ManyToOne, ASSOCIATION_ManyToOne_midTable, ENTITY_ManyToOne_source, ENTITY_ManyToOne_source_midTable,
    PROPERTY_ManyToOne_source, PROPERTY_ManyToOne_source_midTable
} from "@/modelEditor/__tests__/case/association/singleColumn/manyToOne.ts";
import {
    ASSOCIATION_ManyToMany,
    ENTITY_ManyToMany_source,
    PROPERTY_ManyToMany_source
} from "@/modelEditor/__tests__/case/association/singleColumn/manyToMany.ts";
import {defaultInheritInfo, useInheritInfoSync} from "@/modelEditor/utils/InheritInfo.ts";
import {contextDataToContext} from "@/modelEditor/utils/ModelContext.ts";
import {ENTITY_base} from "@/modelEditor/__tests__/case/base/entity.ts";
import {ENUM_name, ENUM_ordinal} from "@/modelEditor/__tests__/case/base/enum.ts";
import {MODEL} from "@/modelEditor/__tests__/case/base/model.ts";
import {GROUP_ASSOCIATION, GROUP_COMMON} from "@/modelEditor/__tests__/case/base/group.ts";
import {
    BASE_ENTITY_1,
    BASE_ENTITY_1_1,
    BASE_ENTITY_1_2,
    BASE_ENTITY_1_3, ENTITY_extends_1, ENTITY_extends_1_1, ENTITY_extends_1_2__1_3
} from "@/modelEditor/__tests__/case/inherit/entityInherit.ts";

const DEFAULT_LABEL_POSITION: LabelPosition = {from: "source", fixedLength: 500}

const baseData: DeepReadonly<ModelContextData> = {
    model: MODEL,
    groupMap: new Map<string, Group>([
        [GROUP_COMMON.id, GROUP_COMMON],
        [GROUP_ASSOCIATION.id, GROUP_ASSOCIATION],
    ]),
    entityMap: new Map<string, EntityWithProperties>([
        [ENTITY_base.id, ENTITY_base],
        [ENTITY_target.id, ENTITY_target],
        [ENTITY_OneToOne_source.id, ENTITY_OneToOne_source],
        [ENTITY_OneToOne_source_midTable.id, ENTITY_OneToOne_source_midTable],
        [ENTITY_ManyToOne_source.id, ENTITY_ManyToOne_source],
        [ENTITY_ManyToOne_source_midTable.id, ENTITY_ManyToOne_source_midTable],
        [ENTITY_ManyToMany_source.id, ENTITY_ManyToMany_source],

        [ENTITY_extends_1.id, ENTITY_extends_1],
        [ENTITY_extends_1_1.id, ENTITY_extends_1_1],
        [ENTITY_extends_1_2__1_3.id, ENTITY_extends_1_2__1_3],
    ]),
    associationMap: new Map<string, EdgedAssociation>([
        [ASSOCIATION_OneToOne.id, {association: ASSOCIATION_OneToOne, labelPosition: DEFAULT_LABEL_POSITION}],
        [ASSOCIATION_OneToOne_midTable.id, {association: ASSOCIATION_OneToOne_midTable, labelPosition: DEFAULT_LABEL_POSITION}],
        [ASSOCIATION_ManyToOne.id, {association: ASSOCIATION_ManyToOne, labelPosition: DEFAULT_LABEL_POSITION}],
        [ASSOCIATION_ManyToOne_midTable.id, {association: ASSOCIATION_ManyToOne_midTable, labelPosition: DEFAULT_LABEL_POSITION}],
        [ASSOCIATION_ManyToMany.id, {association: ASSOCIATION_ManyToMany, labelPosition: DEFAULT_LABEL_POSITION}],
    ]),
    mappedSuperClassMap: new Map([
        [BASE_ENTITY_1.id, BASE_ENTITY_1],
        [BASE_ENTITY_1_1.id, BASE_ENTITY_1_1],
        [BASE_ENTITY_1_2.id, BASE_ENTITY_1_2],
        [BASE_ENTITY_1_3.id, BASE_ENTITY_1_3],
    ]),
    embeddableTypeMap: new Map([
    ]),
    enumerationMap: new Map([
        [ENUM_name.id, ENUM_name],
        [ENUM_ordinal.id, ENUM_ordinal]
    ]),
}

const getContext = (
    options: {
        jvmLanguage?: JvmLanguage,
        databaseType?: DatabaseType,
    } = {
        jvmLanguage: "KOTLIN",
        databaseType: "POSTGRESQL",
    }
) => {
    const inheritInfo = defaultInheritInfo(baseData.mappedSuperClassMap, baseData.entityMap)
    useInheritInfoSync(inheritInfo)

    return contextDataToContext({
        ...baseData,
        model: {
            ...MODEL,
            ...options,
        }
    }, inheritInfo)
}

export const testData = {
    MODEL,

    GROUP_COMMON,
    GROUP_ASSOCIATION,

    ENUM_name,
    ENUM_ordinal,

    ENTITY_base,

    // association singleColumn
    ENTITY_target,

    ASSOCIATION_OneToOne,
    PROPERTY_OneToOne_source,
    ENTITY_OneToOne_source,
    ASSOCIATION_OneToOne_midTable,
    PROPERTY_OneToOne_source_midTable,
    ENTITY_OneToOne_source_midTable,

    ASSOCIATION_ManyToOne,
    PROPERTY_ManyToOne_source,
    ENTITY_ManyToOne_source,
    ASSOCIATION_ManyToOne_midTable,
    PROPERTY_ManyToOne_source_midTable,
    ENTITY_ManyToOne_source_midTable,

    ASSOCIATION_ManyToMany,
    PROPERTY_ManyToMany_source,
    ENTITY_ManyToMany_source,

    // inherit
    BASE_ENTITY_1,
    BASE_ENTITY_1_1,
    BASE_ENTITY_1_2,
    BASE_ENTITY_1_3,
    ENTITY_extends_1,
    ENTITY_extends_1_1,
    ENTITY_extends_1_2__1_3,

    CONTEXT_KOTLIN: getContext({jvmLanguage: "KOTLIN"}),
    CONTEXT_JAVA: getContext({jvmLanguage: "JAVA"}),
    CONTEXT_PostgreSQL: getContext({databaseType: "POSTGRESQL"}),
    CONTEXT_MySQL: getContext({databaseType: "MYSQL"}),
    CONTEXT_SQLite: getContext({databaseType: "SQLITE"}),
    CONTEXT_Oracle: getContext({databaseType: "ORACLE"}),
    CONTEXT_SqlServer: getContext({databaseType: "SQLSERVER"}),
    CONTEXT_H2: getContext({databaseType: "H2"}),
    CONTEXT_Sqlite: getContext({databaseType: "SQLITE"}),
}
