<script setup lang="ts">
import {createId, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import EmbeddableTypeIdViewer from "@/modelEditor/viewer/EmbeddableTypeIdViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import EnumerationIdViewer from "@/modelEditor/viewer/EnumerationIdViewer.vue";
import {
    toEmbeddableIdProperty,
    toEmbeddableScalarProperty,
    toEnumProperty, toIdProperty, toManyToOneProperty, toScalarProperty
} from "@/modelEditor/property/PropertyConvert.ts";
import {computed, nextTick, ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";
import {firstCaseToLower} from "@/utils/name/firstCase.ts";

const props = defineProps<{
    entity: EntityWithProperties
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

const selectBaseType = (typePair: DeepReadonly<TypeSelectPair>) => {
    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        cleanPropertyReference()

        if (property.value.category === "ID") {
            property.value = toIdProperty(property.value, typePair)
        } else {
            property.value = toScalarProperty(property.value, typePair)
        }

        await nextTick()
        await waitChangeSync()
    })
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        cleanPropertyReference()

        property.value = toEnumProperty(property.value, enumeration)

        await nextTick()
        await waitChangeSync()
    })
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        cleanPropertyReference()

        if (property.value.category === "ID") {
            property.value = toEmbeddableIdProperty(property.value, embeddableType)
        } else {
            property.value = toEmbeddableScalarProperty(property.value, embeddableType)
        }

        await nextTick()
        await waitChangeSync()
    })
}

const selectEntity = (entity: EntityWithProperties) => {
    executeAsyncBatch(Symbol("property type to entity"), async () => {
        cleanPropertyReference()

        const associationId = createId("Association")
        const mappedPropertyId = createId("Property")

        const sourceProperty = toManyToOneProperty(property.value, entity, associationId)
        const lowerName = firstCaseToLower(entity.name)
        const mappedProperty: OneToManyProperty = {
            mappedById: property.value.id,
            id: mappedPropertyId,
            name: lowerName + "List",
            comment: props.entity.comment + "列表",
            category: "OneToMany",
            associationId,
            referencedEntityId: props.entity.id,
            idViewName: lowerName + "Ids",
            nullable: false,
            typeIsList: true,
            extraAnnotations: [],
            extraImports: [],
        }
        const association: ManyToOneAssociationIdOnly = {
            id: associationId,
            name: `fk_${props.entity.name}_${sourceProperty.name}`, // TODO
            type: "ManyToOne",
            sourceEntityId: props.entity.id,
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
                    <EnumerationIdViewer :id="property.enumId"/>
                </div>
                <div v-if="'embeddableTypeId' in property">
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId"/>
                </div>
                <div v-if="'referencedEntityId' in property">
                    <EntityIdViewer :id="property.referencedEntityId"/>
                    <span
                        v-if="'associationId' in property && !association"
                        style="color: var(--danger-color);">
                        [Association not existed]
                    </span>
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
