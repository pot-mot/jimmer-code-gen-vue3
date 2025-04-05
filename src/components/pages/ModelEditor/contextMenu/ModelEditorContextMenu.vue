<template>
    <context-menu
        v-model:show="store.openState"
        :options="options"
        @close="handleClose"
    >
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('BUTTON_edit')"
            @click="handleEdit"
        >
            <template #icon>
                <el-icon size="1em">
                    <EditPen/>
                </el-icon>
            </template>
        </context-menu-item>

        <context-menu-item
            v-if="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createTable')"
            @click="handleCreateTable"
        />

        <context-menu-item
            v-if="MODEL.selectedTables.length > 0 && MODEL.selectedTables.length < 3"
            :label="i18nStore.translate('LABEL_ModelEditorMainMenu_createAssociation')"
            @click="handleCreateAssociation"
        />

        <template v-if="MODEL.selectedTables.length > 1">
            <context-menu-separator/>

            <context-menu-item
                :label="i18nStore.translate('LABEL_ModelEditorMainMenu_combineTable')"
                @click="handleCombineTable"
            />
        </template>

        <context-menu-separator/>

        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('BUTTON_copy')"
            @click="copy"
            shortcut="Ctrl + C"
        >
            <template #icon>
                <CopyIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('BUTTON_cut')"
            @click="cut"
            shortcut="Ctrl + X"
        >
            <template #icon>
                <CutIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :label="i18nStore.translate('BUTTON_paste')"
            @click="paste"
            shortcut="Ctrl + V"
        >
            <template #icon>
                <PasteIcon/>
            </template>
        </context-menu-item>

        <context-menu-separator/>

        <context-menu-group
            :label="i18nStore.translate('BUTTON_export')"
        >

        </context-menu-group>

        <context-menu-separator/>

        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelected')"
            shortcut="Delete"
            @click="REMOVE.removeSelectedCells"
        >
            <template #icon>
                <EraserIcon/>
            </template>
        </context-menu-item>
        <context-menu-item
            :disabled="GRAPH.isSelectionEmpty"
            :label="i18nStore.translate('LABEL_ModelEditorGraph_removeSelectedAssociation')"
            shortcut="Shift + Delete"
            @click="REMOVE.removeSelectedEdges"
        >
            <template #icon>
                <AssociationOffIcon/>
            </template>
        </context-menu-item>
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
import CopyIcon from "@/components/global/icons/toolbar/CopyIcon.vue";
import CutIcon from "@/components/global/icons/toolbar/CutIcon.vue";
import PasteIcon from "@/components/global/icons/toolbar/PasteIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import {EditPen} from "@element-plus/icons-vue";

const store = useModelEditorContextMenuStore()

const i18nStore = useI18nStore()

const {GRAPH, REMOVE, MODEL_EDITOR, MODEL} = useModelEditorStore()
const {copy, cut, paste} = useModelClipBoard()

const options = computed<MenuOptions>(() => {
    return {
        x: GRAPH.mousePagePosition.x,
        y: GRAPH.mousePagePosition.y,
    }
})

const handleClose = () => {
    // 在关闭菜单时，聚焦到画布容器，以允许键盘导航
    GRAPH._graph().container.focus()
}

const handleEdit = () => {
    // TODO
}

const handleCreateAssociation = () => {
    MODEL_EDITOR.createAssociation()
}

const handleCreateTable = () => {
    MODEL_EDITOR.createTable(GRAPH.mousePosition)
}

const handleCombineTable = () => {
    MODEL_EDITOR.combineTable(GRAPH.mousePosition)
}
</script>
