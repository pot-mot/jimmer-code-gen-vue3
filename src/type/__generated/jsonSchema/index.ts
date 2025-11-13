import BaseAssociationPropertyJsonSchema from "./items/BaseAssociationProperty.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import CheckJsonSchema from "./items/Check.ts";
import ColumnJsonSchema from "./items/Column.ts";
import ColumnInfoJsonSchema from "./items/ColumnInfo.ts";
import ColumnNameOverrideJsonSchema from "./items/ColumnNameOverride.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import ColumnRefJsonSchema from "./items/ColumnRef.ts";
import CrossTypeJsonSchema from "./items/CrossType.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import DatabaseSourceJsonSchema from "./items/DatabaseSource.ts";
import DatabaseTypeJsonSchema from "./items/DatabaseType.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EmbeddableTypePropertyJsonSchema from "./items/EmbeddableTypeProperty.ts";
import EntityJsonSchema from "./items/Entity.ts";
import EntityPropertyJsonSchema from "./items/EntityProperty.ts";
import EnumerationJsonSchema from "./items/Enumeration.ts";
import EnumerationItemJsonSchema from "./items/EnumerationItem.ts";
import EnumerationStrategyJsonSchema from "./items/EnumerationStrategy.ts";
import FkJoinInfoJsonSchema from "./items/FkJoinInfo.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";
import ForeignKeyTypeJsonSchema from "./items/ForeignKeyType.ts";
import GetterFormulaPropertyJsonSchema from "./items/GetterFormulaProperty.ts";
import GroupJsonSchema from "./items/Group.ts";
import IdCommonPropertyJsonSchema from "./items/IdCommonProperty.ts";
import IdEmbeddablePropertyJsonSchema from "./items/IdEmbeddableProperty.ts";
import IndexJsonSchema from "./items/Index.ts";
import JoinInfoJsonSchema from "./items/JoinInfo.ts";
import JvmLanguageJsonSchema from "./items/JvmLanguage.ts";
import JvmSourceJsonSchema from "./items/JvmSource.ts";
import JvmToSqlMappingRuleJsonSchema from "./items/JvmToSqlMappingRule.ts";
import JvmToSqlMatchRuleJsonSchema from "./items/JvmToSqlMatchRule.ts";
import JvmToTsMappingRuleJsonSchema from "./items/JvmToTsMappingRule.ts";
import JvmToTsMatchRuleJsonSchema from "./items/JvmToTsMatchRule.ts";
import JvmTypeJsonSchema from "./items/JvmType.ts";
import KeyPropertyJsonSchema from "./items/KeyProperty.ts";
import LabelPositionJsonSchema from "./items/LabelPosition.ts";
import LogicalDeletePropertyJsonSchema from "./items/LogicalDeleteProperty.ts";
import ManyToManyAssociationIdOnlyJsonSchema from "./items/ManyToManyAssociationIdOnly.ts";
import ManyToManyMappedPropertyJsonSchema from "./items/ManyToManyMappedProperty.ts";
import ManyToManySourcePropertyJsonSchema from "./items/ManyToManySourceProperty.ts";
import ManyToManyViewPropertyJsonSchema from "./items/ManyToManyViewProperty.ts";
import ManyToOneAbstractAssociationIdOnlyJsonSchema from "./items/ManyToOneAbstractAssociationIdOnly.ts";
import ManyToOneAssociationIdOnlyJsonSchema from "./items/ManyToOneAssociationIdOnly.ts";
import ManyToOnePropertyJsonSchema from "./items/ManyToOneProperty.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import MappedSuperClassPropertyJsonSchema from "./items/MappedSuperClassProperty.ts";
import MidTableInfoJsonSchema from "./items/MidTableInfo.ts";
import MidTableJoinInfoJsonSchema from "./items/MidTableJoinInfo.ts";
import ModelJsonSchema from "./items/Model.ts";
import MultiColumnJoinInfoJsonSchema from "./items/MultiColumnJoinInfo.ts";
import MultiColumnMidTableJoinInfoJsonSchema from "./items/MultiColumnMidTableJoinInfo.ts";
import NameStrategyJsonSchema from "./items/NameStrategy.ts";
import OnDissociationActionJsonSchema from "./items/OnDissociationAction.ts";
import OneToManyAbstractPropertyJsonSchema from "./items/OneToManyAbstractProperty.ts";
import OneToManyPropertyJsonSchema from "./items/OneToManyProperty.ts";
import OneToOneAbstractAssociationIdOnlyJsonSchema from "./items/OneToOneAbstractAssociationIdOnly.ts";
import OneToOneAssociationIdOnlyJsonSchema from "./items/OneToOneAssociationIdOnly.ts";
import OneToOneMappedAbstractPropertyJsonSchema from "./items/OneToOneMappedAbstractProperty.ts";
import OneToOneMappedPropertyJsonSchema from "./items/OneToOneMappedProperty.ts";
import OneToOneSourcePropertyJsonSchema from "./items/OneToOneSourceProperty.ts";
import OrderDirectionJsonSchema from "./items/OrderDirection.ts";
import PositionJsonSchema from "./items/Position.ts";
import ScalarCommonPropertyJsonSchema from "./items/ScalarCommonProperty.ts";
import ScalarEmbeddablePropertyJsonSchema from "./items/ScalarEmbeddableProperty.ts";
import ScalarEnumPropertyJsonSchema from "./items/ScalarEnumProperty.ts";
import SingleColumnJoinInfoJsonSchema from "./items/SingleColumnJoinInfo.ts";
import SingleColumnMidTableJoinInfoJsonSchema from "./items/SingleColumnMidTableJoinInfo.ts";
import SqlFormulaPropertyJsonSchema from "./items/SqlFormulaProperty.ts";
import SqlToJvmMappingRuleJsonSchema from "./items/SqlToJvmMappingRule.ts";
import SqlToJvmMatchRuleJsonSchema from "./items/SqlToJvmMatchRule.ts";
import SqlToTsMappingRuleJsonSchema from "./items/SqlToTsMappingRule.ts";
import SqlToTsMatchRuleJsonSchema from "./items/SqlToTsMatchRule.ts";
import SqlTypeJsonSchema from "./items/SqlType.ts";
import TableJsonSchema from "./items/Table.ts";
import TransientPropertyJsonSchema from "./items/TransientProperty.ts";
import TsToJvmMappingRuleJsonSchema from "./items/TsToJvmMappingRule.ts";
import TsToJvmMatchRuleJsonSchema from "./items/TsToJvmMatchRule.ts";
import TsToSqlMappingRuleJsonSchema from "./items/TsToSqlMappingRule.ts";
import TsToSqlMatchRuleJsonSchema from "./items/TsToSqlMatchRule.ts";
import TsTypeJsonSchema from "./items/TsType.ts";
import VersionPropertyJsonSchema from "./items/VersionProperty.ts";
import EmbeddableTypeWithPropertiesJsonSchema from "../../context/jsonSchema/EmbeddableTypeWithProperties.ts";
import EntityWithPropertiesJsonSchema from "../../context/jsonSchema/EntityWithProperties.ts";
import MappedSuperClassWithPropertiesJsonSchema from "../../context/jsonSchema/MappedSuperClassWithProperties.ts";
import PartialModelGraphSubDataJsonSchema from "../../context/jsonSchema/PartialModelGraphSubData.ts";

