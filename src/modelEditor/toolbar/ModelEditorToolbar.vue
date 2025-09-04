<!--<script setup lang="ts">-->
<!--import {useMindMap} from "@/mindMap/useMindMap.ts";-->
<!--import LayerMenu from "@/mindMap/layer/LayerMenu.vue";-->
<!--import {ref} from "vue";-->
<!--import MetaMenu from "@/mindMap/meta/MetaMenu.vue";-->
<!--import IconSave from "@/components/icons/IconSave.vue";-->
<!--import IconUndo from "@/components/icons/IconUndo.vue";-->
<!--import IconRedo from "@/components/icons/IconRedo.vue";-->
<!--import IconFit from "@/components/icons/IconFit.vue";-->
<!--import IconMenu from "@/components/icons/IconMenu.vue";-->
<!--import IconLayer from "@/components/icons/IconLayer.vue";-->
<!--import IconDrag from "@/components/icons/IconDrag.vue";-->
<!--import IconSelectRect from "@/components/icons/IconSelectRect.vue";-->
<!--import DownloadSelect from "@/mindMap/file/DownloadSelect.vue";-->

<!--const {-->
<!--    save,-->

<!--    canUndo,-->
<!--    canRedo,-->
<!--    undo,-->
<!--    redo,-->
<!--    fitView,-->
<!--    defaultMouseAction,-->
<!--    toggleDefaultMouseAction,-->
<!--} = useMindMap()-->

<!--const metaMenuOpen = ref(false)-->

<!--const layersMenuOpen = ref(false)-->
<!--</script>-->

<!--<template>-->
<!--    <div class="toolbar top-left">-->
<!--        <button @click="metaMenuOpen = !metaMenuOpen" :class="{enable: metaMenuOpen}">-->
<!--            <IconMenu/>-->
<!--        </button>-->
<!--        <button @click="save()">-->
<!--            <IconSave/>-->
<!--        </button>-->

<!--        <DownloadSelect style="margin-left: 0.5rem; margin-right: 0.5rem;"/>-->

<!--        <button :disabled="!canUndo" @click="undo()" :class="{disabled: !canUndo}">-->
<!--            <IconUndo/>-->
<!--        </button>-->
<!--        <button :disabled="!canRedo" @click="redo()" :class="{disabled: !canRedo}">-->
<!--            <IconRedo/>-->
<!--        </button>-->
<!--        <button @click="fitView()">-->
<!--            <IconFit/>-->
<!--        </button>-->
<!--        <button @click="toggleDefaultMouseAction()" :class="{enable: defaultMouseAction === 'selectionRect'}">-->
<!--            <IconDrag v-if="defaultMouseAction === 'panDrag'"/>-->
<!--            <IconSelectRect v-else-if="defaultMouseAction === 'selectionRect'"/>-->
<!--        </button>-->
<!--    </div>-->

<!--    <div class="toolbar top-right">-->
<!--        <button @click="layersMenuOpen = !layersMenuOpen" :class="{enable: layersMenuOpen}">-->
<!--            <IconLayer/>-->
<!--        </button>-->
<!--    </div>-->

