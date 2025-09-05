import AssociationDeclare from "./items/Association.ts";
import AssociationPropertyDeclare from "./items/AssociationProperty.ts";
import AssociationTypeDeclare from "./items/AssociationType.ts";
import BackEndLanguageDeclare from "./items/BackEndLanguage.ts";
import BaseAssociationPropertyDeclare from "./items/BaseAssociationProperty.ts";
import BasePropertyDeclare from "./items/BaseProperty.ts";
import ColumnDeclare from "./items/Column.ts";
import ColumnPropertyDeclare from "./items/ColumnProperty.ts";
import DatabaseDeclare from "./items/Database.ts";
import DatabaseTypeDeclare from "./items/DatabaseType.ts";
import EmbeddablePropertyDeclare from "./items/EmbeddableProperty.ts";
import EmbeddableTypeDeclare from "./items/EmbeddableType.ts";
import EntityDeclare from "./items/Entity.ts";
import EnumerationDeclare from "./items/Enumeration.ts";
import EnumerationItemDeclare from "./items/EnumerationItem.ts";
import EnumerationStrategyDeclare from "./items/EnumerationStrategy.ts";
import EnumPropertyDeclare from "./items/EnumProperty.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";
import ForeignKeyTypeDeclare from "./items/ForeignKeyType.ts";
import FormulaPropertyDeclare from "./items/FormulaProperty.ts";
import GroupDeclare from "./items/Group.ts";
import IdPropertyDeclare from "./items/IdProperty.ts";
import IndexDeclare from "./items/Index.ts";
import JoinColumnDeclare from "./items/JoinColumn.ts";
import JoinTableDeclare from "./items/JoinTable.ts";
import ManyToManySourcePropertyDeclare from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyDeclare from "./items/ManyToManyTargetProperty.ts";
import ManyToManyViewPropertyDeclare from "./items/ManyToManyViewProperty.ts";
import ManyToOnePropertyDeclare from "./items/ManyToOneProperty.ts";
import MappedSuperClassDeclare from "./items/MappedSuperClass.ts";
import ModelDeclare from "./items/Model.ts";
import ModelContextDeclare from "./items/ModelContext.ts";
import OnDissociationActionDeclare from "./items/OnDissociationAction.ts";
import OneToManyPropertyDeclare from "./items/OneToManyProperty.ts";
import OneToOneSourcePropertyDeclare from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyDeclare from "./items/OneToOneTargetProperty.ts";
import OptionalKeyPropertyDeclare from "./items/OptionalKeyProperty.ts";
import OptionalLogicalDeletePropertyDeclare from "./items/OptionalLogicalDeleteProperty.ts";
import OptionalOrderPropertyDeclare from "./items/OptionalOrderProperty.ts";
import ScalarPropertyDeclare from "./items/ScalarProperty.ts";
import TableDeclare from "./items/Table.ts";
import TransientPropertyDeclare from "./items/TransientProperty.ts";

export type TypeMap = {
    Association: Association
    AssociationProperty: AssociationProperty
    AssociationType: AssociationType
    BackEndLanguage: BackEndLanguage
    BaseAssociationProperty: BaseAssociationProperty
    BaseProperty: BaseProperty
    Column: Column
    ColumnProperty: ColumnProperty
    Database: Database
    DatabaseType: DatabaseType
    EmbeddableProperty: EmbeddableProperty
    EmbeddableType: EmbeddableType
    Entity: Entity
    Enumeration: Enumeration
    EnumerationItem: EnumerationItem
    EnumerationStrategy: EnumerationStrategy
    EnumProperty: EnumProperty
    ForeignKey: ForeignKey
    ForeignKeyType: ForeignKeyType
    FormulaProperty: FormulaProperty
    Group: Group
    IdProperty: IdProperty
    Index: Index
    JoinColumn: JoinColumn
    JoinTable: JoinTable
    ManyToManySourceProperty: ManyToManySourceProperty
    ManyToManyTargetProperty: ManyToManyTargetProperty
    ManyToManyViewProperty: ManyToManyViewProperty
    ManyToOneProperty: ManyToOneProperty
    MappedSuperClass: MappedSuperClass
    Model: Model
    ModelContext: ModelContext
    OnDissociationAction: OnDissociationAction
    OneToManyProperty: OneToManyProperty
    OneToOneSourceProperty: OneToOneSourceProperty
    OneToOneTargetProperty: OneToOneTargetProperty
    OptionalKeyProperty: OptionalKeyProperty
    OptionalLogicalDeleteProperty: OptionalLogicalDeleteProperty
    OptionalOrderProperty: OptionalOrderProperty
    ScalarProperty: ScalarProperty
    Table: Table
    TransientProperty: TransientProperty
}

export type TypeName = keyof TypeMap

export const typeDeclares = Object.freeze({
    Association: AssociationDeclare,
    AssociationProperty: AssociationPropertyDeclare,
    AssociationType: AssociationTypeDeclare,
    BackEndLanguage: BackEndLanguageDeclare,
    BaseAssociationProperty: BaseAssociationPropertyDeclare,
    BaseProperty: BasePropertyDeclare,
    Column: ColumnDeclare,
    ColumnProperty: ColumnPropertyDeclare,
    Database: DatabaseDeclare,
    DatabaseType: DatabaseTypeDeclare,
    EmbeddableProperty: EmbeddablePropertyDeclare,
    EmbeddableType: EmbeddableTypeDeclare,
    Entity: EntityDeclare,
    Enumeration: EnumerationDeclare,
    EnumerationItem: EnumerationItemDeclare,
    EnumerationStrategy: EnumerationStrategyDeclare,
    EnumProperty: EnumPropertyDeclare,
    ForeignKey: ForeignKeyDeclare,
    ForeignKeyType: ForeignKeyTypeDeclare,
    FormulaProperty: FormulaPropertyDeclare,
    Group: GroupDeclare,
    IdProperty: IdPropertyDeclare,
    Index: IndexDeclare,
    JoinColumn: JoinColumnDeclare,
    JoinTable: JoinTableDeclare,
    ManyToManySourceProperty: ManyToManySourcePropertyDeclare,
    ManyToManyTargetProperty: ManyToManyTargetPropertyDeclare,
    ManyToManyViewProperty: ManyToManyViewPropertyDeclare,
    ManyToOneProperty: ManyToOnePropertyDeclare,
    MappedSuperClass: MappedSuperClassDeclare,
    Model: ModelDeclare,
    ModelContext: ModelContextDeclare,
    OnDissociationAction: OnDissociationActionDeclare,
    OneToManyProperty: OneToManyPropertyDeclare,
    OneToOneSourceProperty: OneToOneSourcePropertyDeclare,
    OneToOneTargetProperty: OneToOneTargetPropertyDeclare,
    OptionalKeyProperty: OptionalKeyPropertyDeclare,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyDeclare,
    OptionalOrderProperty: OptionalOrderPropertyDeclare,
    ScalarProperty: ScalarPropertyDeclare,
    Table: TableDeclare,
    TransientProperty: TransientPropertyDeclare,
})