export const jsonSchemas = Object.freeze({
    BaseAssociationProperty: BaseAssociationPropertyJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    Check: CheckJsonSchema,
    Column: ColumnJsonSchema,
    ColumnInfo: ColumnInfoJsonSchema,
    ColumnNameOverride: ColumnNameOverrideJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    ColumnRef: ColumnRefJsonSchema,
    CrossType: CrossTypeJsonSchema,
    Database: DatabaseJsonSchema,
    DatabaseSource: DatabaseSourceJsonSchema,
    DatabaseType: DatabaseTypeJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    EmbeddableTypeProperty: EmbeddableTypePropertyJsonSchema,
    Entity: EntityJsonSchema,
    EntityProperty: EntityPropertyJsonSchema,
    Enumeration: EnumerationJsonSchema,
    EnumerationItem: EnumerationItemJsonSchema,
    EnumerationStrategy: EnumerationStrategyJsonSchema,
    FkJoinInfo: FkJoinInfoJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
    ForeignKeyType: ForeignKeyTypeJsonSchema,
    GetterFormulaProperty: GetterFormulaPropertyJsonSchema,
    Group: GroupJsonSchema,
    IdCommonProperty: IdCommonPropertyJsonSchema,
    IdEmbeddableProperty: IdEmbeddablePropertyJsonSchema,
    Index: IndexJsonSchema,
    JoinInfo: JoinInfoJsonSchema,
    JvmLanguage: JvmLanguageJsonSchema,
    JvmSource: JvmSourceJsonSchema,
    JvmToSqlMappingRule: JvmToSqlMappingRuleJsonSchema,
    JvmToSqlMatchRule: JvmToSqlMatchRuleJsonSchema,
    JvmToTsMappingRule: JvmToTsMappingRuleJsonSchema,
    JvmToTsMatchRule: JvmToTsMatchRuleJsonSchema,
    JvmType: JvmTypeJsonSchema,
    KeyProperty: KeyPropertyJsonSchema,
    LabelPosition: LabelPositionJsonSchema,
    LogicalDeleteProperty: LogicalDeletePropertyJsonSchema,
    ManyToManyAssociationIdOnly: ManyToManyAssociationIdOnlyJsonSchema,
    ManyToManyMappedProperty: ManyToManyMappedPropertyJsonSchema,
    ManyToManySourceProperty: ManyToManySourcePropertyJsonSchema,
    ManyToManyViewProperty: ManyToManyViewPropertyJsonSchema,
    ManyToOneAbstractAssociationIdOnly: ManyToOneAbstractAssociationIdOnlyJsonSchema,
    ManyToOneAssociationIdOnly: ManyToOneAssociationIdOnlyJsonSchema,
    ManyToOneProperty: ManyToOnePropertyJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    MappedSuperClassProperty: MappedSuperClassPropertyJsonSchema,
    MidTableInfo: MidTableInfoJsonSchema,
    MidTableJoinInfo: MidTableJoinInfoJsonSchema,
    Model: ModelJsonSchema,
    MultiColumnJoinInfo: MultiColumnJoinInfoJsonSchema,
    MultiColumnMidTableJoinInfo: MultiColumnMidTableJoinInfoJsonSchema,
    NameStrategy: NameStrategyJsonSchema,
    OnDissociationAction: OnDissociationActionJsonSchema,
    OneToManyAbstractProperty: OneToManyAbstractPropertyJsonSchema,
    OneToManyProperty: OneToManyPropertyJsonSchema,
    OneToOneAbstractAssociationIdOnly: OneToOneAbstractAssociationIdOnlyJsonSchema,
    OneToOneAssociationIdOnly: OneToOneAssociationIdOnlyJsonSchema,
    OneToOneMappedAbstractProperty: OneToOneMappedAbstractPropertyJsonSchema,
    OneToOneMappedProperty: OneToOneMappedPropertyJsonSchema,
    OneToOneSourceProperty: OneToOneSourcePropertyJsonSchema,
    OrderDirection: OrderDirectionJsonSchema,
    Position: PositionJsonSchema,
    ScalarCommonProperty: ScalarCommonPropertyJsonSchema,
    ScalarEmbeddableProperty: ScalarEmbeddablePropertyJsonSchema,
    ScalarEnumProperty: ScalarEnumPropertyJsonSchema,
    SingleColumnJoinInfo: SingleColumnJoinInfoJsonSchema,
    SingleColumnMidTableJoinInfo: SingleColumnMidTableJoinInfoJsonSchema,
    SqlFormulaProperty: SqlFormulaPropertyJsonSchema,
    SqlToJvmMappingRule: SqlToJvmMappingRuleJsonSchema,
    SqlToJvmMatchRule: SqlToJvmMatchRuleJsonSchema,
    SqlToTsMappingRule: SqlToTsMappingRuleJsonSchema,
    SqlToTsMatchRule: SqlToTsMatchRuleJsonSchema,
    SqlType: SqlTypeJsonSchema,
    Table: TableJsonSchema,
    TransientProperty: TransientPropertyJsonSchema,
    TsToJvmMappingRule: TsToJvmMappingRuleJsonSchema,
    TsToJvmMatchRule: TsToJvmMatchRuleJsonSchema,
    TsToSqlMappingRule: TsToSqlMappingRuleJsonSchema,
    TsToSqlMatchRule: TsToSqlMatchRuleJsonSchema,
    TsType: TsTypeJsonSchema,
    VersionProperty: VersionPropertyJsonSchema,
    EmbeddableTypeWithProperties: EmbeddableTypeWithPropertiesJsonSchema,
    EntityWithProperties: EntityWithPropertiesJsonSchema,
    MappedSuperClassWithProperties: MappedSuperClassWithPropertiesJsonSchema,
    PartialModelGraphSubData: PartialModelGraphSubDataJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
