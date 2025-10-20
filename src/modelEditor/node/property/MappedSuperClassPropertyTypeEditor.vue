<script setup lang="ts">
import {createId, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import EmbeddableTypeIdViewer from "@/modelEditor/viewer/EmbeddableTypeIdViewer.vue";
import EnumerationIdViewer from "@/modelEditor/viewer/EnumerationIdViewer.vue";
import {
    toScalarEmbeddableProperty,
    toScalarEnumProperty, idToggleType, toManyToOneProperty, toScalarCommonProperty, idToEmbeddableProperty
} from "@/modelEditor/node/property/PropertyConvert.ts";
import {computed, nextTick, ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";
import {
    FK_COMMENT_TEMPLATE,
    FK_NAME_TEMPLATE,
    MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
    MAPPED_PROPERTY_LIST_ID_VIEW_NAME_TEMPLATE,
    MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
} from "@/type/context/utils/AssociationTemplate.ts";
import ColorPreview from "@/components/color/ColorPreview.vue";
import {
    getGroupItemTypeOptionName,
    type GroupTypeOptions,
    type TypeOptions
} from "@/modelEditor/node/property/TypeOption.ts";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";
import IconEntity from "@/components/icons/modelEditor/IconEntity.vue";
import {toOneToOneAbstract} from "@/modelEditor/node/association/toOneToOneAbstract.ts";
import {toManyToOneAbstract} from "@/modelEditor/node/association/toManyToOneAbstract.ts";

const props = defineProps<{
    mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>
}>()

const property = defineModel<MappedSuperClassProperty>({
    required: true
})

const propertyIsId = computed(() => {
    return property.value.category === "ID_COMMON" || property.value.category === "ID_EMBEDDABLE"
})

const {
    contextData,
    filteredCrossTypes,
    menuMap,
    executeAsyncBatch,
    waitChangeSync,
    addAssociation,
    remove,
} = useModelEditor()

const filterKeyword = ref<string>("")
const options = computed<TypeOptions>(() => {
    const result: TypeOptions = {
        crossTypes: [],
        groups: []
    }

    const keyword = filterKeyword.value.trim().toLowerCase()
    if (keyword.length === 0) {
        result.crossTypes = filteredCrossTypes.value

        for (const menuItem of menuMap.value.values()) {
            const current: GroupTypeOptions = {
                group: menuItem.group,
                options: []
            }

            if (!propertyIsId.value) {
                for (const entity of menuItem.entities.values()) {
                    current.options.push({type: "Entity", entity})
                }
                for (const enumeration of menuItem.enumerations.values()) {
                    current.options.push({type: "Enumeration", enumeration})
                }
            }

            for (const embeddableType of menuItem.embeddableTypes.values()) {
                current.options.push({type: "EmbeddableType", embeddableType})
            }

            if (current.options.length > 0) {
                current.options.sort((a, b) => getGroupItemTypeOptionName(a).localeCompare(getGroupItemTypeOptionName(b)))
                result.groups.push(current)
            }
        }
    } else {
        result.crossTypes = filteredCrossTypes.value.filter(crossType => {
            return crossType.jvmType.fullTypeExpression.toLowerCase().includes(keyword) ||
                crossType.sqlType.type.toLowerCase().includes(keyword) ||
                crossType.tsType.fullTypeExpression.toLowerCase().includes(keyword)
        })

        for (const menuItem of menuMap.value.values()) {
            const current: GroupTypeOptions = {
                group: menuItem.group,
                options: []
            }

            if (!propertyIsId.value) {
                for (const entity of menuItem.entities.values()) {
                    if (entity.name.toLowerCase().includes(keyword) || entity.comment.toLowerCase().includes(keyword)) {
                        current.options.push({type: "Entity", entity})
                    }
                }
                for (const enumeration of menuItem.enumerations.values()) {
                    if (enumeration.name.toLowerCase().includes(keyword) || enumeration.comment.toLowerCase().includes(keyword)) {
                        current.options.push({type: "Enumeration", enumeration})
                    }
                }
            }

            for (const embeddableType of menuItem.embeddableTypes.values()) {
                if (embeddableType.name.toLowerCase().includes(keyword) || embeddableType.comment.toLowerCase().includes(keyword)) {
                    current.options.push({type: "EmbeddableType", embeddableType})
                }
            }

            if (current.options.length > 0) {
                current.options.sort((a, b) => getGroupItemTypeOptionName(a).localeCompare(getGroupItemTypeOptionName(b)))
                result.groups.push(current)
            }
        }
    }

    return result
})

const cleanPropertyReference = () => {
    if ("associationId" in property.value) {
        remove({associationIds: [property.value.associationId]})
    }
}

const selectBaseType = (typePair: DeepReadonly<CrossType>) => {
    executeAsyncBatch(Symbol("property type to baseType"), async () => {
        cleanPropertyReference()

        if (property.value.category === "ID_COMMON" || property.value.category === "ID_EMBEDDABLE") {
            property.value = idToggleType(property.value, typePair)
        } else {
            property.value = toScalarCommonProperty(property.value, typePair)
        }

        await nextTick()
        await waitChangeSync()
    })
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    if (
        propertyIsId.value ||
        "enumId" in property.value && property.value.enumId === enumeration.id
    ) return

    executeAsyncBatch(Symbol("property type to enumeration"), async () => {
        cleanPropertyReference()

        property.value = toScalarEnumProperty(property.value, enumeration)

        await nextTick()
        await waitChangeSync()
    })
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    if ("embeddableTypeId" in property.value && property.value.embeddableTypeId === embeddableType.id) return

    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        cleanPropertyReference()

        if (property.value.category === "ID_COMMON" || property.value.category === "ID_EMBEDDABLE") {
            property.value = idToEmbeddableProperty(property.value, embeddableType)
            // TODO sync AssociationProperty
        } else {
            property.value = toScalarEmbeddableProperty(property.value, embeddableType)
        }

        await nextTick()
        await waitChangeSync()
    })
}

