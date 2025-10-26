import AbstractAssociationDeclare from "./items/AbstractAssociation.ts";
import AbstractAssociationIdOnlyDeclare from "./items/AbstractAssociationIdOnly.ts";
import AbstractCategorizedPropertiesDeclare from "./items/AbstractCategorizedProperties.ts";
import AbstractEdgedAssociationDeclare from "./items/AbstractEdgedAssociation.ts";
import AssociationDeclare from "./items/Association.ts";
import AssociationIdOnlyDeclare from "./items/AssociationIdOnly.ts";
import AssociationSourceDeclare from "./items/AssociationSource.ts";
import BaseAssociationPropertyDeclare from "./items/BaseAssociationProperty.ts";
import BasePropertyDeclare from "./items/BaseProperty.ts";
import CategorizedEmbeddableTypePropertiesDeclare from "./items/CategorizedEmbeddableTypeProperties.ts";
import ColumnDeclare from "./items/Column.ts";
import ColumnInfoDeclare from "./items/ColumnInfo.ts";
import ColumnNameOverrideDeclare from "./items/ColumnNameOverride.ts";
import ColumnPropertyDeclare from "./items/ColumnProperty.ts";
import ColumnRefDeclare from "./items/ColumnRef.ts";
import ConcreteAssociationDeclare from "./items/ConcreteAssociation.ts";
import ConcreteAssociationIdOnlyDeclare from "./items/ConcreteAssociationIdOnly.ts";
import ConcreteEdgedAssociationDeclare from "./items/ConcreteEdgedAssociation.ts";
import CrossTypeDeclare from "./items/CrossType.ts";
import DatabaseDeclare from "./items/Database.ts";
import DatabaseSourceDeclare from "./items/DatabaseSource.ts";
import DatabaseTypeDeclare from "./items/DatabaseType.ts";
import DeepReadonlyDeclare from "./items/DeepReadonly.ts";
import DiagnosticSourceDeclare from "./items/DiagnosticSource.ts";
import EdgedAssociationDeclare from "./items/EdgedAssociation.ts";
import EmbeddablePropertyDeclare from "./items/EmbeddableProperty.ts";
import EmbeddableTypeDeclare from "./items/EmbeddableType.ts";
import EmbeddableTypeOverridePropertiesDeclare from "./items/EmbeddableTypeOverrideProperties.ts";
import EmbeddableTypePropertyDeclare from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypePropertySourceDeclare from "./items/EmbeddableTypePropertySource.ts";
import EmbeddableTypeSourceDeclare from "./items/EmbeddableTypeSource.ts";
import EmbeddableTypeWithCategorizedPropertiesDeclare from "./items/EmbeddableTypeWithCategorizedProperties.ts";
import EmbeddableTypeWithOverridePropertiesDeclare from "./items/EmbeddableTypeWithOverrideProperties.ts";
import EmbeddableTypeWithPropertiesDeclare from "./items/EmbeddableTypeWithProperties.ts";
import EntityDeclare from "./items/Entity.ts";
import EntityCategorizedPropertiesDeclare from "./items/EntityCategorizedProperties.ts";
import EntityInheritInfoDeclare from "./items/EntityInheritInfo.ts";
import EntityPropertyDeclare from "./items/EntityProperty.ts";
import EntityPropertySourceDeclare from "./items/EntityPropertySource.ts";
import EntitySourceDeclare from "./items/EntitySource.ts";
import EntityWithCategorizedPropertiesDeclare from "./items/EntityWithCategorizedProperties.ts";
import EntityWithInheritInfoDeclare from "./items/EntityWithInheritInfo.ts";
import EntityWithPropertiesDeclare from "./items/EntityWithProperties.ts";
import EnumerationDeclare from "./items/Enumeration.ts";
import EnumerationItemDeclare from "./items/EnumerationItem.ts";
import EnumerationItemSourceDeclare from "./items/EnumerationItemSource.ts";
import EnumerationSourceDeclare from "./items/EnumerationSource.ts";
import EnumerationStrategyDeclare from "./items/EnumerationStrategy.ts";
import FkJoinInfoDeclare from "./items/FkJoinInfo.ts";
import ForeignKeyDeclare from "./items/ForeignKey.ts";
import ForeignKeyTypeDeclare from "./items/ForeignKeyType.ts";
import GetterFormulaPropertyDeclare from "./items/GetterFormulaProperty.ts";
import GroupDeclare from "./items/Group.ts";
import GroupInheritInfoMapDeclare from "./items/GroupInheritInfoMap.ts";
import GroupSubDataDeclare from "./items/GroupSubData.ts";
import GroupSubMapsDeclare from "./items/GroupSubMaps.ts";
import GroupWithInheritInfoMapDeclare from "./items/GroupWithInheritInfoMap.ts";
import GroupWithSubMapsDeclare from "./items/GroupWithSubMaps.ts";
import IdCommonPropertyDeclare from "./items/IdCommonProperty.ts";
import IdEmbeddablePropertyDeclare from "./items/IdEmbeddableProperty.ts";
import IndexDeclare from "./items/Index.ts";
import JoinInfoDeclare from "./items/JoinInfo.ts";
import JvmFileBuilderDeclare from "./items/JvmFileBuilder.ts";
import JvmLanguageDeclare from "./items/JvmLanguage.ts";
import JvmSourceDeclare from "./items/JvmSource.ts";
import JvmToSqlMappingRuleDeclare from "./items/JvmToSqlMappingRule.ts";
import JvmToTsMappingRuleDeclare from "./items/JvmToTsMappingRule.ts";
import JvmTypeDeclare from "./items/JvmType.ts";
import KeyPropertyDeclare from "./items/KeyProperty.ts";
import LabelPositionDeclare from "./items/LabelPosition.ts";
import LogicalDeletePropertyDeclare from "./items/LogicalDeleteProperty.ts";
import ManyToManyAssociationDeclare from "./items/ManyToManyAssociation.ts";
import ManyToManyAssociationIdOnlyDeclare from "./items/ManyToManyAssociationIdOnly.ts";
import ManyToManyMappedPropertyDeclare from "./items/ManyToManyMappedProperty.ts";
import ManyToManySourcePropertyDeclare from "./items/ManyToManySourceProperty.ts";
import ManyToManyViewPropertyDeclare from "./items/ManyToManyViewProperty.ts";
import ManyToOneAbstractAssociationDeclare from "./items/ManyToOneAbstractAssociation.ts";
import ManyToOneAbstractAssociationIdOnlyDeclare from "./items/ManyToOneAbstractAssociationIdOnly.ts";
import ManyToOneAssociationDeclare from "./items/ManyToOneAssociation.ts";
import ManyToOneAssociationIdOnlyDeclare from "./items/ManyToOneAssociationIdOnly.ts";
import ManyToOnePropertyDeclare from "./items/ManyToOneProperty.ts";
import MappedPropertySourceDeclare from "./items/MappedPropertySource.ts";
import MappedSuperClassDeclare from "./items/MappedSuperClass.ts";
import MappedSuperClassInheritInfoDeclare from "./items/MappedSuperClassInheritInfo.ts";
import MappedSuperClassPropertyDeclare from "./items/MappedSuperClassProperty.ts";
import MappedSuperClassPropertySourceDeclare from "./items/MappedSuperClassPropertySource.ts";
import MappedSuperClassWithCategorizedPropertiesDeclare from "./items/MappedSuperClassWithCategorizedProperties.ts";
import MappedSuperClassWithInheritInfoDeclare from "./items/MappedSuperClassWithInheritInfo.ts";
import MappedSuperClassWithPropertiesDeclare from "./items/MappedSuperClassWithProperties.ts";
import MapperSuperClassSourceDeclare from "./items/MapperSuperClassSource.ts";
import MidTableInfoDeclare from "./items/MidTableInfo.ts";
import MidTableJoinInfoDeclare from "./items/MidTableJoinInfo.ts";
import ModelDeclare from "./items/Model.ts";
import ModelContextDeclare from "./items/ModelContext.ts";
import ModelContextDataDeclare from "./items/ModelContextData.ts";
import ModelGraphSubDataDeclare from "./items/ModelGraphSubData.ts";
import ModelSubDataDeclare from "./items/ModelSubData.ts";
import ModelSubIdsDeclare from "./items/ModelSubIds.ts";
import ModelSubIdSetsDeclare from "./items/ModelSubIdSets.ts";
import MultiColumnJoinInfoDeclare from "./items/MultiColumnJoinInfo.ts";
import MultiColumnMidTableJoinInfoDeclare from "./items/MultiColumnMidTableJoinInfo.ts";
import NameStrategyDeclare from "./items/NameStrategy.ts";
import NameToolDeclare from "./items/NameTool.ts";
import OnDissociationActionDeclare from "./items/OnDissociationAction.ts";
import OneToManyAbstractPropertyDeclare from "./items/OneToManyAbstractProperty.ts";
import OneToManyPropertyDeclare from "./items/OneToManyProperty.ts";
import OneToOneAbstractAssociationDeclare from "./items/OneToOneAbstractAssociation.ts";
import OneToOneAbstractAssociationIdOnlyDeclare from "./items/OneToOneAbstractAssociationIdOnly.ts";
import OneToOneAssociationDeclare from "./items/OneToOneAssociation.ts";
import OneToOneAssociationIdOnlyDeclare from "./items/OneToOneAssociationIdOnly.ts";
import OneToOneMappedAbstractPropertyDeclare from "./items/OneToOneMappedAbstractProperty.ts";
import OneToOneMappedPropertyDeclare from "./items/OneToOneMappedProperty.ts";
import OneToOneSourcePropertyDeclare from "./items/OneToOneSourceProperty.ts";
import OrderDirectionDeclare from "./items/OrderDirection.ts";
import PositionDeclare from "./items/Position.ts";
import PropertyDeclare from "./items/Property.ts";
import PropertyItemDeclare from "./items/PropertyItem.ts";
import ScalarCommonPropertyDeclare from "./items/ScalarCommonProperty.ts";
import ScalarEmbeddablePropertyDeclare from "./items/ScalarEmbeddableProperty.ts";
import ScalarEnumPropertyDeclare from "./items/ScalarEnumProperty.ts";
import SingleColumnJoinInfoDeclare from "./items/SingleColumnJoinInfo.ts";
import SingleColumnMidTableJoinInfoDeclare from "./items/SingleColumnMidTableJoinInfo.ts";
import SqlFormulaPropertyDeclare from "./items/SqlFormulaProperty.ts";
import SqlToJvmMappingRuleDeclare from "./items/SqlToJvmMappingRule.ts";
import SqlTypeDeclare from "./items/SqlType.ts";
import TableDeclare from "./items/Table.ts";
import TransientPropertyDeclare from "./items/TransientProperty.ts";
import TsTypeDeclare from "./items/TsType.ts";
import TypeToolDeclare from "./items/TypeTool.ts";
import VersionPropertyDeclare from "./items/VersionProperty.ts";

