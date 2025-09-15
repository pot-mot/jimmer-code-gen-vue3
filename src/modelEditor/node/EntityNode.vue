<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EntityNode} from "@/modelEditor/node/EntityNode.ts";
import IconAdd from "@/components/icons/IconAdd.vue";
import PropertyTypeSelect from "@/modelEditor/form/property/PropertyTypeSelect.vue";

const props = defineProps<NodeProps<EntityNode["data"]>>()

const addProperty = () => {
    props.data.entity.properties.push({
        id: "1",
        name: "id",
        comment: "",
        category: "ID",
        rawType: "string",
        nullable: false,
        extraImports: [],
        extraAnnotations: [],
        typeIsArray: false,
        columnInfo: {
            name: "id",
            comment: 'id',
            nullable: false,
            type: "varchar(255)",
            dataSize: 255,
            numericPrecision: 0,
        }
    })
}
</script>

<template>
    <div>
        <input v-model="data.entity.name">
        <input v-model="data.entity.comment">
        <div v-for="(property, index) of data.entity.properties" :key="property.id">
            <input v-model="property.name">
            <input v-model="property.comment">
            <PropertyTypeSelect v-model="data.entity.properties[index]"/>
            <input type="checkbox" v-model="property.nullable">
        </div>
        <div @click="addProperty">
            <IconAdd/>
        </div>
    </div>
</template>
