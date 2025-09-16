<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import GroupItem from "@/modelEditor/menu/item/GroupItem.vue";
import MappedSuperClassItem from "@/modelEditor/menu/item/MappedSuperClassItem.vue";
import EntityItem from "@/modelEditor/menu/item/EntityItem.vue";
import EnumerationItem from "@/modelEditor/menu/item/EnumerationItem.vue";
import EmbeddableTypeItem from "@/modelEditor/menu/item/EmbeddableTypeItem.vue";

const {
    menuMap
} = useModelEditor()
</script>

<template>
    <CollapseDetail v-for="[id, menuItem] in menuMap" :key="id">
        <template #head>
            <GroupItem :group="menuItem.group"/>
        </template>

        <template #body>
            <div>AbstractEntity</div>
            <MappedSuperClassItem
                v-for="[id, mappedSuperClass] in menuItem.mappedSuperClassMap"
                :key="id"
                :mapped-super-class="mappedSuperClass"
            />

            <div>Entity</div>
            <EntityItem
                v-for="[id, entity] in menuItem.entityMap"
                :key="id"
                :entity="entity"
            />

            <div>Enumeration</div>
            <EnumerationItem
                v-for="[id, enumeration] in menuItem.enumerationMap"
                :key="id"
                :enumeration="enumeration"
            />

            <div>EmbeddableType</div>
            <EmbeddableTypeItem
                v-for="[id, embeddableType] in menuItem.embeddableTypeMap"
                :key="id"
                :embeddable-type="embeddableType"
            />
        </template>
    </CollapseDetail>
</template>
