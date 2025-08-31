import AssociationTypeDeclare from "./items/AssociationType.ts";
import AssociationDeclare from "./items/Association.ts";
import DatabaseDeclare from "./items/Database.ts";
import SchemaDeclare from "./items/Schema.ts";
import TableDeclare from "./items/Table.ts";
import ColumnDeclare from "./items/Column.ts";
import IndexDeclare from "./items/Index.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";
import EntityPropertyDeclare from "./items/EntityProperty.ts";
import EntityPropertyCategoryDeclare from "./items/EntityPropertyCategory.ts";
import EntityDeclare from "./items/Entity.ts";
import MappedSuperClassDeclare from "./items/MappedSuperClass.ts";
import EmbeddableTypePropertyDeclare from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypePropertyCategoryDeclare from "./items/EmbeddableTypePropertyCategory.ts";
import EmbeddableTypeDeclare from "./items/EmbeddableType.ts";
import EnumerationStrategyDeclare from "./items/EnumerationStrategy.ts";
import EnumerationItemDeclare from "./items/EnumerationItem.ts";
import EnumerationDeclare from "./items/Enumeration.ts";
import BasePropertyDeclare from "./items/BaseProperty.ts";
import ColumnPropertyDeclare from "./items/ColumnProperty.ts";
import OptionalKeyPropertyDeclare from "./items/OptionalKeyProperty.ts";
import OptionalLogicalDeletePropertyDeclare from "./items/OptionalLogicalDeleteProperty.ts";
import EmbeddablePropertyDeclare from "./items/EmbeddableProperty.ts";
import IdPropertyDeclare from "./items/IdProperty.ts";
import ScalarPropertyDeclare from "./items/ScalarProperty.ts";
import EnumPropertyDeclare from "./items/EnumProperty.ts";
import EntityTypePropertyDeclare from "./items/EntityTypeProperty.ts";
import OnDissociationActionDeclare from "./items/OnDissociationAction.ts";
import OneToOneSourcePropertyDeclare from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyDeclare from "./items/OneToOneTargetProperty.ts";
import ManyToOnePropertyDeclare from "./items/ManyToOneProperty.ts";
import OneToManyPropertyDeclare from "./items/OneToManyProperty.ts";
import ManyToManySourcePropertyDeclare from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyDeclare from "./items/ManyToManyTargetProperty.ts";
import AssociationPropertyDeclare from "./items/AssociationProperty.ts";
import ManyToManyViewPropertyDeclare from "./items/ManyToManyViewProperty.ts";
import FormulaPropertyDeclare from "./items/FormulaProperty.ts";
import TransientPropertyDeclare from "./items/TransientProperty.ts";

export const typeDeclares = Object.freeze({
    AssociationType: AssociationTypeDeclare,
    Association: AssociationDeclare,
    Database: DatabaseDeclare,
    Schema: SchemaDeclare,
    Table: TableDeclare,
    Column: ColumnDeclare,
    Index: IndexDeclare,
    ForeignKey: ForeignKeyDeclare,
    EntityProperty: EntityPropertyDeclare,
    EntityPropertyCategory: EntityPropertyCategoryDeclare,
    Entity: EntityDeclare,
    MappedSuperClass: MappedSuperClassDeclare,
    EmbeddableTypeProperty: EmbeddableTypePropertyDeclare,
    EmbeddableTypePropertyCategory: EmbeddableTypePropertyCategoryDeclare,
    EmbeddableType: EmbeddableTypeDeclare,
    EnumerationStrategy: EnumerationStrategyDeclare,
    EnumerationItem: EnumerationItemDeclare,
    Enumeration: EnumerationDeclare,
    BaseProperty: BasePropertyDeclare,
    ColumnProperty: ColumnPropertyDeclare,
    OptionalKeyProperty: OptionalKeyPropertyDeclare,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyDeclare,
    EmbeddableProperty: EmbeddablePropertyDeclare,
    IdProperty: IdPropertyDeclare,
    ScalarProperty: ScalarPropertyDeclare,
    EnumProperty: EnumPropertyDeclare,
    EntityTypeProperty: EntityTypePropertyDeclare,
    OnDissociationAction: OnDissociationActionDeclare,
    OneToOneSourceProperty: OneToOneSourcePropertyDeclare,
    OneToOneTargetProperty: OneToOneTargetPropertyDeclare,
    ManyToOneProperty: ManyToOnePropertyDeclare,
    OneToManyProperty: OneToManyPropertyDeclare,
    ManyToManySourceProperty: ManyToManySourcePropertyDeclare,
    ManyToManyTargetProperty: ManyToManyTargetPropertyDeclare,
    AssociationProperty: AssociationPropertyDeclare,
    ManyToManyViewProperty: ManyToManyViewPropertyDeclare,
    FormulaProperty: FormulaPropertyDeclare,
    TransientProperty: TransientPropertyDeclare,
})
