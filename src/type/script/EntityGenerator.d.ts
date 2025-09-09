type EntityGenerator = (
    entity: DeepReadonly<EntityWithCategoryProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithCategoryProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableTypeWithCategoryProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type EnumerationGenerator = (
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type AssociationGenerator = (
    association: DeepReadonly<AssociationWithSubData>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type GroupGenerator = (
    group: DeepReadonly<GroupWithSubData>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type ModelGenerator = (
    model: DeepReadonly<ModelWithSubData>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>
