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
    <CollapseDetail :model-value="true">
        <template #head>
            <GroupItem :group="menuItem.group"/>
        </template>

        <template #body>
            <div class="split-line">
                <div class="split-label">AbstractEntity</div>
            </div>
            <MappedSuperClassItem
                v-for="mappedSuperClass in menuItem.orderedMappedSuperClasses"
                :key="mappedSuperClass.id"
                :mapped-super-class="mappedSuperClass"
            />

            <div class="split-line">
                <div class="split-label">Entity</div>
            </div>
            <EntityItem
                v-for="entity in menuItem.orderedEntities"
                :key="entity.id"
                :entity="entity"
            />

            <div class="split-line">
                <div class="split-label">Enumeration</div>
            </div>
            <EnumerationItem
                v-for="enumeration in menuItem.orderedEnumerations"
                :key="enumeration.id"
                :enumeration="enumeration"
            />

            <div class="split-line">
                <div class="split-label">EmbeddableType</div>
            </div>
            <EmbeddableTypeItem
                v-for="embeddableType in menuItem.orderedEmbeddableTypes"
                :key="embeddableType.id"
                :embeddable-type="embeddableType"
            />
        </template>
    </CollapseDetail>
</template>

<style scoped>
.split-line {
    position: relative;
    border-bottom: var(--border);
    border-color: var(--background-color-hover);
    height: 0.8rem;
    margin-bottom: 0.8rem;
}

.split-line > .split-label {
    position: absolute;
    top: 0.3rem;
    left: 1rem;
    font-size: 0.8rem;
    padding: 0 0.4rem;
    color: var(--comment-color);
    background-color: var(--background-color);
}

:deep(.menu-item) {
    padding: 0.3rem 0 0.3rem 2rem;
    font-size: 0.8rem;
}

:deep(.group-item) {
    padding-left: 0.5rem;
}

:deep(.menu-item:hover) {
    background-color: var(--background-color-hover);
}

:deep(.menu-item.selected) {
    background-color: var(--primary-color);
}
</style>
