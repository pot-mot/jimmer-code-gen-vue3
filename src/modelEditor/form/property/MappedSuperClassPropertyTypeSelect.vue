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
} from "@/modelEditor/form/property/PropertyConvert.ts";
import {nextTick, ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";
import ManyToOneAbstractAssociation from "@/type/__generated/typeDeclare/items/ManyToOneAbstractAssociation.ts";
import {
    ABSTRACT_COMMENT_PLACEHOLDER,
    ABSTRACT_ID_VIEW_PLACEHOLDER,
    ABSTRACT_NAME_PLACEHOLDER
} from "@/type/context/utils/MappedProperty.ts";

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
} = useModelEditor()

const filterKeywords = ref<string>("")
// TODO
const filterTypes = () => {

}

const selectBaseType = (typePair: DeepReadonly<TypeSelectPair>) => {
    if (property.value.category === "ID") {
        property.value = toIdProperty(property.value, typePair)
    } else {
        property.value = toScalarProperty(property.value, typePair)
    }
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    property.value = toEnumProperty(property.value, enumeration)
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    if (property.value.category === "ID") {
        property.value = toEmbeddableIdProperty(property.value, embeddableType)
    } else {
        property.value = toEmbeddableScalarProperty(property.value, embeddableType)
    }
}


const selectEntity = (entity: EntityWithProperties) => {
    executeAsyncBatch(Symbol("property type to entity"), async () => {
        const associationId = createId("Association")
        const mappedPropertyId = createId("Property")

        const sourceProperty = toManyToOneProperty(property.value, entity, associationId)
        const mappedProperty: OneToManyAbstractProperty = {
            mappedById: property.value.id,
            id: mappedPropertyId,
            name: `${ABSTRACT_NAME_PLACEHOLDER}List`,
            comment: `${ABSTRACT_COMMENT_PLACEHOLDER}列表`,
            idViewName: `${ABSTRACT_ID_VIEW_PLACEHOLDER}Id`,
            category: "OneToMany_Abstract",
            associationId,
            referencedAbstractEntityId: props.mappedSuperClass.id,
            nullable: false,
            typeIsList: true,
            extraAnnotations: [],
            extraImports: [],
        }
        const association: ManyToOneAbstractAssociation = {
            id: associationId,
            name: "", // TODO
            type: "ManyToOne_Abstract",
            sourceAbstractEntity: props.mappedSuperClass,
            sourceProperty,
            referencedEntity: entity,
            mappedProperty,
            foreignKeyType: "AUTO",
        }

        addAssociation(association)
        property.value = sourceProperty
        await nextTick()
        await waitChangeSync()
    })
}
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="current-item">
                <div v-if="'embeddableTypeId' in property">
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId"/>
                </div>
                <div v-else-if="'referencedEntityId' in property">
                    <EntityIdViewer :id="property.referencedEntityId"/>
                </div>
                <div v-else-if="'enumId' in property">
                    <EnumerationIdViewer :id="property.enumId"/>
                </div>
                <div v-else-if="'rawType' in property">
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