export type TypeMap = {
    AbstractAssociation: AbstractAssociation
    AbstractAssociationIdOnly: AbstractAssociationIdOnly
    AbstractCategorizedProperties: AbstractCategorizedProperties
    AbstractEdgedAssociation: AbstractEdgedAssociation
    Association: Association
    AssociationIdOnly: AssociationIdOnly
    AssociationSource: AssociationSource
    BaseAssociationProperty: BaseAssociationProperty
    BaseProperty: BaseProperty
    CategorizedEmbeddableTypeProperties: CategorizedEmbeddableTypeProperties
    Column: Column
    ColumnInfo: ColumnInfo
    ColumnNameOverride: ColumnNameOverride
    ColumnProperty: ColumnProperty
    ColumnRef: ColumnRef
    ConcreteAssociation: ConcreteAssociation
    ConcreteAssociationIdOnly: ConcreteAssociationIdOnly
    ConcreteEdgedAssociation: ConcreteEdgedAssociation
    CrossType: CrossType
    Database: Database
    DatabaseSource: DatabaseSource
    DatabaseType: DatabaseType
    DiagnosticSource: DiagnosticSource
    EdgedAssociation: EdgedAssociation
    EmbeddableProperty: EmbeddableProperty
    EmbeddableType: EmbeddableType
    EmbeddableTypeOverrideProperties: EmbeddableTypeOverrideProperties
    EmbeddableTypeProperty: EmbeddableTypeProperty
    EmbeddableTypePropertySource: EmbeddableTypePropertySource
    EmbeddableTypeSource: EmbeddableTypeSource
    EmbeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedProperties
    EmbeddableTypeWithOverrideProperties: EmbeddableTypeWithOverrideProperties
    EmbeddableTypeWithProperties: EmbeddableTypeWithProperties
    Entity: Entity
    EntityCategorizedProperties: EntityCategorizedProperties
    EntityInheritInfo: EntityInheritInfo
    EntityProperty: EntityProperty
    EntityPropertySource: EntityPropertySource
    EntitySource: EntitySource
    EntityWithCategorizedProperties: EntityWithCategorizedProperties
    EntityWithInheritInfo: EntityWithInheritInfo
    EntityWithProperties: EntityWithProperties
    Enumeration: Enumeration
    EnumerationItem: EnumerationItem
    EnumerationItemSource: EnumerationItemSource
    EnumerationSource: EnumerationSource
    EnumerationStrategy: EnumerationStrategy
    FkJoinInfo: FkJoinInfo
    ForeignKey: ForeignKey
    ForeignKeyType: ForeignKeyType
    GetterFormulaProperty: GetterFormulaProperty
    Group: Group
    GroupInheritInfoMap: GroupInheritInfoMap
    GroupSubData: GroupSubData
    GroupSubMaps: GroupSubMaps
    GroupWithInheritInfoMap: GroupWithInheritInfoMap
    GroupWithSubMaps: GroupWithSubMaps
    IdCommonProperty: IdCommonProperty
    IdEmbeddableProperty: IdEmbeddableProperty
    Index: Index
    JoinInfo: JoinInfo
    JvmFileBuilder: JvmFileBuilder
    JvmLanguage: JvmLanguage
    JvmSource: JvmSource
    JvmToSqlMappingRule: JvmToSqlMappingRule
    JvmToTsMappingRule: JvmToTsMappingRule
    JvmType: JvmType
    KeyProperty: KeyProperty
    LabelPosition: LabelPosition
    LogicalDeleteProperty: LogicalDeleteProperty
    ManyToManyAssociation: ManyToManyAssociation
    ManyToManyAssociationIdOnly: ManyToManyAssociationIdOnly
    ManyToManyMappedProperty: ManyToManyMappedProperty
    ManyToManySourceProperty: ManyToManySourceProperty
    ManyToManyViewProperty: ManyToManyViewProperty
    ManyToOneAbstractAssociation: ManyToOneAbstractAssociation
    ManyToOneAbstractAssociationIdOnly: ManyToOneAbstractAssociationIdOnly
    ManyToOneAssociation: ManyToOneAssociation
    ManyToOneAssociationIdOnly: ManyToOneAssociationIdOnly
    ManyToOneProperty: ManyToOneProperty
    MappedPropertySource: MappedPropertySource
    MappedSuperClass: MappedSuperClass
    MappedSuperClassInheritInfo: MappedSuperClassInheritInfo
    MappedSuperClassProperty: MappedSuperClassProperty
    MappedSuperClassPropertySource: MappedSuperClassPropertySource
    MappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedProperties
    MappedSuperClassWithInheritInfo: MappedSuperClassWithInheritInfo
    MappedSuperClassWithProperties: MappedSuperClassWithProperties
    MapperSuperClassSource: MapperSuperClassSource
    MidTableInfo: MidTableInfo
    MidTableJoinInfo: MidTableJoinInfo
    Model: Model
    ModelContext: ModelContext
    ModelContextData: ModelContextData
    ModelGraphSubData: ModelGraphSubData
    ModelSubData: ModelSubData
    ModelSubIds: ModelSubIds
    ModelSubIdSets: ModelSubIdSets
    MultiColumnJoinInfo: MultiColumnJoinInfo
    MultiColumnMidTableJoinInfo: MultiColumnMidTableJoinInfo
    NameStrategy: NameStrategy
    NameTool: NameTool
    OnDissociationAction: OnDissociationAction
    OneToManyAbstractProperty: OneToManyAbstractProperty
    OneToManyProperty: OneToManyProperty
    OneToOneAbstractAssociation: OneToOneAbstractAssociation
    OneToOneAbstractAssociationIdOnly: OneToOneAbstractAssociationIdOnly
    OneToOneAssociation: OneToOneAssociation
    OneToOneAssociationIdOnly: OneToOneAssociationIdOnly
    OneToOneMappedAbstractProperty: OneToOneMappedAbstractProperty
    OneToOneMappedProperty: OneToOneMappedProperty
    OneToOneSourceProperty: OneToOneSourceProperty
    OrderDirection: OrderDirection
    Position: Position
    Property: Property
    PropertyItem: PropertyItem
    ScalarCommonProperty: ScalarCommonProperty
    ScalarEmbeddableProperty: ScalarEmbeddableProperty
    ScalarEnumProperty: ScalarEnumProperty
    SingleColumnJoinInfo: SingleColumnJoinInfo
    SingleColumnMidTableJoinInfo: SingleColumnMidTableJoinInfo
    SqlFormulaProperty: SqlFormulaProperty
    SqlToJvmMappingRule: SqlToJvmMappingRule
    SqlType: SqlType
    Table: Table
    TransientProperty: TransientProperty
    TsType: TsType
    TypeTool: TypeTool
    VersionProperty: VersionProperty
}

