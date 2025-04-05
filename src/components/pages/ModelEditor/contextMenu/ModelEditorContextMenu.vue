<template>
    <context-menu
        v-model:show="store.openState"
        :options="options"
    >
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('BUTTON_copy')"
            @click="copy"
            shortcut="Ctrl + C"
        />
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('BUTTON_cut')"
            @click="cut"
            shortcut="Ctrl + X"
        />
        <context-menu-item
            :label="i18nStore.translate('BUTTON_paste')"
            @click="paste"
            shortcut="Ctrl + V"
        />

        <context-menu-separator/>

        <context-menu-group
            :label="i18nStore.translate('BUTTON_export')">
        </context-menu-group>

        <context-menu-separator/>

        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelected')"
            shortcut="Delete"
        />
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelectedAssociation')"
            shortcut="Shift + Delete"
        />
    </context-menu>
</template>

<script lang="ts" setup>
import {
    ContextMenu,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    MenuOptions
} from '@imengyu/vue3-context-menu';
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {computed} from "vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelClipBoard} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";

const store = useModelEditorContextMenuStore()

const i18nStore = useI18nStore()

const {GRAPH} = useModelEditorStore()
const {copy, cut, paste} = useModelClipBoard()

const options = computed<MenuOptions>(() => {
    return {
        x: GRAPH.mousePagePosition.x,
        y: GRAPH.mousePagePosition.y,
    }
})
</script>
