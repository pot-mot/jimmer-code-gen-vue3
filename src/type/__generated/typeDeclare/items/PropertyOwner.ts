export default Object.freeze({
    fileName: 'PropertyOwner.d.ts',
    content: `type PropertyOwner =
    | { type: "Entity", entity: EntityWithInheritInfo }
    | { type: "MappedSuperClass", mappedSuperClass: MappedSuperClassWithInheritInfo }
    | { type: "EmbeddableType", embeddableType: EmbeddableTypeWithOverrideProperties }`,
})
