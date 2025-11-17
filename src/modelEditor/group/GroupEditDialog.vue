<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useGroupEditDialog} from "@/modelEditor/group/useGroupEditDialog.ts";
import GroupForm from "@/modelEditor/group/GroupForm.vue";

const {
    openState,
    groupState,
    submit,
    close,
} = useGroupEditDialog()
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
    >
        <GroupForm
            v-if="groupState"
            v-model="groupState"
            @submit="submit"
            @cancel="close"
        />
    </DragResizeDialog>
</template>