export type TypeName = keyof TypeMap

export const typeDeclares = Object.freeze({
    AbstractAssociation: AbstractAssociationDeclare,
    AbstractAssociationIdOnly: AbstractAssociationIdOnlyDeclare,
    AbstractCategorizedProperties: AbstractCategorizedPropertiesDeclare,
    AbstractEdgedAssociation: AbstractEdgedAssociationDeclare,
    Association: AssociationDeclare,
    AssociationIdOnly: AssociationIdOnlyDeclare,
    AssociationSource: AssociationSourceDeclare,
    BaseAssociationProperty: BaseAssociationPropertyDeclare,
    BaseProperty: BasePropertyDeclare,
    CategorizedEmbeddableTypeProperties: CategorizedEmbeddableTypePropertiesDeclare,
    Column: ColumnDeclare,
    ColumnInfo: ColumnInfoDeclare,
    ColumnNameOverride: ColumnNameOverrideDeclare,
    ColumnProperty: ColumnPropertyDeclare,
    ColumnRef: ColumnRefDeclare,
    ConcreteAssociation: ConcreteAssociationDeclare,
    ConcreteAssociationIdOnly: ConcreteAssociationIdOnlyDeclare,
    ConcreteEdgedAssociation: ConcreteEdgedAssociationDeclare,
    CrossType: CrossTypeDeclare,
    Database: DatabaseDeclare,
    DatabaseSource: DatabaseSourceDeclare,
    DatabaseType: DatabaseTypeDeclare,
    DeepReadonly: DeepReadonlyDeclare,
    DiagnosticSource: DiagnosticSourceDeclare,
    EdgedAssociation: EdgedAssociationDeclare,
    EmbeddableProperty: EmbeddablePropertyDeclare,
    EmbeddableType: EmbeddableTypeDeclare,
    EmbeddableTypeOverrideProperties: EmbeddableTypeOverridePropertiesDeclare,
    EmbeddableTypeProperty: EmbeddableTypePropertyDeclare,
    EmbeddableTypePropertySource: EmbeddableTypePropertySourceDeclare,
    EmbeddableTypeSource: EmbeddableTypeSourceDeclare,
    EmbeddableTypeWithCategorizedProperties: EmbeddableTypeWithCategorizedPropertiesDeclare,
    EmbeddableTypeWithOverrideProperties: EmbeddableTypeWithOverridePropertiesDeclare,
    EmbeddableTypeWithProperties: EmbeddableTypeWithPropertiesDeclare,
    Entity: EntityDeclare,
    EntityCategorizedProperties: EntityCategorizedPropertiesDeclare,
    EntityInheritInfo: EntityInheritInfoDeclare,
    EntityProperty: EntityPropertyDeclare,
    EntityPropertySource: EntityPropertySourceDeclare,
    EntitySource: EntitySourceDeclare,
    EntityWithCategorizedProperties: EntityWithCategorizedPropertiesDeclare,
    EntityWithInheritInfo: EntityWithInheritInfoDeclare,
    EntityWithProperties: EntityWithPropertiesDeclare,
    Enumeration: EnumerationDeclare,
    EnumerationItem: EnumerationItemDeclare,
    EnumerationItemSource: EnumerationItemSourceDeclare,
    EnumerationSource: EnumerationSourceDeclare,
    EnumerationStrategy: EnumerationStrategyDeclare,
    FkJoinInfo: FkJoinInfoDeclare,
    ForeignKey: ForeignKeyDeclare,
    ForeignKeyType: ForeignKeyTypeDeclare,
    GetterFormulaProperty: GetterFormulaPropertyDeclare,
    Group: GroupDeclare,
    GroupInheritInfoMap: GroupInheritInfoMapDeclare,
    GroupSubData: GroupSubDataDeclare,
    GroupSubMaps: GroupSubMapsDeclare,
    GroupWithInheritInfoMap: GroupWithInheritInfoMapDeclare,
    GroupWithSubMaps: GroupWithSubMapsDeclare,
    IdCommonProperty: IdCommonPropertyDeclare,
    IdEmbeddableProperty: IdEmbeddablePropertyDeclare,
    Index: IndexDeclare,
    JoinInfo: JoinInfoDeclare,
    JvmFileBuilder: JvmFileBuilderDeclare,
    JvmLanguage: JvmLanguageDeclare,
    JvmSource: JvmSourceDeclare,
    JvmToSqlMappingRule: JvmToSqlMappingRuleDeclare,
    JvmToTsMappingRule: JvmToTsMappingRuleDeclare,
    JvmType: JvmTypeDeclare,
    KeyProperty: KeyPropertyDeclare,
    LabelPosition: LabelPositionDeclare,
    LogicalDeleteProperty: LogicalDeletePropertyDeclare,
    ManyToManyAssociation: ManyToManyAssociationDeclare,
    ManyToManyAssociationIdOnly: ManyToManyAssociationIdOnlyDeclare,
    ManyToManyMappedProperty: ManyToManyMappedPropertyDeclare,
    ManyToManySourceProperty: ManyToManySourcePropertyDeclare,
    ManyToManyViewProperty: ManyToManyViewPropertyDeclare,
    ManyToOneAbstractAssociation: ManyToOneAbstractAssociationDeclare,
    ManyToOneAbstractAssociationIdOnly: ManyToOneAbstractAssociationIdOnlyDeclare,
    ManyToOneAssociation: ManyToOneAssociationDeclare,
    ManyToOneAssociationIdOnly: ManyToOneAssociationIdOnlyDeclare,
    ManyToOneProperty: ManyToOnePropertyDeclare,
    MappedPropertySource: MappedPropertySourceDeclare,
    MappedSuperClass: MappedSuperClassDeclare,
    MappedSuperClassInheritInfo: MappedSuperClassInheritInfoDeclare,
    MappedSuperClassProperty: MappedSuperClassPropertyDeclare,
    MappedSuperClassPropertySource: MappedSuperClassPropertySourceDeclare,
    MappedSuperClassWithCategorizedProperties: MappedSuperClassWithCategorizedPropertiesDeclare,
    MappedSuperClassWithInheritInfo: MappedSuperClassWithInheritInfoDeclare,
    MappedSuperClassWithProperties: MappedSuperClassWithPropertiesDeclare,
    MapperSuperClassSource: MapperSuperClassSourceDeclare,
    MidTableInfo: MidTableInfoDeclare,
    MidTableJoinInfo: MidTableJoinInfoDeclare,
    Model: ModelDeclare,
    ModelContext: ModelContextDeclare,
    ModelContextData: ModelContextDataDeclare,
    ModelGraphSubData: ModelGraphSubDataDeclare,
    ModelSubData: ModelSubDataDeclare,
    ModelSubIds: ModelSubIdsDeclare,
    ModelSubIdSets: ModelSubIdSetsDeclare,
    MultiColumnJoinInfo: MultiColumnJoinInfoDeclare,
    MultiColumnMidTableJoinInfo: MultiColumnMidTableJoinInfoDeclare,
    NameStrategy: NameStrategyDeclare,
    NameTool: NameToolDeclare,
    OnDissociationAction: OnDissociationActionDeclare,
    OneToManyAbstractProperty: OneToManyAbstractPropertyDeclare,
    OneToManyProperty: OneToManyPropertyDeclare,
    OneToOneAbstractAssociation: OneToOneAbstractAssociationDeclare,
    OneToOneAbstractAssociationIdOnly: OneToOneAbstractAssociationIdOnlyDeclare,
    OneToOneAssociation: OneToOneAssociationDeclare,
    OneToOneAssociationIdOnly: OneToOneAssociationIdOnlyDeclare,
    OneToOneMappedAbstractProperty: OneToOneMappedAbstractPropertyDeclare,
    OneToOneMappedProperty: OneToOneMappedPropertyDeclare,
    OneToOneSourceProperty: OneToOneSourcePropertyDeclare,
    OrderDirection: OrderDirectionDeclare,
    Position: PositionDeclare,
    Property: PropertyDeclare,
    PropertyItem: PropertyItemDeclare,
    ScalarCommonProperty: ScalarCommonPropertyDeclare,
    ScalarEmbeddableProperty: ScalarEmbeddablePropertyDeclare,
    ScalarEnumProperty: ScalarEnumPropertyDeclare,
    SingleColumnJoinInfo: SingleColumnJoinInfoDeclare,
    SingleColumnMidTableJoinInfo: SingleColumnMidTableJoinInfoDeclare,
    SqlFormulaProperty: SqlFormulaPropertyDeclare,
    SqlToJvmMappingRule: SqlToJvmMappingRuleDeclare,
    SqlType: SqlTypeDeclare,
    Table: TableDeclare,
    TransientProperty: TransientPropertyDeclare,
    TsType: TsTypeDeclare,
    TypeTool: TypeToolDeclare,
    VersionProperty: VersionPropertyDeclare,
})