const selectEntity = (entity: DeepReadonly<EntityWithProperties>) => {
    if (
        propertyIsId.value ||
        "associationId" in property.value && contextData.value.associationMap.has(property.value.associationId) &&
        "referencedEntityId" in property.value && property.value.referencedEntityId === entity.id
    ) return

    executeAsyncBatch(Symbol("property type to entity"), async () => {
        cleanPropertyReference()

        const associationId = createId("Association")
        const mappedPropertyId = createId("Property")

        const sourceProperty = toManyToOneProperty(
            property.value,
            entity,
            associationId,
            contextData.value.model.defaultForeignKeyType,
        )
        const mappedProperty: OneToManyAbstractProperty = {
            mappedById: property.value.id,
            id: mappedPropertyId,
            nameTemplate: MAPPED_PROPERTY_LIST_NAME_TEMPLATE,
            commentTemplate: MAPPED_PROPERTY_LIST_COMMENT_TEMPLATE,
            idViewNameTemplate: MAPPED_PROPERTY_LIST_ID_VIEW_NAME_TEMPLATE,
            category: "OneToMany_Abstract",
            associationId,
            referencedAbstractEntityId: props.mappedSuperClass.id,
            nullable: false,
            typeIsList: true,
            extraAnnotations: [],
            extraImports: [],
        }
        const association: ManyToOneAbstractAssociationIdOnly = {
            id: associationId,
            nameTemplate: FK_NAME_TEMPLATE,
            commentTemplate: FK_COMMENT_TEMPLATE,
            type: "ManyToOne_Abstract",
            sourceAbstractEntityId: props.mappedSuperClass.id,
            sourcePropertyId: sourceProperty.id,
            referencedEntityId: entity.id,
            withMappedProperty: true,
            mappedProperty,
            foreignKeyType: "REAL",
        }

        property.value = sourceProperty

        await nextTick()
        await waitChangeSync()

        addAssociation(association)
    })
}

const referencedEntity = computed(() => {
    if ("referencedEntityId" in property.value) {
        return contextData.value.entityMap.get(property.value.referencedEntityId)
    }
})

