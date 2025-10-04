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
} from "@/modelEditor/property/PropertyConvert.ts";
import {computed, nextTick, ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";
import {
    ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER, ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER,
    ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER,
    ABSTRACT_PROPERTY_ID_VIEW_NAME_PLACEHOLDER, ABSTRACT_PROPERTY_NAME_PLACEHOLDER
} from "@/type/context/utils/AbstractAssociationToReal.ts";

const props = defineProps<{
    mappedSuperClass: MappedSuperClassWithProperties
}>()

const property = defineModel<EntityProperty>({
    required: true
})

const {
    contextData,
    menuMap,
    executeAsyncBatch,
    waitChangeSync,
    addAssociation,
    remove,
} = useModelEditor()

const filterKeywords = ref<string>("")
// TODO
const filterTypes = () => {

}

const cleanPropertyReference = () => {
    if ("associationId" in property.value) {
        remove({associationIds: [property.value.associationId]})
    }
}

const selectBaseType = (typePair: DeepReadonly<CrossType>) => {
    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        cleanPropertyReference()

        if (property.value.category === "ID_COMMON") {
            property.value = idToggleType(property.value, typePair)
        } else {
            property.value = toScalarCommonProperty(property.value, typePair)
        }

        await nextTick()
        await waitChangeSync()
    })
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    if ("enumId" in property.value && property.value.enumId === enumeration.id) return

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

        if (property.value.category === "ID_COMMON") {
            property.value = idToEmbeddableProperty(property.value, embeddableType)
            // TODO sync AssociationProperty
        } else {
            property.value = toScalarEmbeddableProperty(property.value, embeddableType)
        }

        await nextTick()
        await waitChangeSync()
    })
}


const selectEntity = (entity: EntityWithProperties) => {
    if (
        "associationId" in property.value && contextData.value?.associationMap.has(property.value.associationId) &&
        "referencedEntityId" in property.value && property.value.referencedEntityId === entity.id
    ) return

    executeAsyncBatch(Symbol("property type to entity"), async () => {
        const associationId = createId("Association")
        const mappedPropertyId = createId("Property")

        const sourceProperty = toManyToOneProperty(property.value, entity, associationId)
        const mappedProperty: OneToManyAbstractProperty = {
            mappedById: property.value.id,
            id: mappedPropertyId,
            name: `${ABSTRACT_PROPERTY_NAME_PLACEHOLDER}List`,
            comment: `${ABSTRACT_PROPERTY_COMMENT_PLACEHOLDER}列表`,
            idViewName: `${ABSTRACT_PROPERTY_ID_VIEW_NAME_PLACEHOLDER}Id`,
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
            name: `fk_${ABSTRACT_ASSOCIATION_SOURCE_NAME_PLACEHOLDER}_${sourceProperty.name}`,
            comment: `${ABSTRACT_ASSOCIATION_SOURCE_COMMENT_PLACEHOLDER}${sourceProperty.comment}`,
            type: "ManyToOne_Abstract",
            sourceAbstractEntityId: props.mappedSuperClass.id,
            sourcePropertyId: sourceProperty.id,
            referencedEntityId: entity.id,
            mappedProperty,
            foreignKeyType: "AUTO",
        }

        addAssociation(association)
        property.value = sourceProperty
        await nextTick()
        await waitChangeSync()
    })
}

const referencedEntity = computed(() => {
    if ("referencedEntityId" in property.value) {
        return contextData.value?.entityMap.get(property.value.referencedEntityId)
    }
})

const association = computed(() => {
    if ("associationId" in property.value) {
        return contextData.value?.associationMap.get(property.value.associationId)
    }
})
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="current-item">
                <div v-if="'enumId' in property">
                    <EnumerationIdViewer :id="property.enumId" ctrl-focus/>
                </div>
                <div v-if="'embeddableTypeId' in property">
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId" ctrl-focus/>
                </div>
                <div v-if="'referencedEntityId' in property">
                    <EntityViewer
                        :entity="referencedEntity"
                        ctrl-focus
                    />
                    <div
                        v-if="referencedEntity && 'associationId' in property && !association"
                        style="color: var(--danger-color);"
                    >
                        [Association not existed]
                    </div>
                </div>
                <div v-if="'rawType' in property">
                    {{ property.rawType }}
                </div>
            </div>
        </template>

        <template #body>
            <div class="select-filter">
                <input v-model="filterKeywords" @change="filterTypes">
            </div>

            <ul>
                <li
                    class="select-item"
                    v-for="type in contextData?.types ?? []"
                    @click="selectBaseType(type)"
                >
                    <TypePairViewer :type-pair="type"/>
                </li>
            </ul>

            <CollapseDetail
                v-for="[id, menuItem] in menuMap"
                :key="id"
                :model-value="true"
                trigger-position="left"
                open-trigger="head"
            >
                <template #head>
                    <GroupViewer :group="menuItem.group"/>
                </template>
                <template #body>
                    <ul>
                        <li
                            class="select-item"
                            v-for="enumeration in menuItem.orderedEnumerations"
                            :key="enumeration.id"
                            @click="selectEnumeration(enumeration)"
                        >
                            <EnumerationViewer :enumeration="enumeration"/>
                        </li>
                    </ul>
                    <ul>
                        <li
                            class="select-item"
                            v-for="entity in menuItem.orderedEntities"
                            :key="entity.id"
                            @click="selectEntity(entity)"
                        >
                            <EntityViewer :entity="entity"/>
                        </li>
                    </ul>
                    <ul>
                        <li
                            class="select-item"
                            v-for="embeddableType in menuItem.orderedEmbeddableTypes"
                            :key="embeddableType.id"
                            @click="selectEmbeddableType(embeddableType)"
                        >
                            <EmbeddableTypeViewer :embeddable-type="embeddableType"/>
                        </li>
                    </ul>
                </template>
            </CollapseDetail>
        </template>
    </Dropdown>
</template>

<style scoped>
.current-item {
    padding: 0 0.5em;
}

.select-filter {
    padding: 0.4em 0.5em;
}

.select-item {
    padding: 0.2em 0.5em;
}
</style>
