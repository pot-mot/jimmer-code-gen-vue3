import AssociationDeclare from "./items/Association.ts";
import AssociationPropertyDeclare from "./items/AssociationProperty.ts";
import AssociationSubDataDeclare from "./items/AssociationSubData.ts";
import AssociationTypeDeclare from "./items/AssociationType.ts";
import AssociationWithSubDataDeclare from "./items/AssociationWithSubData.ts";
import BackEndLanguageDeclare from "./items/BackEndLanguage.ts";
import BaseAssociationPropertyDeclare from "./items/BaseAssociationProperty.ts";
import BasePropertyDeclare from "./items/BaseProperty.ts";
import CategorizedEmbeddableTypePropertiesDeclare from "./items/CategorizedEmbeddableTypeProperties.ts";
import CategorizedPropertiesDeclare from "./items/CategorizedProperties.ts";
import CategorizedPropertiesRequiredIdDeclare from "./items/CategorizedPropertiesRequiredId.ts";
import ColumnDeclare from "./items/Column.ts";
import ColumnPropertyDeclare from "./items/ColumnProperty.ts";
import DatabaseDeclare from "./items/Database.ts";
import DatabaseTypeDeclare from "./items/DatabaseType.ts";
import DeepReadonlyDeclare from "./items/DeepReadonly.ts";
import EmbeddablePropertyDeclare from "./items/EmbeddableProperty.ts";
import EmbeddableTypeDeclare from "./items/EmbeddableType.ts";
import EmbeddableTypePropertyDeclare from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypeWithCategorizedPropertiesDeclare from "./items/EmbeddableTypeWithCategorizedProperties.ts";
import EmbeddableTypeWithPropertiesDeclare from "./items/EmbeddableTypeWithProperties.ts";
import EntityDeclare from "./items/Entity.ts";
import EntityWithCategorizedPropertiesDeclare from "./items/EntityWithCategorizedProperties.ts";
import EntityWithInheritInfoDeclare from "./items/EntityWithInheritInfo.ts";
import EntityWithPropertiesDeclare from "./items/EntityWithProperties.ts";
import EnumerationDeclare from "./items/Enumeration.ts";
import EnumerationItemDeclare from "./items/EnumerationItem.ts";
import EnumerationStrategyDeclare from "./items/EnumerationStrategy.ts";
import EnumLogicalDeletePropertyDeclare from "./items/EnumLogicalDeleteProperty.ts";
import EnumPropertyDeclare from "./items/EnumProperty.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";
import ForeignKeyTypeDeclare from "./items/ForeignKeyType.ts";
import GetterFormulaPropertyDeclare from "./items/GetterFormulaProperty.ts";
import GroupDeclare from "./items/Group.ts";
import GroupSubMapsDeclare from "./items/GroupSubMaps.ts";
import GroupWithSubMapsDeclare from "./items/GroupWithSubMaps.ts";
import IdPropertyDeclare from "./items/IdProperty.ts";
import IndexDeclare from "./items/Index.ts";
import JoinColumnDeclare from "./items/JoinColumn.ts";
import JoinTableDeclare from "./items/JoinTable.ts";
import KeyPropertyDeclare from "./items/KeyProperty.ts";
import ManyToManySourcePropertyDeclare from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyDeclare from "./items/ManyToManyTargetProperty.ts";
import ManyToManyViewPropertyDeclare from "./items/ManyToManyViewProperty.ts";
import ManyToOnePropertyDeclare from "./items/ManyToOneProperty.ts";
import MappedSuperClassDeclare from "./items/MappedSuperClass.ts";
import MappedSuperClassWithCategorizedPropertiesDeclare from "./items/MappedSuperClassWithCategorizedProperties.ts";
import MappedSuperClassWithInheritInfoDeclare from "./items/MappedSuperClassWithInheritInfo.ts";
import MappedSuperClassWithPropertiesDeclare from "./items/MappedSuperClassWithProperties.ts";
import ModelDeclare from "./items/Model.ts";
import ModelContextDeclare from "./items/ModelContext.ts";
import ModelContextDataDeclare from "./items/ModelContextData.ts";
import ModelSubDataDeclare from "./items/ModelSubData.ts";
import ModelSubIdsDeclare from "./items/ModelSubIds.ts";
import ModelSubIdSetsDeclare from "./items/ModelSubIdSets.ts";
import OnDissociationActionDeclare from "./items/OnDissociationAction.ts";
import OneToManyPropertyDeclare from "./items/OneToManyProperty.ts";
import OneToOneSourcePropertyDeclare from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyDeclare from "./items/OneToOneTargetProperty.ts";
import OrderDirectionDeclare from "./items/OrderDirection.ts";
import PropertyDeclare from "./items/Property.ts";
import ScalarLogicalDeletePropertyDeclare from "./items/ScalarLogicalDeleteProperty.ts";
import ScalarPropertyDeclare from "./items/ScalarProperty.ts";
import SqlFormulaPropertyDeclare from "./items/SqlFormulaProperty.ts";
import TableDeclare from "./items/Table.ts";
import TransientPropertyDeclare from "./items/TransientProperty.ts";
import VersionPropertyDeclare from "./items/VersionProperty.ts";
import WithEmbeddableTypePropertiesDeclare from "./items/WithEmbeddableTypeProperties.ts";
import WithPropertiesDeclare from "./items/WithProperties.ts";

