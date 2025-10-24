// jvmLanguage=KOTLIN
export const kotlinEntityGenerator: EntityGenerator = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    for (const mappedSuperClassId of entity.extendsIds) {
        builder.requireMappedSuperClass(mappedSuperClassId)
    }

    const propertyList: PropertyItem[] = []

    const pushIdViewProperty = (
        property: DeepReadonly<OneToOneSourceProperty | OneToOneMappedProperty | ManyToOneProperty | OneToManyProperty | ManyToManySourceProperty | ManyToManyMappedProperty>,
        referencedEntity: DeepReadonly<EntityWithInheritInfo>
    ) => {
        const referencedId = referencedEntity.idProperty
        if (referencedId.category === "ID_COMMON") {
            propertyList.push({
                name: property.idViewName,
                comment: property.comment,
                type: property.typeIsList ? "List<" + referencedId.rawType + ">" : referencedId.rawType + (property.nullable ? "?" : ""),
                annotations: [
                    `@IdView("${property.name}")`,
                    ...referencedId.extraAnnotations,
                ]
            })
        } else if (referencedId.category === "ID_EMBEDDABLE") {
            const referencedEmbeddableType = builder.requireEmbeddableType(referencedId.embeddableTypeId)
            propertyList.push({
                name: property.idViewName,
                comment: property.comment,
                type: property.typeIsList ? "List<" + referencedEmbeddableType.name + ">" : referencedEmbeddableType.name + (property.nullable ? "?" : ""),
                annotations: [
                    `@IdView("${property.name}")`,
                    ...referencedId.extraAnnotations,
                ]
            })
        }
    }

    const buildJoinAnnotation = (
        joinInfo: DeepReadonly<JoinInfo>,
    ): string => {
        if (joinInfo.type === "SingleColumn") {
            return `@JoinColumn(name = "${joinInfo.columnName}")`
        } else if (joinInfo.type === "MultiColumn") {
            // TODO
            return `@JoinColumn`
        } else if (joinInfo.type === "SingleColumnMidTable") {
            // TODO
            return ''
        } else if (joinInfo.type === "MultiColumnMidTable") {
            return ''
        } else {
            return ''
        }
    }

    for (const property of entity.properties) {
        builder.addImports(property.extraImports)

        if (property.category === "ID_COMMON") {
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations: [
                    '@Id',
                    `@Column(name = "${property.columnInfo.name}")`,
                    ...property.extraAnnotations,
                ],
            })
        } else if (property.category === "ID_EMBEDDABLE") {
            const embeddableType = builder.requireEmbeddableType(property.embeddableTypeId)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: embeddableType.name,
                annotations: [
                    '@Id',
                    '@GeneratedValue',
                    ...property.extraAnnotations,
                ],
            })
        } else if (property.category === "SCALAR_COMMON") {
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: property.rawType + (property.nullable ? "?" : ""),
                annotations: [
                    `@Column(name = "${property.columnInfo.name}")`,
                    ...property.extraAnnotations,
                ],
            })
        } else if (property.category === "SCALAR_ENUM") {
            const enumeration = builder.requireEnumeration(property.enumId)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: enumeration.name + (property.nullable ? "?" : ""),
                annotations: [
                    `@Column(name = "${property.columnInfo.name}")`,
                    ...property.extraAnnotations,
                ],
            })
        } else if (property.category === "SCALAR_EMBEDDABLE") {
            const embeddableType = builder.requireEmbeddableType(property.embeddableTypeId)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: embeddableType.name + (property.nullable ? "?" : ""),
                annotations: [
                    ...property.extraAnnotations,
                ],
            })
        } else if (property.category === "OneToOne_Source") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const joinAnnotation = buildJoinAnnotation(property.joinInfo)

            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name + (property.nullable ? "?" : ""),
                annotations: [
                    '@OneToOne',
                    joinAnnotation,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        } else if (property.category === "OneToOne_Mapped") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.oneToOneSourcePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name + (property.nullable ? "?" : ""),
                annotations: [
                    `@OneToOne(mappedBy = "${sourceProperty.name}")`,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        } else if (property.category === "ManyToOne") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const joinAnnotation = buildJoinAnnotation(property.joinInfo)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name + (property.nullable ? "?" : ""),
                annotations: [
                    `@ManyToOne`,
                    joinAnnotation,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        } else if (property.category === "OneToMany") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.manyToOnePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations: [
                    `@OneToMany(mappedBy = "${sourceProperty.name}")`,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        } else if (property.category === "ManyToMany_Source") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const joinAnnotation = buildJoinAnnotation(property.joinInfo)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations: [
                    `@ManyToMany`,
                    joinAnnotation,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        } else if (property.category === "ManyToMany_Mapped") {
            const referencedEntity = builder.requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.manyToManySourcePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            propertyList.push({
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations: [
                    `@ManyToMany(mappedBy = "${sourceProperty.name}")`,
                    ...property.extraAnnotations,
                ],
            })
            pushIdViewProperty(property, referencedEntity)
        }
        // TODO
    }

    const entityExtends = entity.directExtends.size > 0 ?
        " :\n    " + [...entity.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\n    ") + "\n" : " "

    result[`/entity/${entity.name}.kt`] = `package ${builder.getPackagePath()}

${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => `import ${importItem}`).join("\n")}

@Entity
@Table(name = "${entity.tableName}")
@KeyUniqueConstraint
interface ${entity.name}${entityExtends}{
${propertyList
        .map(property =>
            `    ${property.annotations.join("\n    ")}
    val ${property.name}: ${property.type}`
        )
        .join("\n\n")}
}
`

    return result
}