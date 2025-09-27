<script setup lang="ts">
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import ModelEditorMenu from "@/modelEditor/menu/ModelEditorMenu.vue";
import ModelEditor from "@/modelEditor/ModelEditor.vue";
</script>

<template>
    <Splitpanes>
        <Pane :size="20">
            <ModelEditorMenu/>
        </Pane>
        <Pane>
            <ModelEditor/>
        </Pane>
    </Splitpanes>
</template>
