export default Object.freeze({
    fileName: 'EntityWithInheritInfo.d.ts',
    content: `type EntityWithInheritInfo = Omit<EntityWithCategorizedProperties, 'properties'> & {
    properties: Property[]
} & EntityInheritInfo`,
})
