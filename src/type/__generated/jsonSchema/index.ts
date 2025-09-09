import AssociationJsonSchema from "./items/Association.ts";
import AssociationPropertyJsonSchema from "./items/AssociationProperty.ts";
import AssociationTypeJsonSchema from "./items/AssociationType.ts";
import BackEndLanguageJsonSchema from "./items/BackEndLanguage.ts";
import BaseAssociationPropertyJsonSchema from "./items/BaseAssociationProperty.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import ColumnJsonSchema from "./items/Column.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import DatabaseTypeJsonSchema from "./items/DatabaseType.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EntityJsonSchema from "./items/Entity.ts";
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
import ManyToManySourcePropertyJsonSchema from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyJsonSchema from "./items/ManyToManyTargetProperty.ts";
import ManyToManyViewPropertyJsonSchema from "./items/ManyToManyViewProperty.ts";
import ManyToOnePropertyJsonSchema from "./items/ManyToOneProperty.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import ModelJsonSchema from "./items/Model.ts";
import OnDissociationActionJsonSchema from "./items/OnDissociationAction.ts";
import OneToManyPropertyJsonSchema from "./items/OneToManyProperty.ts";
import OneToOneSourcePropertyJsonSchema from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyJsonSchema from "./items/OneToOneTargetProperty.ts";
import ScalarLogicalDeletePropertyJsonSchema from "./items/ScalarLogicalDeleteProperty.ts";
import ScalarPropertyJsonSchema from "./items/ScalarProperty.ts";
import SqlFormulaPropertyJsonSchema from "./items/SqlFormulaProperty.ts";
import TableJsonSchema from "./items/Table.ts";
import TransientPropertyJsonSchema from "./items/TransientProperty.ts";
import VersionPropertyJsonSchema from "./items/VersionProperty.ts";

export const jsonSchemas = Object.freeze({
    Association: AssociationJsonSchema,
    AssociationProperty: AssociationPropertyJsonSchema,
    AssociationType: AssociationTypeJsonSchema,
    BackEndLanguage: BackEndLanguageJsonSchema,
    BaseAssociationProperty: BaseAssociationPropertyJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    Column: ColumnJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    Database: DatabaseJsonSchema,
    DatabaseType: DatabaseTypeJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    Entity: EntityJsonSchema,
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
    ManyToManySourceProperty: ManyToManySourcePropertyJsonSchema,
    ManyToManyTargetProperty: ManyToManyTargetPropertyJsonSchema,
    ManyToManyViewProperty: ManyToManyViewPropertyJsonSchema,
    ManyToOneProperty: ManyToOnePropertyJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    Model: ModelJsonSchema,
    OnDissociationAction: OnDissociationActionJsonSchema,
    OneToManyProperty: OneToManyPropertyJsonSchema,
    OneToOneSourceProperty: OneToOneSourcePropertyJsonSchema,
    OneToOneTargetProperty: OneToOneTargetPropertyJsonSchema,
    ScalarLogicalDeleteProperty: ScalarLogicalDeletePropertyJsonSchema,
    ScalarProperty: ScalarPropertyJsonSchema,
    SqlFormulaProperty: SqlFormulaPropertyJsonSchema,
    Table: TableJsonSchema,
    TransientProperty: TransientPropertyJsonSchema,
    VersionProperty: VersionPropertyJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
