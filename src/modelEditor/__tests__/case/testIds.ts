import {v7} from "uuid";

export const testIds = {
    MODEL: v7(),

    GROUP_COMMON: v7(),
    GROUP_ASSOCIATION: v7(),

    ENUM_name: v7(),
    ENUM_ordinal: v7(),

    ENTITY_base: v7(),

    // association singleColumn
    ENTITY_target: v7(),

    ASSOCIATION_OneToOne: v7(),
    PROPERTY_OneToOne_source: v7(),
    ENTITY_OneToOne_source: v7(),
    ASSOCIATION_OneToOne_midTable: v7(),
    PROPERTY_OneToOne_source_midTable: v7(),
    ENTITY_OneToOne_source_midTable: v7(),

    ASSOCIATION_ManyToOne: v7(),
    PROPERTY_ManyToOne_source: v7(),
    ENTITY_ManyToOne_source: v7(),
    ASSOCIATION_ManyToOne_midTable: v7(),
    PROPERTY_ManyToOne_source_midTable: v7(),
    ENTITY_ManyToOne_source_midTable: v7(),

    ASSOCIATION_ManyToMany: v7(),
    PROPERTY_ManyToMany_source: v7(),
    ENTITY_ManyToMany_source: v7(),

    // inherit
    BASE_ENTITY_1: v7(),
    BASE_ENTITY_1_1: v7(),
    BASE_ENTITY_1_2: v7(),
    BASE_ENTITY_1_3: v7(),
    ENTITY_extends_1: v7(),
    ENTITY_extends_1_1: v7(),
    ENTITY_extends_1_2__1_3: v7(),

    // association abstract singleColumn
    ASSOCIATION_OneToOne_abstract: v7(),
    PROPERTY_OneToOne_source_abstract: v7(),
    ENTITY_OneToOne_source_abstract: v7(),
    ASSOCIATION_OneToOne_midTable_abstract: v7(),
    PROPERTY_OneToOne_source_midTable_abstract: v7(),
    ENTITY_OneToOne_source_midTable_abstract: v7(),

    ASSOCIATION_ManyToOne_abstract: v7(),
    PROPERTY_ManyToOne_source_abstract: v7(),
    ENTITY_ManyToOne_source_abstract: v7(),
    ASSOCIATION_ManyToOne_midTable_abstract: v7(),
    PROPERTY_ManyToOne_source_midTable_abstract: v7(),
    ENTITY_ManyToOne_source_midTable_abstract: v7(),

    ASSOCIATION_ManyToMany_abstract: v7(),
    PROPERTY_ManyToMany_source_abstract: v7(),
    ENTITY_ManyToMany_source_abstract: v7(),

    // association abstract multiColumn
    ASSOCIATION_OneToOne_abstract_multi: v7(),
    PROPERTY_OneToOne_source_abstract_multi: v7(),
    ENTITY_OneToOne_source_abstract_multi: v7(),

    ASSOCIATION_ManyToOne_abstract_multi: v7(),
    PROPERTY_ManyToOne_source_abstract_multi: v7(),
    ENTITY_OneToMany_source_abstract_multi: v7(),

    ASSOCIATION_ManyToMany_abstract_multi: v7(),
    PROPERTY_ManyToMany_source_abstract_multi: v7(),
    ENTITY_ManyToMany_source_abstract_multi: v7(),

    ASSOCIATION_abstract_OneToOne_abstract_multi: v7(),
    PROPERTY_abstract_OneToOne_source_abstract_multi: v7(),
    ENTITY_abstract_OneToOne_source_abstract_multi: v7(),

    ASSOCIATION_abstract_OneToMany_abstract_multi: v7(),
    PROPERTY_abstract_OneToMany_source_abstract_multi: v7(),
    ENTITY_abstract_OneToMany_source_abstract_multi: v7(),

    // embeddable
    EMBEDDABLE_simple: v7(),

    EMBEDDABLE_nest_1: v7(),
    EMBEDDABLE_nest_1_1: v7(),
    EMBEDDABLE_nest_1_1_1: v7(),
    ENTITY_ref_EMBEDDABLE_nest_1: v7(),
    ENTITY_ref_EMBEDDABLE_nest_1_1: v7(),
    ENTITY_ref_EMBEDDABLE_nest_1_override: v7(),
    ENTITY_ref_EMBEDDABLE_nest_1_1_override: v7(),

    // association multiColumn
    EMBEDDABLE_multi: v7(),
    ENTITY_target_multi: v7(),

    ASSOCIATION_OneToOne_multi: v7(),
    PROPERTY_OneToOne_source_multi: v7(),
    ENTITY_OneToOne_source_multi: v7(),

    ASSOCIATION_ManyToOne_multi: v7(),
    PROPERTY_ManyToOne_source_multi: v7(),
    ENTITY_OneToMany_source_multi: v7(),

    ASSOCIATION_ManyToMany_multi: v7(),
    PROPERTY_ManyToMany_source_multi: v7(),
    ENTITY_ManyToMany_source_multi: v7(),

    ASSOCIATION_abstract_OneToOne_multi: v7(),
    PROPERTY_abstract_OneToOne_source_multi: v7(),
    ENTITY_abstract_OneToOne_source_multi: v7(),

    ASSOCIATION_abstract_OneToMany_multi: v7(),
    PROPERTY_abstract_OneToMany_source_multi: v7(),
    ENTITY_abstract_OneToMany_source_multi: v7(),

    // manyToManyView
    ENTITY_ManyToManyView: v7(),
}
