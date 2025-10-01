type EntityGenerator = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>,
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
    association: DeepReadonly<AssociationWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type GroupGenerator = (
    group: DeepReadonly<GroupWithSubMaps>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type ModelGenerator = (
    model: DeepReadonly<ModelWithSubData>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>