export type TypeMap = {
    Association: Association
    AssociationProperty: AssociationProperty
    AssociationSubData: AssociationSubData
    AssociationType: AssociationType
    AssociationWithSubData: AssociationWithSubData
    BackEndLanguage: BackEndLanguage
    BaseAssociationProperty: BaseAssociationProperty
    BaseProperty: BaseProperty
    CategorizedEmbeddableTypeProperties: CategorizedEmbeddableTypeProperties
    CategorizedProperties: CategorizedProperties
    CategorizedPropertiesRequiredId: CategorizedPropertiesRequiredId
    Column: Column
    ColumnProperty: ColumnProperty
    Database: Database
    DatabaseType: DatabaseType
    EmbeddableProperty: EmbeddableProperty
    EmbeddableType: EmbeddableType
    EmbeddableTypeProperty: EmbeddableTypeProperty
    EmbeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedProperties
    EmbeddableTypeWithProperties: EmbeddableTypeWithProperties
    Entity: Entity
    EntityWithCategorizedProperties: EntityWithCategorizedProperties
    EntityWithInheritInfo: EntityWithInheritInfo
    EntityWithProperties: EntityWithProperties
    Enumeration: Enumeration
    EnumerationItem: EnumerationItem
    EnumerationStrategy: EnumerationStrategy
    EnumLogicalDeleteProperty: EnumLogicalDeleteProperty
    EnumProperty: EnumProperty
    ForeignKey: ForeignKey
    ForeignKeyType: ForeignKeyType
    GetterFormulaProperty: GetterFormulaProperty
    Group: Group
    GroupSubMaps: GroupSubMaps
    GroupWithSubMaps: GroupWithSubMaps
    IdProperty: IdProperty
    Index: Index
    JoinColumn: JoinColumn
    JoinTable: JoinTable
    KeyProperty: KeyProperty
    ManyToManySourceProperty: ManyToManySourceProperty
    ManyToManyTargetProperty: ManyToManyTargetProperty
    ManyToManyViewProperty: ManyToManyViewProperty
    ManyToOneProperty: ManyToOneProperty
    MappedSuperClass: MappedSuperClass
    MappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedProperties
    MappedSuperClassWithInheritInfo: MappedSuperClassWithInheritInfo
    MappedSuperClassWithProperties: MappedSuperClassWithProperties
    Model: Model
    ModelContext: ModelContext
    ModelContextData: ModelContextData
    ModelSubData: ModelSubData
    ModelSubIds: ModelSubIds
    ModelSubIdSets: ModelSubIdSets
    OnDissociationAction: OnDissociationAction
    OneToManyProperty: OneToManyProperty
    OneToOneSourceProperty: OneToOneSourceProperty
    OneToOneTargetProperty: OneToOneTargetProperty
    OrderDirection: OrderDirection
    Property: Property
    ScalarLogicalDeleteProperty: ScalarLogicalDeleteProperty
    ScalarProperty: ScalarProperty
    SqlFormulaProperty: SqlFormulaProperty
    Table: Table
    TransientProperty: TransientProperty
    VersionProperty: VersionProperty
    WithEmbeddableTypeProperties: WithEmbeddableTypeProperties
    WithProperties: WithProperties
}

export type TypeName = keyof TypeMap

