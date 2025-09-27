import BackEndLanguageJsonSchema from "./items/BackEndLanguage.ts";
import BackEndMappingSourceJsonSchema from "./items/BackEndMappingSource.ts";
import BackEndToSqlTypeMappingJsonSchema from "./items/BackEndToSqlTypeMapping.ts";
import BackEndToTypeScriptTypeMappingJsonSchema from "./items/BackEndToTypeScriptTypeMapping.ts";
import BaseAssociationPropertyJsonSchema from "./items/BaseAssociationProperty.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import ColumnJsonSchema from "./items/Column.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import DatabaseTypeJsonSchema from "./items/DatabaseType.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EmbeddableTypePropertyJsonSchema from "./items/EmbeddableTypeProperty.ts";
import EntityJsonSchema from "./items/Entity.ts";
import EntityPropertyJsonSchema from "./items/EntityProperty.ts";
import EnumerationJsonSchema from "./items/Enumeration.ts";
import EnumerationItemJsonSchema from "./items/EnumerationItem.ts";
import EnumerationStrategyJsonSchema from "./items/EnumerationStrategy.ts";
import EnumLogicalDeletePropertyJsonSchema from "./items/EnumLogicalDeleteProperty.ts";
import EnumPropertyJsonSchema from "./items/EnumProperty.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";
import ForeignKeyTypeJsonSchema from "./items/ForeignKeyType.ts";
import GetterFormulaPropertyJsonSchema from "./items/GetterFormulaProperty.ts";
import GroupJsonSchema from "./items/Group.ts";
import IdPropertyJsonSchema from "./items/IdProperty.ts";
import IndexJsonSchema from "./items/Index.ts";
import JoinColumnJsonSchema from "./items/JoinColumn.ts";
import JoinTableJsonSchema from "./items/JoinTable.ts";
import KeyPropertyJsonSchema from "./items/KeyProperty.ts";
import ManyToManyAssociationIdOnlyJsonSchema from "./items/ManyToManyAssociationIdOnly.ts";
import ManyToManyMappedPropertyJsonSchema from "./items/ManyToManyMappedProperty.ts";
import ManyToManySourcePropertyJsonSchema from "./items/ManyToManySourceProperty.ts";
import ManyToManyViewPropertyJsonSchema from "./items/ManyToManyViewProperty.ts";
import ManyToOneAbstractAssociationIdOnlyJsonSchema from "./items/ManyToOneAbstractAssociationIdOnly.ts";
import ManyToOneAssociationIdOnlyJsonSchema from "./items/ManyToOneAssociationIdOnly.ts";
import ManyToOnePropertyJsonSchema from "./items/ManyToOneProperty.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import MappedSuperClassPropertyJsonSchema from "./items/MappedSuperClassProperty.ts";
import ModelJsonSchema from "./items/Model.ts";
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
import ScalarLogicalDeletePropertyJsonSchema from "./items/ScalarLogicalDeleteProperty.ts";
import ScalarPropertyJsonSchema from "./items/ScalarProperty.ts";
import SqlFormulaPropertyJsonSchema from "./items/SqlFormulaProperty.ts";
import SqlToBackEndTypeMappingJsonSchema from "./items/SqlToBackEndTypeMapping.ts";
import TableJsonSchema from "./items/Table.ts";
import TransientPropertyJsonSchema from "./items/TransientProperty.ts";
import TypeSelectPairJsonSchema from "./items/TypeSelectPair.ts";
import VersionPropertyJsonSchema from "./items/VersionProperty.ts";
import EmbeddableTypeWithPropertiesJsonSchema from "../../context/jsonSchema/EmbeddableTypeWithProperties.ts";
import EntityWithPropertiesJsonSchema from "../../context/jsonSchema/EntityWithProperties.ts";
import MappedSuperClassWithPropertiesJsonSchema from "../../context/jsonSchema/MappedSuperClassWithProperties.ts";

export const jsonSchemas = Object.freeze({
    BackEndLanguage: BackEndLanguageJsonSchema,
    BackEndMappingSource: BackEndMappingSourceJsonSchema,
    BackEndToSqlTypeMapping: BackEndToSqlTypeMappingJsonSchema,
    BackEndToTypeScriptTypeMapping: BackEndToTypeScriptTypeMappingJsonSchema,
    BaseAssociationProperty: BaseAssociationPropertyJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    Column: ColumnJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    Database: DatabaseJsonSchema,
    DatabaseType: DatabaseTypeJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    EmbeddableTypeProperty: EmbeddableTypePropertyJsonSchema,
    Entity: EntityJsonSchema,
    EntityProperty: EntityPropertyJsonSchema,
    Enumeration: EnumerationJsonSchema,
    EnumerationItem: EnumerationItemJsonSchema,
    EnumerationStrategy: EnumerationStrategyJsonSchema,
    EnumLogicalDeleteProperty: EnumLogicalDeletePropertyJsonSchema,
    EnumProperty: EnumPropertyJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
    ForeignKeyType: ForeignKeyTypeJsonSchema,
    GetterFormulaProperty: GetterFormulaPropertyJsonSchema,
    Group: GroupJsonSchema,
    IdProperty: IdPropertyJsonSchema,
    Index: IndexJsonSchema,
    JoinColumn: JoinColumnJsonSchema,
    JoinTable: JoinTableJsonSchema,
    KeyProperty: KeyPropertyJsonSchema,
    ManyToManyAssociationIdOnly: ManyToManyAssociationIdOnlyJsonSchema,
    ManyToManyMappedProperty: ManyToManyMappedPropertyJsonSchema,
    ManyToManySourceProperty: ManyToManySourcePropertyJsonSchema,
    ManyToManyViewProperty: ManyToManyViewPropertyJsonSchema,
    ManyToOneAbstractAssociationIdOnly: ManyToOneAbstractAssociationIdOnlyJsonSchema,
    ManyToOneAssociationIdOnly: ManyToOneAssociationIdOnlyJsonSchema,
    ManyToOneProperty: ManyToOnePropertyJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    MappedSuperClassProperty: MappedSuperClassPropertyJsonSchema,
    Model: ModelJsonSchema,
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
    ScalarLogicalDeleteProperty: ScalarLogicalDeletePropertyJsonSchema,
    ScalarProperty: ScalarPropertyJsonSchema,
    SqlFormulaProperty: SqlFormulaPropertyJsonSchema,
    SqlToBackEndTypeMapping: SqlToBackEndTypeMappingJsonSchema,
    Table: TableJsonSchema,
    TransientProperty: TransientPropertyJsonSchema,
    TypeSelectPair: TypeSelectPairJsonSchema,
    VersionProperty: VersionPropertyJsonSchema,
    EmbeddableTypeWithProperties: EmbeddableTypeWithPropertiesJsonSchema,
    EntityWithProperties: EntityWithPropertiesJsonSchema,
    MappedSuperClassWithProperties: MappedSuperClassWithPropertiesJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
