<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const property = defineModel<Property>({
    required: true
})

const {
    contextData,
} = useModelEditor()

const selectBaseType = (type: DeepReadonly<TypeSelectPair>) => {
    property.value.category = "SCALAR"
    property.value.rawType = type.backEndType.rawType
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    property.value.category = "ENUM"
    property.value.enumId = enumeration.id
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    property.value.category = "SCALAR"
    property.value.embeddableTypeId = embeddableType.id
}

const selectEntity = (entity: DeepReadonly<Entity>) => {
    property.value.typeEntityId = entity.id
}
</script>

<template>
    <div>
        <ul>
            <li v-for="type in contextData?.types" @click="selectBaseType(type)">
                {{ type.backEndType.rawType }} {{ type.sqlType.type }}
            </li>
        </ul>
        <ul>
            <li v-for="[id, enumeration] in contextData?.enumerationMap" :key="id" @click="selectEnumeration(enumeration)">
                {{ enumeration.name }} {{ enumeration.comment }}
            </li>
        </ul>
        <ul>
            <li v-for="[id, entity] in contextData?.entityMap" :key="id" @click="selectEntity(entity)">
                {{ entity.name }} {{ entity.comment }}
            </li>
            <li>
                <input type="checkbox" v-model="property.typeIsList">
            </li>
        </ul>
        <ul>
            <li v-for="[id, embeddableType] in contextData?.embeddableTypeMap" :key="id" @click="selectEmbeddableType(embeddableType)">
                {{ embeddableType.name }} {{ embeddableType.comment }}
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>