type EntityGenerator = (
    entity: DeepReadonly<Entity>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClass>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableType>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type EnumerationGenerator = (
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type AssociationGenerator = (
    association: DeepReadonly<Association>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type GroupGenerator = (
    group: DeepReadonly<Group>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>

type ModelGenerator = (
    model: DeepReadonly<Model>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>
