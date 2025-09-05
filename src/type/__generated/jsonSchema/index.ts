import AssociationTypeJsonSchema from "./items/AssociationType.ts";
import ForeignKeyTypeJsonSchema from "./items/ForeignKeyType.ts";
import JoinColumnJsonSchema from "./items/JoinColumn.ts";
import JoinTableJsonSchema from "./items/JoinTable.ts";
import AssociationJsonSchema from "./items/Association.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import TableJsonSchema from "./items/Table.ts";
import ColumnJsonSchema from "./items/Column.ts";
import IndexJsonSchema from "./items/Index.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";
import EntityJsonSchema from "./items/Entity.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EnumerationStrategyJsonSchema from "./items/EnumerationStrategy.ts";
import EnumerationItemJsonSchema from "./items/EnumerationItem.ts";
import EnumerationJsonSchema from "./items/Enumeration.ts";
import GroupJsonSchema from "./items/Group.ts";
import DatabaseTypeJsonSchema from "./items/DatabaseType.ts";
import BackEndLanguageJsonSchema from "./items/BackEndLanguage.ts";
import ModelJsonSchema from "./items/Model.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import OptionalKeyPropertyJsonSchema from "./items/OptionalKeyProperty.ts";
import OptionalOrderPropertyJsonSchema from "./items/OptionalOrderProperty.ts";
import OptionalLogicalDeletePropertyJsonSchema from "./items/OptionalLogicalDeleteProperty.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import IdPropertyJsonSchema from "./items/IdProperty.ts";
import ScalarPropertyJsonSchema from "./items/ScalarProperty.ts";
import EnumPropertyJsonSchema from "./items/EnumProperty.ts";
import BaseAssociationPropertyJsonSchema from "./items/BaseAssociationProperty.ts";
import OnDissociationActionJsonSchema from "./items/OnDissociationAction.ts";
import OneToOneSourcePropertyJsonSchema from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyJsonSchema from "./items/OneToOneTargetProperty.ts";
import ManyToOnePropertyJsonSchema from "./items/ManyToOneProperty.ts";
import OneToManyPropertyJsonSchema from "./items/OneToManyProperty.ts";
import ManyToManySourcePropertyJsonSchema from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyJsonSchema from "./items/ManyToManyTargetProperty.ts";
import AssociationPropertyJsonSchema from "./items/AssociationProperty.ts";
import ManyToManyViewPropertyJsonSchema from "./items/ManyToManyViewProperty.ts";
import FormulaPropertyJsonSchema from "./items/FormulaProperty.ts";
import TransientPropertyJsonSchema from "./items/TransientProperty.ts";

export const jsonSchemas = Object.freeze({
    AssociationType: AssociationTypeJsonSchema,
    ForeignKeyType: ForeignKeyTypeJsonSchema,
    JoinColumn: JoinColumnJsonSchema,
    JoinTable: JoinTableJsonSchema,
    Association: AssociationJsonSchema,
    Database: DatabaseJsonSchema,
    Table: TableJsonSchema,
    Column: ColumnJsonSchema,
    Index: IndexJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
    Entity: EntityJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    EnumerationStrategy: EnumerationStrategyJsonSchema,
    EnumerationItem: EnumerationItemJsonSchema,
    Enumeration: EnumerationJsonSchema,
    Group: GroupJsonSchema,
    DatabaseType: DatabaseTypeJsonSchema,
    BackEndLanguage: BackEndLanguageJsonSchema,
    Model: ModelJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    OptionalKeyProperty: OptionalKeyPropertyJsonSchema,
    OptionalOrderProperty: OptionalOrderPropertyJsonSchema,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    IdProperty: IdPropertyJsonSchema,
    ScalarProperty: ScalarPropertyJsonSchema,
    EnumProperty: EnumPropertyJsonSchema,
    BaseAssociationProperty: BaseAssociationPropertyJsonSchema,
    OnDissociationAction: OnDissociationActionJsonSchema,
    OneToOneSourceProperty: OneToOneSourcePropertyJsonSchema,
    OneToOneTargetProperty: OneToOneTargetPropertyJsonSchema,
    ManyToOneProperty: ManyToOnePropertyJsonSchema,
    OneToManyProperty: OneToManyPropertyJsonSchema,
    ManyToManySourceProperty: ManyToManySourcePropertyJsonSchema,
    ManyToManyTargetProperty: ManyToManyTargetPropertyJsonSchema,
    AssociationProperty: AssociationPropertyJsonSchema,
    ManyToManyViewProperty: ManyToManyViewPropertyJsonSchema,
    FormulaProperty: FormulaPropertyJsonSchema,
    TransientProperty: TransientPropertyJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
