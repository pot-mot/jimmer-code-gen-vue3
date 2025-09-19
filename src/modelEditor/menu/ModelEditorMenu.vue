<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import GroupMenuItem from "@/modelEditor/menu/item/GroupMenuItem.vue";
import {judgeTarget} from "@/utils/event/judgeEventTarget.ts";

const {
    menuMap,
    canMultiSelect,
    enableMultiSelect,
    disableMultiSelect,
    clearSelectedIdSets,

    remove
} = useModelEditor()

const orderedMenuItems = computed(() => {
    return Array.from(menuMap.value.values()).sort((o1, o2) => {
        return o1.group.name.localeCompare(o2.group.name)
    })
})

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
        e.preventDefault()

        // TODO
        remove({})
    } else if (e.key === "Control") {
        enableMultiSelect()
        document.documentElement.addEventListener('keyup', (e) => {
            if (e.key === "Control" || e.ctrlKey) {
                disableMultiSelect()
            }
        }, {once: true})
    }
}

const handleClick = (e: MouseEvent) => {
    if (!judgeTarget(e, (el) => el.classList.contains("menu-item"))) {
        if (!canMultiSelect.value) {
            clearSelectedIdSets()
        }
    }
}
</script>

<template>
    <div
        tabindex="-1"
        @keydown="handleKeyDown($event)"
        @click="handleClick($event)"
        class="model-editor-menu"
    >
        <GroupMenuItem
            v-for="menuItem in orderedMenuItems"
            :key="menuItem.group.id"
            :menu-item="menuItem"
        />
    </div>
</template>

<style scoped>
.model-editor-menu {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 5rem;
}
</style>
