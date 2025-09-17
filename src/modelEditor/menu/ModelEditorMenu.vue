<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import GroupMenuItem from "@/modelEditor/menu/item/GroupMenuItem.vue";

const {
    menuMap
} = useModelEditor()

const orderedMenuItems = computed(() => {
    return Array.from(menuMap.value.values()).sort((o1, o2) => {
        return o1.group.name.localeCompare(o2.group.name)
    })
})
</script>

<template>
    <GroupMenuItem
        v-for="menuItem in orderedMenuItems"
        :key="menuItem.group.id"
        :menu-item="menuItem"
    />
</template>