const association = computed(() => {
    if ("associationId" in property.value) {
        return contextData.value.associationMap.get(property.value.associationId)
    }
})
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="current-item">
                <div v-if="'enumId' in property" class="current-item-label">
                    <IconEnumeration class="current-item-label-icon"/>
                    <EnumerationIdViewer :id="property.enumId" hide-comment ctrl-focus/>
                </div>
                <div v-if="'embeddableTypeId' in property" class="current-item-label">
                    <IconEmbeddableType class="current-item-label-icon"/>
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId" hide-comment ctrl-focus/>
                </div>
                <div v-if="'referencedEntityId' in property" class="current-item-label">
                    <IconEntity class="current-item-label-icon"/>
                    <EntityViewer :entity="referencedEntity" hide-comment ctrl-focus/>
                    <div
                        v-if="referencedEntity && 'associationId' in property && !association"
                        style="color: var(--danger-color);"
                    >
                        [Association not existed]
                    </div>
                </div>
                <div v-if="'rawType' in property" class="current-item-label">
                    {{ property.rawType }}
                </div>
            </div>

            <div v-if="association">
                <template v-if="association.association.type === 'ManyToOne_Abstract'">
                    <button @click.stop="toOneToOneAbstract(association.association)">
                        Many
                    </button>
                    To One
                </template>
                <template v-else-if="association.association.type === 'OneToOne_Abstract'">
                    <button @click.stop="toManyToOneAbstract(association.association)">
                        One
                    </button>
                    To One
                </template>
            </div>
        </template>

        <template #body>
            <div class="options-filter">
                <input v-model="filterKeyword">
            </div>

            <div class="options-container">
                <ul>
                    <li
                        class="select-item"
                        :class="{selected: 'rawType' in property && property.rawType === type.jvmType.fullTypeExpression}"
                        v-for="type in options.crossTypes"
                        @click="selectBaseType(type)"
                    >
                        <TypePairViewer :type-pair="type"/>
                    </li>
                </ul>

                <CollapseDetail
                    v-for="groupOptions in options.groups"
                    :key="groupOptions.group.id"
                    :model-value="true"
                    trigger-position="left"
                    open-trigger="head"
                >
                    <template #head>
                        <div class="group-item">
                            <ColorPreview :value="groupOptions.group.color" class="group-item-color"/>
                            <GroupViewer :group="groupOptions.group"/>
                        </div>
                    </template>

                    <template #body>
                        <ul>
                            <template v-for="option in groupOptions.options">
                                <li
                                    v-if="option.type === 'Enumeration'"
                                    class="select-item"
                                    :class="{selected: 'enumId' in property && option.enumeration.id === property.enumId}"
                                    :key="option.enumeration.id"
                                    @click="selectEnumeration(option.enumeration)"
                                >
                                    <IconEnumeration class="select-item-icon"/>
                                    <EnumerationViewer :enumeration="option.enumeration"/>
                                </li>
                                <li
                                    v-if="option.type === 'EmbeddableType'"
                                    class="select-item"
                                    :class="{selected: 'embeddableTypeId' in property && option.embeddableType.id === property.embeddableTypeId}"
                                    :key="option.embeddableType.id"
                                    @click="selectEmbeddableType(option.embeddableType)"
                                >
                                    <IconEmbeddableType class="select-item-icon"/>
                                    <EmbeddableTypeViewer :embeddable-type="option.embeddableType"/>
                                </li>
                                <li
                                    v-if="option.type === 'Entity'"
                                    class="select-item"
                                    :class="{selected: 'referencedEntityId' in property && option.entity.id === property.referencedEntityId}"
                                    :key="option.entity.id"
                                    @click="selectEntity(option.entity)"
                                >
                                    <IconEntity class="select-item-icon"/>
                                    <EntityViewer :entity="option.entity"/>
                                </li>
                            </template>
                        </ul>
                    </template>
                </CollapseDetail>
            </div>
        </template>
    </Dropdown>
</template>

<style scoped>
.current-item {
    padding: 0 0.5rem;
    max-width: 10rem;
    overflow-x: auto;
}

.current-item-label {
    display: flex;
}
.current-item-label > * {
    flex-shrink: 0;
}

.current-item-label-icon {
    margin-top: 0.4rem;
    margin-right: 0.25rem;
}

.options-filter {
    padding: 0.4rem 0.5rem;
    font-size: 0.8rem;
}
.options-filter > input {
    width: 100%;
}

.options-container {
    max-width: 15rem;
    overflow-x: auto;
    max-height: 12rem;
    overflow-y: auto;
}

.select-item {
    padding: 0.2rem 0.5rem 0.2rem 1rem;
    font-size: 0.8rem;
    display: flex;
    cursor: default;
}
.select-item > * {
    flex-shrink: 0;
}

.select-item:hover {
    background-color: var(--background-color-hover);
}

.select-item.selected {
    background-color: var(--primary-color-background);
}

.select-item-icon {
    margin-top: 0.2rem;
    margin-right: 0.25rem;
}

.group-item {
    padding: 0.2rem 0.5rem 0.2rem 0;
    font-size: 0.8rem;
    display: flex;
}
.group-item > * {
    flex-shrink: 0;
}

.group-item-color {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.2rem;
    margin-right: 0.25rem;
}
</style>