<!--    <div-->
<!--        class="toolbar meta-menu"-->
<!--        :class="{open: metaMenuOpen}"-->
<!--        tabindex="-1"-->
<!--        @keydown.esc="metaMenuOpen = false"-->
<!--    >-->
<!--        <div class="container">-->
<!--            <MetaMenu/>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div-->
<!--        class="toolbar layer-menu"-->
<!--        :class="{open: layersMenuOpen}"-->
<!--        tabindex="-1"-->
<!--        @keydown.esc="layersMenuOpen = false"-->
<!--    >-->
<!--        <div class="container">-->
<!--            <LayerMenu/>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.toolbar {-->
<!--    z-index: var(&#45;&#45;toolbar-z-index);-->
<!--    position: absolute;-->
<!--}-->

<!--.toolbar button {-->
<!--    padding: 0 1rem;-->
<!--    background-color: var(&#45;&#45;background-color);-->
<!--    border: none;-->
<!--    cursor: pointer;-->
<!--    transition: background-color 0.3s ease;-->
<!--}-->

<!--.toolbar button:hover {-->
<!--    background-color: var(&#45;&#45;background-color-hover);-->
<!--}-->

<!--.toolbar button.disabled {-->
<!--    color: var(&#45;&#45;background-color-hover);-->
<!--    &#45;&#45;icon-color: var(&#45;&#45;background-color-hover);-->
<!--    background-color: var(&#45;&#45;background-color);-->
<!--    cursor: not-allowed;-->
<!--}-->

<!--.toolbar button.enable {-->
<!--    color: var(&#45;&#45;background-color);-->
<!--    &#45;&#45;icon-color: var(&#45;&#45;background-color);-->
<!--    background-color: var(&#45;&#45;primary-color);-->
<!--}-->

<!--.toolbar.top-left,-->
<!--.toolbar.top-right {-->
<!--    top: 0;-->
<!--    height: 2rem;-->
<!--    line-height: 2rem;-->
<!--    display: flex;-->
<!--    justify-content: space-around;-->
<!--    border-bottom: var(&#45;&#45;border);-->
<!--    background-color: var(&#45;&#45;background-color);-->
<!--    max-width: 100%;-->
<!--    overflow-x: auto;-->
<!--}-->

<!--.toolbar.top-left {-->
<!--    left: 0;-->
<!--    border-right: var(&#45;&#45;border);-->
<!--    border-color: var(&#45;&#45;background-color-hover);-->
<!--    border-bottom-right-radius: var(&#45;&#45;border-radius);-->
<!--}-->
<!--.toolbar.top-right {-->
<!--    right: 0;-->
<!--    border-left: var(&#45;&#45;border);-->
<!--    border-color: var(&#45;&#45;background-color-hover);-->
<!--    border-bottom-left-radius: var(&#45;&#45;border-radius);-->
<!--}-->

<!--.toolbar.meta-menu,-->
<!--.toolbar.layer-menu {-->
<!--    top: 2.5rem;-->
<!--    height: calc(100% - 3rem);-->
<!--    width: max(20vw, 20rem);-->
<!--    overflow: hidden;-->
<!--    pointer-events: none;-->
<!--}-->
<!--.toolbar.meta-menu.open,-->
<!--.toolbar.layer-menu.open {-->
<!--    pointer-events: all;-->
<!--}-->

<!--.toolbar.meta-menu {-->
<!--    left: 0;-->
<!--}-->
<!--.toolbar.layer-menu {-->
<!--    right: 0;-->
<!--}-->

<!--.toolbar.meta-menu > .container,-->
<!--.toolbar.layer-menu > .container {-->
<!--    height: 100%;-->
<!--    width: 100%;-->
<!--    transition: transform 0.5s ease;-->
<!--    overflow: hidden;-->
<!--}-->

<!--.toolbar.meta-menu > .container {-->
<!--    border-top: var(&#45;&#45;border);-->
<!--    border-bottom: var(&#45;&#45;border);-->
<!--    border-right: var(&#45;&#45;border);-->
<!--    border-top-right-radius: var(&#45;&#45;border-radius);-->
<!--    border-bottom-right-radius: var(&#45;&#45;border-radius);-->
<!--    border-color: var(&#45;&#45;background-color-hover);-->
<!--    transform: translateX(-100%);-->
<!--}-->
<!--.toolbar.meta-menu.open > .container {-->
<!--    transform: translateX(0);-->
<!--}-->

<!--.toolbar.layer-menu > .container{-->
<!--    border-top: var(&#45;&#45;border);-->
<!--    border-bottom: var(&#45;&#45;border);-->
<!--    border-left: var(&#45;&#45;border);-->
<!--    border-top-left-radius: var(&#45;&#45;border-radius);-->
<!--    border-bottom-left-radius: var(&#45;&#45;border-radius);-->
<!--    border-color: var(&#45;&#45;background-color-hover);-->
<!--    transform: translateX(100%);-->
<!--}-->
<!--.toolbar.layer-menu.open > .container {-->
<!--    transform: translateX(0);-->
<!--}-->
<!--</style>-->

