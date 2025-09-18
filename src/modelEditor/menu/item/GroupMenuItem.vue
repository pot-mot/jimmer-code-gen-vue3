<script setup lang="ts">
import EntityItem from "@/modelEditor/menu/item/EntityItem.vue";
import GroupItem from "@/modelEditor/menu/item/GroupItem.vue";
import EmbeddableTypeItem from "@/modelEditor/menu/item/EmbeddableTypeItem.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import EnumerationItem from "@/modelEditor/menu/item/EnumerationItem.vue";
import MappedSuperClassItem from "@/modelEditor/menu/item/MappedSuperClassItem.vue";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";

defineProps<{
    menuItem: MenuItem
}>()
</script>

<template>
    <CollapseDetail>
        <template #head>
            <GroupItem :group="menuItem.group"/>
        </template>

        <template #body>
            <div>AbstractEntity</div>
            <MappedSuperClassItem
                v-for="mappedSuperClass in menuItem.orderedMappedSuperClasses"
                :key="mappedSuperClass.id"
                :mapped-super-class="mappedSuperClass"
            />

            <div>Entity</div>
            <EntityItem
                v-for="entity in menuItem.orderedEntities"
                :key="entity.id"
                :entity="entity"
            />

            <div>Enumeration</div>
            <EnumerationItem
                v-for="enumeration in menuItem.orderedEnumerations"
                :key="enumeration.id"
                :enumeration="enumeration"
            />

            <div>EmbeddableType</div>
            <EmbeddableTypeItem
                v-for="embeddableType in menuItem.orderedEmbeddableTypes"
                :key="embeddableType.id"
                :embeddable-type="embeddableType"
            />
        </template>
    </CollapseDetail>
</template>
