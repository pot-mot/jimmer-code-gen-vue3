<template>
    <context-menu
        v-model:show="store.openState"
        :options="options"
    >
        <context-menu-item label="Test item dynamic show and hide" :clickClose="false" @click="store.toggle" />
    </context-menu>
</template>

<script lang="ts" setup>
import {ContextMenu, ContextMenuItem, MenuOptions} from '@imengyu/vue3-context-menu';
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";

const store = useModelEditorContextMenuStore()

const {GRAPH} = useModelEditorStore()

const options = computed<MenuOptions>(() => {
    return {
        x: GRAPH.mousePagePosition.x,
        y: GRAPH.mousePagePosition.y,
    }
})
</script>
