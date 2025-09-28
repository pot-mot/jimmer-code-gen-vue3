<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import EmbeddableTypeIdViewer from "@/modelEditor/viewer/EmbeddableTypeIdViewer.vue";
import EnumerationIdViewer from "@/modelEditor/viewer/EnumerationIdViewer.vue";
import {
    toEmbeddableScalarProperty,
    toEnumProperty,
    toScalarProperty
} from "@/modelEditor/property/PropertyConvert.ts";
import {ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";

const property = defineModel<EmbeddableTypeProperty>({
    required: true
})

const {
    contextData,
    menuMap,
} = useModelEditor()

const filterKeywords = ref<string>("")
const filterTypes = () => {

}

const selectBaseType = (typePair: DeepReadonly<TypeSelectPair>) => {
    property.value = toScalarProperty(property.value, typePair)
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    property.value = toEnumProperty(property.value, enumeration)
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    property.value = toEmbeddableScalarProperty(property.value, embeddableType)
}
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="current-item">
                <div v-if="'embeddableTypeId' in property">
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId"/>
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
