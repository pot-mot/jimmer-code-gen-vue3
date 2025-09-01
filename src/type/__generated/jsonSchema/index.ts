import AssociationJsonSchema from "./items/Association.ts";
import AssociationPropertyJsonSchema from "./items/AssociationProperty.ts";
import AssociationTypeJsonSchema from "./items/AssociationType.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import ColumnJsonSchema from "./items/Column.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EmbeddableTypePropertyJsonSchema from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypePropertyCategoryJsonSchema from "./items/EmbeddableTypePropertyCategory.ts";
import EntityJsonSchema from "./items/Entity.ts";
import EntityPropertyJsonSchema from "./items/EntityProperty.ts";
import EntityPropertyCategoryJsonSchema from "./items/EntityPropertyCategory.ts";
import EntityTypePropertyJsonSchema from "./items/EntityTypeProperty.ts";
import EnumerationJsonSchema from "./items/Enumeration.ts";
import EnumerationItemJsonSchema from "./items/EnumerationItem.ts";
import EnumerationStrategyJsonSchema from "./items/EnumerationStrategy.ts";
import EnumPropertyJsonSchema from "./items/EnumProperty.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";
import FormulaPropertyJsonSchema from "./items/FormulaProperty.ts";
import IdPropertyJsonSchema from "./items/IdProperty.ts";
import IndexJsonSchema from "./items/Index.ts";
import ManyToManySourcePropertyJsonSchema from "./items/ManyToManySourceProperty.ts";
import ManyToManyTargetPropertyJsonSchema from "./items/ManyToManyTargetProperty.ts";
import ManyToManyViewPropertyJsonSchema from "./items/ManyToManyViewProperty.ts";
import ManyToOnePropertyJsonSchema from "./items/ManyToOneProperty.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import OnDissociationActionJsonSchema from "./items/OnDissociationAction.ts";
import OneToManyPropertyJsonSchema from "./items/OneToManyProperty.ts";
import OneToOneSourcePropertyJsonSchema from "./items/OneToOneSourceProperty.ts";
import OneToOneTargetPropertyJsonSchema from "./items/OneToOneTargetProperty.ts";
import OptionalKeyPropertyJsonSchema from "./items/OptionalKeyProperty.ts";
import OptionalLogicalDeletePropertyJsonSchema from "./items/OptionalLogicalDeleteProperty.ts";
import OptionalOrderPropertyJsonSchema from "./items/OptionalOrderProperty.ts";
import ScalarPropertyJsonSchema from "./items/ScalarProperty.ts";
import SchemaJsonSchema from "./items/Schema.ts";
import TableJsonSchema from "./items/Table.ts";
import TransientPropertyJsonSchema from "./items/TransientProperty.ts";

export const jsonSchemas = Object.freeze({
    Association: AssociationJsonSchema,
    AssociationProperty: AssociationPropertyJsonSchema,
    AssociationType: AssociationTypeJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    Column: ColumnJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    Database: DatabaseJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    EmbeddableTypeProperty: EmbeddableTypePropertyJsonSchema,
    EmbeddableTypePropertyCategory: EmbeddableTypePropertyCategoryJsonSchema,
    Entity: EntityJsonSchema,
    EntityProperty: EntityPropertyJsonSchema,
    EntityPropertyCategory: EntityPropertyCategoryJsonSchema,
    EntityTypeProperty: EntityTypePropertyJsonSchema,
    Enumeration: EnumerationJsonSchema,
    EnumerationItem: EnumerationItemJsonSchema,
    EnumerationStrategy: EnumerationStrategyJsonSchema,
    EnumProperty: EnumPropertyJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
    FormulaProperty: FormulaPropertyJsonSchema,
    IdProperty: IdPropertyJsonSchema,
    Index: IndexJsonSchema,
    ManyToManySourceProperty: ManyToManySourcePropertyJsonSchema,
    ManyToManyTargetProperty: ManyToManyTargetPropertyJsonSchema,
    ManyToManyViewProperty: ManyToManyViewPropertyJsonSchema,
    ManyToOneProperty: ManyToOnePropertyJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    OnDissociationAction: OnDissociationActionJsonSchema,
    OneToManyProperty: OneToManyPropertyJsonSchema,
    OneToOneSourceProperty: OneToOneSourcePropertyJsonSchema,
    OneToOneTargetProperty: OneToOneTargetPropertyJsonSchema,
    OptionalKeyProperty: OptionalKeyPropertyJsonSchema,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyJsonSchema,
    OptionalOrderProperty: OptionalOrderPropertyJsonSchema,
    ScalarProperty: ScalarPropertyJsonSchema,
    Schema: SchemaJsonSchema,
    Table: TableJsonSchema,
    TransientProperty: TransientPropertyJsonSchema,
})

export type JsonSchemaKey = keyof typeof jsonSchemas
