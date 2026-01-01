<script setup lang="ts">
import {nextTick, ref, useTemplateRef, watch} from "vue"
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import ModelBaseContextMenu from "@/modelEditor/contextMenu/item/ModelBaseContextMenu.vue";
import GroupContextMenu from "@/modelEditor/contextMenu/item/GroupContextMenu.vue";
import EntityContextMenu from "@/modelEditor/contextMenu/item/EntityContextMenu.vue";
import MappedSuperClassContextMenu from "@/modelEditor/contextMenu/item/MappedSuperClassContextMenu.vue";
import EnumerationContextMenu from "@/modelEditor/contextMenu/item/EnumerationContextMenu.vue";
import EmbeddableTypeContextMenu from "@/modelEditor/contextMenu/item/EmbeddableTypeContextMenu.vue";
import AssociationContextMenu from "@/modelEditor/contextMenu/item/AssociationContextMenu.vue";

const {
    openState,
    target,
    position,
    close,
} = useModelContextMenu()

const menuRef = useTemplateRef<HTMLDivElement>("menuRef")
const menuPosition = ref<{ top: number, left: number }>({top: 0, left: 0})

watch(() => openState.value, async (value) => {
    await nextTick()
    if (value && menuRef.value) {
        const menuRect = menuRef.value.getBoundingClientRect()

        // 计算水平位置（优先右侧，空间不足则左侧）
        let left = position.value.x
        if (left + menuRect.width > window.innerWidth) {
            left = Math.max(0, left - menuRect.width)
        }
        if (left < 0) left = 0

        // 计算垂直位置（优先下方，空间不足则上方）
        let top = position.value.y
        if (top + menuRect.height > window.innerHeight) {
            top = Math.max(0, top - menuRect.height)
        }
        if (top < 0) top = 0

        menuPosition.value = {left, top}
    }
}, {immediate: true})
</script>

<template>
    <Teleport to="body">
        <div
            v-if="openState"
            class="context-menu-mask"
            @click.self="close"
            @contextmenu.prevent
        >
            <div
                ref="menuRef"
                class="context-menu-container"
                :style="{
                    left: `${menuPosition.left}px`,
                    top: `${menuPosition.top}px`
                }"
            >
                <ModelBaseContextMenu
                    v-if="target.type === 'Model'"
                />
                <GroupContextMenu
                    v-else-if="target.type === 'Group'"
                    :id="target.id"
                />
                <EntityContextMenu
                    v-else-if="target.type === 'Entity'"
                    :id="target.id"
                />
                <MappedSuperClassContextMenu
                    v-else-if="target.type === 'MappedSuperClass'"
                    :id="target.id"
                />
                <EnumerationContextMenu
                    v-else-if="target.type === 'Enumeration'"
                    :id="target.id"
                />
                <EmbeddableTypeContextMenu
                    v-else-if="target.type === 'EmbeddableType'"
                    :id="target.id"
                />
                <AssociationContextMenu
                    v-else-if="target.type === 'Association'"
                    :id="target.id"
                />
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.context-menu-mask {
    position: fixed;
    z-index: var(--mask-z-index);
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100 * var(--vh));
}

.context-menu-container {
    position: absolute;
    max-height: 400px;
    max-width: 300px;
    overflow-x: auto;
    overflow-y: auto;
    background-color: var(--background-color);
    border: var(--border);
    border-radius: var(--border-radius);
    border-color: var(--border-color-light);
    user-select: none;
}

:deep(.context-menu-item-list > li) {
    font-size: 0.8rem;
    color: var(--text-color);
    --icon-color: var(--text-color);
    line-height: 1rem;
    padding: 0.5rem;
    display: grid;
    grid-template-areas: "icon label shortcut";
    grid-template-columns: 1rem 1fr auto;
    grid-gap: 0.25rem;
    min-width: 6rem;
}

:deep(.context-menu-item-list > li > .icon) {
    grid-area: icon;
}
:deep(.context-menu-item-list > li > .label) {
    grid-area: label;
    min-width: 3.2rem;
}
:deep(.context-menu-item-list > li > .shortcut) {
    grid-area: shortcut;
    text-align: right;
}

:deep(.context-menu-item-list > li:hover) {
    background-color: var(--background-color-hover);
}

:deep(.context-menu-item-list > li.disabled) {
    color: var(--comment-color);
    --icon-color: var(--comment-color);
    cursor: not-allowed;
    background-color: var(--background-color);
}
</style>
