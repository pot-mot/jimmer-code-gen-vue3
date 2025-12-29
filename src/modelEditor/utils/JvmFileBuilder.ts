export const createJvmFileBuilder = (
    context: DeepReadonly<ModelContext>,
    options: {
        groupId: string,
        subPackagePath: string,
    }
): JvmFileBuilder => {
    const jvmLanguage = context.model.jvmLanguage
    const defaultForeignKeyType = context.model.defaultForeignKeyType

    const {
        groupId,
        subPackagePath,
    } = options

    const importSet: Set<string> = new Set()
    const propertyInfos: PropertyInfo[] = []

    const buildPointPath = (subPackagePaths: string[]): string => {
        const parts: string[] = []
        for (const subPath of subPackagePaths) {
            const splitSubPath = subPath.split(".")
            if (splitSubPath.length > 0) {
                for (const subPath of splitSubPath) {
                    if (subPath.length > 0) parts.push(subPath)
                }
            }
        }
        return parts.join(".")
    }

    const getShortName = (fullName: string): string => {
        const lastDotIndex = fullName.lastIndexOf(".")
        return lastDotIndex === -1 ? fullName : fullName.substring(lastDotIndex + 1)
    }

    const group = context.groupMap.get(groupId)
    if (group === undefined) throw new Error(`[${groupId}] not found`)
    const packagePath = buildPointPath([group.basePackagePath, subPackagePath])

    const usedEnumerationIdMap = new Map<string, DeepReadonly<Enumeration>>()
    const requireEnumeration = (id: string) => {
        const enumeration = context.enumerationMap.get(id)
        if (enumeration === undefined) throw new Error(`[${id}] not found`)

        const existedEnumeration = usedEnumerationIdMap.get(id)
        if (existedEnumeration !== undefined) return existedEnumeration

        let enumerationPath: string
        if (enumeration.groupId !== groupId) {
            const enumerationGroup = context.groupMap.get(enumeration.groupId)
            if (enumerationGroup === undefined) throw new Error(`[${enumeration.groupId}] not found`)
            enumerationPath = buildPointPath([enumerationGroup.basePackagePath, enumeration.subPackagePath])
        } else {
            enumerationPath = buildPointPath([group.basePackagePath, enumeration.subPackagePath])
        }
        if (enumerationPath !== packagePath)
            importSet.add(buildPointPath([enumerationPath, enumeration.name]))

        usedEnumerationIdMap.set(id, enumeration)

        return enumeration
    }

    const usedEmbeddableTypeIdMap = new Map<string, DeepReadonly<EmbeddableTypeWithProperties>>()
    const requireEmbeddableType = (id: string) => {
        const embeddableType = context.embeddableTypeMap.get(id)
        if (embeddableType === undefined) throw new Error(`[${id}] not found`)

        const existedEmbeddableType = usedEmbeddableTypeIdMap.get(id)
        if (existedEmbeddableType !== undefined) return existedEmbeddableType

        let embeddableTypePath: string
        if (embeddableType.groupId !== groupId) {
            const embeddableTypeGroup = context.groupMap.get(embeddableType.groupId)
            if (embeddableTypeGroup === undefined) throw new Error(`[${embeddableType.groupId}] not found`)
            embeddableTypePath = buildPointPath([embeddableTypeGroup.basePackagePath, embeddableType.subPackagePath])
        } else {
            embeddableTypePath = buildPointPath([group.basePackagePath, embeddableType.subPackagePath])
        }
        if (embeddableTypePath !== packagePath)
            importSet.add(buildPointPath([embeddableTypePath, embeddableType.name]))

        usedEmbeddableTypeIdMap.set(id, embeddableType)

        return embeddableType
    }

    const usedEntityIdMap = new Map<string, DeepReadonly<EntityWithInheritInfo>>()
    const requireEntity = (id: string) => {
        const entity = context.entityMap.get(id)
        if (entity === undefined) throw new Error(`[${id}] not found`)

        const existedEntity = usedEntityIdMap.get(id)
        if (existedEntity !== undefined) return existedEntity

        let entityPath: string
        if (groupId !== groupId) {
            const entityGroup = context.groupMap.get(groupId)
            if (entityGroup === undefined) throw new Error(`[${groupId}] not found`)
            entityPath = buildPointPath([entityGroup.basePackagePath, entity.subPackagePath])
        } else {
            entityPath = buildPointPath([group.basePackagePath, entity.subPackagePath])
        }
        if (entityPath !== packagePath)
            importSet.add(buildPointPath([entityPath, entity.name]))

        usedEntityIdMap.set(id, entity)

        return entity
    }

    const useMappedSuperClassIdMap = new Map<string, DeepReadonly<MappedSuperClassWithInheritInfo>>()
    const requireMappedSuperClass = (id: string) => {
        const mappedSuperClass = context.mappedSuperClassMap.get(id)
        if (mappedSuperClass === undefined) throw new Error(`[${id}] not found`)

        const existedMappedSuperClass = useMappedSuperClassIdMap.get(id)
        if (existedMappedSuperClass !== undefined) return existedMappedSuperClass

        let mappedSuperClassPath: string
        if (mappedSuperClass.groupId !== groupId) {
            const mappedSuperClassGroup = context.groupMap.get(mappedSuperClass.groupId)
            if (mappedSuperClassGroup === undefined) throw new Error(`[${mappedSuperClass.groupId}] not found`)
            mappedSuperClassPath = buildPointPath([mappedSuperClassGroup.basePackagePath, mappedSuperClass.subPackagePath])
        } else {
            mappedSuperClassPath = buildPointPath([group.basePackagePath, mappedSuperClass.subPackagePath])
        }
        if (mappedSuperClassPath !== packagePath)
            importSet.add(buildPointPath([mappedSuperClassPath, mappedSuperClass.name]))

        useMappedSuperClassIdMap.set(id, mappedSuperClass)

        return mappedSuperClass
    }

    const pushIdViewProperty = (
        property: DeepReadonly<OneToOneSourceProperty | OneToOneMappedProperty | ManyToOneProperty | OneToManyProperty | ManyToManySourceProperty | ManyToManyMappedProperty>,
        referencedEntity: DeepReadonly<EntityWithInheritInfo>
    ) => {
        importSet.add("org.babyfish.jimmer.sql.IdView")
        const annotations: string[] = []
        if (property.nullable) {
            importSet.add("org.jetbrains.annotations.Nullable")
            annotations.push("@Nullable")
        }
        annotations.push(`@IdView("${property.name}")`)

        const referencedId = referencedEntity.idProperty
        if (referencedId.category === "ID_COMMON") {
            propertyInfos.push({
                raw: property,
                name: property.idViewName,
                comment: property.comment,
                type: property.typeIsList ? "List<" + referencedId.rawType + ">" : referencedId.rawType,
                annotations,
                nullable: property.nullable
            })
        } else if (referencedId.category === "ID_EMBEDDABLE") {
            const referencedEmbeddableType = requireEmbeddableType(referencedId.embeddableTypeId)
            propertyInfos.push({
                raw: property,
                name: property.idViewName,
                comment: property.comment,
                type: property.typeIsList ? "List<" + referencedEmbeddableType.name + ">" : referencedEmbeddableType.name,
                annotations,
                nullable: property.nullable
            })
        }
    }

    const getAssociation = (
        associationId: string
    ): DeepReadonly<Association> => {
        const association = context.associationMap.get(associationId)
        if (association === undefined) throw new Error(`[${associationId}] not found`)
        return association
    }

    // TODO OnDissociation Action
    const buildJoinAnnotation = (
        joinInfo: DeepReadonly<FkJoinInfo | MidTableJoinInfo>,
        association: DeepReadonly<Association>
    ): string | undefined => {
        if (jvmLanguage === "KOTLIN") {
            const annotationBuilder = context.createTemplateBuilder({
                indent: "    ",
                scope: {start: "", end: ""}
            })

            if (joinInfo.type === "SingleColumn") {
                importSet.add("org.babyfish.jimmer.sql.JoinColumn")
                annotationBuilder.append("@JoinColumn")
                if (joinInfo.columnName && joinInfo.foreignKeyType !== defaultForeignKeyType) {
                    importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${joinInfo.columnName}",`)
                    annotationBuilder.appendLine(`type = ForeignKeyType.${joinInfo.foreignKeyType}`)
                    annotationBuilder.endScope(")")
                } else if (joinInfo.columnName) {
                    annotationBuilder.append(`(name = "${joinInfo.columnName}")`)
                } else if (joinInfo.foreignKeyType !== defaultForeignKeyType) {
                    importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                    annotationBuilder.append(`(type = ForeignKeyType.${joinInfo.foreignKeyType})`)
                }
                return annotationBuilder.build()
            } else if (joinInfo.type === "MultiColumn") {
                if (joinInfo.columnRefs.length === 0) return undefined
                importSet.add("org.babyfish.jimmer.sql.JoinColumn")
                for (const columnRef of joinInfo.columnRefs) {
                    annotationBuilder.append("@JoinColumn")
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${columnRef.columnName}",`)
                    annotationBuilder.appendLine(`referencedColumnName = "${columnRef.referencedColumnName}",`)
                    if (joinInfo.foreignKeyType !== defaultForeignKeyType) {
                        importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                        annotationBuilder.appendLine(`referencedColumnName = "${columnRef.referencedColumnName}",`)
                    }
                    annotationBuilder.endScope(")")
                }
                return annotationBuilder.build()
            } else if (joinInfo.type === "MidTable") {
                importSet.add("org.babyfish.jimmer.sql.JoinTable")
                annotationBuilder.append("@JoinTable")
                if ("sourceEntity" in association) {
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${association.name}",`)
                    annotationBuilder.endScope(")")
                }
                return annotationBuilder.build()

                // TODO add other joinInfo
            }
        } else if (jvmLanguage === "JAVA") {
            const annotationBuilder = context.createTemplateBuilder({
                indent: "    ",
                scope: {start: "", end: ""}
            })

            if (joinInfo.type === "SingleColumn") {
                importSet.add("org.babyfish.jimmer.sql.JoinColumn")
                annotationBuilder.append("@JoinColumn")
                if (joinInfo.columnName && joinInfo.foreignKeyType !== defaultForeignKeyType) {
                    importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${joinInfo.columnName}",`)
                    annotationBuilder.appendLine(`type = ForeignKeyType.${joinInfo.foreignKeyType}`)
                    annotationBuilder.endScope(")")
                } else if (joinInfo.columnName) {
                    annotationBuilder.append(`(name = "${joinInfo.columnName}")`)
                } else if (joinInfo.foreignKeyType !== defaultForeignKeyType) {
                    importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                    annotationBuilder.append(`(type = ForeignKeyType.${joinInfo.foreignKeyType})`)
                }
                return annotationBuilder.build()
            } else if (joinInfo.type === "MultiColumn") {
                if (joinInfo.columnRefs.length === 0) return undefined
                importSet.add("org.babyfish.jimmer.sql.JoinColumn")
                for (const columnRef of joinInfo.columnRefs) {
                    annotationBuilder.append("@JoinColumn")
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${columnRef.columnName}",`)
                    annotationBuilder.appendLine(`referencedColumnName = "${columnRef.referencedColumnName}",`)
                    if (joinInfo.foreignKeyType !== defaultForeignKeyType) {
                        importSet.add("org.babyfish.jimmer.sql.ForeignKeyType")
                        annotationBuilder.appendLine(`referencedColumnName = "${columnRef.referencedColumnName}",`)
                    }
                    annotationBuilder.endScope(")")
                }
                return annotationBuilder.build()
            } else if (joinInfo.type === "MidTable") {
                importSet.add("org.babyfish.jimmer.sql.JoinTable")
                annotationBuilder.append("@JoinTable")
                if ("sourceEntity" in association) {
                    annotationBuilder.startScope("(")
                    annotationBuilder.appendLine(`name = "${association.name}",`)
                    annotationBuilder.endScope(")")
                }
                return annotationBuilder.build()
                // TODO add other joinInfo
            }
        }
    }

    const generateKeyAnnotation = (
        keyGroups: ReadonlyArray<string>
    ): string[] => {
        const annotations = []

        if (keyGroups.length === 0) {
            annotations.push("@Key")
        } else {
            for (const keyGroup of keyGroups) {
                if (keyGroup.length === 0) {
                    annotations.push("@Key")
                } else {
                    annotations.push(`@Key(group = "${keyGroup}")`)
                }
            }
        }

        return annotations
    }

    const pushProperty = (
        property: DeepReadonly<Property>,
        owner: DeepReadonly<PropertyOwner>
    ): PropertyInfo => {
        for (const extraImport of property.extraImports) {
            importSet.add(extraImport)
        }

        const annotations: string[] = []
        if (jvmLanguage === "JAVA") {
            if (property.nullable) {
                importSet.add("org.jetbrains.annotations.Nullable")
                annotations.push("@Nullable")
            }
        }

        // TODO generate value, default, order, logicalDelete
        if (property.category === "ID_COMMON") {
            importSet.add("org.babyfish.jimmer.sql.Id")
            importSet.add("org.babyfish.jimmer.sql.Column")
            annotations.push("@Id")
            annotations.push(`@Column(name = "${property.columnInfo.name}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "ID_EMBEDDABLE") {
            // TODO 添加 PropOverride
            importSet.add("org.babyfish.jimmer.sql.Id")
            annotations.push("@Id")
            annotations.push(...property.extraAnnotations)
            const embeddableType = requireEmbeddableType(property.embeddableTypeId)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: embeddableType.name,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "SCALAR_COMMON") {
            importSet.add("org.babyfish.jimmer.sql.Column")
            if (property.typeIsArray) {
                annotations.push(`@Column(name = "${property.columnInfo.name}", sqlElementType = "${property.columnInfo.type}")`)
            } else {
                annotations.push(`@Column(name = "${property.columnInfo.name}")`)
            }
            if ("key" in property) {
                importSet.add("org.babyfish.jimmer.sql.Key")
                annotations.push(...generateKeyAnnotation(property.keyGroups))
            }
            if (property.serialized) {
                importSet.add("org.babyfish.jimmer.sql.Serialized")
                annotations.push("@Serialized")
            }
            if (property.defaultValue !== undefined) {
                importSet.add("org.babyfish.jimmer.sql.Default")
                annotations.push(`@Default("${property.defaultValue}")`)
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "SCALAR_ENUM") {
            importSet.add("org.babyfish.jimmer.sql.Column")
            const enumeration = requireEnumeration(property.enumId)
            annotations.push(`@Column(name = "${property.columnInfo.name}")`)
            if ("key" in property) {
                importSet.add("org.babyfish.jimmer.sql.Key")
                annotations.push(...generateKeyAnnotation(property.keyGroups))
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: enumeration.name,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "SCALAR_EMBEDDABLE") {
            const embeddableType = requireEmbeddableType(property.embeddableTypeId)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: embeddableType.name,
                annotations,
                nullable: property.nullable
            }
            // TODO 添加 PropOverride
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "OneToOne_Source") {
            importSet.add("org.babyfish.jimmer.sql.OneToOne")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const annotations = [
                '@OneToOne',
            ]
            if ("key" in property) {
                importSet.add("org.babyfish.jimmer.sql.Key")
                annotations.push(...generateKeyAnnotation(property.keyGroups))
            }
            const joinAnnotation = buildJoinAnnotation(property.joinInfo, getAssociation(property.associationId))
            if (joinAnnotation !== undefined) {
                annotations.push(joinAnnotation)
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "OneToOne_Mapped") {
            importSet.add("org.babyfish.jimmer.sql.OneToOne")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.oneToOneSourcePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            annotations.push(`@OneToOne(mappedBy = "${sourceProperty.name}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "ManyToOne") {
            importSet.add("org.babyfish.jimmer.sql.ManyToOne")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const annotations = [
                '@ManyToOne',
            ]
            if ("key" in property) {
                importSet.add("org.babyfish.jimmer.sql.Key")
                annotations.push(...generateKeyAnnotation(property.keyGroups))
            }
            const joinAnnotation = buildJoinAnnotation(property.joinInfo, getAssociation(property.associationId))
            if (joinAnnotation !== undefined) {
                annotations.push(joinAnnotation)
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: referencedEntity.name,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "OneToMany") {
            importSet.add("org.babyfish.jimmer.sql.OneToMany")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.manyToOnePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            annotations.push(`@OneToMany(mappedBy = "${sourceProperty.name}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "ManyToMany_Source") {
            importSet.add("org.babyfish.jimmer.sql.ManyToMany")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const annotations = [
                '@ManyToMany',
            ]
            const joinAnnotation = buildJoinAnnotation(property.joinInfo, getAssociation(property.associationId))
            if (joinAnnotation !== undefined) {
                annotations.push(joinAnnotation)
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "ManyToMany_Mapped") {
            importSet.add("org.babyfish.jimmer.sql.ManyToMany")
            const referencedEntity = requireEntity(property.referencedEntityId)
            const sourceProperty = referencedEntity.manyToManySourcePropertyMap.get(property.mappedById)
            if (sourceProperty === undefined) throw new Error(`[${property.mappedById}] not found`)
            annotations.push(`@ManyToMany(mappedBy = "${sourceProperty.name}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: "List<" + referencedEntity.name + ">",
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            pushIdViewProperty(property, referencedEntity)
            return propertyInfo
        } else if (property.category === "VERSION") {
            importSet.add("org.babyfish.jimmer.sql.Version")
            importSet.add("org.babyfish.jimmer.sql.Column")
            annotations.push(`@Version`)
            annotations.push(`@Column(name = "${property.columnInfo.name}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations,
                nullable: false
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "FORMULA_GETTER") {
            importSet.add("org.babyfish.jimmer.sql.Formula")
            if (!("entity" in owner) && !("mappedSuperClass" in owner)) throw new Error(`[${property.name}] owner is not an entity`)
            const ownerProperties: DeepReadonly<Property>[] = []
            if ("entity" in owner) {
                ownerProperties.push(...owner.entity.allProperties)
            } else {
                ownerProperties.push(...owner.mappedSuperClass.allProperties)
            }

            const dependencyString = property.dependencies.map(dependency => {
                const dependencyProperty = ownerProperties.find(
                    p => p.id === dependency
                )
                if (dependencyProperty === undefined) throw new Error(`[${dependency}] not found`)
                if (!("name" in dependencyProperty)) throw new Error(`[${dependency}] not found`)
                return `"${dependencyProperty.name}"`
            }).join(", ")
            if (jvmLanguage === "KOTLIN") {
                annotations.push(`@Formula(dependencies = [${dependencyString}])`)
            } else if (jvmLanguage === "JAVA") {
                annotations.push(`@Formula(dependencies = {${dependencyString}})`)
            }
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations,
                nullable: property.nullable,
                body: property.body
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "FORMULA_SQL") {
            importSet.add("org.babyfish.jimmer.sql.Formula")
            annotations.push(`@Formula(sql = "${property.sql}")`)
            annotations.push(...property.extraAnnotations)
            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: property.rawType,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "TRANSIENT") {
            importSet.add("org.babyfish.jimmer.sql.Transient")

            if ('resolver' in property) {
                importSet.add(property.resolver)
                const resolverShortName = getShortName(property.resolver)
                if (jvmLanguage === "KOTLIN") {
                    annotations.push(`@Transient(${resolverShortName}::class)`)
                } else if (jvmLanguage === "JAVA") {
                    annotations.push(`@Transient(${resolverShortName}.class)`)
                }
            } else if ("resolverRef" in property && property.resolverRef) {
                annotations.push(`@Transient(ref = "${property.resolverRef}")`)
            } else {
                annotations.push('@Transient')
            }

            let typeName: string
            if ("referencedEntityId" in property) {
                const referencedEntity = requireEntity(property.referencedEntityId)
                typeName = property.typeIsList ? `List<${referencedEntity.name}>` : referencedEntity.name
            } else {
                typeName = property.rawType
            }

            const propertyInfo = {
                raw: property,
                name: property.name,
                comment: property.comment,
                type: typeName,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else if (property.category === "ManyToMany_View") {
            if (!("entity" in owner)) throw new Error(`[${property.name}] owner is not an entity`)

            const baseToManyProperty =
                owner.entity.oneToManyPropertyMap.get(property.baseToManyPropertyId) ??
                owner.entity.manyToManySourcePropertyMap.get(property.baseToManyPropertyId) ??
                owner.entity.manyToManyMappedPropertyMap.get(property.baseToManyPropertyId)
            if (baseToManyProperty === undefined) throw new Error(`[${property.baseToManyPropertyId}] not found`)
            const referencedEntity = requireEntity(baseToManyProperty.referencedEntityId)
            const deeperProperty = referencedEntity.allProperties.find(prop => prop.id === property.deeperPropertyId)
            if (deeperProperty === undefined) throw new Error(`[${referencedEntity.name}.${property.deeperPropertyId}] not found`)
            if (!("name" in deeperProperty)) throw new Error(`[${referencedEntity.name}.${deeperProperty.nameTemplate}] not a concrete property`)

            importSet.add("org.babyfish.jimmer.sql.ManyToManyView")
            annotations.push(`@ManyToManyView(prop = "${baseToManyProperty.name}", deeperProp = "${deeperProperty.name}")`)
            annotations.push(...property.extraAnnotations)

            const propertyInfo = {
                raw: property,
                name: property.name, // Use template if available
                comment: property.comment,
                type: `List<${referencedEntity.name}>`,
                annotations,
                nullable: property.nullable
            }
            propertyInfos.push(propertyInfo)
            return propertyInfo
        } else {
            throw new Error(`Unknown property category: ${property.category}`)
        }
    }

    return {
        getPackagePath: () => packagePath,
        getProperties: () => propertyInfos,
        pushProperty,
        getImportSet: () => importSet,
        addImports: (imports: string | Iterable<string>) => {
            if (typeof imports === "string") {
                importSet.add(imports)
            } else {
                for (const importItem of imports)
                    importSet.add(importItem)
            }
        },
        requireEnumeration,
        requireEmbeddableType,
        requireEntity,
        requireMappedSuperClass,
    }
}