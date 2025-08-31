import AssociationTypeJsonSchema from "./items/AssociationType.ts";
import AssociationJsonSchema from "./items/Association.ts";
import DatabaseJsonSchema from "./items/Database.ts";
import SchemaJsonSchema from "./items/Schema.ts";
import TableJsonSchema from "./items/Table.ts";
import ColumnJsonSchema from "./items/Column.ts";
import IndexJsonSchema from "./items/Index.ts";
import ForeignKeyJsonSchema from "./items/ForeignKey.ts";
import EntityPropertyJsonSchema from "./items/EntityProperty.ts";
import EntityPropertyCategoryJsonSchema from "./items/EntityPropertyCategory.ts";
import EntityJsonSchema from "./items/Entity.ts";
import MappedSuperClassJsonSchema from "./items/MappedSuperClass.ts";
import EmbeddableTypePropertyJsonSchema from "./items/EmbeddableTypeProperty.ts";
import EmbeddableTypePropertyCategoryJsonSchema from "./items/EmbeddableTypePropertyCategory.ts";
import EmbeddableTypeJsonSchema from "./items/EmbeddableType.ts";
import EnumerationStrategyJsonSchema from "./items/EnumerationStrategy.ts";
import EnumerationItemJsonSchema from "./items/EnumerationItem.ts";
import EnumerationJsonSchema from "./items/Enumeration.ts";
import BasePropertyJsonSchema from "./items/BaseProperty.ts";
import ColumnPropertyJsonSchema from "./items/ColumnProperty.ts";
import OptionalKeyPropertyJsonSchema from "./items/OptionalKeyProperty.ts";
import OptionalLogicalDeletePropertyJsonSchema from "./items/OptionalLogicalDeleteProperty.ts";
import EmbeddablePropertyJsonSchema from "./items/EmbeddableProperty.ts";
import IdPropertyJsonSchema from "./items/IdProperty.ts";
import ScalarPropertyJsonSchema from "./items/ScalarProperty.ts";
import EnumPropertyJsonSchema from "./items/EnumProperty.ts";
import EntityTypePropertyJsonSchema from "./items/EntityTypeProperty.ts";
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
    Association: AssociationJsonSchema,
    Database: DatabaseJsonSchema,
    Schema: SchemaJsonSchema,
    Table: TableJsonSchema,
    Column: ColumnJsonSchema,
    Index: IndexJsonSchema,
    ForeignKey: ForeignKeyJsonSchema,
    EntityProperty: EntityPropertyJsonSchema,
    EntityPropertyCategory: EntityPropertyCategoryJsonSchema,
    Entity: EntityJsonSchema,
    MappedSuperClass: MappedSuperClassJsonSchema,
    EmbeddableTypeProperty: EmbeddableTypePropertyJsonSchema,
    EmbeddableTypePropertyCategory: EmbeddableTypePropertyCategoryJsonSchema,
    EmbeddableType: EmbeddableTypeJsonSchema,
    EnumerationStrategy: EnumerationStrategyJsonSchema,
    EnumerationItem: EnumerationItemJsonSchema,
    Enumeration: EnumerationJsonSchema,
    BaseProperty: BasePropertyJsonSchema,
    ColumnProperty: ColumnPropertyJsonSchema,
    OptionalKeyProperty: OptionalKeyPropertyJsonSchema,
    OptionalLogicalDeleteProperty: OptionalLogicalDeletePropertyJsonSchema,
    EmbeddableProperty: EmbeddablePropertyJsonSchema,
    IdProperty: IdPropertyJsonSchema,
    ScalarProperty: ScalarPropertyJsonSchema,
    EnumProperty: EnumPropertyJsonSchema,
    EntityTypeProperty: EntityTypePropertyJsonSchema,
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
