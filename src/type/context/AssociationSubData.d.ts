type AssociationSubData = {
    sourceEntity: EntityWithCategoryProperties
    targetEntity: EntityWithCategoryProperties
    sourceProperty: AssociationProperty
    targetProperty: AssociationProperty
}

type AssociationWithSubData = Association & AssociationSubData
