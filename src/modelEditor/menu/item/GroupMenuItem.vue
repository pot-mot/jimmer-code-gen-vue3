<script setup lang="ts">
import EntityItem from "@/modelEditor/menu/item/EntityItem.vue";
import GroupItem from "@/modelEditor/menu/item/GroupItem.vue";
import EmbeddableTypeItem from "@/modelEditor/menu/item/EmbeddableTypeItem.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import EnumerationItem from "@/modelEditor/menu/item/EnumerationItem.vue";
import MappedSuperClassItem from "@/modelEditor/menu/item/MappedSuperClassItem.vue";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";

const props = defineProps<{
    menuItem: MenuItem
}>()

const orderedEntities = computed(() => {
    return Array.from(props.menuItem.entityMap.values()).sort((o1, o2) => {
        return o1.name.localeCompare(o2.name)
    })
})

const orderedMappedSuperClasses = computed(() => {
    return Array.from(props.menuItem.mappedSuperClassMap.values()).sort((o1, o2) => {
        return o1.name.localeCompare(o2.name)
    })
})

const orderedEmbeddableTypes = computed(() => {
    return Array.from(props.menuItem.embeddableTypeMap.values()).sort((o1, o2) => {
        return o1.name.localeCompare(o2.name)
    })
})

 const orderedEnumerations = computed(() => {
    return Array.from(props.menuItem.enumerationMap.values()).sort((o1, o2) => {
        return o1.name.localeCompare(o2.name)
    })
})
</script>

<template>
    <CollapseDetail>
        <template #head>
            <GroupItem :group="menuItem.group"/>
        </template>

        <template #body>
            <div>AbstractEntity</div>
            <MappedSuperClassItem
                v-for="mappedSuperClass in orderedMappedSuperClasses"
                :key="mappedSuperClass.id"
                :mapped-super-class="mappedSuperClass"
            />

            <div>Entity</div>
            <EntityItem
                v-for="entity in orderedEntities"
                :key="entity.id"
                :entity="entity"
            />

            <div>Enumeration</div>
            <EnumerationItem
                v-for="enumeration in orderedEnumerations"
                :key="enumeration.id"
                :enumeration="enumeration"
            />

            <div>EmbeddableType</div>
            <EmbeddableTypeItem
                v-for="embeddableType in orderedEmbeddableTypes"
                :key="embeddableType.id"
                :embeddable-type="embeddableType"
            />
        </template>
    </CollapseDetail>
</template>