export const typeDeclares = Object.freeze({
    Association: AssociationDeclare,
    AssociationProperty: AssociationPropertyDeclare,
    AssociationSubData: AssociationSubDataDeclare,
    AssociationType: AssociationTypeDeclare,
    AssociationWithSubData: AssociationWithSubDataDeclare,
    BackEndLanguage: BackEndLanguageDeclare,
    BaseAssociationProperty: BaseAssociationPropertyDeclare,
    BaseProperty: BasePropertyDeclare,
    CategorizedEmbeddableTypeProperties: CategorizedEmbeddableTypePropertiesDeclare,
    CategorizedProperties: CategorizedPropertiesDeclare,
    CategorizedPropertiesRequiredId: CategorizedPropertiesRequiredIdDeclare,
    Column: ColumnDeclare,
    ColumnProperty: ColumnPropertyDeclare,
    Database: DatabaseDeclare,
    DatabaseType: DatabaseTypeDeclare,
    DeepReadonly: DeepReadonlyDeclare,
    EmbeddableProperty: EmbeddablePropertyDeclare,
    EmbeddableType: EmbeddableTypeDeclare,
    EmbeddableTypeProperty: EmbeddableTypePropertyDeclare,
    EmbeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedPropertiesDeclare,
    EmbeddableTypeWithProperties: EmbeddableTypeWithPropertiesDeclare,
    Entity: EntityDeclare,
    EntityWithCategorizedProperties: EntityWithCategorizedPropertiesDeclare,
    EntityWithInheritInfo: EntityWithInheritInfoDeclare,
    EntityWithProperties: EntityWithPropertiesDeclare,
    Enumeration: EnumerationDeclare,
    EnumerationItem: EnumerationItemDeclare,
    EnumerationStrategy: EnumerationStrategyDeclare,
    EnumLogicalDeleteProperty: EnumLogicalDeletePropertyDeclare,
    EnumProperty: EnumPropertyDeclare,
    ForeignKey: ForeignKeyDeclare,
    ForeignKeyType: ForeignKeyTypeDeclare,
    GetterFormulaProperty: GetterFormulaPropertyDeclare,
    Group: GroupDeclare,
    GroupSubMaps: GroupSubMapsDeclare,
    GroupWithSubMaps: GroupWithSubMapsDeclare,
    IdProperty: IdPropertyDeclare,
    Index: IndexDeclare,
    JoinColumn: JoinColumnDeclare,
    JoinTable: JoinTableDeclare,
    KeyProperty: KeyPropertyDeclare,
    ManyToManySourceProperty: ManyToManySourcePropertyDeclare,
    ManyToManyTargetProperty: ManyToManyTargetPropertyDeclare,
    ManyToManyViewProperty: ManyToManyViewPropertyDeclare,
    ManyToOneProperty: ManyToOnePropertyDeclare,
    MappedSuperClass: MappedSuperClassDeclare,
    MappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedPropertiesDeclare,
    MappedSuperClassWithInheritInfo: MappedSuperClassWithInheritInfoDeclare,
    MappedSuperClassWithProperties: MappedSuperClassWithPropertiesDeclare,
    Model: ModelDeclare,
    ModelContext: ModelContextDeclare,
    ModelContextData: ModelContextDataDeclare,
    ModelSubData: ModelSubDataDeclare,
    ModelSubIds: ModelSubIdsDeclare,
    ModelSubIdSets: ModelSubIdSetsDeclare,
    OnDissociationAction: OnDissociationActionDeclare,
    OneToManyProperty: OneToManyPropertyDeclare,
    OneToOneSourceProperty: OneToOneSourcePropertyDeclare,
    OneToOneTargetProperty: OneToOneTargetPropertyDeclare,
    OrderDirection: OrderDirectionDeclare,
    Property: PropertyDeclare,
    ScalarLogicalDeleteProperty: ScalarLogicalDeletePropertyDeclare,
    ScalarProperty: ScalarPropertyDeclare,
    SqlFormulaProperty: SqlFormulaPropertyDeclare,
    Table: TableDeclare,
    TransientProperty: TransientPropertyDeclare,
    VersionProperty: VersionPropertyDeclare,
    WithEmbeddableTypeProperties: WithEmbeddableTypePropertiesDeclare,
    WithProperties: WithPropertiesDeclare,
})
