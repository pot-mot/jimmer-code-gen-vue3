type AssociationSubData = {
    sourceEntity: EntityWithCategorizedProperties | MappedSuperClassWithCategorizedProperties
    targetEntity: EntityWithCategorizedProperties | MappedSuperClassWithCategorizedProperties
    sourceProperty: AssociationProperty
    targetProperty: AssociationProperty
}

type AssociationWithSubData = Association & AssociationSubData
