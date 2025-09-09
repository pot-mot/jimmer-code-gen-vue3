type EntityGenerator = (
    entity: DeepReadonly<EntityWithCategorizedProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithCategorizedProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableTypeWithCategorizedProperties>,
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
