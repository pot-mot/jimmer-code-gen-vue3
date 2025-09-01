import AssociationDeclare from "./items/Association.ts";
import AssociationPropertyDeclare from "./items/AssociationProperty.ts";
import AssociationTypeDeclare from "./items/AssociationType.ts";
import BasePropertyDeclare from "./items/BaseProperty.ts";
import ColumnDeclare from "./items/Column.ts";
import ColumnPropertyDeclare from "./items/ColumnProperty.ts";
import DatabaseDeclare from "./items/Database.ts";
import EmbeddablePropertyDeclare from "./items/EmbeddableProperty.ts";
import EmbeddableTypeDeclare from "./items/EmbeddableType.ts";
import EmbeddableTypePropertyDeclare from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypePropertyCategoryDeclare from "./items/EmbeddableTypePropertyCategory.ts";
import EntityDeclare from "./items/Entity.ts";
import EntityPropertyDeclare from "./items/EntityProperty.ts";
import EntityPropertyCategoryDeclare from "./items/EntityPropertyCategory.ts";
import EntityTypePropertyDeclare from "./items/EntityTypeProperty.ts";
import EnumerationDeclare from "./items/Enumeration.ts";
import EnumerationItemDeclare from "./items/EnumerationItem.ts";
import EnumerationStrategyDeclare from "./items/EnumerationStrategy.ts";
import EnumPropertyDeclare from "./items/EnumProperty.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";
import FormulaPropertyDeclare from "./items/FormulaProperty.ts";
import IdPropertyDeclare from "./items/IdProperty.ts";
import IndexDeclare from "./items/Index.ts";
import ManyToManySourcePropertyDeclare from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyDeclare from "./items/ManyToManyTargetProperty.ts";
import ManyToManyViewPropertyDeclare from "./items/ManyToManyViewProperty.ts";
import ManyToOnePropertyDeclare from "./items/ManyToOneProperty.ts";
import MappedSuperClassDeclare from "./items/MappedSuperClass.ts";
import OnDissociationActionDeclare from "./items/OnDissociationAction.ts";
import OneToManyPropertyDeclare from "./items/OneToManyProperty.ts";
import OneToOneSourcePropertyDeclare from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyDeclare from "./items/OneToOneTargetProperty.ts";
import OptionalKeyPropertyDeclare from "./items/OptionalKeyProperty.ts";
import OptionalLogicalDeletePropertyDeclare from "./items/OptionalLogicalDeleteProperty.ts";
import OptionalOrderPropertyDeclare from "./items/OptionalOrderProperty.ts";
import ScalarPropertyDeclare from "./items/ScalarProperty.ts";
import SchemaDeclare from "./items/Schema.ts";
import TableDeclare from "./items/Table.ts";
import TransientPropertyDeclare from "./items/TransientProperty.ts";

export type TypeMap = {
    Association: Association
    AssociationProperty: AssociationProperty
    AssociationType: AssociationType
    BaseProperty: BaseProperty
    Column: Column
    ColumnProperty: ColumnProperty
    Database: Database
    EmbeddableProperty: EmbeddableProperty
    EmbeddableType: EmbeddableType
    EmbeddableTypeProperty: EmbeddableTypeProperty
    EmbeddableTypePropertyCategory: EmbeddableTypePropertyCategory
    Entity: Entity
    EntityProperty: EntityProperty
    EntityPropertyCategory: EntityPropertyCategory
    EntityTypeProperty: EntityTypeProperty
    Enumeration: Enumeration
    EnumerationItem: EnumerationItem
    EnumerationStrategy: EnumerationStrategy
    EnumProperty: EnumProperty
    ForeignKey: ForeignKey
    FormulaProperty: FormulaProperty
    IdProperty: IdProperty
    Index: Index
    ManyToManySourceProperty: ManyToManySourceProperty
    ManyToManyTargetProperty: ManyToManyTargetProperty
    ManyToManyViewProperty: ManyToManyViewProperty
    ManyToOneProperty: ManyToOneProperty
    MappedSuperClass: MappedSuperClass
    OnDissociationAction: OnDissociationAction
    OneToManyProperty: OneToManyProperty
    OneToOneSourceProperty: OneToOneSourceProperty
    OneToOneTargetProperty: OneToOneTargetProperty
    OptionalKeyProperty: OptionalKeyProperty
    OptionalLogicalDeleteProperty: OptionalLogicalDeleteProperty
    OptionalOrderProperty: OptionalOrderProperty
    ScalarProperty: ScalarProperty
    Schema: Schema
    Table: Table
    TransientProperty: TransientProperty
}

export type TypeName = keyof TypeMap

export const typeDeclares = Object.freeze({
    Association: AssociationDeclare,
    AssociationProperty: AssociationPropertyDeclare,
    AssociationType: AssociationTypeDeclare,
    BaseProperty: BasePropertyDeclare,
    Column: ColumnDeclare,
    ColumnProperty: ColumnPropertyDeclare,
    Database: DatabaseDeclare,
    EmbeddableProperty: EmbeddablePropertyDeclare,
    EmbeddableType: EmbeddableTypeDeclare,
    EmbeddableTypeProperty: EmbeddableTypePropertyDeclare,
    EmbeddableTypePropertyCategory: EmbeddableTypePropertyCategoryDeclare,
    Entity: EntityDeclare,
    EntityProperty: EntityPropertyDeclare,
    EntityPropertyCategory: EntityPropertyCategoryDeclare,
    EntityTypeProperty: EntityTypePropertyDeclare,
    Enumeration: EnumerationDeclare,
    EnumerationItem: EnumerationItemDeclare,
    EnumerationStrategy: EnumerationStrategyDeclare,
    EnumProperty: EnumPropertyDeclare,
    ForeignKey: ForeignKeyDeclare,
    FormulaProperty: FormulaPropertyDeclare,
    IdProperty: IdPropertyDeclare,
    Index: IndexDeclare,
    ManyToManySourceProperty: ManyToManySourcePropertyDeclare,
    ManyToManyTargetProperty: ManyToManyTargetPropertyDeclare,
    ManyToManyViewProperty: ManyToManyViewPropertyDeclare,
    ManyToOneProperty: ManyToOnePropertyDeclare,
    MappedSuperClass: MappedSuperClassDeclare,
    OnDissociationAction: OnDissociationActionDeclare,
    OneToManyProperty: OneToManyPropertyDeclare,
    OneToOneSourceProperty: OneToOneSourcePropertyDeclare,
    OneToOneTargetProperty: OneToOneTargetPropertyDeclare,
    OptionalKeyProperty: OptionalKeyPropertyDeclare,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyDeclare,
    OptionalOrderProperty: OptionalOrderPropertyDeclare,
    ScalarProperty: ScalarPropertyDeclare,
    Schema: SchemaDeclare,
    Table: TableDeclare,
    TransientProperty: TransientPropertyDeclare,
})
